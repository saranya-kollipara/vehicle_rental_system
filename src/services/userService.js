import api from './api';

export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get('/users/bookings');
  return response.data;
};

export const getAllUsersAdmin = async () => {
  const response = await api.get('/users/admin/all');
  return response.data;
};

export const getUserDetailsAdmin = async (id) => {
  const response = await api.get(`/users/admin/${id}`);
  return response.data;
};

export const updateUserStatusAdmin = async (id, status) => {
  const response = await api.put(`/users/admin/${id}/status`, { status });
  return response.data;
};

export default {
  getProfile,
  updateProfile,
  getUserBookings,
  getAllUsersAdmin,
  getUserDetailsAdmin,
  updateUserStatusAdmin
};
