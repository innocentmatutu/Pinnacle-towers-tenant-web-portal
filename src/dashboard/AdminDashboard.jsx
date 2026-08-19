import React from 'react';
import Icon from '../components/Icon';
import './role-dashboard.css';

const adminStats = [
    {
        label: 'Total Users',
        value: '64',
        detail: 'Registered system users',
        icon: 'users'
    },
    {
        label: 'Active Users',
        value: '58',
        detail: 'Currently active accounts',
        icon: 'users'
    },
    {
        label: 'Pending Access',
        value: '4',
        detail: 'Accounts awaiting approval',
        icon: 'bell'
    },
    {
        label: 'Security Events',
        value: '2',
        detail: 'Require review',
        icon: 'file'
    }
];

const userActivity = [
    {
        user: 'John Kamau',
        action: 'User account created',
        role: 'Tenant',
        time: '1 hour ago'
    },
    {
        user: 'Mary Wanjiku',
        action: 'Role updated',
        role: 'Finance Officer',
        time: '3 hours ago'
    },
    {
        user: 'David Otieno',
        action: 'Password changed',
        role: 'Maintenance Officer',
        time: '5 hours ago'
    }
];

const pendingAccess = [
    {
        name: 'Peter Mwangi',
        requestedRole: 'Tenant',
        date: 'Today'
    },
    {
        name: 'Sarah Njeri',
        requestedRole: 'Property Manager',
        date: 'Yesterday'
    },
    {
        name: 'Brian Otieno',
        requestedRole: 'Maintenance Officer',
        date: 'Yesterday'
    }
];

const systemActivity = [
    {
        icon: 'users',
        title: 'New user registered',
        detail: 'John Kamau · 1 hour ago'
    },
    {
        icon: 'file',
        title: 'Audit log reviewed',
        detail: 'Administrator · 2 hours ago'
    },
    {
        icon: 'bell',
        title: 'Access request received',
        detail: 'Peter Mwangi · 3 hours ago'
    }
];

