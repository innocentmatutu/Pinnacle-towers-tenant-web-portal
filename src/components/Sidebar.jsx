import Icon from './Icon';

const tenantNavItems = [
    ['dashboard', 'Dashboard'],
    ['profile', 'My profile'],
    ['building', 'My lease'],
    ['card', 'Payments'],
    ['tools', 'Maintenance'],
    ['tools', 'Service Requests'],
    ['calendar', 'Bookings'],
    ['users', 'Visitors'],
    ['file', 'Documents'],
    ['file','Reports'],
    ['bell', 'Announcements'],
    ['message', 'Complaints & Feedback']
];

const financeNavItems = [
  ['dashboard', 'Dashboard'],
  ['profile', 'My profile'],
  ['card', 'Billing & Payments'],
  ['file', 'Invoices'],
  ['card', 'Rent Collections'],
  ['message', 'Messages'],
  ['bell', 'Announcements']
];

const managerNavItems = [
    ['dashboard', 'Dashboard'],
    ['profile', 'My profile'],
    ['users', 'Tenants'],
    ['building', 'Properties & Units'],
    ['tools', 'Maintenance'],
    ['calendar', 'Bookings'],
    ['users', 'Visitors'],
    ['file', 'Documents'],
    ['file', 'Reports'],
    ['message', 'Messages'],
    ['bell', 'Announcements']
];

const maintenanceNavItems = [
    ['dashboard', 'Dashboard'],
    ['profile', 'My profile'],
    ['tools', 'Maintenance'],
    ['file', 'Work Orders'],
    ['file', 'Documents'],
    ['file', 'Reports'],
    ['message', 'Messages'],
    ['bell', 'Announcements']
];

const adminNavItems = [
    ['dashboard', 'Dashboard'],
    ['profile', 'My profile'],
    ['users', 'User Management'],
    ['users', 'Roles & Permissions'],
    ['building', 'System Settings'],
    ['file', 'Reports'],
    ['file', 'Audit Logs'],
    ['message', 'Messages'],
    ['bell', 'Announcements']
];

export default function Sidebar({
  active,
  selectNav,
  menuOpen,
  sidebarCompact,
  toggleSidebar,
  user
}) {
  const role = user?.role?.toLowerCase();

  let navItems;
  let roleLabel;

  switch (role) {
      case 'finance':
          navItems = financeNavItems;
          roleLabel = 'Finance Officer';
          break;

      case 'manager':
          navItems = managerNavItems;
          roleLabel = 'Property Manager';
          break;

      case 'maintenance':
          navItems = maintenanceNavItems;
          roleLabel = 'Maintenance Officer';
          break;

      case 'admin':
          navItems = adminNavItems;
          roleLabel = 'System Administrator';
          break;

      case 'tenant':
      default:
          navItems = tenantNavItems;
          roleLabel = 'Tenant';
          break;
  }

  return (
    <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>

      <div className="brand">
        <span className="brand-mark">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <span>
          Pinnacle <b>Towers</b>
        </span>
      </div>

      <button
        className="sidebar-toggle"
        aria-label={
          sidebarCompact
            ? 'Expand sidebar'
            : 'Collapse sidebar'
        }
        onClick={toggleSidebar}
      >
        <Icon name="menu" size={18} />
        <span>
          {sidebarCompact ? 'Expand menu' : 'Collapse menu'}
        </span>
      </button>

      <div className="tenant-chip">
        <span className="avatar">
          {user?.username?.substring(0, 2).toUpperCase() || 'U'}
        </span>

        <span>
          <strong>{user?.username || 'User'}</strong>
          <small>{roleLabel}</small>
        </span>
      </div>

      <nav>
        {navItems.map(([icon, label]) => (
          <button
            key={label}
            className={active === label ? 'active' : ''}
            onClick={() => selectNav(label)}
          >
            <Icon name={icon} />

            <span>{label}</span>

            {label === 'Messages' && <em>2</em>}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button>
          <Icon name="pin" />
          Pinnacle Towers, Nairobi
        </button>

        <small>
          {roleLabel} portal · v1.0
        </small>
      </div>

    </aside>
  );
}