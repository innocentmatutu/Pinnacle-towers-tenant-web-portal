import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MyLease from './modules/lease/MyLease';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(() => window.innerWidth > 760);
  const [sidebarCompact, setSidebarCompact] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth <= 760) setMenuOpen(false);
    else setSidebarCompact(!sidebarCompact);
  };

  return (
    <div className={`app-shell ${menuOpen ? 'sidebar-visible' : 'sidebar-hidden'} ${sidebarCompact ? 'sidebar-compact' : ''}`}>
      <Sidebar menuOpen={menuOpen} sidebarCompact={sidebarCompact} toggleSidebar={toggleSidebar} />
      {menuOpen && <button className="backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      <main className="main-area">
        <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="page-content">
          <MyLease />
        </div>
        <footer>© 2026 Pinnacle Towers. All rights reserved. <span>Privacy policy</span><span>Support</span></footer>
      </main>
    </div>
  );
}
