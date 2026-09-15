import api from './api';

export const getMyPayments = async () => {
  const response = await api.get('/payments/my');
  return response.data;
};

export const getPaymentById = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};

export const validatePaymentByTxnId = async (txnId) => {
  const response = await api.get(`/payments/verify/${encodeURIComponent(txnId)}`);
  return response.data;
};

export const getAllPaymentsAdmin = async () => {
  const response = await api.get('/payments');
  return response.data;
};

export const updatePaymentStatusAdmin = async (id, paymentStatus) => {
  const response = await api.put(`/payments/${id}/status`, { payment_status: paymentStatus });
  return response.data;
};

export default {
  getMyPayments,
  getPaymentById,
  validatePaymentByTxnId,
  getAllPaymentsAdmin,
  updatePaymentStatusAdmin
};
