import express from 'express';
import {
  getDashboardStats,
  getBookingReports,
  getRevenueReports,
  getVehicleReports
} from '../controllers/adminController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin Dashboard & Reports (Protected + Admin only)
router.get('/dashboard', protect, requireAdmin, getDashboardStats);
router.get('/reports/bookings', protect, requireAdmin, getBookingReports);
router.get('/reports/revenue', protect, requireAdmin, getRevenueReports);
router.get('/reports/vehicles', protect, requireAdmin, getVehicleReports);

export default router;
