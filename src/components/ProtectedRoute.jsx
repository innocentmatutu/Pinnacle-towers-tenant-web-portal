import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PERMISSIONS_KEY = 'admin_role_permissions';
const SETTINGS_KEY = 'admin_system_settings';

function ProtectedRoute({
    children,
    allowedRoles,
    permission,
}) {
    const [sessionExpired, setSessionExpired] = useState(false);

    /*
     * Check whether the current session has expired.
     */
    useEffect(() => {
        const checkSessionTimeout = () => {
            const sessionString = localStorage.getItem('user');

            if (!sessionString) {
                setSessionExpired(true);
                return;
            }

            try {
                const user = JSON.parse(sessionString);

                if (!user.authenticated) {
                    setSessionExpired(true);
                    return;
                }

                /*
                 * Get system settings.
                 */
                const settingsString =
                    localStorage.getItem(SETTINGS_KEY);

                let sessionTimeout = 30;

                if (settingsString) {
                    try {
                        const settings =
                            JSON.parse(settingsString);

                        sessionTimeout =
                            Number(
                                settings?.security
                                    ?.sessionTimeout
                            ) || 30;
                    } catch {
                        sessionTimeout = 30;
                    }
                }

                /*
                 * loginTime is stored by Login.jsx.
                 */
                const loginTime = Number(user.loginTime);

                if (!loginTime) {
                    return;
                }

                /*
                 * Convert timeout from minutes to milliseconds.
                 */
                const timeoutMilliseconds =
                    sessionTimeout * 60 * 1000;

                const currentTime = Date.now();

                const sessionAge =
                    currentTime - loginTime;

                /*
                 * Session has expired.
                 */
                if (sessionAge >= timeoutMilliseconds) {
                    localStorage.removeItem('user');

                    setSessionExpired(true);
                }
            } catch (error) {
                console.error(
                    'Session timeout check error:',
                    error
                );

                localStorage.removeItem('user');

                setSessionExpired(true);
            }
        };

        /*
         * Check immediately.
         */
        checkSessionTimeout();

        /*
         * Check every 10 seconds.
         */
        const interval = setInterval(
            checkSessionTimeout,
            10000
        );

        return () => {
            clearInterval(interval);
        };
    }, []);

    /*
     * Redirect to login when the session expires.
     */
    if (sessionExpired) {
        return <Navigate to="/" replace />;
    }

    /*
     * Check current session.
     */
    const sessionString =
        localStorage.getItem('user');

    if (!sessionString) {
        return <Navigate to="/" replace />;
    }

    try {
        const user = JSON.parse(sessionString);

        if (!user.authenticated) {
            return <Navigate to="/" replace />;
        }

        const userRole =
            user.role?.toLowerCase();

        /*
         * ROLE PROTECTION
         */
        if (
            allowedRoles &&
            !allowedRoles.some(
                (role) =>
                    role.toLowerCase() === userRole
            )
        ) {
            return <Navigate to="/" replace />;
        }

        /*
         * PERMISSION PROTECTION
         */
        if (permission) {
            const permissionsString =
                localStorage.getItem(PERMISSIONS_KEY);

            if (!permissionsString) {
                return <Navigate to="/" replace />;
            }

            const permissions =
                JSON.parse(permissionsString);

            const roleNameMap = {
                admin: 'Admin',
                manager: 'Manager',
                finance: 'Finance',
                maintenance: 'Maintenance',
                tenant: 'Tenant',
            };

            const permissionRole =
                roleNameMap[userRole];

            const rolePermissions =
                permissions[permissionRole];

            if (
                !rolePermissions ||
                rolePermissions[permission] !== true
            ) {
                return <Navigate to="/" replace />;
            }
        }

        return children;

    } catch (error) {
        console.error(
            'ProtectedRoute error:',
            error
        );

        localStorage.removeItem('user');

        return <Navigate to="/" replace />;
    }
}

export default ProtectedRoute;

