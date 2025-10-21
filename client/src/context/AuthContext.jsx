import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './apiConfig'; // <-- IMPORT

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    } catch (error) {
      console.error('Failed to parse userInfo from localStorage', error);
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      // --- THIS LINE IS UPDATED ---
      const { data } = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password }
      );
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      // --- THIS LINE IS UPDATED ---
      const { data } = await axios.post(
        `${API_URL}/api/users/register`,
        { name, email, password }
      );
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Register failed:', error);
      alert(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  const value = {
    userInfo,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};