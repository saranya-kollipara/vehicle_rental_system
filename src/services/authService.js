import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('driveease_token', response.data.token);
    localStorage.setItem('driveease_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('driveease_token', response.data.token);
    localStorage.setItem('driveease_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('driveease_token');
  localStorage.removeItem('driveease_user');
};

export default {
  login,
  register,
  getMe,
  logout
};
