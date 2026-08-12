import React, { useState } from 'react';
import './ComplaintsFeedback.css';

function ComplaintsFeedback() {
    const [showForm, setShowForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [formData, setFormData] = useState({
        type: '',
        subject: '',
        description: ''
    });

    const [items, setItems] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem('complaintsFeedback') || '[]'
            );
        } catch (error) {
            console.error(
                'Unable to load complaints and feedback:',
                error
            );
            return [];
        }
    });

    // =========================================
    // HANDLE FORM INPUT
    // =========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // =========================================
    // GENERATE ID
    // =========================================

    const generateID = () => {
        const numbers = items.map((item) => {
            const number = parseInt(
                item.id.replace('CF', ''),
                10
            );

            return isNaN(number) ? 0 : number;
        });

        const highestNumber =
            numbers.length > 0
                ? Math.max(...numbers)
                : 0;

        return `CF${String(
            highestNumber + 1
        ).padStart(3, '0')}`;
    };

    // =========================================
    // SUBMIT COMPLAINT / FEEDBACK
    // =========================================

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

        const newItem = {
            id: generateID(),
            type: formData.type,
            subject: formData.subject,
            description: formData.description,
            status: 'Submitted',
            date: today,
            managementResponse: '',
            tenantResponse: ''
        };

        const updatedItems = [
            ...items,
            newItem
        ];

        setItems(updatedItems);

        localStorage.setItem(
            'complaintsFeedback',
            JSON.stringify(updatedItems)
        );

        setFormData({
            type: '',
            subject: '',
            description: ''
        });

        setShowForm(false);

        alert(
            `${formData.type} submitted successfully!`
        );
    };

    // =========================================
    // VIEW ITEM
    // =========================================

    const handleView = (item) => {
        setSelectedItem({
            ...item
        });
    };

    // =========================================
    // SAVE RESPONSE / CHANGES
    // =========================================

    const handleSaveChanges = () => {
        if (!selectedItem) {
            return;
        }

        const updatedItems = items.map(
            (item) =>
                item.id === selectedItem.id
                    ? selectedItem
                    : item
        );

        setItems(updatedItems);

        localStorage.setItem(
            'complaintsFeedback',
            JSON.stringify(updatedItems)
        );

        setSelectedItem(null);

        alert(
            'Complaint/feedback updated successfully!'
        );
    };

    // =========================================
    // DELETE ITEM
    // =========================================

    const handleDelete = (itemId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this complaint/feedback?'
        );

        if (!confirmDelete) {
            return;
        }

        const updatedItems = items.filter(
            (item) => item.id !== itemId
        );

        setItems(updatedItems);

        localStorage.setItem(
            'complaintsFeedback',
            JSON.stringify(updatedItems)
        );

        if (
            selectedItem &&
            selectedItem.id === itemId
        ) {
            setSelectedItem(null);
        }
    };

    // =========================================
    // STATISTICS
    // =========================================

    const complaintCount = items.filter(
        (item) => item.type === 'Complaint'
    ).length;

    const suggestionCount = items.filter(
        (item) => item.type === 'Suggestion'
    ).length;

    const submittedCount = items.filter(
        (item) => item.status === 'Submitted'
    ).length;

    const resolvedCount = items.filter(
        (item) =>
            item.status === 'Resolved' ||
            item.status === 'Closed'
    ).length;

    // =========================================
    // SEARCH + FILTER
    // =========================================

    const filteredItems = items.filter((item) => {
        const search =
            searchTerm
                .toLowerCase()
                .trim();

        const matchesSearch =
            item.id
                .toLowerCase()
                .includes(search) ||
            item.type
                .toLowerCase()
                .includes(search) ||
            item.subject
                .toLowerCase()
                .includes(search) ||
            item.description
                .toLowerCase()
                .includes(search);

        const matchesType =
            typeFilter === '' ||
            item.type === typeFilter;

        const matchesStatus =
            statusFilter === '' ||
            item.status === statusFilter;

        return (
            matchesSearch &&
            matchesType &&
            matchesStatus
        );
    });

    // =========================================
    // STATUS CLASS
    // =========================================

    const getStatusClass = (status) => {
        return status
            .toLowerCase()
            .replace(/\s+/g, '-');
    };

    // =========================================
    // TYPE CLASS
    // =========================================

    const getTypeClass = (type) => {
        return type
            .toLowerCase()
            .replace(/\s+/g, '-');
    };

    // =========================================
    // JSX
    // =========================================

    return (
        <div className="complaints-page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>
                    <h1>
                        Complaints & Feedback
                    </h1>

                    <p>
                        Submit complaints or suggestions
                        and communicate with management.
                    </p>
                </div>

                <button
                    className="new-request-btn"
                    onClick={() =>
                        setShowForm(true)
                    }
                >
                    + Submit Complaint / Feedback
                </button>

            </div>

            {/* STATISTICS */}

            <div className="stats-container">

                <div className="stat-card">
                    <div className="stat-number">
                        {complaintCount}
                    </div>

                    <div className="stat-label">
                        Complaints
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-number">
                        {suggestionCount}
                    </div>

                    <div className="stat-label">
                        Suggestions
                    </div>
                </div>

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
                        {resolvedCount}
                    </div>

                    <div className="stat-label">
                        Resolved
                    </div>
                </div>

            </div>

            {/* REQUEST LIST */}

            <div className="complaints-card">

                <div className="requests-toolbar">

                    <h2>
                        My Complaints & Feedback
                    </h2>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                        className="search-input"
                    />

                    <select
                        value={typeFilter}
                        onChange={(e) =>
                            setTypeFilter(
                                e.target.value
                            )
                        }
                        className="status-filter"
                    >
                        <option value="">
                            All Types
                        </option>

                        <option value="Complaint">
                            Complaints
                        </option>

                        <option value="Suggestion">
                            Suggestions
                        </option>
                    </select>

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

                        <option value="Under Review">
                            Under Review
                        </option>

                        <option value="Responded">
                            Responded
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                        <option value="Closed">
                            Closed
                        </option>
                    </select>

                </div>

                {/* TABLE */}

                {filteredItems.length === 0 ? (

                    <p className="empty-state">
                        No complaints or feedback found.
                    </p>

                ) : (

                    <table className="complaints-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredItems.map(
                                (item) => (

                                    <tr
                                        key={item.id}
                                    >

                                        <td>
                                            {item.id}
                                        </td>

                                        <td>
                                            <span
                                                className={`type ${getTypeClass(
                                                    item.type
                                                )}`}
                                            >
                                                {item.type}
                                            </span>
                                        </td>

                                        <td>
                                            {item.subject}
                                        </td>

                                        <td>
                                            <span
                                                className={`status ${getStatusClass(
                                                    item.status
                                                )}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td>
                                            {item.date}
                                        </td>

                                        <td>

                                            <button
                                                className="table-btn"
                                                onClick={() =>
                                                    handleView(
                                                        item
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                className="table-btn delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        item.id
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

            {/* =================================
                NEW COMPLAINT / FEEDBACK MODAL
            ================================= */}

            {showForm && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h2>
                                Submit Complaint / Feedback
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
                                    Type
                                </label>

                                <select
                                    name="type"
                                    value={
                                        formData.type
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Type
                                    </option>

                                    <option value="Complaint">
                                        Complaint
                                    </option>

                                    <option value="Suggestion">
                                        Suggestion
                                    </option>

                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    name="subject"
                                    value={
                                        formData.subject
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter a subject"
                                    required
                                />

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
                                    rows="6"
                                    placeholder="Describe your complaint or suggestion..."
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
                                    className="new-request-btn"
                                >
                                    Submit
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {/* =================================
                VIEW / RESPOND MODAL
            ================================= */}

            {selectedItem && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h2>
                                Complaint / Feedback Details
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedItem(null)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <div className="form-group">

                            <label>
                                ID
                            </label>

                            <input
                                value={
                                    selectedItem.id
                                }
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Type
                            </label>

                            <input
                                value={
                                    selectedItem.type
                                }
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Subject
                            </label>

                            <input
                                value={
                                    selectedItem.subject
                                }
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                value={
                                    selectedItem.description
                                }
                                readOnly
                                rows="5"
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <input
                                value={
                                    selectedItem.status
                                }
                                readOnly
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Submitted Date
                            </label>

                            <input
                                value={
                                    selectedItem.date
                                }
                                readOnly
                            />

                        </div>

                        <div className="management-response">

                            <h3>
                                Management Response
                            </h3>

                            {selectedItem.managementResponse ? (

                                <div className="response-box">
                                    {selectedItem.managementResponse}
                                </div>

                            ) : (

                                <div className="response-box empty-response">
                                    No response from management yet.
                                </div>

                            )}

                        </div>

                        <div className="form-group">

                            <label>
                                Your Response
                            </label>

                            <textarea
                                value={
                                    selectedItem.tenantResponse || ''
                                }
                                onChange={(e) =>
                                    setSelectedItem({
                                        ...selectedItem,
                                        tenantResponse:
                                            e.target.value
                                    })
                                }
                                rows="4"
                                placeholder="Respond to management..."
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                value={
                                    selectedItem.status
                                }
                                onChange={(e) =>
                                    setSelectedItem({
                                        ...selectedItem,
                                        status:
                                            e.target.value
                                    })
                                }
                            >

                                <option value="Submitted">
                                    Submitted
                                </option>

                                <option value="Under Review">
                                    Under Review
                                </option>

                                <option value="Responded">
                                    Responded
                                </option>

                                <option value="Resolved">
                                    Resolved
                                </option>

                                <option value="Closed">
                                    Closed
                                </option>

                            </select>

                        </div>

                        <div className="modal-buttons">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    setSelectedItem(null)
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

export default ComplaintsFeedback;