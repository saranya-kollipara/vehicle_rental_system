import bookingModel from '../models/bookingModel.js';
import vehicleModel from '../models/vehicleModel.js';
import { query } from '../config/db.js';

// POST /api/bookings - Create new booking
export const createBooking = async (req, res) => {
  try {
    const vehicle_id = req.body.vehicle_id || req.body.vehicleId;
    const pickup_location = req.body.pickup_location || req.body.pickupLocation;
    const dropoff_location = req.body.dropoff_location || req.body.dropoffLocation || pickup_location;
    const pickup_date = req.body.pickup_date || req.body.pickupDate;
    const return_date = req.body.return_date || req.body.returnDate;
    const payment_method = req.body.payment_method || req.body.paymentMethod || 'UPI / Card';

    const user_id = req.user.id;

    // Field Validation
    if (!vehicle_id || !pickup_location || !pickup_date || !return_date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: vehicle_id, pickup_location, pickup_date, return_date'
      });
    }

    const start = new Date(pickup_date);
    const end = new Date(return_date);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pickup_date or return_date format'
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: 'Return date must be on or after pickup date'
      });
    }

    // Calculate total days (minimum 1 day)
    const diffTime = Math.abs(end - start);
    const total_days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Fetch vehicle from MySQL database
    const vehicle = await vehicleModel.getById(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: `Vehicle with ID ${vehicle_id} not found`
      });
    }

    // Check vehicle date availability (prevent overlapping bookings)
    const isAvailable = await bookingModel.checkAvailability(vehicle_id, pickup_date, return_date);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle is not available for the selected dates'
      });
    }

    // Secure Pricing Calculation on Backend
    const price_per_day = parseFloat(vehicle.price_per_day);
    const rental_amount = price_per_day * total_days;
    const tax_amount = Math.round(rental_amount * 0.18 * 100) / 100; // 18% GST
    const total_amount = rental_amount + tax_amount;

    // Generate unique booking ID (e.g. DRV-92810)
    const bookingId = `DRV-${Math.floor(10000 + Math.random() * 90000)}`;

    // Determine initial payment status (Customer bookings ALWAYS require Admin validation)
    let payment_status = 'Pending';
    if (req.user.role === 'admin' && req.body.payment_status) {
      payment_status = req.body.payment_status;
    }

    const newBooking = await bookingModel.create({
      id: bookingId,
      user_id,
      vehicle_id,
      pickup_location,
      dropoff_location: dropoff_location || pickup_location,
      pickup_date,
      return_date,
      total_days,
      rental_amount,
      tax_amount,
      total_amount,
      booking_status: 'Confirmed',
      payment_status
    });

    // Create payment record with generated/provided transaction reference
    let txnRef = req.body.transaction_reference || req.body.transactionId;
    if (!txnRef) {
      const pmLower = (payment_method || '').toLowerCase();
      const isUpi = pmLower.includes('upi') || pmLower.includes('gpay') || pmLower.includes('phonepe');
      const isCard = pmLower.includes('card') || pmLower.includes('credit') || pmLower.includes('debit');
      const prefix = isUpi ? 'TXN_UPI_' : isCard ? 'TXN_CC_' : 'TXN_PAY_';
      txnRef = `${prefix}${Date.now()}`;
    }

    await query(
      `INSERT INTO payments (booking_id, user_id, amount, payment_method, payment_status, transaction_reference) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [bookingId, user_id, total_amount, payment_method, payment_status, txnRef]
    );

    newBooking.transaction_reference = txnRef;

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully. Payment is pending Admin verification.',
      data: newBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating booking',
      error: error.message
    });
  }
};

// PUT /api/bookings/:id/pay - Submit payment details or validate payment (Admin)
export const verifyAndPayBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_method, transaction_reference, transactionId } = req.body;

    const booking = await bookingModel.getById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${id} not found`
      });
    }

    if (req.user.role !== 'admin' && booking.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to access this payment'
      });
    }

    const isAdmin = req.user.role === 'admin';
    const pm = payment_method || booking.payment_method || 'UPI / Credit Card';
    const pmLower = pm.toLowerCase();
    const isUpi = pmLower.includes('upi') || pmLower.includes('gpay') || pmLower.includes('phonepe');
    const isCard = pmLower.includes('card') || pmLower.includes('credit');
    const defaultPrefix = isUpi ? 'TXN_UPI_' : isCard ? 'TXN_CC_' : 'TXN_VERIFIED_';
    
    const txnRef = (transaction_reference || transactionId || '').trim() || `${defaultPrefix}${Date.now()}`;

    // Target payment status: 'Paid' if Admin validates, 'Pending' if Customer submits
    const targetPaymentStatus = isAdmin ? (req.body.payment_status || 'Paid') : 'Pending';

    // Update booking payment status
    const updated = await bookingModel.updateStatus(id, booking.booking_status, targetPaymentStatus);

    // Update payments table record with transaction ID and status
    await query(
      `UPDATE payments SET payment_status = ?, payment_method = COALESCE(?, payment_method), transaction_reference = ? WHERE booking_id = ?`,
      [targetPaymentStatus, payment_method || null, txnRef, id]
    );

    updated.transaction_reference = txnRef;

    const resMessage = isAdmin 
      ? `Payment validated and marked as '${targetPaymentStatus}' by Admin` 
      : `Payment details submitted successfully! Awaiting Admin verification.`;

    return res.status(200).json({
      success: true,
      message: resMessage,
      transaction_reference: txnRef,
      data: updated
    });
  } catch (error) {
    console.error('Error in payment handler:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while processing payment submission',
      error: error.message
    });
  }
};


