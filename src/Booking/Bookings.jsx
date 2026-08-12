import React, { useState } from 'react';
import './Bookings.css';

function Bookings() {
    const [showForm, setShowForm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [formData, setFormData] = useState({
        facility: '',
        bookingDate: '',
        startTime: '',
        endTime: '',
        purpose: ''
    });

    const [bookings, setBookings] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem('tenantBookings') || '[]'
            );
        } catch (error) {
            console.error(
                'Unable to load bookings:',
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
    // GENERATE BOOKING ID
    // ================================

    const generateBookingID = () => {
        const numbers = bookings.map((booking) => {
            const number = parseInt(
                booking.id.replace('BK', ''),
                10
            );

            return isNaN(number) ? 0 : number;
        });

        const highestNumber =
            numbers.length > 0
                ? Math.max(...numbers)
                : 0;

        return `BK${String(
            highestNumber + 1
        ).padStart(3, '0')}`;
    };

    // ================================
    // SUBMIT BOOKING
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

        const newBooking = {
            id: generateBookingID(),
            facility: formData.facility,
            bookingDate: formData.bookingDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            purpose: formData.purpose,
            status: 'Pending',
            dateCreated: today
        };

        const updatedBookings = [
            ...bookings,
            newBooking
        ];

        setBookings(updatedBookings);

        localStorage.setItem(
            'tenantBookings',
            JSON.stringify(updatedBookings)
        );

        setFormData({
            facility: '',
            bookingDate: '',
            startTime: '',
            endTime: '',
            purpose: ''
        });

        setShowForm(false);

        alert(
            'Booking request submitted successfully!'
        );
    };

    // ================================
    // DELETE BOOKING
    // ================================

    const handleDelete = (bookingId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this booking?'
        );

        if (!confirmDelete) {
            return;
        }

        const updatedBookings = bookings.filter(
            (booking) =>
                booking.id !== bookingId
        );

        setBookings(updatedBookings);

        localStorage.setItem(
            'tenantBookings',
            JSON.stringify(updatedBookings)
        );

        if (
            selectedBooking &&
            selectedBooking.id === bookingId
        ) {
            setSelectedBooking(null);
        }
    };

    // ================================
    // VIEW BOOKING
    // ================================

    const handleView = (booking) => {
        setSelectedBooking({
            ...booking
        });
    };

    // ================================
    // SAVE EDITED BOOKING
    // ================================

    const handleSaveChanges = () => {
        if (!selectedBooking) {
            return;
        }

        const updatedBookings = bookings.map(
            (booking) =>
                booking.id === selectedBooking.id
                    ? selectedBooking
                    : booking
        );

        setBookings(updatedBookings);

        localStorage.setItem(
            'tenantBookings',
            JSON.stringify(updatedBookings)
        );

        setSelectedBooking(null);

        alert(
            'Booking updated successfully!'
        );
    };

    // ================================
    // STATISTICS
    // ================================

    const pendingCount = bookings.filter(
        (booking) =>
            booking.status === 'Pending'
    ).length;

    const approvedCount = bookings.filter(
        (booking) =>
            booking.status === 'Approved'
    ).length;

    const completedCount = bookings.filter(
        (booking) =>
            booking.status === 'Completed'
    ).length;

    const cancelledCount = bookings.filter(
        (booking) =>
            booking.status === 'Cancelled'
    ).length;

    // ================================
    // SEARCH + FILTER
    // ================================

    const filteredBookings = bookings.filter(
        (booking) => {
            const search =
                searchTerm
                    .toLowerCase()
                    .trim();

            const matchesSearch =
                booking.id
                    .toLowerCase()
                    .includes(search) ||

                booking.facility
                    .toLowerCase()
                    .includes(search) ||

                booking.purpose
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                statusFilter === '' ||
                booking.status === statusFilter;

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
    // JSX
    // ================================

    return (
        <div className="booking-page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>
                    <h1>
                        Bookings
                    </h1>

                    <p>
                        Book building facilities
                        and track your reservations.
                    </p>
                </div>

                <button
                    className="new-booking-btn"
                    onClick={() =>
                        setShowForm(true)
                    }
                >
                    + New Booking
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
                        {approvedCount}
                    </div>

                    <div className="stat-label">
                        Approved
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

                <div className="stat-card">
                    <div className="stat-number">
                        {cancelledCount}
                    </div>

                    <div className="stat-label">
                        Cancelled
                    </div>
                </div>

            </div>

            {/* BOOKINGS TABLE */}

            <div className="booking-card">

                <div className="bookings-toolbar">

                    <h2>
                        My Bookings
                    </h2>

                    <input
                        type="text"
                        placeholder="Search bookings..."
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

                        <option value="Completed">
                            Completed
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>

                    </select>

                </div>

                {filteredBookings.length === 0 ? (

                    <p className="empty-state">
                        No bookings found.
                    </p>

                ) : (

                    <table className="booking-table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Facility</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredBookings.map(
                                (booking) => (

                                    <tr
                                        key={booking.id}
                                    >

                                        <td>
                                            {booking.id}
                                        </td>

                                        <td>
                                            {booking.facility}
                                        </td>

                                        <td>
                                            {booking.bookingDate}
                                        </td>

                                        <td>
                                            {booking.startTime}
                                            {' - '}
                                            {booking.endTime}
                                        </td>

                                        <td>

                                            <span
                                                className={`status ${getStatusClass(
                                                    booking.status
                                                )}`}
                                            >
                                                {booking.status}
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="table-btn"
                                                onClick={() =>
                                                    handleView(
                                                        booking
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                className="table-btn delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        booking.id
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

            {/* NEW BOOKING MODAL */}

            {showForm && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h2>
                                New Booking
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

                            {/* FACILITY */}

                            <div className="form-group">

                                <label>
                                    Facility
                                </label>

                                <select
                                    name="facility"
                                    value={
                                        formData.facility
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Facility
                                    </option>

                                    <option value="Conference Room">
                                        Conference Room
                                    </option>

                                    <option value="Meeting Room">
                                        Meeting Room
                                    </option>

                                    <option value="Gym">
                                        Gym
                                    </option>

                                    <option value="Swimming Pool">
                                        Swimming Pool
                                    </option>

                                    <option value="Parking Space">
                                        Parking Space
                                    </option>

                                    <option value="Event Hall">
                                        Event Hall
                                    </option>

                                </select>

                            </div>

                            {/* DATE */}

                            <div className="form-group">

                                <label>
                                    Booking Date
                                </label>

                                <input
                                    type="date"
                                    name="bookingDate"
                                    value={
                                        formData.bookingDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* START TIME */}

                            <div className="form-group">

                                <label>
                                    Start Time
                                </label>

                                <input
                                    type="time"
                                    name="startTime"
                                    value={
                                        formData.startTime
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* END TIME */}

                            <div className="form-group">

                                <label>
                                    End Time
                                </label>

                                <input
                                    type="time"
                                    name="endTime"
                                    value={
                                        formData.endTime
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* PURPOSE */}

                            <div className="form-group">

                                <label>
                                    Purpose
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
                                    placeholder="Describe the purpose of your booking..."
                                    required
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
                                    className="new-booking-btn"
                                >
                                    Submit Booking
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {/* VIEW / EDIT MODAL */}

            {selectedBooking && (

                <div className="modal-overlay">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h2>
                                Booking Details
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedBooking(null)
                                }
                            >
                                ×
                            </button>

                        </div>

                        {/* BOOKING ID */}

                        <div className="form-group">

                            <label>
                                Booking ID
                            </label>

                            <input
                                value={
                                    selectedBooking.id
                                }
                                readOnly
                            />

                        </div>

                        {/* FACILITY */}

                        <div className="form-group">

                            <label>
                                Facility
                            </label>

                            <input
                                value={
                                    selectedBooking.facility
                                }
                                readOnly
                            />

                        </div>

                        {/* DATE */}

                        <div className="form-group">

                            <label>
                                Booking Date
                            </label>

                            <input
                                type="date"
                                value={
                                    selectedBooking.bookingDate ||
                                    ''
                                }
                                onChange={(e) =>
                                    setSelectedBooking({
                                        ...selectedBooking,
                                        bookingDate:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        {/* START TIME */}

                        <div className="form-group">

                            <label>
                                Start Time
                            </label>

                            <input
                                type="time"
                                value={
                                    selectedBooking.startTime ||
                                    ''
                                }
                                onChange={(e) =>
                                    setSelectedBooking({
                                        ...selectedBooking,
                                        startTime:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        {/* END TIME */}

                        <div className="form-group">

                            <label>
                                End Time
                            </label>

                            <input
                                type="time"
                                value={
                                    selectedBooking.endTime ||
                                    ''
                                }
                                onChange={(e) =>
                                    setSelectedBooking({
                                        ...selectedBooking,
                                        endTime:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        {/* PURPOSE */}

                        <div className="form-group">

                            <label>
                                Purpose
                            </label>

                            <textarea
                                value={
                                    selectedBooking.purpose
                                }
                                onChange={(e) =>
                                    setSelectedBooking({
                                        ...selectedBooking,
                                        purpose:
                                            e.target.value
                                    })
                                }
                                rows="4"
                            />

                        </div>

                        {/* STATUS */}

                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                value={
                                    selectedBooking.status
                                }
                                onChange={(e) =>
                                    setSelectedBooking({
                                        ...selectedBooking,
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

                                <option value="Completed">
                                    Completed
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>

                        {/* CREATED DATE */}

                        <div className="form-group">

                            <label>
                                Submitted Date
                            </label>

                            <input
                                value={
                                    selectedBooking.dateCreated
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
                                    setSelectedBooking(null)
                                }
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="new-booking-btn"
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

export default Bookings;