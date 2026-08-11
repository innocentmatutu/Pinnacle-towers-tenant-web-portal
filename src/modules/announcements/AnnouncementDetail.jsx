import { useState } from 'react';
import Icon from '../../components/Icon';
import './announcements.css';

export default function AnnouncementDetail({ announcement, onClose, onMarkRead }) {

  const handleMarkRead = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    onMarkRead();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content announcement-detail" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className={`priority-badge ${announcement.priority === 'high' ? 'priority-high' : 
                              announcement.priority === 'medium' ? 'priority-medium' : 'priority-low'}`}>
              {announcement.priority.toUpperCase()}
            </span>
            <span className="category-tag">{announcement.category}</span>
          </div>
          <button className="icon-button" onClick={onClose}>
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="announcement-detail-content">
          <h2>{announcement.title}</h2>
          <div className="detail-meta">
            <span><Icon name="calendar" size={14} /> {new Date(announcement.date).toLocaleDateString('en-KE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className={`read-status ${announcement.read ? 'read' : 'unread'}`}>
              {announcement.read ? 'Read' : 'Unread'}
            </span>
          </div>
          <div className="detail-content">
            {announcement.content}
          </div>
        </div>
      </div>
    </div>
  );
}