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

        const tenantRoutes = {
            Dashboard: '/tenant/dashboard',
            'My profile': '/tenant/profile',
            Payments: '/tenant/payments',
            'My lease': '/tenant/lease',
            Documents: '/tenant/documents',
            Reports: '/tenant/reports'
        };

        const financeRoutes = {
            Dashboard: '/finance/dashboard',
            'My profile': '/finance/profile',
            'Billing & Payments': '/tenant/billings',
            Invoices: '/finance/invoices',
            'Rent Collections': '/finance/collections'
        };

        const routes = user?.role === 'finance'
            ? financeRoutes
            : tenantRoutes;

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
                    path="/tenant/reports"
                    element={
                    <AppLayout user={user}>
                        <Report />
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
                        <AppLayout user={user}>
                            <MyProfile user={user} />
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