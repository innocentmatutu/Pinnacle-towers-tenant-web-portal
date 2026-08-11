import Icon from './Icon';

const navItems = [
['dashboard', 'Dashboard'],
['profile', 'My profile'],
['building', 'My lease'],
['card', 'Payments'],
['card', 'Billing & Payments'],
['tools', 'Maintenance'],
['calendar', 'Bookings'],
['users', 'Visitors'],
['file', 'Documents'],
['file', 'Reports'],
['message', 'Messages'],
['bell', 'Announcements']
];

export default function Sidebar({ active, selectNav, menuOpen, sidebarCompact, toggleSidebar,user }) {
  return (
    <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
      <div className="brand">
        <span className="brand-mark"><span></span><span></span><span></span></span>
        <span>Pinnacle <b>Towers</b></span>
      </div>
      <button className="sidebar-toggle" aria-label={sidebarCompact ? 'Expand sidebar' : 'Collapse sidebar'} onClick={toggleSidebar}>
        <Icon name="menu" size={18} /><span>{sidebarCompact ? 'Expand menu' : 'Collapse menu'}</span>
      </button>
      <div className="tenant-chip">
        <span className="avatar">
          {user.username?.substring(0, 2).toUpperCase() || 'U'}
        </span>

        <span>
          <strong>{user?.username || 'Tenant'}</strong>
          <small>Tenant account</small>
        </span>
      </div>
      <nav>
        {navItems.map(([icon, label]) => (
          <button key={label} className={active === label ? 'active' : ''} onClick={() => selectNav(label)}>
            <Icon name={icon} />
            <span>{label}</span>
            {label === 'Messages' && <em>2</em>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button><Icon name="pin" />Pinnacle Towers, Nairobi</button>
        <small>Tenant portal · v1.0</small>
      </div>
    </aside>
  );
}