// GET /api/bookings/my - Get user's bookings
export const getMyBookings = async (req, res) => {
  try {
    const user_id = req.user.id;
    const bookings = await bookingModel.getByUserId(user_id);

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching your bookings',
      error: error.message
    });
  }
};

// GET /api/bookings/:id - Get single booking details
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.getById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${id} not found`
      });
    }

    // Access control: User can view their own booking; Admin can view any
    if (req.user.role !== 'admin' && booking.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You are not authorized to view this booking'
      });
    }

    return res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching booking details',
      error: error.message
    });
  }
};

// PUT /api/bookings/:id/cancel - User cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.getById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${id} not found`
      });
    }

    // Access check
    if (req.user.role !== 'admin' && booking.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You cannot cancel another user\'s booking'
      });
    }

    if (booking.booking_status === 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Completed bookings cannot be cancelled'
      });
    }

    if (booking.booking_status === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    // Set booking_status to 'Cancelled' while preserving current payment_status (Admin must manually approve refunds)
    const updated = await bookingModel.updateStatus(id, 'Cancelled');

    return res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully. Payment refund requires Admin approval.',
      data: updated
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while cancelling booking',
      error: error.message
    });
  }
};

// GET /api/admin/bookings - Admin get all bookings
export const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await bookingModel.getAll();
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching all bookings',
      error: error.message
    });
  }
};

// PUT /api/admin/bookings/:id/status - Admin update booking status
export const updateBookingStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { booking_status, payment_status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
    if (booking_status && !validStatuses.includes(booking_status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid booking_status. Allowed values: ${validStatuses.join(', ')}`
      });
    }

    const booking = await bookingModel.getById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID ${id} not found`
      });
    }

    const updated = await bookingModel.updateStatus(
      id, 
      booking_status || booking.booking_status, 
      payment_status || booking.payment_status
    );

    if (payment_status) {
      await query(`UPDATE payments SET payment_status = ? WHERE booking_id = ?`, [payment_status, id]);
    }

    return res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating booking status',
      error: error.message
    });
  }
};

export default {
  createBooking,
  verifyAndPayBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookingsAdmin,
  updateBookingStatusAdmin
};
