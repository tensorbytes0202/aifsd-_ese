import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  getEmployeeStats,
} from '../controllers/employeeController.js';
import {
  createEmployeeValidator,
  updateEmployeeValidator,
  employeeIdValidator,
  searchEmployeeValidator,
} from '../middleware/validator.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Stats route (before /:id to avoid conflict)
router.get('/stats', getEmployeeStats);

// Search route
router.get('/search', searchEmployeeValidator, searchEmployees);

// CRUD routes
router
  .route('/')
  .get(getAllEmployees)
  .post(authorize('Admin', 'HR'), createEmployeeValidator, createEmployee);

router
  .route('/:id')
  .get(employeeIdValidator, getEmployee)
  .put(authorize('Admin', 'HR'), updateEmployeeValidator, updateEmployee)
  .delete(authorize('Admin', 'HR'), employeeIdValidator, deleteEmployee);

export default router;
