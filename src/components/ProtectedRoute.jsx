import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  // Retrieve the session string from local storage
  const sessionString = localStorage.getItem('user');
  
  if (!sessionString) {
    // No active session found; redirect directly back to the login gateway
    return <Navigate to="/" replace />;
  }

  try {
    const user = JSON.parse(sessionString);

    // If a specific role is required to view this dashboard, verify it matches
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Role unauthorized; redirect safely back to login
      return <Navigate to="/" replace />;
    }

    // Session is valid and role is approved; render the requested layout
    return children;
  } catch (error) {
    // If local storage is corrupted or manipulated, clear it and force login
    localStorage.removeItem('user');
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;