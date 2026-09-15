import { query } from '../config/db.js';

// Create feedback
export const create = async (feedbackData) => {
  const { user_id, vehicle_id, rating, comment, status = 'Visible' } = feedbackData;
  const sql = `
    INSERT INTO feedback (user_id, vehicle_id, rating, comment, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await query(sql, [user_id, vehicle_id, rating, comment, status]);
  return await getById(result.insertId);
};

// Get feedback by ID
export const getById = async (id) => {
  const sql = `
    SELECT f.*, u.name AS user_name, u.email AS user_email, v.name AS vehicle_name
    FROM feedback f
    JOIN users u ON f.user_id = u.id
    JOIN vehicles v ON f.vehicle_id = v.id
    WHERE f.id = ?
  `;
  const results = await query(sql, [id]);
  return results[0] || null;
};

// Get visible feedback for a vehicle
export const getByVehicleId = async (vehicleId) => {
  const sql = `
    SELECT f.*, u.name AS user_name
    FROM feedback f
    JOIN users u ON f.user_id = u.id
    WHERE f.vehicle_id = ? AND f.status = 'Visible'
    ORDER BY f.created_at DESC
  `;
  return await query(sql, [vehicleId]);
};

// Get all feedback (Admin can view all, Public can view visible)
export const getAll = async (onlyVisible = false) => {
  let sql = `
    SELECT f.*, u.name AS user_name, u.email AS user_email, v.name AS vehicle_name, v.brand AS vehicle_brand
    FROM feedback f
    JOIN users u ON f.user_id = u.id
    JOIN vehicles v ON f.vehicle_id = v.id
  `;
  if (onlyVisible) {
    sql += " WHERE f.status = 'Visible'";
  }
  sql += ' ORDER BY f.created_at DESC';
  return await query(sql);
};

// Update status (Visible / Hidden)
export const updateStatus = async (id, status) => {
  const sql = 'UPDATE feedback SET status = ? WHERE id = ?';
  await query(sql, [status, id]);
  return await getById(id);
};

// Delete feedback
export const remove = async (id) => {
  const sql = 'DELETE FROM feedback WHERE id = ?';
  const result = await query(sql, [id]);
  return result.affectedRows > 0;
};

export default {
  create,
  getById,
  getByVehicleId,
  getAll,
  updateStatus,
  remove
};
