import React from 'react';
import Icon from '../components/Icon';
import './role-dashboard.css';

const maintenanceStats = [
    {
        label: 'Open Requests',
        value: '12',
        detail: 'Awaiting resolution',
        icon: 'tools'
    },
    {
        label: 'In Progress',
        value: '5',
        detail: 'Currently being handled',
        icon: 'tools'
    },
    {
        label: 'High Priority',
        value: '3',
        detail: 'Require immediate attention',
        icon: 'bell'
    },
    {
        label: 'Completed',
        value: '18',
        detail: 'Completed this month',
        icon: 'check'
    }
];

const maintenanceRequests = [
    {
        unit: 'Unit 402',
        issue: 'Kitchen sink drainage',
        priority: 'Medium',
        status: 'In Progress'
    },
    {
        unit: 'Unit 105',
        issue: 'Electrical fault',
        priority: 'High',
        status: 'Pending'
    },
    {
        unit: 'Unit 208',
        issue: 'Air conditioning',
        priority: 'Low',
        status: 'Pending'
    },
    {
        unit: 'Unit 305',
        issue: 'Bathroom water leakage',
        priority: 'High',
        status: 'In Progress'
    }
];

const workOrders = [
    {
        order: 'WO-2026-041',
        issue: 'Kitchen sink drainage',
        technician: 'Maintenance Team',
        due: 'Today',
        status: 'In Progress'
    },
    {
        order: 'WO-2026-040',
        issue: 'Electrical fault',
        technician: 'Electrical Team',
        due: 'Tomorrow',
        status: 'Pending'
    },
    {
        order: 'WO-2026-039',
        issue: 'Air conditioning service',
        technician: 'HVAC Team',
        due: '04 Aug 2026',
        status: 'Pending'
    }
];

const upcomingMaintenance = [
    {
        item: 'Generator inspection',
        location: 'Basement',
        date: '05 Aug 2026'
    },
    {
        item: 'Water pump servicing',
        location: 'Pump Room',
        date: '08 Aug 2026'
    },
    {
        item: 'Fire extinguisher inspection',
        location: 'All floors',
        date: '12 Aug 2026'
    }
];

const activity = [
    {
        icon: 'tools',
        title: 'Work order updated',
        detail: 'WO-2026-041 · 1 hour ago'
    },
    {
        icon: 'check',
        title: 'Maintenance completed',
        detail: 'Unit 310 · 3 hours ago'
    },
    {
        icon: 'bell',
        title: 'High priority request received',
        detail: 'Unit 305 · 5 hours ago'
    }
];

