import api from './api';

export const getAllFeedback = async () => {
  const response = await api.get('/feedback');
  return response.data;
};

export const getVehicleFeedback = async (vehicleId) => {
  const response = await api.get(`/feedback/vehicle/${vehicleId}`);
  return response.data;
};

export const createFeedback = async (feedbackData) => {
  const response = await api.post('/feedback', feedbackData);
  return response.data;
};

export const deleteFeedback = async (id) => {
  const response = await api.delete(`/feedback/${id}`);
  return response.data;
};

export const getAllFeedbackAdmin = async () => {
  const response = await api.get('/feedback/admin/all');
  return response.data;
};

export const updateFeedbackStatusAdmin = async (id, status) => {
  const response = await api.put(`/feedback/admin/${id}/status`, { status });
  return response.data;
};

export default {
  getAllFeedback,
  getVehicleFeedback,
  createFeedback,
  deleteFeedback,
  getAllFeedbackAdmin,
  updateFeedbackStatusAdmin
};
