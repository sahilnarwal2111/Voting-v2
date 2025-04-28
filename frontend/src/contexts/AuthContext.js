import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // If there's a token, set the auth header and fetch user data
    if (token) {
      // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
      console.log("Token present in context:", token);

      setAuthToken(token);
    } else {
      setIsLoading(false);
    }
  }, [token]);

  // Load user data from token
  const loadUser = async () => {
    try {
      const res = await api.get('/api/auth/me');
      setCurrentUser(res.data.data);
      setIsAuthenticated(true);
      setIsLoading(false);
      console.log("Here")
    } catch (err) {
      console.error('Error loading user:', err);
      // Clear token on error
      localStorage.removeItem('token');
      setAuthToken(null);
      setToken(null);
      setCurrentUser(null);
      setIsAuthenticated(false);
      delete api.defaults.headers.common['Authorization'];
      setIsLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      const res = await api.post('/api/auth/register', userData);
      
      // Set token in local storage
      // localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setAuthToken(res.data.token);
      
      // Load user data
      await loadUser();
      
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      setIsLoading(true); // 🔑 show loader while loading user
      const res = await api.post('/api/auth/login', userData);
      
      // Set token in local storage
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setAuthToken(res.data.token);
      console.log("Here")
      // Load user data
      await loadUser();
      
      
      return res.data;
    } catch (err) {
      setIsAuthenticated(false);
      setIsLoading(false);
      throw err.response.data;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api.get('/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    
    // Clear token and user data
    // localStorage.removeItem('token');
    setAuthToken(null);
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};