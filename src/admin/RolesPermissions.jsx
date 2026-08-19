import { useEffect, useState } from 'react';
import './RolesPermissions.css';

const STORAGE_KEY = 'admin_role_permissions';

const DEFAULT_PERMISSIONS = {
    Admin: {
        Dashboard: true,
        Users: true,
        'Roles & Permissions': true,
        'System Settings': true,
        Reports: true,
        'Audit Logs': true,
        Messages: true,
        Announcements: true,
    },

    Manager: {
        Dashboard: true,
        Users: true,
        'Roles & Permissions': false,
        'System Settings': false,
        Reports: true,
        'Audit Logs': false,
        Messages: true,
        Announcements: true,
    },

    Finance: {
        Dashboard: true,
        Users: false,
        'Roles & Permissions': false,
        'System Settings': false,
        Reports: true,
        'Audit Logs': false,
        Messages: true,
        Announcements: true,
    },

    Maintenance: {
        Dashboard: true,
        Users: false,
        'Roles & Permissions': false,
        'System Settings': false,
        Reports: true,
        'Audit Logs': false,
        Messages: true,
        Announcements: true,
    },

    Tenant: {
        Dashboard: true,
        Users: false,
        'Roles & Permissions': false,
        'System Settings': false,
        Reports: true,
        'Audit Logs': false,
        Messages: true,
        Announcements: true,
    },
};

const PERMISSIONS = [
    'Dashboard',
    'Users',
    'Roles & Permissions',
    'System Settings',
    'Reports',
    'Audit Logs',
    'Messages',
    'Announcements',
];

function RolesPermissions() {
    const [selectedRole, setSelectedRole] = useState('Admin');
    const [permissions, setPermissions] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return DEFAULT_PERMISSIONS;
            }
        }

        return DEFAULT_PERMISSIONS;
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(permissions)
        );
    }, [permissions]);

    const togglePermission = (permission) => {
        setPermissions((previous) => ({
            ...previous,
            [selectedRole]: {
                ...previous[selectedRole],
                [permission]:
                    !previous[selectedRole][permission],
            },
        }));
    };

    const enableAll = () => {
        setPermissions((previous) => ({
            ...previous,
            [selectedRole]: Object.fromEntries(
                PERMISSIONS.map((permission) => [
                    permission,
                    true,
                ])
            ),
        }));
    };

    const disableAll = () => {
        setPermissions((previous) => ({
            ...previous,
            [selectedRole]: Object.fromEntries(
                PERMISSIONS.map((permission) => [
                    permission,
                    false,
                ])
            ),
        }));
    };

    const enabledCount = PERMISSIONS.filter(
        (permission) =>
            permissions[selectedRole][permission]
    ).length;

    return (
        <div className="roles-permissions">
            <div className="roles-header">
                <div>
                    <h1>Roles & Permissions</h1>
                    <p>
                        Manage system access and permissions
                        for each user role.
                    </p>
                </div>
            </div>

            <div className="roles-layout">
                <aside className="roles-list-card">
                    <div className="roles-list-header">
                        <h2>Roles</h2>
                        <span>
                            {Object.keys(permissions).length}
                        </span>
                    </div>

                    <div className="roles-list">
                        {Object.keys(permissions).map(
                            (role) => (
                                <button
                                    key={role}
                                    type="button"
                                    className={
                                        selectedRole === role
                                            ? 'role-item active'
                                            : 'role-item'
                                    }
                                    onClick={() =>
                                        setSelectedRole(role)
                                    }
                                >
                                    <span className="role-item-name">
                                        {role}
                                    </span>

                                    <span className="role-item-count">
                                        {
                                            Object.values(
                                                permissions[role]
                                            ).filter(Boolean).length
                                        }{' '}
                                        permissions
                                    </span>
                                </button>
                            )
                        )}
                    </div>
                </aside>

                <section className="permissions-card">
                    <div className="permissions-header">
                        <div>
                            <h2>{selectedRole}</h2>
                            <p>
                                Configure what this role can
                                access.
                            </p>
                        </div>

                        <div className="permissions-summary">
                            <strong>{enabledCount}</strong>
                            <span>
                                / {PERMISSIONS.length} enabled
                            </span>
                        </div>
                    </div>

                    <div className="permission-actions">
                        <button
                            type="button"
                            onClick={enableAll}
                        >
                            Enable All
                        </button>

                        <button
                            type="button"
                            onClick={disableAll}
                        >
                            Disable All
                        </button>
                    </div>

                    <div className="permissions-list">
                        {PERMISSIONS.map((permission) => {
                            const enabled =
                                permissions[selectedRole][
                                    permission
                                ];

                            return (
                                <div
                                    key={permission}
                                    className="permission-row"
                                >
                                    <div>
                                        <h3>{permission}</h3>
                                        <p>
                                            Allow {selectedRole}{' '}
                                            users to access{' '}
                                            {permission.toLowerCase()}.
                                        </p>
                                    </div>

                                    <label className="permission-toggle">
                                        <input
                                            type="checkbox"
                                            checked={enabled}
                                            onChange={() =>
                                                togglePermission(
                                                    permission
                                                )
                                            }
                                        />

                                        <span className="toggle-slider" />
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default RolesPermissions;