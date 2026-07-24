import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
=======
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';

// Import your components
import ForgotPassword from "./components/ForgotPassword"; 
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/ChangePassword";
import Login from './components/Login';
//import TenantDashboard from './components/TenantDashboard'; // Correct path from your folder tree
import TenantFinanceDashboard from './finance/TenantFinanceDashboard';
import Payments from './finance/Payments';
import InvoiceList from './finance/InvoiceList';
import RentCollections from './finance/RentCollections';
>>>>>>> aae750f (made changes to ChangePasswor.jsx)


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


        {/* Fallback to Login if URL doesn't exist */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;