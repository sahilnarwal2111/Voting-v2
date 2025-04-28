import axios from 'axios';

const API_URL = '/api/auth'; // Base URL for authentication endpoints

// Login user
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Save token to localStorage
  }
  return response.data;
};

// Register user
export const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Save token to localStorage
  }
  return response.data;
};

// Get current user
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token'); // Remove token from localStorage
};

export default {
  login,
  register,
  getCurrentUser,
  logout,
};