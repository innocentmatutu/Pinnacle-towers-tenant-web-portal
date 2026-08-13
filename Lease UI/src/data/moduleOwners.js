/** Module ownership from the Pinnacle Towers team brief. Update names as the roster is confirmed. */
export const moduleOwners = {
  Dashboard: { name: 'the Dashboard module owner', role: 'Tenant Dashboard Lead' },
  'My profile': { name: 'the Tenant Profile module owner', role: 'Tenant Profile Lead' },
  Payments: { name: 'the Rent & Payments module owner', role: 'Rent & Payments Lead' },
  Maintenance: { name: 'the Maintenance module owner', role: 'Maintenance Requests Lead' },
  Bookings: { name: 'the Facility Booking module owner', role: 'Facility Booking Lead' },
  Visitors: { name: 'the Visitor Management module owner', role: 'Visitor Management Lead' },
  Documents: { name: 'the Documents module owner', role: 'Documents Lead' },
  Messages: { name: 'Rose Mulewa', role: 'UI Integration, Communication & Search Lead' },
  Announcements: { name: 'the Announcements module owner', role: 'Announcements Lead' },
  Search: { name: 'Rose Mulewa', role: 'UI Integration, Communication & Search Lead' },
};

export function getModuleOwner(title) {
  return moduleOwners[title] || { name: 'the assigned team member', role: 'Module Lead' };
}
