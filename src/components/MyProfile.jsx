import React, { useState } from 'react';

const MyProfile = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username || '',
        phone: user?.phone || '',
        email: user?.email || '',
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setSaved(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setSaved(false);
    };

    const handleCancel = () => {
        setFormData({
            username: user?.username || '',
            phone: user?.phone || '',
            email: user?.email || '',
        });

        setIsEditing(false);
        setSaved(false);
    };

    const handleSave = () => {
        const updatedUser = {
            ...user,
            username: formData.username.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim()
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));

        setIsEditing(false);
        setSaved(true);

        // Update the local object used by this page
        Object.assign(user, updatedUser);
    };

    return (
        <div className="tenant-profile">

            {/* PAGE HEADER */}
            <div className="tenant-profile__header">
                <div>
                    <h1>My Profile</h1>
                    <p>
                        View and manage your personal information.
                    </p>
                </div>

                {!isEditing ? (
                    <button
                        className="tenant-profile__edit-btn"
                        onClick={handleEdit}
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="tenant-profile__actions">
                        <button
                            className="tenant-profile__cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                        <button
                            className="tenant-profile__save-btn"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            {/* SUCCESS MESSAGE */}
            {saved && (
                <div className="tenant-profile__success">
                    Profile updated successfully.
                </div>
            )}

            {/* PROFILE CARD */}
            <section className="tenant-profile__card">

                <div className="tenant-profile__avatar">
                    {formData.username
                        ? formData.username.substring(0, 2).toUpperCase()
                        : 'TE'}
                </div>

                <div className="tenant-profile__identity">
                    <h2>
                        {formData.username || 'Tenant'}
                    </h2>

                    <span className="tenant-profile__role">
                        Tenant
                    </span>
                </div>

            </section>

            {/* PERSONAL INFORMATION */}
            <section className="tenant-profile__section">

                <div className="tenant-profile__section-header">
                    <h2>Personal Information</h2>
                </div>

                <div className="tenant-profile__grid">

                    <div className="tenant-profile__field">
                        <label>Username</label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="tenant-profile__input"
                            />
                        ) : (
                            <p>
                                {formData.username || 'Not available'}
                            </p>
                        )}
                    </div>

                    <div className="tenant-profile__field">
                        <label>Account Role</label>
                        <p>Tenant</p>
                    </div>

                    <div className="tenant-profile__field">
                        <label>Tenant ID</label>
                        <p>
                            {user?.tenantId || 'TEN-402-A'}
                        </p>
                    </div>

                    <div className="tenant-profile__field">
                        <label>Phone Number</label>

                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="tenant-profile__input"
                            />
                        ) : (
                            <p>
                                {formData.phone || 'Not provided'}
                            </p>
                        )}
                    </div>

                    <div className="tenant-profile__field">
                        <label>Email Address</label>

                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                className="tenant-profile__input"
                            />
                        ) : (
                            <p>
                                {formData.email || 'Not provided'}
                            </p>
                        )}
                    </div>

                    <div className="tenant-profile__field">
                        <label>Member Since</label>
                        <p>
                            {user?.memberSince || 'March 2024'}
                        </p>
                    </div>

                </div>

            </section>

            {/* TENANCY INFORMATION */}
            <section className="tenant-profile__section">

                <div className="tenant-profile__section-header">
                    <h2>Tenancy Information</h2>
                </div>

                <div className="tenant-profile__grid">

                    <div className="tenant-profile__field">
                        <label>Unit</label>
                        <p>
                            {user?.unit || 'Unit 402, Block A'}
                        </p>
                    </div>

                    <div className="tenant-profile__field">
                        <label>Property</label>
                        <p>Pinnacle Towers, Nairobi</p>
                    </div>

                    <div className="tenant-profile__field">
                        <label>Unit Type</label>
                        <p>2-Bedroom</p>
                    </div>

                    <div className="tenant-profile__field">
                        <label>Lease Status</label>
                        <p className="tenant-profile__status">
                            Active
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
};

export default MyProfile;

