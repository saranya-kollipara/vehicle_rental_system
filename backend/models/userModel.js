import { query } from '../config/db.js';

// Get user by email
export const getUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE LOWER(email) = LOWER(?)';
  const results = await query(sql, [email]);
  return results[0] || null;
};

// Get user by ID (excluding password by default)
export const getUserById = async (id) => {
  const sql = 'SELECT id, name, email, phone, role, status, created_at, updated_at FROM users WHERE id = ?';
  const results = await query(sql, [id]);
  return results[0] || null;
};

// Create a new user
export const createUser = async (userData) => {
  const { name, email, phone, password, role = 'user', status = 'active' } = userData;

  const sql = `
    INSERT INTO users (name, email, phone, password, role, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const result = await query(sql, [name, email.toLowerCase(), phone, password, role, status]);
  return await getUserById(result.insertId);
};

// Get all users (for admin)
export const getAllUsers = async () => {
  const sql = 'SELECT id, name, email, phone, role, status, created_at FROM users ORDER BY id DESC';
  return await query(sql);
};

// Update user profile
export const updateProfile = async (id, profileData) => {
  const { name, phone } = profileData;
  const sql = 'UPDATE users SET name = ?, phone = ? WHERE id = ?';
  await query(sql, [name, phone, id]);
  return await getUserById(id);
};

// Update user status (for admin)
export const updateStatus = async (id, status) => {
  const sql = 'UPDATE users SET status = ? WHERE id = ?';
  await query(sql, [status, id]);
  return await getUserById(id);
};

export default {
  getUserByEmail,
  getUserById,
  createUser,
  getAllUsers,
  updateProfile,
  updateStatus
};
