import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const { userInfo } = useAuth(); // Get the logged-in user's info

  // 'Outlet' is a placeholder for the real admin page (e.g., AdminProductList)
  // 'Navigate' is how we redirect
  
  // 1. Check if user info exists
  if (!userInfo) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  // 2. Check if they are an admin
  if (userInfo.isAdmin) {
    // They are logged in AND an admin, so show the page
    return <Outlet />;
  } else {
    // They are logged in but NOT an admin
    return <Navigate to="/" replace />;
  }
}

export default AdminRoute;