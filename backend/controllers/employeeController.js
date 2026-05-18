import Employee from '../models/Employee.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/appError.js';

/**
 * @desc    Create new employee
 * @route   POST /api/employees
 * @access  Private (Admin/HR)
 */
export const createEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Employee created successfully',
    data: { employee },
  });
});

/**
 * @desc    Get all employees
 * @route   GET /api/employees
 * @access  Private
 */
export const getAllEmployees = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

  const employees = await Employee.find({ isActive: true })
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Employee.countDocuments({ isActive: true });

  res.status(200).json({
    success: true,
    count: employees.length,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
    data: { employees },
  });
});

/**
 * @desc    Get single employee
 * @route   GET /api/employees/:id
 * @access  Private
 */
export const getEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new AppError('Employee not found', 404));
  }

  res.status(200).json({
    success: true,
    data: { employee },
  });
});

/**
 * @desc    Update employee
 * @route   PUT /api/employees/:id
 * @access  Private (Admin/HR)
 */
export const updateEmployee = asyncHandler(async (req, res, next) => {
  let employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new AppError('Employee not found', 404));
  }

  employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Employee updated successfully',
    data: { employee },
  });
});

/**
 * @desc    Delete employee
 * @route   DELETE /api/employees/:id
 * @access  Private (Admin/HR)
 */
export const deleteEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new AppError('Employee not found', 404));
  }

  // Soft delete
  await Employee.findByIdAndUpdate(req.params.id, { isActive: false });

  res.status(200).json({
    success: true,
    message: 'Employee deleted successfully',
    data: {},
  });
});

/**
 * @desc    Search employees
 * @route   GET /api/employees/search
 * @access  Private
 */
export const searchEmployees = asyncHandler(async (req, res, next) => {
  const {
    department,
    minScore,
    maxScore,
    minExperience,
    maxExperience,
    search,
  } = req.query;

  let query = { isActive: true };

  // Department filter
  if (department) {
    query.department = department;
  }

  // Performance score range
  if (minScore || maxScore) {
    query.performanceScore = {};
    if (minScore) query.performanceScore.$gte = parseFloat(minScore);
    if (maxScore) query.performanceScore.$lte = parseFloat(maxScore);
  }

  // Experience range
  if (minExperience || maxExperience) {
    query.experience = {};
    if (minExperience) query.experience.$gte = parseFloat(minExperience);
    if (maxExperience) query.experience.$lte = parseFloat(maxExperience);
  }

  // Text search
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { position: { $regex: search, $options: 'i' } },
    ];
  }

  const employees = await Employee.find(query).sort('-performanceScore');

  res.status(200).json({
    success: true,
    count: employees.length,
    data: { employees },
  });
});

/**
 * @desc    Get employee statistics
 * @route   GET /api/employees/stats
 * @access  Private
 */
export const getEmployeeStats = asyncHandler(async (req, res, next) => {
  const totalEmployees = await Employee.countDocuments({ isActive: true });

  const avgPerformance = await Employee.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: null, avgScore: { $avg: '$performanceScore' } } },
  ]);

  const departmentStats = await Employee.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$department', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const topPerformers = await Employee.find({ isActive: true })
    .sort('-performanceScore')
    .limit(5);

  const promotionEligible = await Employee.countDocuments({
    isActive: true,
    performanceScore: { $gte: 80 },
    experience: { $gte: 2 },
  });

  res.status(200).json({
    success: true,
    data: {
      totalEmployees,
      avgPerformanceScore: avgPerformance[0]?.avgScore.toFixed(2) || 0,
      departmentStats,
      topPerformers,
      promotionEligible,
    },
  });
});
