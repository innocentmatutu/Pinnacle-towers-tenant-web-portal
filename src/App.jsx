import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import TenantDashboard from './components/TenantDashboard'; // 1. Import our fresh layout

const ChangePassword = ResetPassword;

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Authentication Gateways */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Protected Dashboard Routes - Securely guarded */}
        <Route 
          path="/tenant/dashboard" 
          element = {
            <ProtectedRoute allowedRoles={['tenant']}>
              <TenantDashboard /> {/* 2. Render the official component here */}
            </ProtectedRoute>
          } 
        />

        {/* Fallback to Login if URL doesn't exist */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;