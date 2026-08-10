import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate
} from 'react-router-dom';

import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import MyProfile from './components/MyProfile';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import TenantDashboard from './dashboard/TenantDashboard';
import TenantFinanceDashboard from './finance/TenantFinanceDashboard';
import Payments from './finance/Payments';
import InvoiceList from './finance/InvoiceList';
import RentCollections from './finance/RentCollections';


const AppLayout = ({ children, user }) => {
    const navigate = useNavigate();

    

    const [active, setActive] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarCompact, setSidebarCompact] = useState(false);

    if (!user.role) {
        return <Navigate to="/" replace />;
    }

    const selectNav = (label) => {
        setActive(label);

        const routes = {
            Dashboard: '/tenant/dashboard',
            'My profile': '/tenant/profile',
            'My lease': '/tenant/lease',
            Payments: '/tenant/payments',
            Maintenance: '/tenant/maintenance',
            Bookings: '/tenant/booking',
            Visitors: '/tenant/visitors',
            Documents: '/tenant/documents',
            Messages: '/tenant/messages',
            Announcements: '/tenant/announcements'
        };

        if (routes[label]) {
            navigate(routes[label]);
        }

        setMenuOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarCompact((prev) => !prev);
    };

    return (
        <div
            className={`app-shell ${
                sidebarCompact ? 'sidebar-compact' : ''
            }`}
        >
            <Sidebar
                active={active}
                selectNav={selectNav}
                menuOpen={menuOpen}
                sidebarCompact={sidebarCompact}
                toggleSidebar={toggleSidebar}
                user={user}
            />

            <div className="main-shell">
                <Topbar
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    selectNav={selectNav}
                />

                <main className="page-content">
                    {children}
                </main>
            </div>
        </div>
    );
};


function App() {
    const [user, setUser] = useState(() => {
        return JSON.parse(
            localStorage.getItem('user') || '{}'
        );
    });
    return (
        <Router>
            <Routes>

                {/* AUTHENTICATION ROUTES */}

                <Route
                    path="/"
                    element={<Login setUser={setUser} />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                <Route
                    path="/change-password"
                    element={<ChangePassword />}
                />


                {/* TENANT ROUTES */}

                <Route
                    path="/tenant/dashboard"
                    element={
                        <AppLayout user={user}>
                            <TenantDashboard user={user}/>
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/profile"
                    element={
                        <AppLayout user={user}>
                            <MyProfile user={user} />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/payments"
                    element={
                        <AppLayout user={user}>
                            <Payments />
                        </AppLayout>
                    }
                />


                {/* FINANCE OFFICER ROUTES */}

                <Route
                    path="/finance/dashboard"
                    element={
                        <AppLayout user={user}>
                            <TenantFinanceDashboard />
                        </AppLayout>
                    }
                />

                <Route
                    path="/finance/invoices"
                    element={
                        <AppLayout>
                            <InvoiceList />
                        </AppLayout>
                    }
                />

                <Route
                    path="/finance/collections"
                    element={
                        <AppLayout>
                            <RentCollections />
                        </AppLayout>
                    }
                />


                {/* FALLBACK */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
        </Router>
    );
}

export default App;