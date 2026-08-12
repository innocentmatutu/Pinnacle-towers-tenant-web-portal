import React, { useState } from 'react';
import './MaintenanceRequests.css';

function MaintenanceRequests() {

    // =========================================================
    // STATE
    // =========================================================

    const [showForm, setShowForm] = useState(false);

    const [selectedRequest, setSelectedRequest] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');

    const [statusFilter, setStatusFilter] = useState('');

    const [formData, setFormData] = useState({
        category: '',
        priority: '',
        technician: '',
        description: '',
        visitDate: '',
        photo: null
    });


    // =========================================================
    // LOAD REQUESTS FROM LOCAL STORAGE
    // =========================================================

    const [requests, setRequests] = useState(() => {

        try {

            return JSON.parse(
                localStorage.getItem('maintenanceRequests') || '[]'
            );

        } catch (error) {

            console.error(
                'Unable to load maintenance requests:',
                error
            );

            return [];

        }

    });


    // =========================================================
    // HANDLE FORM INPUTS
    // =========================================================

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));

    };


    // =========================================================
    // CONVERT PHOTO TO BASE64
    // =========================================================

    const convertPhotoToBase64 = (file) => {

        return new Promise((resolve, reject) => {

            if (!file) {

                resolve('');

                return;

            }


            const reader = new FileReader();


            reader.onload = () => {

                resolve(reader.result);

            };


            reader.onerror = () => {

                reject(
                    new Error('Unable to read the selected photo.')
                );

            };


            reader.readAsDataURL(file);

        });

    };


    // =========================================================
    // GENERATE REQUEST ID
    // =========================================================

    const generateRequestID = () => {

        const numbers = requests
            .map((request) => {

                const number = parseInt(
                    request.id.replace('MR', ''),
                    10
                );

                return isNaN(number) ? 0 : number;

            });


        const highestNumber =
            numbers.length > 0
                ? Math.max(...numbers)
                : 0;


        return `MR${String(
            highestNumber + 1
        ).padStart(3, '0')}`;

    };


    // =========================================================
    // SUBMIT NEW REQUEST
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const today =
                new Date().toLocaleDateString(
                    'en-GB',
                    {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }
                );


            // Convert photo to Base64
            const photoData =
                await convertPhotoToBase64(
                    formData.photo
                );


            const newRequest = {

                id: generateRequestID(),

                category: formData.category,

                priority: formData.priority,

                technician:
                    formData.technician || 'Not Assigned',

                description: formData.description,

                visitDate: formData.visitDate,

                completionDate: '',

                rating: '',

                status: 'Submitted',

                date: today,

                photo: photoData

            };


            const updatedRequests = [
                ...requests,
                newRequest
            ];


            setRequests(updatedRequests);


            localStorage.setItem(
                'maintenanceRequests',
                JSON.stringify(
                    updatedRequests
                )
            );


            // Reset form
            setFormData({
                category: '',
                priority: '',
                technician: '',
                description: '',
                visitDate: '',
                photo: null
            });


            setShowForm(false);


            alert(
                'Maintenance request submitted successfully!'
            );


        } catch (error) {

            console.error(
                'Error submitting request:',
                error
            );


            alert(
                'There was a problem submitting the request.'
            );

        }

    };


    // =========================================================
    // VIEW REQUEST
    // =========================================================

    const handleView = (request) => {

        setSelectedRequest({
            ...request
        });

    };


    // =========================================================
    // DELETE REQUEST
    // =========================================================

    const handleDelete = (requestId) => {

        const confirmDelete =
            window.confirm(
                'Are you sure you want to delete this maintenance request?'
            );


        if (!confirmDelete) {

            return;

        }


        const updatedRequests =
            requests.filter(
                (request) =>
                    request.id !== requestId
            );


        setRequests(updatedRequests);


        localStorage.setItem(
            'maintenanceRequests',
            JSON.stringify(
                updatedRequests
            )
        );

    };


    // =========================================================
    // SAVE EDITED REQUEST
    // =========================================================

    const handleSaveChanges = () => {

        if (!selectedRequest) {

            return;

        }


        const updatedRequests =
            requests.map(
                (request) =>
                    request.id === selectedRequest.id
                        ? selectedRequest
                        : request
            );


        setRequests(updatedRequests);


        localStorage.setItem(
            'maintenanceRequests',
            JSON.stringify(
                updatedRequests
            )
        );


        setSelectedRequest(null);


        alert(
            'Maintenance request updated successfully!'
        );

    };


    // =========================================================
    // STATISTICS
    // =========================================================

    const submittedCount =
        requests.filter(
            (request) =>
                request.status === 'Submitted'
        ).length;


    const assignedCount =
        requests.filter(
            (request) =>
                request.status === 'Assigned'
        ).length;


    const progressCount =
        requests.filter(
            (request) =>
                request.status === 'In Progress'
        ).length;


    const completedCount =
        requests.filter(
            (request) =>
                request.status === 'Completed'
        ).length;


    // =========================================================
    // SEARCH + FILTER
    // =========================================================

    const filteredRequests =
        requests.filter((request) => {

            const search =
                searchTerm
                    .toLowerCase()
                    .trim();


            const matchesSearch =

                request.id
                    .toLowerCase()
                    .includes(search)

                ||

                request.category
                    .toLowerCase()
                    .includes(search)

                ||

                request.description
                    .toLowerCase()
                    .includes(search)

                ||

                request.technician
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =

                statusFilter === ''

                ||

                request.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    // =========================================================
    // STATUS BADGE
    // =========================================================

    const getStatusClass = (status) => {

        return status
            .toLowerCase()
            .replace(/\s+/g, '-');

    };


    // =========================================================
    // PRIORITY BADGE
    // =========================================================

    const getPriorityClass = (priority) => {

        return priority
            ? priority.toLowerCase()
            : '';

    };


    // =========================================================
    // RATING DISPLAY
    // =========================================================

    const renderRating = (rating) => {

        if (!rating) {

            return 'Not Rated';

        }


        const ratingNumber =
            Number(rating);


        return (
            '★'.repeat(ratingNumber) +
            '☆'.repeat(5 - ratingNumber)
        );

    };


    // =========================================================
    // JSX
    // =========================================================

    return (

        <div className="maintenance-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        Maintenance Requests
                    </h1>

                    <p>
                        Submit and track maintenance
                        requests for your unit.
                    </p>

                </div>


                <button
                    className="new-request-btn"
                    onClick={() =>
                        setShowForm(true)
                    }
                >
                    + New Request
                </button>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

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


            {/* =================================================
                REQUEST CARD
            ================================================= */}

            <div className="maintenance-card">


                <div className="requests-toolbar">


                    <h2>
                        My Maintenance Requests
                    </h2>


                    {/* SEARCH */}

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


                    {/* STATUS FILTER */}

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


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {filteredRequests.length === 0 ? (

                    <p>
                        No maintenance requests found.
                    </p>

                ) : (


                    /* =================================================
                       TABLE
                    ================================================= */

                    <table className="maintenance-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Issue
                                </th>

                                <th>
                                    Priority
                                </th>

                                <th>
                                    Technician
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredRequests.map(
                                (request) => (

                                    <tr
                                        key={request.id}
                                    >


                                        {/* ID */}

                                        <td>
                                            {request.id}
                                        </td>


                                        {/* ISSUE */}

                                        <td>
                                            {request.category}
                                        </td>


                                        {/* PRIORITY */}

                                        <td>

                                            <span
                                                className={`priority ${getPriorityClass(
                                                    request.priority
                                                )}`}
                                            >
                                                {request.priority ||
                                                    'Not Set'}
                                            </span>

                                        </td>


                                        {/* TECHNICIAN */}

                                        <td>
                                            {request.technician ||
                                                'Not Assigned'}
                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`status ${getStatusClass(
                                                    request.status
                                                )}`}
                                            >
                                                {request.status}
                                            </span>

                                        </td>


                                        {/* DATE */}

                                        <td>
                                            {request.date}
                                        </td>


                                        {/* ACTIONS */}

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


            {/* =================================================
                NEW REQUEST MODAL
            ================================================= */}

            {showForm && (

                <div className="modal-overlay">

                    <div className="modal-content">


                        <div className="modal-header">

                            <h2>
                                New Maintenance Request
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


                            {/* CATEGORY */}

                            <div className="form-group">

                                <label>
                                    Issue Category
                                </label>


                                <select
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Issue
                                    </option>

                                    <option value="Electrical">
                                        Electrical
                                    </option>

                                    <option value="Plumbing">
                                        Plumbing
                                    </option>

                                    <option value="Water Leakage">
                                        Water Leakage
                                    </option>

                                    <option value="Painting">
                                        Painting
                                    </option>

                                    <option value="Cleaning">
                                        Cleaning
                                    </option>

                                    <option value="Doors & Windows">
                                        Doors & Windows
                                    </option>

                                    <option value="Air Conditioning">
                                        Air Conditioning
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* PRIORITY */}

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


                            {/* TECHNICIAN */}

                            <div className="form-group">

                                <label>
                                    Technician
                                </label>


                                <input
                                    type="text"
                                    name="technician"
                                    value={
                                        formData.technician
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter technician name"
                                />

                            </div>


                            {/* DESCRIPTION */}

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
                                    placeholder="Describe the problem..."
                                    required
                                />

                            </div>


                            {/* VISIT DATE */}

                            <div className="form-group">

                                <label>
                                    Preferred Visit Date
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
                                />

                            </div>


                            {/* PHOTO */}

                            <div className="form-group">

                                <label>
                                    Upload Photo
                                </label>


                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* BUTTONS */}

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


            {/* =================================================
                VIEW / EDIT MODAL
            ================================================= */}

            {selectedRequest && (

                <div className="modal-overlay">

                    <div className="modal-content">


                        <div className="modal-header">

                            <h2>
                                Maintenance Request Details
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


                        {/* REQUEST ID */}

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


                        {/* CATEGORY */}

                        <div className="form-group">

                            <label>
                                Issue Category
                            </label>


                            <input
                                value={
                                    selectedRequest.category
                                }
                                readOnly
                            />

                        </div>


                        {/* PRIORITY */}

                        <div className="form-group">

                            <label>
                                Priority
                            </label>


                            <select
                                value={
                                    selectedRequest.priority ||
                                    ''
                                }
                                onChange={(e) =>
                                    setSelectedRequest({
                                        ...selectedRequest,
                                        priority:
                                            e.target.value
                                    })
                                }
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


                        {/* TECHNICIAN */}

                        <div className="form-group">

                            <label>
                                Technician
                            </label>


                            <input
                                value={
                                    selectedRequest.technician ||
                                    ''
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


                        {/* DESCRIPTION */}

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


                        {/* VISIT DATE */}

                        <div className="form-group">

                            <label>
                                Visit Date
                            </label>


                            <input
                                type="date"
                                value={
                                    selectedRequest.visitDate ||
                                    ''
                                }
                                onChange={(e) =>
                                    setSelectedRequest({
                                        ...selectedRequest,
                                        visitDate:
                                            e.target.value
                                    })
                                }
                            />

                        </div>


                        {/* COMPLETION DATE */}

                        <div className="form-group">

                            <label>
                                Completion Date
                            </label>


                            <input
                                type="date"
                                value={
                                    selectedRequest.completionDate ||
                                    ''
                                }
                                onChange={(e) =>
                                    setSelectedRequest({
                                        ...selectedRequest,
                                        completionDate:
                                            e.target.value
                                    })
                                }
                            />

                        </div>


                        {/* STATUS */}

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


                        {/* RATING */}

                        <div className="form-group">

                            <label>
                                Rate Completed Work
                            </label>


                            <select
                                value={
                                    selectedRequest.rating ||
                                    ''
                                }
                                onChange={(e) =>
                                    setSelectedRequest({
                                        ...selectedRequest,
                                        rating:
                                            e.target.value
                                    })
                                }
                            >

                                <option value="">
                                    Select Rating
                                </option>

                                <option value="1">
                                    ★☆☆☆☆ - Very Poor
                                </option>

                                <option value="2">
                                    ★★☆☆☆ - Poor
                                </option>

                                <option value="3">
                                    ★★★☆☆ - Average
                                </option>

                                <option value="4">
                                    ★★★★☆ - Good
                                </option>

                                <option value="5">
                                    ★★★★★ - Excellent
                                </option>

                            </select>

                        </div>


                        {/* PHOTO */}

                        {selectedRequest.photo && (

                            <div className="form-group">

                                <label>
                                    Attached Photo
                                </label>


                                <img
                                    src={
                                        selectedRequest.photo
                                    }
                                    alt="Maintenance request"
                                    style={{
                                        width: '100%',
                                        maxHeight: '300px',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd'
                                    }}
                                />

                            </div>

                        )}


                        {/* SUBMITTED DATE */}

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


                        {/* BUTTONS */}

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

export default MaintenanceRequests;