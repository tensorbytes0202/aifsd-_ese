import Employee from '../models/Employee.js';
import aiService from '../services/aiService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/appError.js';

/**
 * @desc    Get AI recommendations for employee
 * @route   POST /api/ai/recommend
 * @access  Private
 */
export const getRecommendations = asyncHandler(async (req, res, next) => {
  const { employeeId, type } = req.body;

  if (!employeeId) {
    return next(new AppError('Employee ID is required', 400));
  }

  const employee = await Employee.findById(employeeId);
  if (!employee) {
    return next(new AppError('Employee not found', 404));
  }

  let recommendation;

  try {
    switch (type) {
      case 'promotion':
        recommendation = await aiService.generatePromotionRecommendation(employee);
        break;
      case 'training':
        recommendation = await aiService.generateTrainingSuggestions(employee);
        break;
      case 'feedback':
        recommendation = await aiService.generateFeedback(employee);
        break;
      case 'skillGap':
        recommendation = await aiService.analyzeSkillGaps(employee);
        break;
      default:
        return next(new AppError('Invalid recommendation type', 400));
    }

    res.status(200).json({
      success: true,
      data: {
        employee: {
          id: employee._id,
          name: employee.name,
          department: employee.department,
        },
        recommendation,
      },
    });
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    
    // Return a fallback response instead of throwing error
    const fallbackRecommendation = {
      message: 'AI service is currently unavailable. Please try again later.',
      fallback: true,
    };

    res.status(200).json({
      success: true,
      data: {
        employee: {
          id: employee._id,
          name: employee.name,
          department: employee.department,
        },
        recommendation: fallbackRecommendation,
      },
    });
  }
});

/**
 * @desc    Rank multiple employees
 * @route   POST /api/ai/rank
 * @access  Private (Admin/HR)
 */
export const rankEmployees = asyncHandler(async (req, res, next) => {
  const { employeeIds } = req.body;

  if (!employeeIds || !Array.isArray(employeeIds) || employeeIds.length === 0) {
    return next(new AppError('Employee IDs array is required', 400));
  }

  const employees = await Employee.find({
    _id: { $in: employeeIds },
    isActive: true,
  });

  if (employees.length === 0) {
    return next(new AppError('No employees found', 404));
  }

  const rankings = await aiService.rankEmployees(employees);

  res.status(200).json({
    success: true,
    data: { rankings },
  });
});

/**
 * @desc    Generate performance summary
 * @route   GET /api/ai/summary
 * @access  Private (Admin/HR)
 */
export const getPerformanceSummary = asyncHandler(async (req, res, next) => {
  const employees = await Employee.find({ isActive: true });

  if (employees.length === 0) {
    return next(new AppError('No employees found', 404));
  }

  const summary = await aiService.generatePerformanceSummary(employees);

  res.status(200).json({
    success: true,
    data: { summary },
  });
});

/**
 * @desc    Batch AI recommendations
 * @route   POST /api/ai/batch-recommend
 * @access  Private (Admin/HR)
 */
export const batchRecommendations = asyncHandler(async (req, res, next) => {
  const { department, minScore, maxScore } = req.body;

  let query = { isActive: true };
  if (department) query.department = department;
  if (minScore) query.performanceScore = { $gte: minScore };
  if (maxScore) query.performanceScore = { ...query.performanceScore, $lte: maxScore };

  const employees = await Employee.find(query).limit(10);

  if (employees.length === 0) {
    return next(new AppError('No employees found matching criteria', 404));
  }

  const recommendations = await Promise.all(
    employees.map(async (employee) => {
      const promotion = await aiService.generatePromotionRecommendation(
        employee
      );
      return {
        employeeId: employee._id,
        name: employee.name,
        department: employee.department,
        performanceScore: employee.performanceScore,
        recommendation: promotion,
      };
    })
  );

  res.status(200).json({
    success: true,
    count: recommendations.length,
    data: { recommendations },
  });
});
