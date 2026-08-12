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
import Billings from './Billings';
import Documents from './components/records/documents';
import Report from './components/records/report';
import CarDashboard from './modules/cars/CarDashboard';
import VisitorDashboard from './modules/visitors/VisitorsDashboard';
import ParkingDashboard from './modules/parking/ParkingDashboard';
import Announcements from './modules/announcements/Announcements';
import Support from './modules/support/Support';

import MaintenanceRequests from './operations/MaintenanceRequests';
import Bookings from './booking/Bookings';
import ServiceRequests from './operations/ServiceRequests';
import Visitors from './visitors/Visitors';
import ComplaintsFeedback from './complaints/ComplaintsFeedback';

const AppLayout = ({ children, user, setUser }) => {
    const navigate = useNavigate();



    const [active, setActive] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarCompact, setSidebarCompact] = useState(false);

    if (!user.role) {
        return <Navigate to="/" replace />;
    }

    const selectNav = (label) => {
        setActive(label);

        const tenantRoutes = {
            Dashboard: '/tenant/dashboard',
            'My profile': '/tenant/profile',
            Payments: '/tenant/payments',
            Maintenance: '/tenant/maintenance',
            'Service Requests': '/tenant/service-requests',
            Bookings: '/tenant/booking',
            Visitors: '/tenant/visitors',
            Messages: '/tenant/messages',
            Announcements: '/tenant/announcements',
            'Complaints & Feedback': '/tenant/complaints'
            };

        const financeRoutes = {
            Dashboard: '/finance/dashboard',
            'My profile': '/finance/profile',
            'Billing & Payments': '/tenant/billings',
            Invoices: '/finance/invoices',
            'Rent Collections': '/finance/collections'
        };

        const managerRoutes = {
            Dashboard: '/manager/dashboard',
            'My profile': '/manager/profile',
            Tenants: '/manager/tenants',
            'Properties & Units': '/manager/properties',
            Maintenance: '/manager/maintenance',
            Bookings: '/manager/bookings',
            Visitors: '/manager/visitors',
            Documents: '/manager/documents',
            Reports: '/manager/reports'
        };

        const maintenanceRoutes = {
            Dashboard: '/maintenance/dashboard',
            'My profile': '/maintenance/profile',
            Maintenance: '/maintenance/requests',
            'Work Orders': '/maintenance/work-orders',
            Documents: '/maintenance/documents',
            Reports: '/maintenance/reports'
        };

        const adminRoutes = {
            Dashboard: '/admin/dashboard',
            'My profile': '/admin/profile',
            'User Management': '/admin/users',
            'Roles & Permissions': '/admin/roles',
            'System Settings': '/admin/settings',
            Reports: '/admin/reports',
            'Audit Logs': '/admin/audit-logs'
        };

        let routes;

        switch (user?.role) {
            case 'finance':
                routes = financeRoutes;
                break;

            case 'manager':
                routes = managerRoutes;
                break;

            case 'maintenance':
                routes = maintenanceRoutes;
                break;

            case 'admin':
                routes = adminRoutes;
                break;

            case 'tenant':
                routes = tenantRoutes;
                break;
            default:
                return;
        }

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
                    user={user}
                />

                <main className="page-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

const RoleDashboard = ({ title, description }) => {
    return (
        <div className="card">
            <h1>{title}</h1>
            <p>{description}</p>
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
                        <AppLayout user={user} setUser={setUser}>
                            <MyProfile
                                user={user}
                                setUser={setUser}
                            />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/cars"
                    element={
                        <AppLayout user={user}>
                            <CarDashboard user={user} />
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
                    path="/tenant/lease"
                    element={
                        <AppLayout user={user}>
                            <div>
                                <h2>My Lease</h2>
                                <p>Your lease information will appear here.</p>
                            </div>
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
                    path="/tenant/lease"
                    element={
                        <AppLayout user={user}>
                            <div>
                                <h2>My Lease</h2>
                                <p>Your lease information will appear here.</p>
                            </div>
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
                            <VisitorDashboard user={user} />
                        </AppLayout>
                    }
                />

                                <Route
                    path="/tenant/parking"
                    element={
                        <AppLayout user={user}>
                            <ParkingDashboard user={user} />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/billings"
                    element={
                        <AppLayout user={user}>
                            <Billings />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/reports"
                    element={
                        <AppLayout user={user}>
                            <Report />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/announcements"
                    element={
                        <AppLayout user={user}>
                            <Announcements />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/support"
                    element={
                        <AppLayout user={user}>
                            <Support />
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
                    path="/finance/profile"
                    element={
                        <AppLayout user={user} setUser={setUser}>
                            <MyProfile
                                user={user}
                                setUser={setUser}
                            />
                        </AppLayout>
                    }
                />

                <Route
                    path="/finance/invoices"
                    element={
                        <AppLayout user={user}>
                            <InvoiceList />
                        </AppLayout>
                    }
                />

                <Route
                    path="/finance/collections"
                    element={
                        <AppLayout user={user}>
                            <RentCollections />
                        </AppLayout>
                    }
                />

                {/* PROPERTY MANAGER ROUTES */}

                <Route
                    path="/manager/dashboard"
                    element={
                        <AppLayout user={user}>
                            <RoleDashboard
                                title="Property Manager Dashboard"
                                description="Property management overview will appear here."
                            />
                        </AppLayout>
                    }
                />

                <Route
                    path="/manager/profile"
                    element={
                        <AppLayout user={user} setUser={setUser}>
                            <MyProfile
                                user={user}
                                setUser={setUser}
                            />
                        </AppLayout>
                    }
                />


                {/* MAINTENANCE OFFICER ROUTES */}

                <Route
                    path="/maintenance/dashboard"
                    element={
                        <AppLayout user={user}>
                            <RoleDashboard
                                title="Maintenance Dashboard"
                                description="Maintenance requests and work orders will appear here."
                            />
                        </AppLayout>
                    }
                />

                <Route
                    path="/maintenance/profile"
                    element={
                        <AppLayout user={user} setUser={setUser}>
                            <MyProfile user={user} setUser={setUser} />
                        </AppLayout>
                    }
                />


                {/* SYSTEM ADMINISTRATOR ROUTES */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <AppLayout user={user}>
                            <RoleDashboard
                                title="System Administrator Dashboard"
                                description="System administration controls will appear here."
                            />
                        </AppLayout>
                    }
                />

                <Route
                    path="/admin/profile"
                    element={
                        <AppLayout user={user} setUser={setUser}>
                            <MyProfile
                                user={user}
                                setUser={setUser}
                            />
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
