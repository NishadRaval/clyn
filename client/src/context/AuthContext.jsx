import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the Provider
export const AuthProvider = ({ children }) => {
  // 4. Get user info from localStorage, if it exists
  // This keeps the user logged in even if they refresh the page
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    } catch (error) {
      console.error('Failed to parse userInfo from localStorage', error);
      return null;
    }
  });

  // 5. LOGIN function
  const login = async (email, password) => {
    try {
      // Call our backend login API
      const { data } = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password }
      );
      
      // Save user info in state
      setUserInfo(data);
      // Save user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      return true; // Return success
    } catch (error) {
      console.error('Login failed:', error);
      // We'll show this error to the user in the next step
      alert(error.response?.data?.message || 'Login failed');
      return false; // Return failure
    }
  };

  // 6. REGISTER function (very similar)
  const register = async (name, email, password) => {
    try {
      // Call our backend register API
      const { data } = await axios.post(
        'http://localhost:5000/api/users/register',
        { name, email, password }
      );
      
      // Save info in state
      setUserInfo(data);
      // Save info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      return true; // Return success
    } catch (error) {
      console.error('Register failed:', error);
      alert(error.response?.data?.message || 'Registration failed');
      return false; // Return failure
    }
  };

  // 7. LOGOUT function
  const logout = () => {
    // Clear from state
    setUserInfo(null);
    // Clear from localStorage
    localStorage.removeItem('userInfo');
  };

  // 8. The 'value' we pass down
  const value = {
    userInfo,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};