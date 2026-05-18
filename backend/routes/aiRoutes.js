import express from 'express';
import {
  getRecommendations,
  rankEmployees,
  getPerformanceSummary,
  batchRecommendations,
} from '../controllers/aiController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/recommend', getRecommendations);
router.post('/rank', authorize('Admin', 'HR'), rankEmployees);
router.get('/summary', authorize('Admin', 'HR'), getPerformanceSummary);
router.post('/batch-recommend', authorize('Admin', 'HR'), batchRecommendations);

export default router;
