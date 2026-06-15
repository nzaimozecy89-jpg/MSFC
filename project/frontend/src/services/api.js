import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const auth = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password, confirmPassword) => 
    api.post('/auth/register', { email, password, confirmPassword }),
  verify: () => api.get('/auth/verify'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }
};

// Team endpoints
export const team = {
  getAll: (filters = {}) => api.get('/team', { params: filters }),
  getById: (id) => api.get(`/team/${id}`),
  create: (data) => api.post('/team', data),
  update: (id, data) => api.put(`/team/${id}`, data),
  delete: (id) => api.delete(`/team/${id}`),
};

// News endpoints
export const news = {
  getAll: (filters = {}) => api.get('/news', { params: filters }),
  getById: (id) => api.get(`/news/${id}`),
  create: (data) => api.post('/news', data),
  update: (id, data) => api.put(`/news/${id}`, data),
  delete: (id) => api.delete(`/news/${id}`),
};

// Fixtures endpoints
export const fixtures = {
  getAll: (filters = {}) => api.get('/fixtures', { params: filters }),
  getById: (id) => api.get(`/fixtures/${id}`),
  create: (data) => api.post('/fixtures', data),
  update: (id, data) => api.put(`/fixtures/${id}`, data),
  delete: (id) => api.delete(`/fixtures/${id}`),
};

// Admin endpoints
export const admin = {
  getProfile: () => api.get('/admin/profile'),
  changePassword: (currentPassword, newPassword, confirmPassword) =>
    api.put('/admin/password', { currentPassword, newPassword, confirmPassword }),
  getStats: () => api.get('/admin/stats'),
};

export default api;
