import React, { useState } from 'react';
import './ServiceRequests.css';

function ServiceRequests() {
    const [showForm, setShowForm] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [formData, setFormData] = useState({
        serviceType: '',
        priority: '',
        description: '',
        serviceDate: ''
    });

    const [requests, setRequests] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem('serviceRequests') || '[]'
            );
        } catch (error) {
            console.error(
                'Unable to load service requests:',
                error
            );
            return [];
        }
    });

    // ================================
    // HANDLE FORM INPUT
    // ================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // ================================
    // GENERATE REQUEST ID
    // ================================

    const generateRequestID = () => {
        const numbers = requests.map((request) => {
            const number = parseInt(
                request.id.replace('SR', ''),
                10
            );

            return isNaN(number) ? 0 : number;
        });

        const highestNumber =
            numbers.length > 0
                ? Math.max(...numbers)
                : 0;

        return `SR${String(
            highestNumber + 1
        ).padStart(3, '0')}`;
    };

    // ================================
    // SUBMIT REQUEST
    // ================================

    const handleSubmit = (e) => {
        e.preventDefault();

        const today = new Date().toLocaleDateString(
            'en-GB',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }
        );

        const newRequest = {
            id: generateRequestID(),
            serviceType: formData.serviceType,
            priority: formData.priority,
            description: formData.description,
            serviceDate: formData.serviceDate,
            technician: 'Not Assigned',
            status: 'Submitted',
            date: today
        };

        const updatedRequests = [
            ...requests,
            newRequest
        ];

        setRequests(updatedRequests);

        localStorage.setItem(
            'serviceRequests',
            JSON.stringify(updatedRequests)
        );

        setFormData({
            serviceType: '',
            priority: '',
            description: '',
            serviceDate: ''
        });

        setShowForm(false);

        alert(
            'Service request submitted successfully!'
        );
    };

    // ================================
    // DELETE REQUEST
    // ================================

    const handleDelete = (requestId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this service request?'
        );

        if (!confirmDelete) {
            return;
        }

        const updatedRequests = requests.filter(
            (request) => request.id !== requestId
        );

        setRequests(updatedRequests);

        localStorage.setItem(
            'serviceRequests',
            JSON.stringify(updatedRequests)
        );

        if (
            selectedRequest &&
            selectedRequest.id === requestId
        ) {
            setSelectedRequest(null);
        }
    };

    // ================================
    // VIEW REQUEST
    // ================================

    const handleView = (request) => {
        setSelectedRequest({
            ...request
        });
    };

    // ================================
    // SAVE EDITED REQUEST
    // ================================

    const handleSaveChanges = () => {
        if (!selectedRequest) {
            return;
        }

        const updatedRequests = requests.map(
            (request) =>
                request.id === selectedRequest.id
                    ? selectedRequest
                    : request
        );

        setRequests(updatedRequests);

        localStorage.setItem(
            'serviceRequests',
            JSON.stringify(updatedRequests)
        );

        setSelectedRequest(null);

        alert(
            'Service request updated successfully!'
        );
    };

    // ================================
    // STATISTICS
    // ================================

    const submittedCount = requests.filter(
        (request) =>
            request.status === 'Submitted'
    ).length;

    const assignedCount = requests.filter(
        (request) =>
            request.status === 'Assigned'
    ).length;

    const progressCount = requests.filter(
        (request) =>
            request.status === 'In Progress'
    ).length;

    const completedCount = requests.filter(
        (request) =>
            request.status === 'Completed'
    ).length;

    // ================================
    // SEARCH + FILTER
    // ================================

    const filteredRequests = requests.filter(
        (request) => {
            const search =
                searchTerm
                    .toLowerCase()
                    .trim();

            const matchesSearch =
                request.id
                    .toLowerCase()
                    .includes(search) ||
                request.serviceType
                    .toLowerCase()
                    .includes(search) ||
                request.description
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                statusFilter === '' ||
                request.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        }
    );

    // ================================
    // STATUS CLASS
    // ================================

    const getStatusClass = (status) => {
        return status
            .toLowerCase()
            .replace(/\s+/g, '-');
    };

    // ================================
    // PRIORITY CLASS
    // ================================

    const getPriorityClass = (priority) => {
        return priority
            ? priority.toLowerCase()
            : '';
    };

    // ================================
    // JSX
    // ================================

    return (
        <div className="service-page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>
                    <h1>
                        Service Requests
                    </h1>

                    <p>
                        Request building services
                        and track your requests.
                    </p>
                </div>

                <button
                    className="new-request-btn"
                    onClick={() =>
                        setShowForm(true)
                    }
                >
                    + New Service Request
                </button>

            </div>

            {/* STATISTICS */}

            <div className="stats-container">

                <div className="stat-card">
                    <div className="stat-number">
                        {submittedCount}
                    </div>

                    <div className="stat-label">
                        Submitted
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-number">
                        {assignedCount}
                    </div>

                    <div className="stat-label">
                        Assigned
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
                        {completedCount}
                    </div>

                    <div className="stat-label">
                        Completed
                    </div>
                </div>

            </div>

            {/* REQUEST TABLE */}

            <div className="service-card">

                <div className="requests-toolbar">

                    <h2>
                        My Service Requests
                    </h2>

                    <input
                        type="text"
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                        className="search-input"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                        className="status-filter"
                    >
                        <option value="">
                            All Statuses
                        </option>

                        <option value="Submitted">
                            Submitted
                        </option>

                        <option value="Assigned">
                            Assigned
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>
                    </select>

                </div>

                {filteredRequests.length === 0 ? (

                    <p className="empty-state">
                        No service requests found.
                    </p>

                ) : (

                    <table className="service-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredRequests.map(
                                (request) => (

                                    <tr
                                        key={request.id}
                                    >

                                        <td>
                                            {request.id}
                                        </td>

                                        <td>
                                            {request.serviceType}
                                        </td>

                                        <td>
                                            <span
                                                className={`priority ${getPriorityClass(
                                                    request.priority
                                                )}`}
                                            >
                                                {request.priority}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`status ${getStatusClass(
                                                    request.status
                                                )}`}
                                            >
                                                {request.status}
                                            </span>
                                        </td>

                                        <td>
                                            {request.date}
                                        </td>

                                        <td>

                                            <button
                                                className="table-btn"
                                                onClick={() =>
                                                    handleView(
                                                        request
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                className="table-btn delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        request.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                )}

            </div>

            {/* NEW SERVICE REQUEST MODAL */}

            {showForm && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h2>
                                New Service Request
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowForm(false)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="form-group">

                                <label>
                                    Service Type
                                </label>

                                <select
                                    name="serviceType"
                                    value={
                                        formData.serviceType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Service
                                    </option>

                                    <option value="Cleaning">
                                        Cleaning
                                    </option>

                                    <option value="Security Assistance">
                                        Security Assistance
                                    </option>

                                    <option value="Waste Collection">
                                        Waste Collection
                                    </option>

                                    <option value="Internet Support">
                                        Internet Support
                                    </option>

                                    <option value="Utility Services">
                                        Utility Services
                                    </option>

                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Priority
                                </label>

                                <select
                                    name="priority"
                                    value={
                                        formData.priority
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Priority
                                    </option>

                                    <option value="Low">
                                        Low
                                    </option>

                                    <option value="Medium">
                                        Medium
                                    </option>

                                    <option value="High">
                                        High
                                    </option>

                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="5"
                                    placeholder="Describe the service you need..."
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Preferred Service Date
                                </label>

                                <input
                                    type="date"
                                    name="serviceDate"
                                    value={
                                        formData.serviceDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="modal-buttons">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="new-request-btn"
                                >
                                    Submit Request
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {/* VIEW / EDIT MODAL */}

            {selectedRequest && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h2>
                                Service Request Details
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedRequest(null)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <div className="form-group">

                            <label>
                                Request ID
                            </label>

                            <input
                                value={
                                    selectedRequest.id
                                }
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Service Type
                            </label>

                            <input
                                value={
                                    selectedRequest.serviceType
                                }
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Priority
                            </label>

                            <select
                                value={
                                    selectedRequest.priority
                                }
                                onChange={(e) =>
                                    setSelectedRequest({
                                        ...selectedRequest,
                                        priority:
                                            e.target.value
                                    })
                                }
                            >

                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                value={
                                    selectedRequest.description
                                }
                                readOnly
                                rows="5"
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Preferred Service Date
                            </label>

                            <input
                                type="date"
                                value={
                                    selectedRequest.serviceDate ||
                                    ''
                                }
                                onChange={(e) =>
                                    setSelectedRequest({
                                        ...selectedRequest,
                                        serviceDate:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Technician
                            </label>

                            <input
                                value={
                                    selectedRequest.technician
                                }
                                onChange={(e) =>
                                    setSelectedRequest({
                                        ...selectedRequest,
                                        technician:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                value={
                                    selectedRequest.status
                                }
                                onChange={(e) =>
                                    setSelectedRequest({
                                        ...selectedRequest,
                                        status:
                                            e.target.value
                                    })
                                }
                            >

                                <option value="Submitted">
                                    Submitted
                                </option>

                                <option value="Assigned">
                                    Assigned
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
                                Submitted Date
                            </label>

                            <input
                                value={
                                    selectedRequest.date
                                }
                                readOnly
                            />

                        </div>

                        <div className="modal-buttons">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    setSelectedRequest(null)
                                }
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="new-request-btn"
                                onClick={
                                    handleSaveChanges
                                }
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ServiceRequests;