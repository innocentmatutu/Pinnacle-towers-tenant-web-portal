import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';

// Import your components
import Login from './components/Login';
import TenantFinanceDashboard from './finance/TenantFinanceDashboard'; // Renamed import
import Payments from './finance/Payments';
import InvoiceList from './finance/InvoiceList';
import RentCollections from './finance/RentCollections';

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  // Ensure 'user' is parsed safely
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
      case 'Property Manager': return [
        { path: '/manager/dashboard', label: 'Management Overview' },
        { path: '/manager/announcements', label: 'Broadcast Notice' },
        { path: '/manager/leases', label: 'Lease Management' },
        { path: '/manager/reports', label: 'System Reports' }
      ];
      case 'Finance Officer': return [
        { path: '/finance/dashboard', label: 'Financial Dashboard' },
        { path: '/finance/invoices', label: 'Invoices & Receipts' },
        { path: '/finance/collections', label: 'Rent Collections' }
      ];
      case 'Maintenance Officer': return [
        { path: '/maintenance/dashboard', label: 'Work Orders' },
        { path: '/maintenance/requests', label: 'Tenant Requests' }
      ];
      case 'Security Officer': return [
        { path: '/security/dashboard', label: 'Security Logs' },
        { path: '/security/visitors', label: 'Visitor Verification' }
      ];
      case 'System Administrator': return [
        { path: '/admin/dashboard', label: 'System Admin' },
        { path: '/admin/users', label: 'Manage User Roles' }
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
        {/* Updated route to use renamed component */}
        <Route path="/tenant/dashboard" element={<AppLayout><TenantFinanceDashboard /></AppLayout>} />
        <Route path="/tenant/payments" element={<AppLayout><Payments /></AppLayout>} />
        <Route path="/finance/invoices" element={<AppLayout><InvoiceList /></AppLayout>} />
        <Route path="/finance/collections" element={<AppLayout><RentCollections /></AppLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;