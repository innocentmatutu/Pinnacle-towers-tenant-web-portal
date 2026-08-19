import { useEffect, useMemo, useState } from 'react';
import './UserManagement.css';

const STORAGE_KEY = 'admin_users';

const DEFAULT_USERS = [
    {
        id: 'USR-001',
        name: 'System Administrator',
        username: 'admin',
        email: 'admin@pinnacletowers.com',
        phone: '',
        role: 'Admin',
        status: 'Active',
        password: 'password123',
    },
    {
        id: 'USR-002',
        name: 'Innocent',
        username: 'innocent',
        email: 'innocent@example.com',
        phone: '',
        role: 'Tenant',
        status: 'Active',
        password: 'password123',
    },
    {
        id: 'USR-003',
        name: 'Property Manager',
        username: 'manager',
        email: 'manager@example.com',
        phone: '',
        role: 'Manager',
        status: 'Active',
        password: 'password123',
    },
    {
        id: 'USR-004',
        name: 'Finance Officer',
        username: 'finance',
        email: 'finance@example.com',
        phone: '',
        role: 'Finance',
        status: 'Active',
        password: 'password123',
    },
    {
        id: 'USR-005',
        name: 'Maintenance Officer',
        username: 'maintenance',
        email: 'maintenance@example.com',
        phone: '',
        role: 'Maintenance',
        status: 'Active',
        password: 'password123',
    },
];

const EMPTY_FORM = {
    name: '',
    username: '',
    email: '',
    phone: '',
    role: 'Tenant',
    status: 'Active',
    password: 'password123',
};

