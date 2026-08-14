import React from 'react';
import Icon from '../components/Icon';
import './role-dashboard.css';

const managerStats = [
    {
        label: 'Total Tenants',
        value: '48',
        detail: 'Active tenants',
        icon: 'users'
    },
    {
        label: 'Occupied Units',
        value: '42',
        detail: '87.5% occupancy',
        icon: 'building'
    },
    {
        label: 'Vacant Units',
        value: '6',
        detail: 'Available units',
        icon: 'building'
    },
    {
        label: 'Open Maintenance',
        value: '7',
        detail: 'Requests requiring attention',
        icon: 'tools'
    }
];

const maintenanceRequests = [
    {
        unit: 'Unit 402',
        issue: 'Kitchen sink drainage',
        status: 'In Progress',
        priority: 'Medium'
    },
    {
        unit: 'Unit 105',
        issue: 'Electrical fault',
        status: 'Pending',
        priority: 'High'
    },
    {
        unit: 'Unit 208',
        issue: 'Air conditioning',
        status: 'Pending',
        priority: 'Low'
    }
];

const bookings = [
    {
        title: 'Rooftop Terrace',
        tenant: 'Unit 402',
        date: '02 August 2026',
        time: '4:00 PM'
    },
    {
        title: 'Conference Room',
        tenant: 'Unit 208',
        date: '04 August 2026',
        time: '10:00 AM'
    },
    {
        title: 'Rooftop Terrace',
        tenant: 'Unit 105',
        date: '06 August 2026',
        time: '2:00 PM'
    }
];

const visitors = [
    {
        name: 'John Kamau',
        unit: 'Unit 402',
        time: '10:30 AM',
        status: 'Checked in'
    },
    {
        name: 'Mary Wanjiku',
        unit: 'Unit 208',
        time: '11:15 AM',
        status: 'Expected'
    },
    {
        name: 'David Otieno',
        unit: 'Unit 105',
        time: '1:00 PM',
        status: 'Expected'
    }
];

