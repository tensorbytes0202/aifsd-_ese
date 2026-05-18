import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { signupValidator, loginValidator } from '../middleware/validator.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.get('/me', protect, getMe);

export default router;