function UserManagement() {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem(STORAGE_KEY);

        if (savedUsers) {
            try {
                const parsedUsers = JSON.parse(savedUsers);

                if (Array.isArray(parsedUsers)) {
                    return parsedUsers;
                }
            } catch {
                // Fall back to defaults below
            }
        }

        return DEFAULT_USERS;
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [formData, setFormData] = useState(EMPTY_FORM);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }, [users]);

    const filteredUsers = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return users.filter((user) => {
            const matchesSearch =
                !search ||
                (user.name || '').toLowerCase().includes(search) ||
                (user.username || '').toLowerCase().includes(search) ||
                (user.email || '').toLowerCase().includes(search);

            const matchesRole =
                roleFilter === 'All' || user.role === roleFilter;

            const matchesStatus =
                statusFilter === 'All' ||
                user.status === statusFilter;

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });
    }, [users, searchTerm, roleFilter, statusFilter]);

    const generateUserId = () => {
        const highestNumber = users.reduce((highest, user) => {
            const match = String(user.id || '').match(/USR-(\d+)/);

            if (!match) {
                return highest;
            }

            return Math.max(highest, Number(match[1]));
        }, 0);

        return `USR-${String(highestNumber + 1).padStart(3, '0')}`;
    };

    const openAddModal = () => {
        setEditingUser(null);
        setFormData({ ...EMPTY_FORM });
        setShowModal(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);

        setFormData({
            name: user.name || '',
            username: user.username || '',
            email: user.email || '',
            phone: user.phone || '',
            role: user.role || 'Tenant',
            status: user.status || 'Active',
            password: user.password || 'password123',
        });

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingUser(null);
        setFormData({ ...EMPTY_FORM });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = formData.name.trim();
        const username = formData.username.trim();
        const email = formData.email.trim();
        const phone = formData.phone.trim();
        const password = formData.password.trim();

        if (!name || !username) {
            alert('Name and username are required.');
            return;
        }

        if (!password) {
            alert('Password is required.');
            return;
        }

        const usernameExists = users.some(
            (user) =>
                user.username.toLowerCase() ===
                    username.toLowerCase() &&
                user.id !== editingUser?.id
        );

        if (usernameExists) {
            alert(
                'That username is already in use. Please choose another username.'
            );
            return;
        }

        const updatedUser = {
            name,
            username,
            email,
            phone,
            role: formData.role,
            status: formData.status,
            password,
        };

        if (editingUser) {
            setUsers((previous) =>
                previous.map((user) =>
                    user.id === editingUser.id
                        ? {
                              ...user,
                              ...updatedUser,
                          }
                        : user
                )
            );
        } else {
            const newUser = {
                id: generateUserId(),
                ...updatedUser,
            };

            setUsers((previous) => [
                ...previous,
                newUser,
            ]);
        }

        closeModal();
    };

    const toggleStatus = (id) => {
        setUsers((previous) =>
            previous.map((user) =>
                user.id === id
                    ? {
                          ...user,
                          status:
                              user.status === 'Active'
                                  ? 'Inactive'
                                  : 'Active',
                      }
                    : user
            )
        );
    };

    const deleteUser = (user) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${user.name}"?`
        );

        if (!confirmed) {
            return;
        }

        setUsers((previous) =>
            previous.filter(
                (existingUser) =>
                    existingUser.id !== user.id
            )
        );
    };

    return (
        <div className="user-management">
            <div className="user-management-header">
                <div>
                    <h1>User Management</h1>
                    <p>
                        Manage portal users, roles and account
                        status.
                    </p>
                </div>

                <button
                    type="button"
                    className="primary-button"
                    onClick={openAddModal}
                >
                    + Add User
                </button>
            </div>

            <div className="user-management-filters">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                />

                <select
                    value={roleFilter}
                    onChange={(event) =>
                        setRoleFilter(event.target.value)
                    }
                >
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Finance">Finance</option>
                    <option value="Maintenance">
                        Maintenance
                    </option>
                    <option value="Tenant">Tenant</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(event.target.value)
                    }
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className="user-management-table-wrapper">
                <table className="user-management-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="empty-users"
                                >
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <strong>
                                            {user.name}
                                        </strong>

                                        <small>
                                            {user.id}
                                        </small>
                                    </td>

                                    <td>{user.username}</td>

                                    <td>
                                        {user.email ||
                                            'Not provided'}
                                    </td>

                                    <td>
                                        <span className="role-badge">
                                            {user.role}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`status-badge ${
                                                user.status.toLowerCase()
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="user-actions">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openEditModal(
                                                        user
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleStatus(
                                                        user.id
                                                    )
                                                }
                                            >
                                                {user.status ===
                                                'Active'
                                                    ? 'Deactivate'
                                                    : 'Activate'}
                                            </button>

                                            <button
                                                type="button"
                                                className="danger-action"
                                                onClick={() =>
                                                    deleteUser(
                                                        user
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div
                    className="user-modal-overlay"
                    onClick={closeModal}
                >
                    <div
                        className="user-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <div className="user-modal-header">
                            <div>
                                <h2>
                                    {editingUser
                                        ? 'Edit User'
                                        : 'Add User'}
                                </h2>

                                <p>
                                    {editingUser
                                        ? 'Update user information and account credentials.'
                                        : 'Create a new portal user.'}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={closeModal}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">
                                        Username
                                    </label>

                                    <input
                                        id="username"
                                        name="username"
                                        value={
                                            formData.username
                                        }
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={
                                            formData.password
                                        }
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role">
                                        Role
                                    </label>

                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="Admin">
                                            Admin
                                        </option>
                                        <option value="Manager">
                                            Manager
                                        </option>
                                        <option value="Finance">
                                            Finance
                                        </option>
                                        <option value="Maintenance">
                                            Maintenance
                                        </option>
                                        <option value="Tenant">
                                            Tenant
                                        </option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">
                                        Status
                                    </label>

                                    <select
                                        id="status"
                                        name="status"
                                        value={
                                            formData.status
                                        }
                                        onChange={handleChange}
                                    >
                                        <option value="Active">
                                            Active
                                        </option>
                                        <option value="Inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="user-modal-actions">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                    {editingUser
                                        ? 'Save Changes'
                                        : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManagement;