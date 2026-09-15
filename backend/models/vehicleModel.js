import { query } from '../config/db.js';

// Get all vehicles with filtering, searching, sorting, and dynamic date availability
export const getAll = async (filters = {}) => {
  const {
    search,
    category,
    maxPrice,
    fuelType,
    transmission,
    seats,
    available,
    pickupDate,
    returnDate,
    sortBy
  } = filters;

  let sql = 'SELECT * FROM vehicles WHERE 1=1';
  const params = [];

  if (search) {
    sql += ' AND (name LIKE ? OR brand LIKE ? OR model LIKE ? OR description LIKE ?)';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  if (category && category !== 'all') {
    sql += ' AND LOWER(category) = LOWER(?)';
    params.push(category);
  }

  if (maxPrice) {
    sql += ' AND price_per_day <= ?';
    params.push(Number(maxPrice));
  }

  if (fuelType && fuelType !== 'all') {
    sql += ' AND LOWER(fuel_type) = LOWER(?)';
    params.push(fuelType);
  }

  if (transmission && transmission !== 'all') {
    sql += ' AND LOWER(transmission) = LOWER(?)';
    params.push(transmission);
  }

  if (seats && seats !== 'all') {
    sql += ' AND seats = ?';
    params.push(Number(seats));
  }

  // General fleet availability status check
  if (available !== undefined && available !== null && available !== '') {
    sql += ' AND available = ?';
    params.push(available === 'true' || available === true ? 1 : 0);
  }

  // Dynamic Date-Based Availability: Exclude vehicles booked for overlapping dates
  if (pickupDate && returnDate) {
    sql += ` AND id NOT IN (
      SELECT vehicle_id FROM bookings 
      WHERE booking_status NOT IN ('Cancelled')
        AND (pickup_date <= ? AND return_date >= ?)
    )`;
    params.push(returnDate, pickupDate);
  }

  // Sorting logic
  if (sortBy === 'price-low') {
    sql += ' ORDER BY price_per_day ASC';
  } else if (sortBy === 'price-high') {
    sql += ' ORDER BY price_per_day DESC';
  } else if (sortBy === 'newest') {
    sql += ' ORDER BY year DESC, id DESC';
  } else {
    sql += ' ORDER BY id DESC';
  }

  return await query(sql, params);
};

// Get single vehicle by ID
export const getById = async (id) => {
  const sql = 'SELECT * FROM vehicles WHERE id = ?';
  const results = await query(sql, [id]);
  return results[0] || null;
};

// Check if vehicle is dynamically available for specific dates
export const checkVehicleDateAvailability = async (vehicleId, pickupDate, returnDate) => {
  const sql = `
    SELECT COUNT(*) AS count FROM bookings
    WHERE vehicle_id = ?
      AND booking_status NOT IN ('Cancelled')
      AND (pickup_date <= ? AND return_date >= ?)
  `;
  const results = await query(sql, [vehicleId, returnDate, pickupDate]);
  return results[0].count === 0;
};

// Get vehicle by registration number (for duplicate check)
export const getByRegistration = async (registrationNumber) => {
  const sql = 'SELECT * FROM vehicles WHERE registration_number = ?';
  const results = await query(sql, [registrationNumber]);
  return results[0] || null;
};

// Create a new vehicle
export const create = async (vehicleData) => {
  const {
    name,
    brand,
    model,
    category,
    registration_number,
    year,
    price_per_day,
    fuel_type,
    transmission,
    seats,
    mileage = '15 kmpl',
    description = '',
    image,
    available = true
  } = vehicleData;

  const sql = `
    INSERT INTO vehicles 
    (name, brand, model, category, registration_number, year, price_per_day, fuel_type, transmission, seats, mileage, description, image, available) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    name,
    brand,
    model,
    category,
    registration_number,
    year,
    price_per_day,
    fuel_type,
    transmission,
    seats,
    mileage,
    description,
    image,
    available ? 1 : 0
  ];

  const result = await query(sql, params);
  return { id: result.insertId, ...vehicleData };
};

// Update an existing vehicle
export const update = async (id, vehicleData) => {
  const {
    name,
    brand,
    model,
    category,
    registration_number,
    year,
    price_per_day,
    fuel_type,
    transmission,
    seats,
    mileage,
    description,
    image,
    available
  } = vehicleData;

  const sql = `
    UPDATE vehicles 
    SET name = ?, brand = ?, model = ?, category = ?, registration_number = ?, year = ?, 
        price_per_day = ?, fuel_type = ?, transmission = ?, seats = ?, mileage = ?, 
        description = ?, image = ?, available = ?
    WHERE id = ?
  `;

  const params = [
    name,
    brand,
    model,
    category,
    registration_number,
    year,
    price_per_day,
    fuel_type,
    transmission,
    seats,
    mileage,
    description,
    image,
    available ? 1 : 0,
    id
  ];

  await query(sql, params);
  return await getById(id);
};

// Delete vehicle by ID
export const remove = async (id) => {
  const sql = 'DELETE FROM vehicles WHERE id = ?';
  const result = await query(sql, [id]);
  return result.affectedRows > 0;
};

export default {
  getAll,
  getById,
  checkVehicleDateAvailability,
  getByRegistration,
  create,
  update,
  remove
};
