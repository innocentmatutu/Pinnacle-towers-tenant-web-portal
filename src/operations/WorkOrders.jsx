import React, { useState } from 'react';
import './WorkOrders.css';

const initialWorkOrders = [
    {
        id: 'WO-2026-041',
        requestId: 'MR001',
        issue: 'Kitchen sink drainage',
        technician: 'Maintenance Team',
        priority: 'Medium',
        status: 'In Progress',
        dueDate: '2026-08-16',
        createdDate: '2026-08-15'
    },
    {
        id: 'WO-2026-040',
        requestId: 'MR002',
        issue: 'Electrical fault',
        technician: 'Electrical Team',
        priority: 'High',
        status: 'Pending',
        dueDate: '2026-08-17',
        createdDate: '2026-08-15'
    },
    {
        id: 'WO-2026-039',
        requestId: 'MR003',
        issue: 'Air conditioning service',
        technician: 'HVAC Team',
        priority: 'Low',
        status: 'Pending',
        dueDate: '2026-08-18',
        createdDate: '2026-08-14'
    }
];

function WorkOrders() {
    const [workOrders, setWorkOrders] = useState(initialWorkOrders);

    const [searchTerm, setSearchTerm] = useState('');

    const [statusFilter, setStatusFilter] = useState('');

    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = workOrders.filter((order) => {
        const search = searchTerm.toLowerCase().trim();

        const matchesSearch =
            order.id.toLowerCase().includes(search) ||
            order.requestId.toLowerCase().includes(search) ||
            order.issue.toLowerCase().includes(search) ||
            order.technician.toLowerCase().includes(search);

        const matchesStatus =
            statusFilter === '' ||
            order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const updateStatus = (status) => {
        if (!selectedOrder) {
            return;
        }

        const updatedOrders = workOrders.map((order) =>
            order.id === selectedOrder.id
                ? {
                    ...order,
                    status
                }
                : order
        );

        setWorkOrders(updatedOrders);

        setSelectedOrder({
            ...selectedOrder,
            status
        });
    };

    const pendingCount = workOrders.filter(
        (order) => order.status === 'Pending'
    ).length;

    const progressCount = workOrders.filter(
        (order) => order.status === 'In Progress'
    ).length;

    const completedCount = workOrders.filter(
        (order) => order.status === 'Completed'
    ).length;

    const highPriorityCount = workOrders.filter(
        (order) => order.priority === 'High'
    ).length;

    return (
        <div className="work-orders-page">

            {/* HEADER */}

            <div className="page-header">
                <div>
                    <h1>Work Orders</h1>

                    <p>
                        Create, assign and track maintenance
                        work orders.
                    </p>
                </div>

                <button className="new-request-btn">
                    + New Work Order
                </button>
            </div>


            {/* STATISTICS */}

            <div className="stats-container">

                <div className="stat-card">
                    <div className="stat-number">
                        {pendingCount}
                    </div>

                    <div className="stat-label">
                        Pending
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-number">
                        {progressCount}
                    </div>

                    <div className="stat-label">
                        In Progress
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-number">
                        {highPriorityCount}
                    </div>

                    <div className="stat-label">
                        High Priority
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-number">
                        {completedCount}
                    </div>

                    <div className="stat-label">
                        Completed
                    </div>
                </div>

            </div>


            {/* WORK ORDERS */}

            <div className="maintenance-card">

                <div className="requests-toolbar">

                    <h2>
                        Active Work Orders
                    </h2>

                    <input
                        type="text"
                        placeholder="Search work orders..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="search-input"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="status-filter"
                    >
                        <option value="">
                            All Statuses
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>
                    </select>

                </div>


                {filteredOrders.length === 0 ? (

                    <p>
                        No work orders found.
                    </p>

                ) : (

                    <table className="maintenance-table">

                        <thead>

                            <tr>

                                <th>
                                    Work Order
                                </th>

                                <th>
                                    Request
                                </th>

                                <th>
                                    Issue
                                </th>

                                <th>
                                    Technician
                                </th>

                                <th>
                                    Priority
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Due Date
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredOrders.map((order) => (

                                <tr key={order.id}>

                                    <td>
                                        {order.id}
                                    </td>

                                    <td>
                                        {order.requestId}
                                    </td>

                                    <td>
                                        {order.issue}
                                    </td>

                                    <td>
                                        {order.technician}
                                    </td>

                                    <td>

                                        <span
                                            className={`priority ${
                                                order.priority.toLowerCase()
                                            }`}
                                        >
                                            {order.priority}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`status ${
                                                order.status
                                                    .toLowerCase()
                                                    .replace(/\s+/g, '-')
                                            }`}
                                        >
                                            {order.status}
                                        </span>

                                    </td>

                                    <td>
                                        {order.dueDate}
                                    </td>

                                    <td>

                                        <button
                                            className="table-btn"
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>


            {/* DETAILS MODAL */}

            {selectedOrder && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h2>
                                Work Order Details
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedOrder(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="form-group">

                            <label>
                                Work Order ID
                            </label>

                            <input
                                value={selectedOrder.id}
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Maintenance Request
                            </label>

                            <input
                                value={selectedOrder.requestId}
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Issue
                            </label>

                            <input
                                value={selectedOrder.issue}
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Technician
                            </label>

                            <input
                                value={selectedOrder.technician}
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Priority
                            </label>

                            <input
                                value={selectedOrder.priority}
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                value={selectedOrder.status}
                                onChange={(e) =>
                                    updateStatus(e.target.value)
                                }
                            >
                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>
                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Due Date
                            </label>

                            <input
                                value={selectedOrder.dueDate}
                                readOnly
                            />

                        </div>


                        <div className="modal-buttons">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    setSelectedOrder(null)
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default WorkOrders;