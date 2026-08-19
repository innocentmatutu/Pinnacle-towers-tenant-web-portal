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
import Messages from './components/Messages';
import Announcements from './components/Announcements';
import MaintenanceRequests from './operations/MaintenanceRequests';
import ServiceRequests from './operations/ServiceRequests';
import WorkOrders from './operations/WorkOrders';
import ComplaintsFeedback from './complaints/ComplaintsFeedback';
import MyLease from './modules/lease/MyLease';
import ManagerDashboard from './dashboard/ManagerDashboard';
import MaintenanceDashboard from './dashboard/MaintenanceDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import Bookings from './Booking/Bookings';
import Visitors from './Visitors/Visitors';
import UserManagement from './admin/UserManagement';
import RolesPermissions from './admin/RolesPermissions';
import ProtectedRoute from './components/ProtectedRoute';
import SystemSettings from './admin/SystemSettings';
import AuditLogs from './admin/AuditLogs';


const AppLayout = ({ children, user, setUser }) => {
    const navigate = useNavigate();

    const systemSettings = (() => {
        try {
            return JSON.parse(
                localStorage.getItem('admin_system_settings') || '{}'
            );
        } catch {
            return {};
        }
    })();

    const maintenanceMode =
        systemSettings?.portal?.maintenanceMode === true;

    const [active, setActive] = useState('Dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarCompact, setSidebarCompact] = useState(false);

    if (!user.role) {
        return <Navigate to="/" replace />;
    }

        if (
        maintenanceMode &&
        user.role?.toLowerCase() !== 'admin'
    ) {
        return (
            <div className="maintenance-screen">
                <div className="maintenance-card">
                    <div className="maintenance-icon">
                        🔧
                    </div>

                    <h1>System Maintenance</h1>

                    <p>
                        The Pinnacle Towers Tenant Portal is
                        temporarily unavailable while maintenance
                        is being performed.
                    </p>

                    <p>
                        Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    const selectNav = (label) => {
        setActive(label);

        const tenantRoutes = {
            Dashboard: '/tenant/dashboard',
            'My profile': '/tenant/profile',
            Payments: '/tenant/payments',
            Maintenance: '/tenant/maintenance',
            'Service Requests': '/tenant/service-requests',
            'My lease': '/tenant/lease',
            Documents: '/tenant/documents',
            //Reports: '/tenant/reports',
            Messages: '/tenant/messages',
            Announcements: '/tenant/announcements',
            'Complaints & Feedback': '/tenant/complaints',
            Bookings: '/tenant/bookings',
            Visitors: '/tenant/visitors'
        };

        const financeRoutes = {
            Dashboard: '/finance/dashboard',
            'My profile': '/finance/profile',
            'Billing & Payments': '/tenant/billings',
            Invoices: '/finance/invoices',
            'Rent Collections': '/finance/collections',
            Messages: '/finance/messages',
            Announcements: '/finance/announcements'
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
            Reports: '/manager/reports',
            Messages: '/manager/messages',
            Announcements: '/manager/announcements'
        };

        const maintenanceRoutes = {
            Dashboard: '/maintenance/dashboard',
            'My profile': '/maintenance/profile',
            Maintenance: '/maintenance/requests',
            'Work Orders': '/maintenance/work-orders',
            Documents: '/maintenance/documents',
            Reports: '/maintenance/reports',
            Messages: '/maintenance/messages',
            Announcements: '/maintenance/announcements'
        };

        const adminRoutes = {
            Dashboard: '/admin/dashboard',
            'My profile': '/admin/profile',
            'User Management': '/admin/users',
            'Roles & Permissions': '/admin/roles',
            'System Settings': '/admin/settings',
            Reports: '/admin/reports',
            'Audit Logs': '/admin/audit-logs',
            Messages: '/admin/messages',
            Announcements: '/admin/announcements'
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
                    {React.isValidElement(children)
                        ? React.cloneElement(children, { selectNav })
                        : children}
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
                            <TenantDashboard 
                                user={user}
                                //selectNav={selectNav}
                            />
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
                        <MyLease />
                    </AppLayout>
                    }
                />

                <Route
                    path="/tenant/documents"
                    element={
                    <AppLayout user={user}>
                        <Documents />
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
                    path="/tenant/messages"
                    element={
                        <AppLayout user={user}>
                            <Messages user={user} />
                        </AppLayout>
                    }
                />

                <Route
                    path="/tenant/announcements"
                    element={
                        <AppLayout user={user}>
                            <Announcements user={user} />
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

                <Route
                    path="/tenant/bookings"
                    element={
                        <AppLayout user={user}>
                            <Bookings />
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

                <Route
                    path="/finance/messages"
                    element={
                        <AppLayout user={user}>
                            <Messages user={user} />
                        </AppLayout>
                    }
                />

                <Route
                    path="/finance/announcements"
                    element={
                        <AppLayout user={user}>
                            <Announcements user={user} />
                        </AppLayout>
                    }
                />

                {/* PROPERTY MANAGER ROUTES */}

                <Route
                    path="/manager/dashboard"
                    element={
                        <AppLayout user={user}>
                           <ManagerDashboard user={user} />
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

                <Route
                    path="/manager/maintenance"
                    element={
                        <AppLayout user={user}>
                            <MaintenanceRequests />
                        </AppLayout>
                    }
                />

                

                <Route
                    path="/manager/bookings"
                    element={
                        <AppLayout user={user}>
                            <Bookings />
                        </AppLayout>
                    }
                />

                <Route
                    path="/manager/visitors"
                    element={
                        <AppLayout user={user}>
                            <Visitors />
                        </AppLayout>
                    }
                />

                <Route
                    path="/manager/documents"
                    element={
                        <AppLayout user={user}>
                            <Documents />
                        </AppLayout>
                    }
                />

                <Route
                    path="/manager/reports"
                    element={
                        <AppLayout user={user}>
                            <Report />
                        </AppLayout>
                    }
                />

                <Route
                    path="/manager/messages"
                    element={
                        <AppLayout user={user}>
                            <Messages user={user} />
                        </AppLayout>
                    }
                />

                <Route
                    path="/manager/announcements"
                    element={
                        <AppLayout user={user}>
                            <Announcements user={user} />
                        </AppLayout>
                    }
                />


                {/* MAINTENANCE OFFICER ROUTES */}

                <Route
                    path="/maintenance/dashboard"
                    element={
                        <AppLayout user={user}>
                            <MaintenanceDashboard user={user} />
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

                <Route
                    path="/maintenance/requests"
                    element={
                        <AppLayout user={user}>
                            <MaintenanceRequests />
                        </AppLayout>
                    }
                />

                <Route
                    path="/maintenance/work-orders"
                    element={
                        <AppLayout user={user}>
                            <WorkOrders />
                        </AppLayout>
                    }
                />

                <Route
                    path="/maintenance/documents"
                    element={
                        <AppLayout user={user}>
                            <Documents />
                        </AppLayout>
                    }
                />

                <Route
                    path="/maintenance/reports"
                    element={
                        <AppLayout user={user}>
                            <Report />
                        </AppLayout>
                    }
                />

                <Route
                    path="/maintenance/messages"
                    element={
                        <AppLayout user={user}>
                            <Messages user={user} />
                        </AppLayout>
                    }
                />

                <Route
                    path="/maintenance/announcements"
                    element={
                        <AppLayout user={user}>
                            <Announcements user={user} />
                        </AppLayout>
                    }
                />


                {/* SYSTEM ADMINISTRATOR ROUTES */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <AppLayout user={user}>
                            <AdminDashboard user={user} />
                        </AppLayout>
                    }
                />

                <Route
                    path="/admin/reports"
                    element={
                        <AppLayout user={user}>
                            <Report />
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

                

                <Route
                    path="/admin/messages"
                    element={
                        <AppLayout user={user}>
                            <Messages user={user} />
                        </AppLayout>
                    }
                />

                <Route
                    path="/admin/announcements"
                    element={
                        <AppLayout user={user}>
                            <Announcements user={user} />
                        </AppLayout>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute
                            allowedRoles={['admin']}
                            permission="Users"
                        >
                            <AppLayout user={user}>
                                <UserManagement />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/roles"
                    element={
                        <ProtectedRoute
                            allowedRoles={['admin']}
                            permission="Roles & Permissions"
                        >
                            <AppLayout user={user}>
                                <RolesPermissions />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute
                            allowedRoles={['admin']}
                            permission="System Settings"
                        >
                            <AppLayout user={user}>
                                <SystemSettings />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/audit-logs"
                    element={
                        <ProtectedRoute
                            allowedRoles={['admin']}
                            permission="Audit Logs"
                        >
                            <AppLayout user={user}>
                                <AuditLogs />
                            </AppLayout>
                        </ProtectedRoute>
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