export default function MaintenanceDashboard({ user, selectNav }) {
    return (
        <div className="role-dashboard">

            {/* HEADER */}
            <div className="role-dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">
                        MAINTENANCE OPERATIONS
                    </span>

                    <h1>Maintenance Officer Dashboard</h1>

                    <p>
                        Monitor maintenance requests, work orders and
                        scheduled property maintenance.
                    </p>
                </div>

                <div className="dashboard-user">
                    <span className="dashboard-user-avatar">
                        {user?.username
                            ? user.username.substring(0, 2).toUpperCase()
                            : 'MO'}
                    </span>

                    <div>
                        <strong>
                            {user?.username || 'Maintenance Officer'}
                        </strong>

                        <small>Maintenance Officer</small>
                    </div>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="dashboard-actions">
                <button onClick={() => selectNav('Work Orders')}>
                    <Icon name="tools" size={17} />
                    New Work Order
                </button>

                <button onClick={() => selectNav('Maintenance')}>
                    <Icon name="file" size={17} />
                    View Requests
                </button>

                <button onClick={() => selectNav('Work Orders')}>
                    <Icon name="tools" size={17} />
                    Work Orders
                </button>

                <button onClick={() => selectNav('Reports')}>
                    <Icon name="file" size={17} />
                    Maintenance Reports
                </button>
            </div>

            {/* STAT CARDS */}
            <div className="dashboard-stat-grid">
                {maintenanceStats.map((stat) => (
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

                {/* MAINTENANCE REQUESTS */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Maintenance Requests</h2>

                            <p>
                                Requests requiring attention
                            </p>
                        </div>

                        <button
                            className="dashboard-link"
                            onClick={() => selectNav('Work Orders')}
                        >
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
                                    <Icon
                                        name="tools"
                                        size={16}
                                    />
                                </div>

                                <div className="list-main">
                                    <strong>
                                        {request.issue}
                                    </strong>

                                    <small>
                                        {request.unit}
                                    </small>
                                </div>

                                <div className="list-meta">
                                    <span
                                        className={`status-badge status-${request.status
                                            .toLowerCase()
                                            .replace(' ', '-')}`}
                                    >
                                        {request.status}
                                    </span>

                                    <small>
                                        {request.priority} priority
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ACTIVE WORK ORDERS */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Active Work Orders</h2>

                            <p>
                                Current maintenance assignments
                            </p>
                        </div>

                        <button className="dashboard-link">
                            View all
                        </button>
                    </div>

                    <div className="dashboard-list">
                        {workOrders.map((order) => (
                            <div
                                className="dashboard-list-row"
                                key={order.order}
                            >
                                <div className="list-icon">
                                    <Icon
                                        name="file"
                                        size={16}
                                    />
                                </div>

                                <div className="list-main">
                                    <strong>
                                        {order.order}
                                    </strong>

                                    <small>
                                        {order.issue}
                                    </small>
                                </div>

                                <div className="list-meta">
                                    <strong>
                                        {order.technician}
                                    </strong>

                                    <small>
                                        Due {order.due}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PRIORITY OVERVIEW */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Priority Overview</h2>

                            <p>
                                Open requests by priority
                            </p>
                        </div>

                        <Icon name="bell" size={20} />
                    </div>

                    <div className="occupancy-content">

                        <div className="occupancy-breakdown">
                            <div>
                                <span className="occupancy-dot occupied" />
                                <span>High</span>
                                <strong>3</strong>
                            </div>

                            <div>
                                <span className="occupancy-dot vacant" />
                                <span>Medium</span>
                                <strong>6</strong>
                            </div>

                            <div>
                                <span className="occupancy-dot vacant" />
                                <span>Low</span>
                                <strong>3</strong>
                            </div>
                        </div>

                        <div className="occupancy-bar">
                            <div
                                className="occupancy-fill"
                                style={{ width: '25%' }}
                            />
                        </div>

                        <small>
                            25% of open requests are high priority.
                        </small>
                    </div>
                </section>

                {/* UPCOMING MAINTENANCE */}
                <section className="dashboard-card">
                    <div className="dashboard-card-header">
                        <div>
                            <h2>Upcoming Maintenance</h2>

                            <p>
                                Scheduled preventive maintenance
                            </p>
                        </div>

                        <button className="dashboard-link">
                            View schedule
                        </button>
                    </div>

                    <div className="dashboard-list">
                        {upcomingMaintenance.map((item) => (
                            <div
                                className="dashboard-list-row"
                                key={`${item.item}-${item.date}`}
                            >
                                <div className="list-icon">
                                    <Icon
                                        name="calendar"
                                        size={16}
                                    />
                                </div>

                                <div className="list-main">
                                    <strong>
                                        {item.item}
                                    </strong>

                                    <small>
                                        {item.location}
                                    </small>
                                </div>

                                <div className="list-meta">
                                    <strong>
                                        {item.date}
                                    </strong>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* RECENT ACTIVITY */}
            <section className="dashboard-card dashboard-activity">
                <div className="dashboard-card-header">
                    <div>
                        <h2>Recent Maintenance Activity</h2>

                        <p>
                            Latest maintenance operations
                        </p>
                    </div>

                    <button className="dashboard-link">
                        View reports
                    </button>
                </div>

                <div className="activity-grid">
                    {activity.map((item) => (
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