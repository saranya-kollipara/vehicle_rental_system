import express from 'express';
import {
  getProfile,
  updateProfile,
  getUserBookings,
  getAllUsersAdmin,
  getUserDetailsAdmin,
  updateUserStatusAdmin
} from '../controllers/userController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Protected Profile & Bookings Routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/bookings', protect, getUserBookings);

// Admin User Management Routes
router.get('/admin/all', protect, requireAdmin, getAllUsersAdmin);
router.get('/admin/:id', protect, requireAdmin, getUserDetailsAdmin);
router.put('/admin/:id/status', protect, requireAdmin, updateUserStatusAdmin);

export default router;
