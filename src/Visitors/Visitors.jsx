import React, { useState } from 'react';
import './Visitors.css';

function Visitors() {
    const [showForm, setShowForm] = useState(false);
    const [selectedVisitor, setSelectedVisitor] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [formData, setFormData] = useState({
        visitorName: '',
        phone: '',
        visitorType: '',
        visitDate: '',
        arrivalTime: '',
        purpose: ''
    });

    // =====================================================
    // LOAD VISITORS
    // =====================================================

    const [visitors, setVisitors] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem('visitors') || '[]'
            );
        } catch (error) {
            console.error(
                'Unable to load visitors:',
                error
            );

            return [];
        }
    });

    // =====================================================
    // HANDLE FORM INPUT
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // =====================================================
    // GENERATE VISITOR ID
    // =====================================================

    const generateVisitorID = () => {
        const numbers = visitors.map((visitor) => {
            const number = parseInt(
                visitor.id.replace('V', ''),
                10
            );

            return isNaN(number) ? 0 : number;
        });

        const highestNumber =
            numbers.length > 0
                ? Math.max(...numbers)
                : 0;

        return `V${String(
            highestNumber + 1
        ).padStart(3, '0')}`;
    };

    // =====================================================
    // SUBMIT VISITOR
    // =====================================================

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

        const newVisitor = {
            id: generateVisitorID(),

            visitorName:
                formData.visitorName,

            phone:
                formData.phone,

            visitorType:
                formData.visitorType,

            visitDate:
                formData.visitDate,

            arrivalTime:
                formData.arrivalTime,

            purpose:
                formData.purpose,

            status: 'Pending',

            registeredDate: today
        };

        const updatedVisitors = [
            ...visitors,
            newVisitor
        ];

        setVisitors(updatedVisitors);

        localStorage.setItem(
            'visitors',
            JSON.stringify(updatedVisitors)
        );

        setFormData({
            visitorName: '',
            phone: '',
            visitorType: '',
            visitDate: '',
            arrivalTime: '',
            purpose: ''
        });

        setShowForm(false);

        alert(
            'Visitor registered successfully!'
        );
    };

    // =====================================================
    // DELETE VISITOR
    // =====================================================

    const handleDelete = (visitorId) => {
        const confirmDelete =
            window.confirm(
                'Are you sure you want to delete this visitor?'
            );

        if (!confirmDelete) {
            return;
        }

        const updatedVisitors =
            visitors.filter(
                (visitor) =>
                    visitor.id !== visitorId
            );

        setVisitors(updatedVisitors);

        localStorage.setItem(
            'visitors',
            JSON.stringify(updatedVisitors)
        );

        if (
            selectedVisitor &&
            selectedVisitor.id === visitorId
        ) {
            setSelectedVisitor(null);
        }
    };

    // =====================================================
    // VIEW VISITOR
    // =====================================================

    const handleView = (visitor) => {
        setSelectedVisitor({
            ...visitor
        });
    };

    // =====================================================
    // SAVE EDITED VISITOR
    // =====================================================

    const handleSaveChanges = () => {
        if (!selectedVisitor) {
            return;
        }

        const updatedVisitors =
            visitors.map(
                (visitor) =>
                    visitor.id === selectedVisitor.id
                        ? selectedVisitor
                        : visitor
            );

        setVisitors(updatedVisitors);

        localStorage.setItem(
            'visitors',
            JSON.stringify(updatedVisitors)
        );

        setSelectedVisitor(null);

        alert(
            'Visitor information updated successfully!'
        );
    };

    // =====================================================
    // STATISTICS
    // =====================================================

    const pendingCount =
        visitors.filter(
            (visitor) =>
                visitor.status === 'Pending'
        ).length;

    const approvedCount =
        visitors.filter(
            (visitor) =>
                visitor.status === 'Approved'
        ).length;

    const checkedInCount =
        visitors.filter(
            (visitor) =>
                visitor.status === 'Checked In'
        ).length;

    const completedCount =
        visitors.filter(
            (visitor) =>
                visitor.status === 'Completed'
        ).length;

    // =====================================================
    // SEARCH + FILTER
    // =====================================================

    const filteredVisitors =
        visitors.filter((visitor) => {
            const search =
                searchTerm
                    .toLowerCase()
                    .trim();

            const matchesSearch =
                visitor.id
                    .toLowerCase()
                    .includes(search) ||

                visitor.visitorName
                    .toLowerCase()
                    .includes(search) ||

                visitor.phone
                    .toLowerCase()
                    .includes(search) ||

                visitor.visitorType
                    .toLowerCase()
                    .includes(search) ||

                visitor.purpose
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                statusFilter === '' ||
                visitor.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {
        return status
            .toLowerCase()
            .replace(/\s+/g, '-');
    };

    // =====================================================
    // JSX
    // =====================================================

    return (
        <div className="visitor-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        Visitors
                    </h1>

                    <p>
                        Register and manage visitors
                        accessing your unit.
                    </p>

                </div>

                <button
                    className="new-visitor-btn"
                    onClick={() =>
                        setShowForm(true)
                    }
                >
                    + Register Visitor
                </button>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

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
                        {approvedCount}
                    </div>

                    <div className="stat-label">
                        Approved
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-number">
                        {checkedInCount}
                    </div>

                    <div className="stat-label">
                        Checked In
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


            {/* =================================================
                VISITOR TABLE
            ================================================= */}

            <div className="visitor-card">

                <div className="visitors-toolbar">

                    <h2>
                        My Visitors
                    </h2>


                    <input
                        type="text"
                        placeholder="Search visitors..."
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

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Approved">
                            Approved
                        </option>

                        <option value="Checked In">
                            Checked In
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                    </select>

                </div>


                {filteredVisitors.length === 0 ? (

                    <p className="empty-state">
                        No visitors found.
                    </p>

                ) : (

                    <table className="visitor-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Visitor
                                </th>

                                <th>
                                    Type
                                </th>

                                <th>
                                    Visit Date
                                </th>

                                <th>
                                    Arrival
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredVisitors.map(
                                (visitor) => (

                                    <tr
                                        key={
                                            visitor.id
                                        }
                                    >

                                        <td>
                                            {visitor.id}
                                        </td>

                                        <td>
                                            {visitor.visitorName}
                                        </td>

                                        <td>
                                            {visitor.visitorType}
                                        </td>

                                        <td>
                                            {visitor.visitDate}
                                        </td>

                                        <td>
                                            {visitor.arrivalTime}
                                        </td>

                                        <td>

                                            <span
                                                className={`status ${getStatusClass(
                                                    visitor.status
                                                )}`}
                                            >
                                                {visitor.status}
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="table-btn"
                                                onClick={() =>
                                                    handleView(
                                                        visitor
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                className="table-btn delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        visitor.id
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


            {/* =================================================
                REGISTER VISITOR MODAL
            ================================================= */}

            {showForm && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h2>
                                Register Visitor
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
                                    Visitor Name
                                </label>

                                <input
                                    type="text"
                                    name="visitorName"
                                    value={
                                        formData.visitorName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter visitor name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter phone number"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Visitor Type
                                </label>

                                <select
                                    name="visitorType"
                                    value={
                                        formData.visitorType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Visitor Type
                                    </option>

                                    <option value="Guest">
                                        Guest
                                    </option>

                                    <option value="Family">
                                        Family
                                    </option>

                                    <option value="Friend">
                                        Friend
                                    </option>

                                    <option value="Delivery">
                                        Delivery
                                    </option>

                                    <option value="Service Provider">
                                        Service Provider
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Visit Date
                                </label>

                                <input
                                    type="date"
                                    name="visitDate"
                                    value={
                                        formData.visitDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Expected Arrival Time
                                </label>

                                <input
                                    type="time"
                                    name="arrivalTime"
                                    value={
                                        formData.arrivalTime
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Purpose of Visit
                                </label>

                                <textarea
                                    name="purpose"
                                    value={
                                        formData.purpose
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="4"
                                    placeholder="Describe the purpose of the visit..."
                                    required
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
                                    className="new-visitor-btn"
                                >
                                    Register Visitor
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* =================================================
                VIEW / EDIT MODAL
            ================================================= */}

            {selectedVisitor && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h2>
                                Visitor Details
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedVisitor(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="form-group">

                            <label>
                                Visitor ID
                            </label>

                            <input
                                value={
                                    selectedVisitor.id
                                }
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Visitor Name
                            </label>

                            <input
                                value={
                                    selectedVisitor.visitorName
                                }
                                onChange={(e) =>
                                    setSelectedVisitor({
                                        ...selectedVisitor,
                                        visitorName:
                                            e.target.value
                                    })
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                value={
                                    selectedVisitor.phone
                                }
                                onChange={(e) =>
                                    setSelectedVisitor({
                                        ...selectedVisitor,
                                        phone:
                                            e.target.value
                                    })
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Visitor Type
                            </label>

                            <select
                                value={
                                    selectedVisitor.visitorType
                                }
                                onChange={(e) =>
                                    setSelectedVisitor({
                                        ...selectedVisitor,
                                        visitorType:
                                            e.target.value
                                    })
                                }
                            >

                                <option value="Guest">
                                    Guest
                                </option>

                                <option value="Family">
                                    Family
                                </option>

                                <option value="Friend">
                                    Friend
                                </option>

                                <option value="Delivery">
                                    Delivery
                                </option>

                                <option value="Service Provider">
                                    Service Provider
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Visit Date
                            </label>

                            <input
                                type="date"
                                value={
                                    selectedVisitor.visitDate
                                }
                                onChange={(e) =>
                                    setSelectedVisitor({
                                        ...selectedVisitor,
                                        visitDate:
                                            e.target.value
                                    })
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Arrival Time
                            </label>

                            <input
                                type="time"
                                value={
                                    selectedVisitor.arrivalTime
                                }
                                onChange={(e) =>
                                    setSelectedVisitor({
                                        ...selectedVisitor,
                                        arrivalTime:
                                            e.target.value
                                    })
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Purpose
                            </label>

                            <textarea
                                value={
                                    selectedVisitor.purpose
                                }
                                onChange={(e) =>
                                    setSelectedVisitor({
                                        ...selectedVisitor,
                                        purpose:
                                            e.target.value
                                    })
                                }
                                rows="4"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                value={
                                    selectedVisitor.status
                                }
                                onChange={(e) =>
                                    setSelectedVisitor({
                                        ...selectedVisitor,
                                        status:
                                            e.target.value
                                    })
                                }
                            >

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Approved">
                                    Approved
                                </option>

                                <option value="Checked In">
                                    Checked In
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Registered Date
                            </label>

                            <input
                                value={
                                    selectedVisitor.registeredDate
                                }
                                readOnly
                            />

                        </div>


                        <div className="modal-buttons">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    setSelectedVisitor(null)
                                }
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="new-visitor-btn"
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

export default Visitors;