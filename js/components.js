document.addEventListener("DOMContentLoaded", () => {
    // 1. Read the logged-in user keycard
    const user = JSON.parse(localStorage.getItem("user"));
    const sidebarContainer = document.getElementById("sidebar-container");

    if (!sidebarContainer) return; // Skip if the page doesn't use a dashboard layout

    // 2. If no user session is found, boot them back to the login screen
    if (!user) {
        window.location.href = "/index.html";
        return;
    }

    // 3. Generate dynamic navigation links based on user role from the scope
    let menuItems = '';
    
    if (user.role === 'Tenant') {
        menuItems = `
            <a href="/tenant/dashboard.html" class="nav-item"> Dashboard</a>
            <a href="/tenant/payments.html" class="nav-item"> Rent & Payments</a>
            <a href="/tenant/maintenance.html" class="nav-item"> Maintenance Requests</a>
            <a href="/tenant/booking.html" class="nav-item"> Facility Booking</a>
            <a href="/tenant/visitors.html" class="nav-item"> Visitor Management</a>
        `;
    } else if (user.role === 'Property Manager') {
        menuItems = `
            <a href="/manager/dashboard.html" class="nav-item"> Management Overview</a>
            <a href="/manager/announcements.html" class="nav-item"> Broadcast Notice</a>
            <a href="/manager/leases.html" class="nav-item"> Lease Management</a>
            <a href="/manager/reports.html" class="nav-item"> System Reports</a>
        `;
    } else if (user.role === 'Finance Officer') {
        menuItems = `
            <a href="/finance/dashboard.html" class="nav-item"> Financial Dashboard</a>
            <a href="/finance/invoices.html" class="nav-item"> Invoices & Receipts</a>
            <a href="/finance/payments.html" class="nav-item"> Rent Collections</a>
        `;
    } else if (user.role === 'Maintenance Officer') {
        menuItems = `
            <a href="/maintenance/dashboard.html" class="nav-item"> Work Orders</a>
            <a href="/maintenance/requests.html" class="nav-item"> Tenant Requests</a>
        `;
    } else if (user.role === 'Security Officer') {
        menuItems = `
            <a href="/security/dashboard.html" class="nav-item"> Security Logs</a>
            <a href="/security/visitors.html" class="nav-item"> Visitor Verification</a>
        `;
    } else if (user.role === 'System Administrator') {
        menuItems = `
            <a href="/admin/dashboard.html" class="nav-item"> System Admin</a>
            <a href="/admin/users.html" class="nav-item"> Manage User Roles</a>
        `;
    }

    // 4. Inject the updated layout shell using the exact branding parameters
    sidebarContainer.innerHTML = `
        <aside class="app-sidebar" style="width: var(--sidebar-width); background: var(--pinnacle-crimson); color: white; min-height: 100vh; position: fixed; padding: var(--spacing-md); display: flex; flex-direction: column; justify-content: space-between; box-shadow: 2px 0 10px rgba(0,0,0,0.1);">
            <div>
                <div class="brand" style="color: var(--pinnacle-gold); font-weight: bold; font-size: 1.5rem; margin-bottom: 0.5rem; letter-spacing: 0.5px;">Pinnacle Towers</div>
                <div style="font-size: 0.8rem; color: var(--pinnacle-gold); opacity: 0.8; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
                     ${user.role} Portal
                </div>
                <nav style="display: flex; flex-direction: column; gap: 8px;">
                    ${menuItems}
                </nav>
            </div>
            
            <div>
                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 0.75rem;">Logged in as: <strong>${user.username || 'User'}</strong></div>
                <button id="logout-btn" style="background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white; padding: 10px; cursor: pointer; border-radius: var(--radius-md); width: 100%; transition: all 0.2s ease-in-out;">Sign Out</button>
            </div>
        </aside>
    `;

    // Handle logout action smoothly
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "/index.html";
    });
});