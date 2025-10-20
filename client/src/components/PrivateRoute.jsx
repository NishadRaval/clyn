import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const { userInfo } = useAuth(); // Get the logged-in user's info

  // If user is logged in, show the child page (Outlet)
  // Otherwise, redirect them to the login page
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;