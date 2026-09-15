import api from './api';

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get('/bookings/my');
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const payBooking = async (id, paymentData = {}) => {
  const response = await api.put(`/bookings/${id}/pay`, paymentData);
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.put(`/bookings/${id}/cancel`);
  return response.data;
};

export const getAllBookingsAdmin = async () => {
  const response = await api.get('/bookings/admin/all');
  return response.data;
};

export const updateBookingStatusAdmin = async (id, statusData) => {
  const response = await api.put(`/bookings/admin/${id}/status`, statusData);
  return response.data;
};

export default {
  createBooking,
  payBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookingsAdmin,
  updateBookingStatusAdmin
};
