import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';

// Import your components
import Login from './components/Login';
import TenantDashboard from './components/TenantDashboard'; // Correct path from your folder tree
import TenantFinanceDashboard from './finance/TenantFinanceDashboard';
import Payments from './finance/Payments';
import InvoiceList from './finance/InvoiceList';
import RentCollections from './finance/RentCollections';

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.role) return <Navigate to="/" replace />;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getMenuItems = () => {
    switch (user.role) {
      case 'Tenant': return [
        { path: '/tenant/dashboard', label: 'Dashboard' },
        { path: '/tenant/payments', label: 'Rent & Payments' },
        { path: '/tenant/maintenance', label: 'Maintenance Requests' },
        { path: '/tenant/booking', label: 'Facility Booking' },
        { path: '/tenant/visitors', label: 'Visitor Management' }
      ];
      // ... (other roles remain the same)
      case 'Finance Officer': return [
        { path: '/finance/dashboard', label: 'Financial Dashboard' },
        { path: '/finance/invoices', label: 'Invoices & Receipts' },
        { path: '/finance/collections', label: 'Rent Collections' }
      ];
      default: return [];
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: 'var(--sidebar-width)', background: 'var(--pinnacle-crimson)', color: 'white', minHeight: '100vh', padding: 'var(--spacing-md)' }}>
        <div style={{ color: 'var(--pinnacle-gold)', fontSize: '1.5rem', marginBottom: '2rem' }}>Pinnacle Towers</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {getMenuItems().map(item => (
            <Link key={item.path} to={item.path} style={{ color: 'white', textDecoration: 'none' }}>{item.label}</Link>
          ))}
        </nav>
        <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid white', color: 'white', padding: '10px', cursor: 'pointer' }}>
          Sign Out
        </button>
      </aside>
      <main style={{ flex: 1, padding: '20px' }}>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Tenant Routes */}
        {/* Using your custom TenantDashboard component without the AppLayout wrapper */}
        <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        <Route path="/tenant/payments" element={<AppLayout><Payments /></AppLayout>} />
        
        {/* Finance Officer Routes */}
        <Route path="/finance/dashboard" element={<AppLayout><TenantFinanceDashboard /></AppLayout>} />
        <Route path="/finance/invoices" element={<AppLayout><InvoiceList /></AppLayout>} />
        <Route path="/finance/collections" element={<AppLayout><RentCollections /></AppLayout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;