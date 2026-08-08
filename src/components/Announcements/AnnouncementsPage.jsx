import { useState, useEffect } from 'react';
import Icon from '../Icon';
import Card from '../Card';
import AnnouncementDetail from './AnnouncementDetail';
import './Announcements.css';

export default function AnnouncementsPage({ selectNav }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Store only the ID instead of the full object
  const [selectedId, setSelectedId] = useState(null); 
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadAnnouncements = async () => {
      setLoading(true);
      setTimeout(() => {
        setAnnouncements([
          {
            id: 1,
            title: 'Water Interruption Notice - 25 July 2026',
            content: 'The building will experience a planned water interruption on 25 July 2026 from 9:00 AM to 3:00 PM. This is due to essential maintenance work on the main water supply line. Please store sufficient water in advance. Emergency water supply will be available at the ground floor lobby during this period. We apologize for any inconvenience caused.',
            category: 'Maintenance',
            priority: 'high',
            date: '2026-07-20',
            read: false
          },
          {
            id: 2,
            title: 'Power Maintenance - 30 July 2026',
            content: 'There will be scheduled power maintenance on 30 July 2026 from 8:00 AM to 6:00 PM. The generator will provide backup power for common areas. Please ensure all sensitive equipment is protected. During this time, the elevators will be operational but may experience intermittent service. Thank you for your cooperation.',
            category: 'Utility',
            priority: 'medium',
            date: '2026-07-22',
            read: false
          },
          {
            id: 3,
            title: 'Annual General Meeting - 15 August 2026',
            content: 'The Annual General Meeting for all tenants will be held on 15 August 2026 at 3:00 PM in the 5th floor conference room. Agenda items include: 2025 financial review, proposed budget for 2027, election of tenant committee members, and discussion of building improvement projects. Please RSVP by 10 August 2026.',
            category: 'Events',
            priority: 'medium',
            date: '2026-07-18',
            read: true
          },
          {
            id: 4,
            title: 'Fire Safety Drill - 5 August 2026',
            content: 'A mandatory fire safety drill will be conducted on 5 August 2026 at 10:00 AM. All tenants and visitors must participate. Please familiarize yourself with the evacuation routes posted on each floor. Assembly point is at the main parking lot (south side). Please bring your tenant ID for attendance tracking.',
            category: 'Safety',
            priority: 'high',
            date: '2026-07-25',
            read: false
          }
        ]);
        setLoading(false);
      }, 500);
    };
    loadAnnouncements();
  }, []);

  const markAsRead = (id) => {
    setAnnouncements(prev => 
      prev.map(a => a.id === id ? { ...a, read: true } : a)
    );
  };

  const markAllRead = () => {
    setAnnouncements(prev => 
      prev.map(a => ({ ...a, read: true }))
    );
  };

  const getPriorityIcon = (priority) => {
    const icons = { high: 'bell', medium: 'clock', low: 'check' };
    return icons[priority] || 'bell';
  };

  const getPriorityClass = (priority) => {
    const classes = { high: 'priority-high', medium: 'priority-medium', low: 'priority-low' };
    return classes[priority] || '';
  };

  const filtered = filter === 'all' ? announcements : announcements.filter(a => a.category.toLowerCase() === filter);
  const unreadCount = announcements.filter(a => !a.read).length;

  // 2. Look up the item dynamically from the state array on every render
  const selectedAnnouncement = announcements.find(a => a.id === selectedId);

  return (
    <div className="announcements-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ANNOUNCEMENTS</p>
          <h1>Building Notices</h1>
        </div>
        <div className="announcement-actions">
          {unreadCount > 0 && (
            <button className="outline-button" onClick={markAllRead}>
              <Icon name="check" size={14} /> Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="announcements-content">
        <div className="announcement-filters">
          <button className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            All {announcements.length}
          </button>
          <button className={`filter-pill ${filter === 'maintenance' ? 'active' : ''}`} onClick={() => setFilter('maintenance')}>
            Maintenance
          </button>
          <button className={`filter-pill ${filter === 'utility' ? 'active' : ''}`} onClick={() => setFilter('utility')}>
            Utility
          </button>
          <button className={`filter-pill ${filter === 'events' ? 'active' : ''}`} onClick={() => setFilter('events')}>
            Events
          </button>
          <button className={`filter-pill ${filter === 'safety' ? 'active' : ''}`} onClick={() => setFilter('safety')}>
            Safety
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading announcements...</p>
          </div>
        ) : filtered.length === 0 ? (
          <Card className="empty-state">
            <Icon name="bell" size={48} />
            <h3>No announcements</h3>
            <p>There are no {filter !== 'all' ? filter : ''} announcements at this time.</p>
          </Card>
        ) : (
          <div className="announcement-list">
            {filtered.map(announcement => (
              <Card 
                key={announcement.id} 
                className={`announcement-item ${!announcement.read ? 'unread' : ''}`}
                onClick={() => {
                  // 3. Update active ID and mark read
                  setSelectedId(announcement.id);
                  markAsRead(announcement.id);
                }}
              >
                <div className="announcement-item-content">
                  <div className="announcement-badge">
                    <span className={`priority-badge ${getPriorityClass(announcement.priority)}`}>
                      <Icon name={getPriorityIcon(announcement.priority)} size={10} />
                      {announcement.priority}
                    </span>
                    <span className="category-tag">{announcement.category}</span>
                    {!announcement.read && <span className="unread-dot"></span>}
                  </div>
                  <h3>{announcement.title}</h3>
                  <p className="announcement-excerpt">{announcement.content.slice(0, 120)}...</p>
                  <div className="announcement-meta">
                    <span><Icon name="calendar" size={12} /> {new Date(announcement.date).toLocaleDateString('en-KE')}</span>
                    <span className="read-indicator">
                      {announcement.read ? (
                        <><Icon name="check" size={12} /> Read</>
                      ) : (
                        <><Icon name="bell" size={12} /> Unread</>
                      )}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 4. Pass the derived live object to the modal */}
      {selectedAnnouncement && (
        <AnnouncementDetail 
          announcement={selectedAnnouncement}
          onClose={() => setSelectedId(null)}
          onMarkRead={() => markAsRead(selectedAnnouncement.id)}
        />
      )}
    </div>
  );
}