export default function ManagerDashboard({ user }) {
    return (
        <div className="role-dashboard">

            {/* HEADER */}
            <div className="role-dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">
                        PROPERTY MANAGEMENT
                    </span>

                    <h1>Property Manager Dashboard</h1>

                    <p>
                        Overview of tenants, units, maintenance,
                        bookings and visitors.
                    </p>
                </div>

                <div className="dashboard-user">
                    <span className="dashboard-user-avatar">
                        {user?.username
                            ? user.username.substring(0, 2).toUpperCase()
                            : 'PM'}
                    </span>

                    <div>
                        <strong>{user?.username || 'Property Manager'}</strong>
                        <small>Property Manager</small>
                    </div>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="dashboard-actions">
                <button>
                    <Icon name="users" size={17} />
                    Add Tenant
                </button>

                <button>
                    <Icon name="building" size={17} />
                    Manage Units
                </button>

                <button>
                    <Icon name="tools" size={17} />
                    Maintenance
                </button>

                <button>
                    <Icon name="calendar" size={17} />
                    Bookings
                </button>
            </div>

            {/* STAT CARDS */}
            <div className="dashboard-stat-grid">
                {managerStats.map((stat) => (
                    <div className="dashboard-stat-card" key={stat.label}>
                        <div className="dashboard-stat-top">
                            <span>{stat.label}</span>

                            <span className="dashboard-stat-icon">
                                <Icon name={stat.icon} size={18} />
                            </span>
                        </div>

                        <strong>{stat.value}</strong>

                        <small>{stat.detail}</small>
                    </div>
                ))}
            </div>

            {/* MAIN GRID */}
            <div className="dashboard-content-grid">

                {/* OCCUPANCY */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Occupancy Overview</h2>
                            <p>Current property occupancy</p>
                        </div>

                        <Icon name="building" size={20} />
                    </div>

                    <div className="occupancy-content">
                        <div className="occupancy-number">
                            <strong>87.5%</strong>
                            <span>Occupied</span>
                        </div>

                        <div className="occupancy-bar">
                            <div
                                className="occupancy-fill"
                                style={{ width: '87.5%' }}
                            />
                        </div>

                        <div className="occupancy-breakdown">
                            <div>
                                <span className="occupancy-dot occupied" />
                                <span>Occupied</span>
                                <strong>42</strong>
                            </div>

                            <div>
                                <span className="occupancy-dot vacant" />
                                <span>Vacant</span>
                                <strong>6</strong>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MAINTENANCE */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Maintenance Requests</h2>
                            <p>Requests requiring attention</p>
                        </div>

                        <button className="dashboard-link">
                            View all
                        </button>
                    </div>

                    <div className="dashboard-list">
                        {maintenanceRequests.map((request) => (
                            <div
                                className="dashboard-list-row"
                                key={`${request.unit}-${request.issue}`}
                            >
                                <div className="list-icon">
                                    <Icon name="tools" size={16} />
                                </div>

                                <div className="list-main">
                                    <strong>{request.issue}</strong>
                                    <small>{request.unit}</small>
                                </div>

                                <div className="list-meta">
                                    <span
                                        className={`status-badge status-${request.status
                                            .toLowerCase()
                                            .replace(' ', '-')}`}
                                    >
                                        {request.status}
                                    </span>

                                    <small>{request.priority}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* BOOKINGS */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Upcoming Bookings</h2>
                            <p>Scheduled facility reservations</p>
                        </div>

                        <button className="dashboard-link">
                            View all
                        </button>
                    </div>

                    <div className="dashboard-list">
                        {bookings.map((booking) => (
                            <div
                                className="dashboard-list-row"
                                key={`${booking.title}-${booking.date}`}
                            >
                                <div className="list-icon">
                                    <Icon name="calendar" size={16} />
                                </div>

                                <div className="list-main">
                                    <strong>{booking.title}</strong>
                                    <small>{booking.tenant}</small>
                                </div>

                                <div className="list-meta">
                                    <strong>{booking.date}</strong>
                                    <small>{booking.time}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* VISITORS */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Recent Visitors</h2>
                            <p>Visitor activity today</p>
                        </div>

                        <button className="dashboard-link">
                            View all
                        </button>
                    </div>

                    <div className="dashboard-list">
                        {visitors.map((visitor) => (
                            <div
                                className="dashboard-list-row"
                                key={`${visitor.name}-${visitor.time}`}
                            >
                                <div className="list-icon">
                                    <Icon name="users" size={16} />
                                </div>

                                <div className="list-main">
                                    <strong>{visitor.name}</strong>
                                    <small>{visitor.unit}</small>
                                </div>

                                <div className="list-meta">
                                    <span className="visitor-status">
                                        {visitor.status}
                                    </span>

                                    <small>{visitor.time}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* PROPERTY ACTIVITY */}
            <section className="dashboard-card dashboard-activity">
                <div className="dashboard-card-header">
                    <div>
                        <h2>Property Activity</h2>
                        <p>Recent activity across Pinnacle Towers</p>
                    </div>

                    <button className="dashboard-link">
                        View reports
                    </button>
                </div>

                <div className="activity-grid">
                    <div className="activity-item">
                        <Icon name="users" size={18} />
                        <div>
                            <strong>New tenant registered</strong>
                            <small>Unit 305 · 2 hours ago</small>
                        </div>
                    </div>

                    <div className="activity-item">
                        <Icon name="tools" size={18} />
                        <div>
                            <strong>Maintenance request updated</strong>
                            <small>Unit 402 · 5 hours ago</small>
                        </div>
                    </div>

                    <div className="activity-item">
                        <Icon name="calendar" size={18} />
                        <div>
                            <strong>New booking received</strong>
                            <small>Rooftop Terrace · Yesterday</small>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}