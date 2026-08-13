import Icon from './Icon';
import { getModuleOwner } from '../data/moduleOwners';

const otherNavItems = [
  ['dashboard', 'Dashboard'],
  ['profile', 'My profile'],
  ['card', 'Payments'],
  ['tools', 'Maintenance'],
  ['calendar', 'Bookings'],
  ['users', 'Visitors'],
  ['file', 'Documents'],
  ['message', 'Messages'],
  ['bell', 'Announcements'],
];

export default function Sidebar({ menuOpen, sidebarCompact, toggleSidebar }) {
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
        <span className="avatar">RM</span>
        <span><strong>Rose Mulewa</strong><small>Unit 12B · Tenant</small></span>
      </div>
      <nav>
        <button className="active" type="button" aria-current="page">
          <Icon name="building" />
          <span>My lease</span>
          <em>Live</em>
        </button>
        {otherNavItems.map(([icon, label]) => {
          const owner = getModuleOwner(label);
          return (
            <button
              key={label}
              type="button"
              className="nav-placeholder"
              disabled
              title={`${label} — ${owner.name} (${owner.role})`}
            >
              <Icon name={icon} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <p className="sidebar-scope-note">
        Navigation items above are placeholders. Only <strong>My lease</strong> is built in this project.
      </p>
      <div className="sidebar-bottom">
        <button type="button" disabled className="nav-placeholder"><Icon name="pin" />Pinnacle Towers, Nairobi</button>
        <small>Tenant portal · Rose Mulewa scope</small>
      </div>
    </aside>
  );
}
