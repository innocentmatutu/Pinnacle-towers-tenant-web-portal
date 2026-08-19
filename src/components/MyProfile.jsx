import React, { useEffect, useState } from 'react';

const MyProfile = ({ user, setUser }) => {
    const isFinance = user?.role === 'finance';
    const isTenant = user?.role === 'tenant';

    /*
     * Read System Settings.
     * Tenant profile editing is controlled by:
     * admin_system_settings.portal.allowTenantProfileEditing
     */
    let allowTenantProfileEditing = true;

    try {
        const systemSettings = JSON.parse(
            localStorage.getItem('admin_system_settings') || '{}'
        );

        allowTenantProfileEditing =
            systemSettings?.portal?.allowTenantProfileEditing !== false;
    } catch {
        allowTenantProfileEditing = true;
    }

    /*
     * System Settings currently controls tenant
     * profile editing. Staff profiles remain editable.
     */
    const canEditProfile =
        !isTenant || allowTenantProfileEditing;

    const roleLabels = {
        tenant: 'Tenant',
        manager: 'Property Manager',
        finance: 'Finance Officer',
        maintenance: 'Maintenance Officer',
        admin: 'System Administrator'
    };

    const displayRole = roleLabels[user?.role] || 'User';

    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username || '',
        phone: user?.phone || '',
        email: user?.email || '',
        emergencyContact: user?.emergencyContact || '',
        emergencyPhone: user?.emergencyPhone || ''
    });

    const [profilePhoto, setProfilePhoto] = useState(
        user?.profilePhoto || ''
    );

    /*
     * Keep the profile page synchronized
     * with the current user state.
     */
    useEffect(() => {
        setFormData({
            username: user?.username || '',
            phone: user?.phone || '',
            email: user?.email || '',
            emergencyContact: user?.emergencyContact || '',
            emergencyPhone: user?.emergencyPhone || ''
        });

        setProfilePhoto(user?.profilePhoto || '');
    }, [
        user?.username,
        user?.phone,
        user?.email,
        user?.emergencyContact,
        user?.emergencyPhone,
        user?.profilePhoto
    ]);

    /*
     * If System Settings disables profile editing
     * while the user is currently editing, exit edit mode.
     */
    useEffect(() => {
        if (!canEditProfile && isEditing) {
            setIsEditing(false);
            setSaved(false);
        }
    }, [canEditProfile, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setSaved(false);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('Profile photo must be 2MB or smaller.');
            e.target.value = '';
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            e.target.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const photo = reader.result;

            setProfilePhoto(photo);
            setSaved(false);
        };

        reader.onerror = () => {
            alert('Unable to read the selected photo.');
        };

        reader.readAsDataURL(file);
    };

    const handleEdit = () => {
        if (!canEditProfile) {
            return;
        }

        setIsEditing(true);
        setSaved(false);
    };

    const handleCancel = () => {
        setFormData({
            username: user?.username || '',
            phone: user?.phone || '',
            email: user?.email || '',
            emergencyContact: user?.emergencyContact || '',
            emergencyPhone: user?.emergencyPhone || ''
        });

        setProfilePhoto(user?.profilePhoto || '');

        setIsEditing(false);
        setSaved(false);
    };

    const handleSave = () => {
        if (!canEditProfile) {
            return;
        }

        const updatedUser = {
            ...user,

            username: formData.username.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),

            emergencyContact: formData.emergencyContact.trim(),
            emergencyPhone: formData.emergencyPhone.trim(),

            profilePhoto: profilePhoto
        };

        /*
         * Persist the complete updated user.
         */
        localStorage.setItem(
            'user',
            JSON.stringify(updatedUser)
        );

        /*
         * Update App.jsx global user state.
         */
        setUser(updatedUser);

        /*
         * Keep local state synchronized.
         */
        setFormData({
            username: updatedUser.username,
            phone: updatedUser.phone,
            email: updatedUser.email,
            emergencyContact: updatedUser.emergencyContact,
            emergencyPhone: updatedUser.emergencyPhone
        });

        setProfilePhoto(updatedUser.profilePhoto || '');

        setIsEditing(false);
        setSaved(true);
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

                {canEditProfile && !isEditing && (
                    <button
                        type="button"
                        className="tenant-profile__edit-btn"
                        onClick={handleEdit}
                    >
                        Edit Profile
                    </button>
                )}

                {canEditProfile && isEditing && (
                    <div className="tenant-profile__actions">

                        <button
                            type="button"
                            className="tenant-profile__cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="tenant-profile__save-btn"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>

                    </div>
                )}

            </div>

            {/* PROFILE EDITING DISABLED MESSAGE */}
            {!canEditProfile && (
                <div className="tenant-profile__success">
                    Profile editing has been disabled by the system administrator.
                </div>
            )}

            {/* SUCCESS MESSAGE */}
            {saved && (
                <div className="tenant-profile__success">
                    Profile updated successfully.
                </div>
            )}

            {/* PROFILE CARD */}
            <section className="tenant-profile__card">

                <div className="tenant-profile__avatar">

                    {profilePhoto ? (
                        <img
                            src={profilePhoto}
                            alt="Profile"
                            className="tenant-profile__avatar-image"
                        />
                    ) : (
                        formData.username
                            ? formData.username
                                .substring(0, 2)
                                .toUpperCase()
                            : 'U'
                    )}

                </div>

                <div className="tenant-profile__identity">

                    <h2>
                        {formData.username || 'User'}
                    </h2>

                    <span className="tenant-profile__role">
                        {displayRole}
                    </span>

                </div>

            </section>

            {/* PROFILE PHOTO */}
            {canEditProfile && isEditing && (
                <section className="tenant-profile__section">

                    <div className="tenant-profile__section-header">
                        <h2>Profile Photo</h2>
                    </div>

                    <div className="tenant-profile__photo-upload">

                        <label htmlFor="profile-photo">
                            Upload Photo
                        </label>

                        <input
                            id="profile-photo"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="tenant-profile__photo-input"
                        />

                        <p className="tenant-profile__photo-help">
                            JPG, PNG or other image formats.
                            Maximum size: 2MB.
                        </p>

                    </div>

                </section>
            )}

            {/* PERSONAL INFORMATION */}
            <section className="tenant-profile__section">

                <div className="tenant-profile__section-header">
                    <h2>Personal Information</h2>
                </div>

                <div className="tenant-profile__grid">

                    {/* USERNAME */}
                    <div className="tenant-profile__field">

                        <label>Username</label>

                        {isEditing && canEditProfile ? (
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

                    {/* ACCOUNT ROLE */}
                    <div className="tenant-profile__field">

                        <label>Account Role</label>

                        <p>
                            {displayRole}
                        </p>

                    </div>

                    {/* TENANT ID */}
                    {isTenant && (
                        <div className="tenant-profile__field">

                            <label>Tenant ID</label>

                            <p>
                                {user?.tenantId || 'TEN-402-A'}
                            </p>

                        </div>
                    )}

                    {/* PHONE */}
                    <div className="tenant-profile__field">

                        <label>Phone Number</label>

                        {isEditing && canEditProfile ? (
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

                    {/* EMAIL */}
                    <div className="tenant-profile__field">

                        <label>Email Address</label>

                        {isEditing && canEditProfile ? (
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

                    {/* MEMBER SINCE */}
                    <div className="tenant-profile__field">

                        <label>Member Since</label>

                        <p>
                            {user?.memberSince || 'March 2024'}
                        </p>

                    </div>

                </div>

            </section>

            {/* TENANT INFORMATION */}
            {isTenant && (
                <>

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

                                <p>
                                    Pinnacle Towers, Nairobi
                                </p>
                            </div>

                            <div className="tenant-profile__field">
                                <label>Unit Type</label>

                                <p>
                                    2-Bedroom
                                </p>
                            </div>

                            <div className="tenant-profile__field">
                                <label>Lease Status</label>

                                <p className="tenant-profile__status">
                                    Active
                                </p>
                            </div>

                        </div>

                    </section>

                    {/* EMERGENCY CONTACT */}
                    <section className="tenant-profile__section">

                        <div className="tenant-profile__section-header">
                            <h2>Emergency Contact</h2>
                        </div>

                        <div className="tenant-profile__grid">

                            <div className="tenant-profile__field">

                                <label>Contact Name</label>

                                {isEditing && canEditProfile ? (
                                    <input
                                        type="text"
                                        name="emergencyContact"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        placeholder="Enter emergency contact"
                                        className="tenant-profile__input"
                                    />
                                ) : (
                                    <p>
                                        {
                                            formData.emergencyContact ||
                                            'Not provided'
                                        }
                                    </p>
                                )}

                            </div>

                            <div className="tenant-profile__field">

                                <label>Contact Phone</label>

                                {isEditing && canEditProfile ? (
                                    <input
                                        type="tel"
                                        name="emergencyPhone"
                                        value={formData.emergencyPhone}
                                        onChange={handleChange}
                                        placeholder="Enter emergency phone"
                                        className="tenant-profile__input"
                                    />
                                ) : (
                                    <p>
                                        {
                                            formData.emergencyPhone ||
                                            'Not provided'
                                        }
                                    </p>
                                )}

                            </div>

                        </div>

                    </section>

                </>
            )}

            {/* FINANCE OFFICER INFORMATION */}
            {isFinance && (
                <section className="tenant-profile__section">

                    <div className="tenant-profile__section-header">
                        <h2>Employment Information</h2>
                    </div>

                    <div className="tenant-profile__grid">

                        <div className="tenant-profile__field">

                            <label>Department</label>

                            <p>
                                {user?.department || 'Finance'}
                            </p>

                        </div>

                        <div className="tenant-profile__field">

                            <label>Position</label>

                            <p>
                                Finance Officer
                            </p>

                        </div>

                        <div className="tenant-profile__field">

                            <label>Employee ID</label>

                            <p>
                                {user?.employeeId || 'FIN-001'}
                            </p>

                        </div>

                        <div className="tenant-profile__field">

                            <label>Work Location</label>

                            <p>
                                Pinnacle Towers, Nairobi
                            </p>

                        </div>

                    </div>

                </section>
            )}

        </div>
    );
};

export default MyProfile;


