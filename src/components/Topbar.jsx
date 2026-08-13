import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';

const notificationItems = [
  { icon: 'card', title: 'Rent due in 5 days', detail: 'KSh 24,500 due 01 August 2026', time: '2h ago' },
  { icon: 'tools', title: 'Maintenance update', detail: 'Technician assigned to kitchen sink request', time: '5h ago' },
  { icon: 'calendar', title: 'Booking confirmed', detail: 'Rooftop terrace · 02 August 2026', time: 'Yesterday' },
  { icon: 'bell', title: 'Planned water interruption', detail: 'Building-wide · 25 July, 9am - 3pm', time: '2d ago' }
];

const searchItems = [
  {
    type: 'Document',
    title: 'Lease agreement - Unit 12B',
    detail: 'Updated 12 June 2026',
    roles: ['tenant', 'manager', 'maintenance'],
    target: 'Documents'
  },
  {
    type: 'Payment',
    title: 'Rent receipt - June 2026',
    detail: 'KSh 24,500 paid',
    roles: ['tenant', 'finance'],
    target: 'Billing & Payments'
  },
  {
    type: 'Maintenance',
    title: 'Kitchen sink drainage',
    detail: 'In progress',
    roles: ['tenant', 'manager', 'maintenance'],
    target: 'Maintenance'
  },
  {
    type: 'Announcement',
    title: 'Planned water interruption',
    detail: '25 July 2026',
    roles: ['tenant', 'finance','manager', 'maintenance', 'admin'],
    target: 'Announcements'
  },
  {
    type: 'Booking',
    title: 'Rooftop terrace reservation',
    detail: '02 August 2026',
    roles: ['tenant', 'manager'],
    target: 'Bookings'
  },
  {
    type: 'Message',
    title: 'Re: Parking access card',
    detail: 'Property Management',
    roles: ['tenant', 'manager', 'finance', 'maintenance','admin'],
    target: 'Messages'
  }
];

export default function Topbar({ menuOpen, setMenuOpen, selectNav, user }) {

  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifUnread, setNotifUnread] = useState(true);
  const notifRef = useRef(null);

  const results = useMemo(
    () =>
      searchItems.filter(item => {
        const matchesRole = item.roles.includes(user?.role);

        const searchText =
          `${item.type} ${item.title} ${item.detail}`.toLowerCase();

        const matchesQuery = searchText.includes(query.toLowerCase());

        return matchesRole && matchesQuery;
      }),
    [query, user?.role]
  );

  useEffect(() => {
    if (!searchOpen) return;
    const handleClickAway = (event) => { if (searchRef.current && !searchRef.current.contains(event.target)) setSearchOpen(false); };
    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [searchOpen]);

  useEffect(() => {
    if (!notifOpen) return;
    const handleClickAway = (event) => { if (notifRef.current && !notifRef.current.contains(event.target)) setNotifOpen(false); };
    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [notifOpen]);

  const toggleNotifications = () => { setNotifOpen(open => !open); setNotifUnread(false); };

  return (
    <header className="topbar">
      <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
        <Icon name={menuOpen ? 'close' : 'menu'} />
      </button>
      <div className="search-wrap" ref={searchRef}>
        <Icon name="search" />
        <input
          value={query}
          onFocus={() => setSearchOpen(true)}
          onChange={e => { setQuery(e.target.value); setSearchOpen(true); }}
          placeholder="Search documents, payments, requests..."
          aria-label="Global search"
        />
        {(query || searchOpen) && (
          <button className="clear-search" aria-label="Close search" onClick={() => { setQuery(''); setSearchOpen(false); }}>
            <Icon name="close" size={15} />
          </button>
        )}
        {searchOpen && (
          <div className="search-results">
            <div className="results-label">Search results</div>
            {results.length ? results.map(item => (
              <button
                key={item.title}
                onClick={() => {
                  selectNav(item.target);
                  setSearchOpen(false);
                  setQuery('');
                }}
              >
                <span className="result-icon">
                  <Icon name={item.type === 'Payment' ? 'card' : item.type === 'Message' ? 'message' : item.type === 'Booking' ? 'calendar' : 'file'} size={16} />
                </span>
                <span><b>{item.title}</b><small>{item.type} · {item.detail}</small></span>
              </button>
            )) : <p className="no-results">No results found.</p>}
          </div>
        )}
      </div>
      <div className="top-actions">
        <div className="notification-wrap" ref={notifRef}>
          <button className="notification" aria-label="Notifications" onClick={toggleNotifications}>
            <Icon name="bell" />{notifUnread && <i></i>}
          </button>
          {notifOpen && (
            <div className="notification-panel">
              <div className="notification-panel-header">
                <span>Notifications</span>
                <button className="text-button" onClick={() => setNotifOpen(false)}>Close</button>
              </div>
              {notificationItems.length ? notificationItems.map(item => (
                <div key={item.title} className="notification-row">
                  <span className="result-icon"><Icon name={item.icon} size={16} /></span>
                  <span><b>{item.title}</b><small>{item.detail}</small></span>
                  <time>{item.time}</time>
                </div>
              )) : <p className="no-results">No new notifications.</p>}
            </div>
          )}
        </div>
        <button className="profile-button" onClick={() => selectNav('My profile')}>
          <span className="avatar">
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Profile"
                className="topbar-avatar-image"
              />
            ) : (
              user?.username
                ? user.username.substring(0, 2).toUpperCase()
                : 'U'
            )}
          </span>

          <span>
            <strong>{user?.username || 'User'}</strong>
          </span>
        </button>
      </div>
    </header>
  );
}

function setActiveFromSearch(item, selectNav) {
  const navigationMap = {
    Document: 'Documents',
    Payment: 'Billing & Payments',
    Maintenance: 'Maintenance',
    Announcement: 'Announcements',
    Booking: 'Bookings',
    Message: 'Messages'
  };

  const target = navigationMap[item.type];

  if (target) {
    selectNav(target);
  }
}
