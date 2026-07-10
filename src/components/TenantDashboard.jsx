import React, { useState, useEffect } from 'react';
import TenantProfile from './TenantProfile';

function TenantDashboard() {
  const [activeView, setActiveView] = useState('overview'); 
  const [userSession, setUserSession] = useState({ username: 'Tenant', profilePic: null });

  // Sync profile data live from localStorage on mount and view changes
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('user')) || { username: 'Tenant' };
    setUserSession(session);
  }, [activeView]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const leaseDetails = {
    unit: 'Suite 4B - Pinnacle Towers',
    rentAmount: 'KES 85,000 / month',
    dueDate: 'August 1, 2026',
    status: 'Paid'
  };

  const maintenanceRequests = [
    { id: 'REQ-102', issue: 'AC Unit Servicing', date: '2026-07-05', status: 'In Progress', statusColor: '#ffc107' },
    { id: 'REQ-098', issue: 'Leaking Boardroom Faucet', date: '2026-06-12', status: 'Resolved', statusColor: '#28a745' }
  ];

  return (
    <div style={styles.dashboardLayout}>
      
      {/* 🧭 Left Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.brandContainer}>
            <span style={styles.mainBrand}>Pinnacle Towers</span>
            <span style={styles.subBrand}>Tenant Portal</span>
          </div>

          <hr style={styles.sidebarDivider} />

          <nav style={styles.navMenu}>
            <button 
              onClick={() => setActiveView('overview')}
              style={{
                ...styles.navItem,
                backgroundColor: activeView === 'overview' ? '#ffffff' : 'transparent',
                color: activeView === 'overview' ? '#4a0000' : '#fbcfe8',
                fontWeight: activeView === 'overview' ? '700' : '400',
                boxShadow: activeView === 'overview' ? '0 8px 16px rgba(0,0,0,0.15)' : 'none'
              }}
            >
              <span style={styles.navIcon}>📊</span> Dashboard Overview
            </button>
            
            <button 
              onClick={() => setActiveView('profile')}
              style={{
                ...styles.navItem,
                backgroundColor: activeView === 'profile' ? '#ffffff' : 'transparent',
                color: activeView === 'profile' ? '#4a0000' : '#fbcfe8',
                fontWeight: activeView === 'profile' ? '700' : '400',
                boxShadow: activeView === 'profile' ? '0 8px 16px rgba(0,0,0,0.15)' : 'none'
              }}
            >
              <span style={styles.navIcon}>⚙️</span> Profile Settings
            </button>
          </nav>
        </div>

        <div style={styles.sidebarBottom}>
          <button onClick={handleLogout} style={styles.logoutSidebarBtn}>
            🚪 Logout Session
          </button>
        </div>
      </aside>

      {/* 🖥️ Main Workspace Content Display */}
      <div style={styles.contentWorkspace}>
        {/* 👤 Top Header with Right-Aligned Avatar Badge Layout */}
        <header style={styles.topBar}>
          <span style={styles.breadCrumb}>
            Portal / {activeView === 'profile' ? 'Profile Settings' : 'Dashboard'}
          </span>
          
          <div style={styles.topUserBadge} onClick={() => setActiveView('profile')}>
            <span style={styles.topUsername}>{userSession.username}</span>
            <div style={styles.avatarMiniFrame}>
              {userSession.profilePic ? (
                <img src={userSession.profilePic} alt="User Avatar" style={styles.avatarMiniImg} />
              ) : (
                <div style={styles.avatarMiniPlaceholder}>
                  {userSession.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </header>

        <main style={styles.mainInner}>
          {activeView === 'profile' ? (
            <TenantProfile onBack={() => setActiveView('overview')} />
          ) : (
            <>
              <header style={styles.headerArea}>
                <h1 style={styles.pageTitle}>Dashboard Overview</h1>
                <p style={styles.pageSubtitle}>Manage your tenancy details, statements, and requests.</p>
              </header>

              {/* Info Metric Cards */}
              <section style={styles.cardGrid}>
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Unit Allocation</h3>
                  <p style={styles.cardValue}>{leaseDetails.unit}</p>
                  <span style={styles.cardFootnote}>Active Lease Agreement</span>
                </div>

                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Monthly Statement</h3>
                  <p style={styles.cardValue}>{leaseDetails.rentAmount}</p>
                  <span style={{ ...styles.statusBadge, backgroundColor: '#fce7f3', color: '#800000' }}>
                    Next Due: {leaseDetails.dueDate} ({leaseDetails.status})
                  </span>
                </div>
              </section>

              {/* Maintenance Logs Section */}
              <section style={styles.tableSection}>
                <div style={styles.tableHeaderRow}>
                  <h2 style={styles.sectionHeading}>Recent Maintenance Logs</h2>
                  <button style={styles.actionBtn}>+ Log New Issue</button>
                </div>

                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableThRow}>
                        <th style={styles.th}>Ticket ID</th>
                        <th style={styles.th}>Reported Issue</th>
                        <th style={styles.th}>Date Filed</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceRequests.map((req) => (
                        <tr key={req.id} style={styles.tableTdRow}>
                          <td style={{ ...styles.td, fontWeight: 'bold', color: '#4a0000' }}>{req.id}</td>
                          <td style={styles.td}>{req.issue}</td>
                          <td style={styles.td}>{req.date}</td>
                          <td style={styles.td}>
                            <span style={{ ...styles.indicatorDot, backgroundColor: req.statusColor }} />
                            {req.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </main>
      </div>

    </div>
  );
}

// Extra style updates appended to match the previous design
const styles = {
  dashboardLayout: { display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#fff5f5', fontFamily: 'sans-serif', padding: '12px', boxSizing: 'border-box' },
  sidebar: { width: '280px', backgroundColor: '#4a0000', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px 20px', boxSizing: 'border-box', zIndex: 10, borderRadius: '20px', boxShadow: '4px 4px 20px rgba(74,0,0,0.15)' },
  sidebarTop: { display: 'flex', flexDirection: 'column' },
  brandContainer: { padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '2px' },
  mainBrand: { fontSize: '1.3rem', fontWeight: '800', letterSpacing: '0.5px', color: '#ffffff' },
  subBrand: { fontSize: '0.85rem', color: '#fbcfe8', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' },
  sidebarDivider: { border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '20px 0' },
  navMenu: { display: 'flex', flexDirection: 'column', gap: '10px' },
  navItem: { display: 'flex', alignItems: 'center', width: '100%', padding: '14px 18px', border: 'none', borderRadius: '14px', fontSize: '0.95rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.25s ease' },
  navIcon: { marginRight: '12px', fontSize: '1.1rem' },
  sidebarBottom: { display: 'flex', flexDirection: 'column', gap: '16px' },
  logoutSidebarBtn: { width: '100%', padding: '14px', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fbcfe8', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' },
  contentWorkspace: { flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', marginLeft: '12px' },
  topBar: { height: '60px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', marginBottom: '16px' },
  breadCrumb: { fontSize: '0.85rem', color: '#800000', fontWeight: '600' },
  
  // New Header Right Profile Elements
  topUserBadge: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '4px 8px', borderRadius: '10px', transition: 'background 0.2s' },
  topUsername: { fontSize: '0.9rem', fontWeight: '600', color: '#4a0000' },
  avatarMiniFrame: { width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#fee2e2', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #800000' },
  avatarMiniImg: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarMiniPlaceholder: { fontSize: '0.95rem', fontWeight: '700', color: '#800000' },

  mainInner: { padding: '12px 0 24px 0', boxSizing: 'border-box' },
  headerArea: { marginBottom: '30px', paddingLeft: '8px' },
  pageTitle: { fontSize: '1.9rem', fontWeight: '800', color: '#4a0000', margin: '0 0 6px 0' },
  pageSubtitle: { fontSize: '0.95rem', color: '#7c2d12', margin: 0 },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '35px' },
  card: { backgroundColor: '#ffffff', borderRadius: '18px', padding: '26px', boxShadow: '0 10px 15px -3px rgba(74,0,0,0.03), 0 4px 6px -2px rgba(74,0,0,0.02)', borderLeft: '5px solid #800000' },
  cardTitle: { fontSize: '0.85rem', textTransform: 'uppercase', color: '#7c2d12', margin: '0 0 12px 0', fontWeight: '700', letterSpacing: '0.5px' },
  cardValue: { fontSize: '1.4rem', fontWeight: '800', color: '#4a0000', margin: '0 0 12px 0' },
  cardFootnote: { fontSize: '0.8rem', color: '#a21caf', display: 'block' },
  statusBadge: { padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', display: 'inline-block' },
  tableSection: { backgroundColor: '#ffffff', borderRadius: '20px', padding: '26px', boxShadow: '0 10px 15px -3px rgba(74,0,0,0.03)' },
  tableHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  sectionHeading: { fontSize: '1.2rem', fontWeight: '800', color: '#4a0000', margin: 0 },
  actionBtn: { padding: '10px 20px', backgroundColor: '#800000', color: '#ffffff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', boxShadow: '0 4px 12px rgba(128,0,0,0.2)' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' },
  tableThRow: { borderBottom: '2px solid #fee2e2' },
  th: { padding: '12px 16px', fontWeight: '700', color: '#7c2d12' },
  tableTdRow: { borderBottom: '1px solid #fca5a5' },
  td: { padding: '16px', color: '#4a0000' },
  indicatorDot: { display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' }
};

export default TenantDashboard;