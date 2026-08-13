import React, { useState } from 'react';
import Icon from './Icon';

const messages = [
    {
        id: 1,
        from: 'Property Management',
        subject: 'Parking access card',
        preview: 'Your parking access card request has been received.',
        date: '11 August 2026',
        roles: ['tenant', 'manager', 'finance', 'maintenance', 'admin'],
        unread: true
    },
    {
        id: 2,
        from: 'Property Management',
        subject: 'Maintenance request update',
        preview: 'Your maintenance request has been assigned to a technician.',
        date: '10 August 2026',
        roles: ['tenant', 'manager', 'maintenance'],
        unread: true
    },
    {
        id: 3,
        from: 'Finance Department',
        subject: 'Payment confirmation',
        preview: 'Your latest rent payment has been successfully recorded.',
        date: '08 August 2026',
        roles: ['tenant', 'finance'],
        unread: false
    }
];

export default function Messages({ user }) {
    const role = user?.role?.toLowerCase();

    const visibleMessages = messages.filter(message =>
        message.roles.includes(role)
    );

    const [selectedMessage, setSelectedMessage] = useState(
        visibleMessages[0] || null
    );

    return (
        <div className="records-page">
            <div className="page-heading">
                <div>
                    <h1>Messages</h1>
                    <p>View messages and communication relevant to your role.</p>
                </div>
            </div>

            <div className="messages-layout">
                <div className="messages-list">
                    {visibleMessages.length > 0 ? (
                        visibleMessages.map(message => (
                            <button
                                key={message.id}
                                className={`message-item ${
                                    selectedMessage?.id === message.id
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() => setSelectedMessage(message)}
                            >
                                <span className="message-icon">
                                    <Icon name="message" size={18} />
                                </span>

                                <span className="message-summary">
                                    <strong>{message.subject}</strong>
                                    <small>{message.from}</small>
                                    <small>{message.preview}</small>
                                </span>

                                {message.unread && (
                                    <span className="message-unread"></span>
                                )}
                            </button>
                        ))
                    ) : (
                        <div className="empty-state">
                            <Icon name="message" size={28} />
                            <h3>No messages</h3>
                            <p>You currently have no messages available.</p>
                        </div>
                    )}
                </div>

                <div className="message-detail">
                    {selectedMessage ? (
                        <>
                            <div className="message-detail-header">
                                <div>
                                    <span className="message-label">
                                        MESSAGE
                                    </span>
                                    <h2>{selectedMessage.subject}</h2>
                                    <p>
                                        From: <strong>{selectedMessage.from}</strong>
                                    </p>
                                </div>

                                <time>{selectedMessage.date}</time>
                            </div>

                            <div className="message-body">
                                <p>{selectedMessage.preview}</p>
                            </div>

                            <button className="primary-button">
                                <Icon name="send" size={16} />
                                Reply
                            </button>
                        </>
                    ) : (
                        <div className="empty-state">
                            <Icon name="message" size={28} />
                            <h3>Select a message</h3>
                            <p>Choose a message from the list to view it.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}