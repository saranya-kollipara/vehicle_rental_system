import { query } from '../config/db.js';

// Auto-update expired bookings where return_date < TODAY to 'Completed'
export const autoUpdateExpiredBookings = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const sql = `
      UPDATE bookings 
      SET booking_status = 'Completed' 
      WHERE return_date < ? 
        AND booking_status NOT IN ('Completed', 'Cancelled')
    `;
    await query(sql, [today]);
  } catch (error) {
    console.error('Error auto-updating expired bookings:', error.message);
  }
};

// Check if vehicle is available for the given date range (prevent overlapping bookings)
export const checkAvailability = async (vehicleId, pickupDate, returnDate, excludeBookingId = null) => {
  await autoUpdateExpiredBookings();

  let sql = `
    SELECT * FROM bookings 
    WHERE vehicle_id = ? 
      AND booking_status NOT IN ('Cancelled', 'Completed')
      AND (pickup_date <= ? AND return_date >= ?)
  `;
  const params = [vehicleId, returnDate, pickupDate];

  if (excludeBookingId) {
    sql += ' AND id != ?';
    params.push(excludeBookingId);
  }

  const overlappingBookings = await query(sql, params);
  return overlappingBookings.length === 0;
};

// Create a new booking
export const create = async (bookingData) => {
  const {
    id,
    user_id,
    vehicle_id,
    pickup_location,
    dropoff_location,
    pickup_date,
    return_date,
    total_days,
    rental_amount,
    tax_amount,
    total_amount,
    booking_status = 'Confirmed',
    payment_status = 'Pending'
  } = bookingData;

  const sql = `
    INSERT INTO bookings 
    (id, user_id, vehicle_id, pickup_location, dropoff_location, pickup_date, return_date, total_days, rental_amount, tax_amount, total_amount, booking_status, payment_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await query(sql, [
    id,
    user_id,
    vehicle_id,
    pickup_location,
    dropoff_location,
    pickup_date,
    return_date,
    total_days,
    rental_amount,
    tax_amount,
    total_amount,
    booking_status,
    payment_status
  ]);

  return await getById(id);
};

// Get single booking by ID (joined with user and vehicle details)
export const getById = async (id) => {
  await autoUpdateExpiredBookings();

  const sql = `
    SELECT 
      b.*,
      u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
      v.name AS vehicle_name, v.brand AS vehicle_brand, v.category AS vehicle_category, v.image AS vehicle_image, v.price_per_day
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.id = ?
  `;
  const results = await query(sql, [id]);
  return results[0] || null;
};

// Get bookings for a specific user
export const getByUserId = async (userId) => {
  await autoUpdateExpiredBookings();

  const sql = `
    SELECT 
      b.*,
      v.name AS vehicle_name, v.brand AS vehicle_brand, v.category AS vehicle_category, v.image AS vehicle_image
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
  `;
  return await query(sql, [userId]);
};

// Get all bookings (Admin)
export const getAll = async () => {
  await autoUpdateExpiredBookings();

  const sql = `
    SELECT 
      b.*,
      u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
      v.name AS vehicle_name, v.brand AS vehicle_brand, v.category AS vehicle_category
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
    ORDER BY b.created_at DESC
  `;
  return await query(sql);
};

// Update booking status
export const updateStatus = async (id, bookingStatus, paymentStatus = null) => {
  let sql = 'UPDATE bookings SET booking_status = ?';
  const params = [bookingStatus];

  if (paymentStatus) {
    sql += ', payment_status = ?';
    params.push(paymentStatus);
  }

  sql += ' WHERE id = ?';
  params.push(id);

  await query(sql, params);
  return await getById(id);
};

export default {
  autoUpdateExpiredBookings,
  checkAvailability,
  create,
  getById,
  getByUserId,
  getAll,
  updateStatus
};
