import express from 'express';
import {
  createBooking,
  verifyAndPayBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookingsAdmin,
  updateBookingStatusAdmin
} from '../controllers/bookingController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Protected Booking Routes
router.post('/', protect, createBooking);
router.put('/:id/pay', protect, verifyAndPayBooking);
router.get('/my', protect, getMyBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/cancel', protect, cancelBooking);

// Admin Booking Routes
router.get('/admin/all', protect, requireAdmin, getAllBookingsAdmin);
router.put('/admin/:id/status', protect, requireAdmin, updateBookingStatusAdmin);

export default router;
