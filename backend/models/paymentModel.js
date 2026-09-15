import { query } from '../config/db.js';

// Get all payments (Admin)
export const getAll = async () => {
  const sql = `
    SELECT 
      p.*,
      u.name AS user_name, u.email AS user_email,
      b.vehicle_id, b.pickup_date, b.return_date
    FROM payments p
    JOIN users u ON p.user_id = u.id
    JOIN bookings b ON p.booking_id = b.id
    ORDER BY p.created_at DESC
  `;
  return await query(sql);
};

// Get payment by ID
export const getById = async (id) => {
  const sql = `
    SELECT 
      p.*,
      u.name AS user_name, u.email AS user_email,
      b.vehicle_id, b.pickup_date, b.return_date
    FROM payments p
    JOIN users u ON p.user_id = u.id
    JOIN bookings b ON p.booking_id = b.id
    WHERE p.id = ?
  `;
  const results = await query(sql, [id]);
  return results[0] || null;
};

// Get payments for a specific user
export const getByUserId = async (userId) => {
  const sql = `
    SELECT p.*, b.vehicle_id
    FROM payments p
    JOIN bookings b ON p.booking_id = b.id
    WHERE p.user_id = ?
    ORDER BY p.created_at DESC
  `;
  return await query(sql, [userId]);
};

// Update payment status
export const updateStatus = async (id, paymentStatus) => {
  const sql = 'UPDATE payments SET payment_status = ? WHERE id = ?';
  await query(sql, [paymentStatus, id]);

  // Update associated booking payment status as well
  const payment = await getById(id);
  if (payment) {
    await query('UPDATE bookings SET payment_status = ? WHERE id = ?', [paymentStatus, payment.booking_id]);
  }
  return payment;
};

// Get payment record by transaction reference, booking ID, or payment ID
export const getByTransactionRef = async (txnRef) => {
  const sql = `
    SELECT 
      p.*,
      u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
      b.vehicle_id, b.pickup_date, b.return_date, b.pickup_location, b.dropoff_location, b.booking_status,
      v.name AS vehicle_name, v.brand AS vehicle_brand, v.category AS vehicle_category, v.image AS vehicle_image
    FROM payments p
    JOIN users u ON p.user_id = u.id
    JOIN bookings b ON p.booking_id = b.id
    LEFT JOIN vehicles v ON b.vehicle_id = v.id
    WHERE p.transaction_reference = ? OR p.booking_id = ? OR CAST(p.id AS CHAR) = ?
  `;
  const results = await query(sql, [txnRef, txnRef, txnRef]);
  return results[0] || null;
};

export default {
  getAll,
  getById,
  getByUserId,
  updateStatus,
  getByTransactionRef
};
