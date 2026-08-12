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

import MaintenanceRequests from './operations/MaintenanceRequests';
import Bookings from './booking/Bookings';
import ServiceRequests from './operations/ServiceRequests';
import Visitors from './visitors/Visitors';
import ComplaintsFeedback from './complaints/ComplaintsFeedback';

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
            'Service Requests': '/tenant/service-requests',
            Bookings: '/tenant/booking',
            Visitors: '/tenant/visitors',
            Messages: '/tenant/messages',
            Announcements: '/tenant/announcements',
           'Complaints & Feedback': '/tenant/complaints'
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

                <Route
                    path="/tenant/maintenance"
                    element={
                        <AppLayout user={user}>
                            <MaintenanceRequests />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/booking"
                    element={
                        <AppLayout user={user}>
                            <Bookings />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/service-requests"
                    element={
                        <AppLayout user={user}>
                            <ServiceRequests />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/visitors"
                    element={
                        <AppLayout user={user}>
                            <Visitors />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/complaints"
                    element={
                        <AppLayout user={user}>
                            <ComplaintsFeedback />
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