import express from 'express';
import {
  getAllPayments,
  getMyPayments,
  getPaymentById,
  updatePaymentStatusAdmin,
  validatePaymentByTxnId
} from '../controllers/paymentController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Protected Routes
router.get('/my', protect, getMyPayments);
router.get('/verify/:txnId', protect, validatePaymentByTxnId);
router.get('/:id', protect, getPaymentById);

// Admin Routes
router.get('/', protect, requireAdmin, getAllPayments);
router.put('/:id/status', protect, requireAdmin, updatePaymentStatusAdmin);

export default router;
