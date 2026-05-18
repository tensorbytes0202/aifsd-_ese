import { body, param, query, validationResult } from 'express-validator';

/**
 * Validation result handler
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Auth Validators
 */
export const signupValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['Admin', 'HR', 'Employee'])
    .withMessage('Invalid role'),
  validate,
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

/**
 * Employee Validators
 */
export const createEmployeeValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Employee name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('department')
    .notEmpty()
    .withMessage('Department is required')
    .isIn([
      'Development',
      'Marketing',
      'Sales',
      'HR',
      'Finance',
      'Operations',
      'Design',
      'Support',
    ])
    .withMessage('Invalid department'),
  body('skills')
    .isArray({ min: 1 })
    .withMessage('At least one skill is required'),
  body('performanceScore')
    .notEmpty()
    .withMessage('Performance score is required')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Performance score must be between 0 and 100'),
  body('experience')
    .notEmpty()
    .withMessage('Experience is required')
    .isFloat({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  body('salary').optional().isFloat({ min: 0 }).withMessage('Invalid salary'),
  body('position').optional().trim(),
  validate,
];

export const updateEmployeeValidator = [
  param('id').isMongoId().withMessage('Invalid employee ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('department')
    .optional()
    .isIn([
      'Development',
      'Marketing',
      'Sales',
      'HR',
      'Finance',
      'Operations',
      'Design',
      'Support',
    ])
    .withMessage('Invalid department'),
  body('skills')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one skill is required'),
  body('performanceScore')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Performance score must be between 0 and 100'),
  body('experience')
    .optional()
    .isFloat({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  validate,
];

export const employeeIdValidator = [
  param('id').isMongoId().withMessage('Invalid employee ID'),
  validate,
];

export const searchEmployeeValidator = [
  query('department').optional().trim(),
  query('minScore').optional().isFloat({ min: 0, max: 100 }),
  query('maxScore').optional().isFloat({ min: 0, max: 100 }),
  query('minExperience').optional().isFloat({ min: 0 }),
  query('maxExperience').optional().isFloat({ min: 0 }),
  validate,
];
