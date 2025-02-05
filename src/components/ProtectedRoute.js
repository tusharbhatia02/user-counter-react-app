// ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  // Check if we're at the root path
  const isRootPath = location.pathname === '/';
  
  // If no token and trying to access any route (including root)
  if (!token) {
    // Store the attempted path to redirect back after login
    if (!isRootPath) {
      localStorage.setItem('redirectPath', location.pathname);
    }
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If we have a stored redirect path, clear it (used in Login component)
  localStorage.removeItem('redirectPath');
  
  return children;
}

export default ProtectedRoute;