export default function AdminDashboard({ user }) {
    return (
        <div className="role-dashboard">

            {/* HEADER */}
            <div className="role-dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">
                        SYSTEM ADMINISTRATION
                    </span>

                    <h1>System Administrator Dashboard</h1>

                    <p>
                        Monitor users, permissions, security and
                        system activity across Pinnacle Towers.
                    </p>
                </div>

                <div className="dashboard-user">
                    <span className="dashboard-user-avatar">
                        {user?.username
                            ? user.username.substring(0, 2).toUpperCase()
                            : 'SA'}
                    </span>

                    <div>
                        <strong>
                            {user?.username || 'System Administrator'}
                        </strong>

                        <small>System Administrator</small>
                    </div>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="dashboard-actions">
                <button>
                    <Icon name="users" size={17} />
                    Manage Users
                </button>

                <button>
                    <Icon name="users" size={17} />
                    Roles & Permissions
                </button>

                <button>
                    <Icon name="file" size={17} />
                    Audit Logs
                </button>

                <button>
                    <Icon name="building" size={17} />
                    System Settings
                </button>
            </div>

            {/* STAT CARDS */}
            <div className="dashboard-stat-grid">
                {adminStats.map((stat) => (
                    <div
                        className="dashboard-stat-card"
                        key={stat.label}
                    >
                        <div className="dashboard-stat-top">
                            <span>{stat.label}</span>

                            <span className="dashboard-stat-icon">
                                <Icon
                                    name={stat.icon}
                                    size={18}
                                />
                            </span>
                        </div>

                        <strong>{stat.value}</strong>

                        <small>{stat.detail}</small>
                    </div>
                ))}
            </div>

            {/* MAIN GRID */}
            <div className="dashboard-content-grid">

                {/* USER ACTIVITY */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Recent User Activity</h2>

                            <p>
                                Latest changes made by system users
                            </p>
                        </div>

                        <button className="dashboard-link">
                            View all
                        </button>
                    </div>

                    <div className="dashboard-list">
                        {userActivity.map((item) => (
                            <div
                                className="dashboard-list-row"
                                key={`${item.user}-${item.action}`}
                            >
                                <div className="list-icon">
                                    <Icon
                                        name="users"
                                        size={16}
                                    />
                                </div>

                                <div className="list-main">
                                    <strong>{item.action}</strong>

                                    <small>
                                        {item.user} · {item.role}
                                    </small>
                                </div>

                                <div className="list-meta">
                                    <small>{item.time}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PENDING ACCESS */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Pending Access Requests</h2>

                            <p>
                                Users awaiting account approval
                            </p>
                        </div>

                        <button className="dashboard-link">
                            Review
                        </button>
                    </div>

                    <div className="dashboard-list">
                        {pendingAccess.map((item) => (
                            <div
                                className="dashboard-list-row"
                                key={item.name}
                            >
                                <div className="list-icon">
                                    <Icon
                                        name="bell"
                                        size={16}
                                    />
                                </div>

                                <div className="list-main">
                                    <strong>{item.name}</strong>

                                    <small>
                                        Requested role: {item.requestedRole}
                                    </small>
                                </div>

                                <div className="list-meta">
                                    <span className="status-badge status-pending">
                                        Pending
                                    </span>

                                    <small>{item.date}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ROLE DISTRIBUTION */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>User Role Distribution</h2>

                            <p>
                                Current users by system role
                            </p>
                        </div>

                        <Icon name="users" size={20} />
                    </div>

                    <div className="occupancy-content">

                        <div className="occupancy-breakdown">
                            <div>
                                <span className="occupancy-dot occupied" />
                                <span>Tenants</span>
                                <strong>48</strong>
                            </div>

                            <div>
                                <span className="occupancy-dot vacant" />
                                <span>Managers</span>
                                <strong>4</strong>
                            </div>

                            <div>
                                <span className="occupancy-dot vacant" />
                                <span>Finance</span>
                                <strong>3</strong>
                            </div>
                        </div>

                        <div className="occupancy-bar">
                            <div
                                className="occupancy-fill"
                                style={{ width: '75%' }}
                            />
                        </div>

                        <div className="occupancy-breakdown">
                            <div>
                                <span className="occupancy-dot vacant" />
                                <span>Maintenance</span>
                                <strong>5</strong>
                            </div>

                            <div>
                                <span className="occupancy-dot vacant" />
                                <span>Admins</span>
                                <strong>4</strong>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SYSTEM STATUS */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>System Status</h2>

                            <p>
                                Current platform status
                            </p>
                        </div>

                        <Icon name="check" size={20} />
                    </div>

                    <div className="dashboard-list">

                        <div className="dashboard-list-row">
                            <div className="list-icon">
                                <Icon name="check" size={16} />
                            </div>

                            <div className="list-main">
                                <strong>Application</strong>
                                <small>Core application services</small>
                            </div>

                            <div className="list-meta">
                                <span className="visitor-status">
                                    Operational
                                </span>
                            </div>
                        </div>

                        <div className="dashboard-list-row">
                            <div className="list-icon">
                                <Icon name="check" size={16} />
                            </div>

                            <div className="list-main">
                                <strong>Database</strong>
                                <small>Data storage services</small>
                            </div>

                            <div className="list-meta">
                                <span className="visitor-status">
                                    Operational
                                </span>
                            </div>
                        </div>

                        <div className="dashboard-list-row">
                            <div className="list-icon">
                                <Icon name="check" size={16} />
                            </div>

                            <div className="list-main">
                                <strong>Authentication</strong>
                                <small>Login and access control</small>
                            </div>

                            <div className="list-meta">
                                <span className="visitor-status">
                                    Operational
                                </span>
                            </div>
                        </div>

                    </div>
                </section>

            </div>

            {/* SYSTEM ACTIVITY */}
            <section className="dashboard-card dashboard-activity">
                <div className="dashboard-card-header">
                    <div>
                        <h2>System Activity</h2>

                        <p>
                            Recent administrative activity
                        </p>
                    </div>

                    <button className="dashboard-link">
                        View audit logs
                    </button>
                </div>

                <div className="activity-grid">
                    {systemActivity.map((item) => (
                        <div
                            className="activity-item"
                            key={item.title}
                        >
                            <Icon
                                name={item.icon}
                                size={18}
                            />

                            <div>
                                <strong>{item.title}</strong>

                                <small>{item.detail}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}