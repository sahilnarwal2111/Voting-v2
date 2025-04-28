import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Add this function to set/remove token dynamically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// 🔁 Token might already be in localStorage on load
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}


// Add token to headers if it exists in localStorage
if (localStorage.token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
}

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;

    // Handle specific error cases
    if (response && response.status === 401) {
      // Unauthorized - clear token
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }

    return Promise.reject(error);
  }
);

export default api;