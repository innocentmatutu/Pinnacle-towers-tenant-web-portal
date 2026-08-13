import React from 'react';
import Icon from './Icon';

const announcements = [
    {
        id: 1,
        title: 'Planned water interruption',
        content:
            'There will be a planned water interruption across the building from 9:00 AM to 3:00 PM.',
        date: '25 July 2026',
        roles: ['tenant', 'finance', 'manager', 'maintenance', 'admin']
    },
    {
        id: 2,
        title: 'Rooftop terrace maintenance',
        content:
            'The rooftop terrace will be temporarily unavailable while scheduled maintenance is carried out.',
        date: '20 July 2026',
        roles: ['tenant', 'manager', 'maintenance']
    },
    {
        id: 3,
        title: 'Monthly financial reporting',
        content:
            'Monthly financial reports are now available for review by authorized finance personnel.',
        date: '18 July 2026',
        roles: ['finance', 'manager', 'admin']
    }
];

export default function Announcements({ user }) {
    const role = user?.role?.toLowerCase();

    const visibleAnnouncements = announcements.filter(announcement =>
        announcement.roles.includes(role)
    );

    return (
        <div className="records-page">
            <div className="page-heading">
                <div>
                    <h1>Announcements</h1>
                    <p>Important updates relevant to your role.</p>
                </div>
            </div>

            <div className="announcements-list">
                {visibleAnnouncements.length > 0 ? (
                    visibleAnnouncements.map(announcement => (
                        <article
                            key={announcement.id}
                            className="announcement-card"
                        >
                            <div className="announcement-icon">
                                <Icon name="bell" size={20} />
                            </div>

                            <div className="announcement-content">
                                <div className="announcement-header">
                                    <h2>{announcement.title}</h2>
                                    <time>{announcement.date}</time>
                                </div>

                                <p>{announcement.content}</p>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="empty-state">
                        <Icon name="bell" size={28} />
                        <h3>No announcements</h3>
                        <p>There are no announcements available for you.</p>
                    </div>
                )}
            </div>
        </div>
    );
}