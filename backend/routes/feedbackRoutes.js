import express from 'express';
import {
  createFeedback,
  getAllFeedback,
  getVehicleFeedback,
  deleteFeedback,
  getAllFeedbackAdmin,
  updateFeedbackStatusAdmin
} from '../controllers/feedbackController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public & User Routes
router.get('/', getAllFeedback);
router.get('/vehicle/:vehicleId', getVehicleFeedback);
router.post('/', protect, createFeedback);
router.delete('/:id', protect, deleteFeedback);

// Admin Routes
router.get('/admin/all', protect, requireAdmin, getAllFeedbackAdmin);
router.put('/admin/:id/status', protect, requireAdmin, updateFeedbackStatusAdmin);

export default router;
