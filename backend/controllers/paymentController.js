import paymentModel from '../models/paymentModel.js';
import { query } from '../config/db.js';

// GET /api/payments - Admin get all payment records
export const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentModel.getAll();
    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching payments',
      error: error.message
    });
  }
};

// GET /api/payments/my - Get user's own payment history
export const getMyPayments = async (req, res) => {
  try {
    const payments = await paymentModel.getByUserId(req.user.id);
    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Error fetching user payments:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching payment history',
      error: error.message
    });
  }
};

// GET /api/payments/:id - Get single payment record details
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await paymentModel.getById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: `Payment record with ID ${id} not found`
      });
    }

    if (req.user.role !== 'admin' && payment.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to view this payment record'
      });
    }

    return res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching payment details',
      error: error.message
    });
  }
};

// PUT /api/payments/:id/status - Admin update payment status (Pending, Paid, Failed, Refunded)
export const updatePaymentStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_status } = req.body;

    const validStatuses = ['Pending', 'Paid', 'Failed', 'Refunded'];
    if (!payment_status || !validStatuses.includes(payment_status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid payment_status. Allowed values: ${validStatuses.join(', ')}`
      });
    }

    const existing = await paymentModel.getById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Payment record with ID ${id} not found`
      });
    }

    const updated = await paymentModel.updateStatus(id, payment_status);

    // Sync corresponding booking in bookings table if linked
    if (existing.booking_id) {
      await query(`UPDATE bookings SET payment_status = ? WHERE id = ?`, [payment_status, existing.booking_id]);
    }

    return res.status(200).json({
      success: true,
      message: `Payment status validated and updated to '${payment_status}' by Admin`,
      data: updated
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating payment status',
      error: error.message
    });
  }
};

// GET /api/payments/verify/:txnId - Validate payment status using transaction ID or reference
export const validatePaymentByTxnId = async (req, res) => {
  try {
    const { txnId } = req.params;
    if (!txnId) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Transaction ID or Reference parameter is required'
      });
    }

    const payment = await paymentModel.getByTransactionRef(txnId.trim());

    if (!payment) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: `No payment transaction found with ID or Reference: '${txnId}'`
      });
    }

    // Access authorization check
    if (req.user && req.user.role !== 'admin' && payment.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        valid: false,
        message: 'Access denied: You are not authorized to view this transaction'
      });
    }

    const isPaid = payment.payment_status?.toLowerCase() === 'paid';

    return res.status(200).json({
      success: true,
      valid: isPaid,
      message: isPaid ? 'Transaction verified successfully. Status: PAID' : `Transaction found. Status: ${payment.payment_status}`,
      data: payment
    });
  } catch (error) {
    console.error('Error validating payment transaction:', error);
    return res.status(500).json({
      success: false,
      valid: false,
      message: 'Server error while validating payment transaction',
      error: error.message
    });
  }
};

export default {
  getAllPayments,
  getMyPayments,
  getPaymentById,
  updatePaymentStatusAdmin,
  validatePaymentByTxnId
};
