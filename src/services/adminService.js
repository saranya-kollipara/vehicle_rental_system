import api from './api';

export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const getBookingReports = async () => {
  const response = await api.get('/admin/reports/bookings');
  return response.data;
};

export const getRevenueReports = async () => {
  const response = await api.get('/admin/reports/revenue');
  return response.data;
};

export const getVehicleReports = async () => {
  const response = await api.get('/admin/reports/vehicles');
  return response.data;
};

export default {
  getDashboardStats,
  getBookingReports,
  getRevenueReports,
  getVehicleReports
};
