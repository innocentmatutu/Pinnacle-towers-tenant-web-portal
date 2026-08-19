import { useEffect, useState } from 'react';
import './SystemSettings.css';

const STORAGE_KEY = 'admin_system_settings';

const DEFAULT_SETTINGS = {
    general: {
        propertyName: 'Pinnacle Towers',
        address: 'Nairobi, Kenya',
        email: 'admin@pinnacletowers.com',
        phone: '',
    },

    portal: {
        portalName: 'Pinnacle Towers Tenant Portal',
        maintenanceMode: false,
        allowTenantRegistration: true,
        allowTenantProfileEditing: true,
    },

    notifications: {
        emailNotifications: true,
        maintenanceNotifications: true,
        paymentNotifications: true,
        announcementNotifications: true,
    },

    security: {
        sessionTimeout: 30,
        strongPasswords: true,
        maxLoginAttempts: 5,
    },
};

function SystemSettings() {
    const [settings, setSettings] = useState(() => {
        const savedSettings =
            localStorage.getItem(STORAGE_KEY);

        if (savedSettings) {
            try {
                return {
                    ...DEFAULT_SETTINGS,
                    ...JSON.parse(savedSettings),
                };
            } catch {
                return DEFAULT_SETTINGS;
            }
        }

        return DEFAULT_SETTINGS;
    });

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(settings)
        );
    }, [settings]);

    const updateSetting = (section, field, value) => {
        setSettings((previous) => ({
            ...previous,
            [section]: {
                ...previous[section],
                [field]: value,
            },
        }));

        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(settings)
        );

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    const handleReset = () => {
        const confirmed = window.confirm(
            'Reset all system settings to their default values?'
        );

        if (!confirmed) {
            return;
        }

        setSettings(DEFAULT_SETTINGS);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(DEFAULT_SETTINGS)
        );

        setSaved(false);
    };

    return (
        <div className="system-settings">

            {/* HEADER */}

            <div className="system-settings-header">
                <div>
                    <h1>System Settings</h1>
                    <p>
                        Configure portal, notification and
                        security settings.
                    </p>
                </div>

                <div className="system-settings-header-actions">
                    {saved && (
                        <span className="settings-saved">
                            Settings saved
                        </span>
                    )}

                    <button
                        type="button"
                        className="settings-reset-button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>

                    <button
                        type="button"
                        className="primary-button"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            {/* GENERAL SETTINGS */}

            <section className="settings-card">
                <div className="settings-card-header">
                    <div>
                        <h2>General Settings</h2>
                        <p>
                            Basic information about the property
                            and its administration.
                        </p>
                    </div>
                </div>

                <div className="settings-form-grid">

                    <div className="settings-form-group">
                        <label htmlFor="propertyName">
                            Property Name
                        </label>

                        <input
                            id="propertyName"
                            type="text"
                            value={settings.general.propertyName}
                            onChange={(event) =>
                                updateSetting(
                                    'general',
                                    'propertyName',
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <div className="settings-form-group">
                        <label htmlFor="address">
                            Property Address
                        </label>

                        <input
                            id="address"
                            type="text"
                            value={settings.general.address}
                            onChange={(event) =>
                                updateSetting(
                                    'general',
                                    'address',
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <div className="settings-form-group">
                        <label htmlFor="adminEmail">
                            Contact Email
                        </label>

                        <input
                            id="adminEmail"
                            type="email"
                            value={settings.general.email}
                            onChange={(event) =>
                                updateSetting(
                                    'general',
                                    'email',
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <div className="settings-form-group">
                        <label htmlFor="adminPhone">
                            Contact Phone
                        </label>

                        <input
                            id="adminPhone"
                            type="text"
                            value={settings.general.phone}
                            onChange={(event) =>
                                updateSetting(
                                    'general',
                                    'phone',
                                    event.target.value
                                )
                            }
                        />
                    </div>

                </div>
            </section>

            {/* PORTAL SETTINGS */}

            <section className="settings-card">
                <div className="settings-card-header">
                    <div>
                        <h2>Portal Settings</h2>
                        <p>
                            Control how users interact with the
                            tenant portal.
                        </p>
                    </div>
                </div>

                <div className="settings-form-grid">

                    <div className="settings-form-group full-width">
                        <label htmlFor="portalName">
                            Portal Name
                        </label>

                        <input
                            id="portalName"
                            type="text"
                            value={settings.portal.portalName}
                            onChange={(event) =>
                                updateSetting(
                                    'portal',
                                    'portalName',
                                    event.target.value
                                )
                            }
                        />
                    </div>

                </div>

                <div className="settings-options">

                    <div className="settings-option">
                        <div>
                            <h3>Maintenance Mode</h3>
                            <p>
                                Temporarily restrict access while
                                system maintenance is being performed.
                            </p>
                        </div>

                        <label className="settings-toggle">
                            <input
                                type="checkbox"
                                checked={
                                    settings.portal.maintenanceMode
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        'portal',
                                        'maintenanceMode',
                                        event.target.checked
                                    )
                                }
                            />

                            <span />
                        </label>
                    </div>

                    <div className="settings-option">
                        <div>
                            <h3>Allow Tenant Registration</h3>
                            <p>
                                Allow new tenants to create portal
                                accounts.
                            </p>
                        </div>

                        <label className="settings-toggle">
                            <input
                                type="checkbox"
                                checked={
                                    settings.portal
                                        .allowTenantRegistration
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        'portal',
                                        'allowTenantRegistration',
                                        event.target.checked
                                    )
                                }
                            />

                            <span />
                        </label>
                    </div>

                    <div className="settings-option">
                        <div>
                            <h3>Allow Tenant Profile Editing</h3>
                            <p>
                                Allow tenants to update their own
                                profile information.
                            </p>
                        </div>

                        <label className="settings-toggle">
                            <input
                                type="checkbox"
                                checked={
                                    settings.portal
                                        .allowTenantProfileEditing
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        'portal',
                                        'allowTenantProfileEditing',
                                        event.target.checked
                                    )
                                }
                            />

                            <span />
                        </label>
                    </div>

                </div>
            </section>

            {/* NOTIFICATIONS */}

            <section className="settings-card">
                <div className="settings-card-header">
                    <div>
                        <h2>Notification Settings</h2>
                        <p>
                            Configure the types of notifications
                            generated by the portal.
                        </p>
                    </div>
                </div>

                <div className="settings-options">

                    <div className="settings-option">
                        <div>
                            <h3>Email Notifications</h3>
                            <p>
                                Enable email notifications throughout
                                the portal.
                            </p>
                        </div>

                        <label className="settings-toggle">
                            <input
                                type="checkbox"
                                checked={
                                    settings.notifications
                                        .emailNotifications
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        'notifications',
                                        'emailNotifications',
                                        event.target.checked
                                    )
                                }
                            />

                            <span />
                        </label>
                    </div>

                    <div className="settings-option">
                        <div>
                            <h3>Maintenance Notifications</h3>
                            <p>
                                Notify users about maintenance
                                requests and work orders.
                            </p>
                        </div>

                        <label className="settings-toggle">
                            <input
                                type="checkbox"
                                checked={
                                    settings.notifications
                                        .maintenanceNotifications
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        'notifications',
                                        'maintenanceNotifications',
                                        event.target.checked
                                    )
                                }
                            />

                            <span />
                        </label>
                    </div>

                    <div className="settings-option">
                        <div>
                            <h3>Payment Notifications</h3>
                            <p>
                                Notify users about payments,
                                invoices and billing events.
                            </p>
                        </div>

                        <label className="settings-toggle">
                            <input
                                type="checkbox"
                                checked={
                                    settings.notifications
                                        .paymentNotifications
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        'notifications',
                                        'paymentNotifications',
                                        event.target.checked
                                    )
                                }
                            />

                            <span />
                        </label>
                    </div>

                    <div className="settings-option">
                        <div>
                            <h3>Announcement Notifications</h3>
                            <p>
                                Notify users when new announcements
                                are published.
                            </p>
                        </div>

                        <label className="settings-toggle">
                            <input
                                type="checkbox"
                                checked={
                                    settings.notifications
                                        .announcementNotifications
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        'notifications',
                                        'announcementNotifications',
                                        event.target.checked
                                    )
                                }
                            />

                            <span />
                        </label>
                    </div>

                </div>
            </section>

            {/* SECURITY */}

            <section className="settings-card">
                <div className="settings-card-header">
                    <div>
                        <h2>Security Settings</h2>
                        <p>
                            Configure basic account and session
                            security policies.
                        </p>
                    </div>
                </div>

                <div className="settings-form-grid">

                    <div className="settings-form-group">
                        <label htmlFor="sessionTimeout">
                            Session Timeout
                        </label>

                        <select
                            id="sessionTimeout"
                            value={
                                settings.security.sessionTimeout
                            }
                            onChange={(event) =>
                                updateSetting(
                                    'security',
                                    'sessionTimeout',
                                    Number(event.target.value)
                                )
                            }
                        >
                            <option value={15}>
                                15 minutes
                            </option>

                            <option value={30}>
                                30 minutes
                            </option>

                            <option value={60}>
                                1 hour
                            </option>

                            <option value={120}>
                                2 hours
                            </option>
                        </select>
                    </div>

                    <div className="settings-form-group">
                        <label htmlFor="maxLoginAttempts">
                            Maximum Login Attempts
                        </label>

                        <select
                            id="maxLoginAttempts"
                            value={
                                settings.security.maxLoginAttempts
                            }
                            onChange={(event) =>
                                updateSetting(
                                    'security',
                                    'maxLoginAttempts',
                                    Number(event.target.value)
                                )
                            }
                        >
                            <option value={3}>3 attempts</option>
                            <option value={5}>5 attempts</option>
                            <option value={10}>10 attempts</option>
                        </select>
                    </div>

                </div>

                <div className="settings-options">

                    <div className="settings-option">
                        <div>
                            <h3>Require Strong Passwords</h3>
                            <p>
                                Require users to use stronger
                                passwords when creating or changing
                                credentials.
                            </p>
                        </div>

                        <label className="settings-toggle">
                            <input
                                type="checkbox"
                                checked={
                                    settings.security.strongPasswords
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        'security',
                                        'strongPasswords',
                                        event.target.checked
                                    )
                                }
                            />

                            <span />
                        </label>
                    </div>

                </div>
            </section>

            {/* BOTTOM SAVE */}

            <div className="settings-bottom-actions">
                <button
                    type="button"
                    className="settings-reset-button"
                    onClick={handleReset}
                >
                    Reset to Defaults
                </button>

                <button
                    type="button"
                    className="primary-button"
                    onClick={handleSave}
                >
                    Save Changes
                </button>
            </div>

        </div>
    );
}

export default SystemSettings;