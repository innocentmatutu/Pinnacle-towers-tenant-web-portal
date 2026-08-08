import { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Placeholder from "./components/Placeholder";
import Messages from "./modules/messages/Messages";
import Visitors from "./modules/visitors/Visitors";
import Parking from "./modules/parking/Parking";
import Announcements from "./modules/announcements/Announcements";
import Support from "./modules/support/Support";

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(() => window.innerWidth > 760);
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef(null);

  const selectNav = (label) => {
    setActive(label);
    if (window.innerWidth <= 760) setMenuOpen(false);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim() || attachment) {
      setSent(true);
      setMessage("");
      setAttachment("");
      setTimeout(() => setSent(false), 3500);
    }
  };

  const toggleSidebar = () => {
    if (window.innerWidth <= 760) setMenuOpen(false);
    else setSidebarCompact(!sidebarCompact);
  };

  return (
    <div
      className={`app-shell ${menuOpen ? "sidebar-visible" : "sidebar-hidden"} ${sidebarCompact ? "sidebar-compact" : ""}`}
    >
      <Sidebar
        active={active}
        selectNav={selectNav}
        menuOpen={menuOpen}
        sidebarCompact={sidebarCompact}
        toggleSidebar={toggleSidebar}
      />
      {menuOpen && (
        <button
          className="backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <main className="main-area">
        <Topbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          selectNav={selectNav}
        />
        <div className="page-content">
          {active === "Messages" ? (
            <Messages
              message={message}
              setMessage={setMessage}
              attachment={attachment}
              fileInput={fileInput}
              setAttachment={setAttachment}
              sent={sent}
              sendMessage={sendMessage}
            />
          ) : active === "Visitors" ? (
            <Visitors />
          ) : active === "Parking" ? (
            <Parking />
          ) : active === "Announcements" ? (
            <Announcements />
          ) : active === "Support" ? (
            <Support />
          ): (
            <Placeholder title={active} selectNav={selectNav} />
          )}
        </div>
        <footer>
          © 2026 Pinnacle Towers. All rights reserved.{" "}
          <span>Privacy policy</span>
          <span>Support</span>
        </footer>
      </main>
    </div>
  );
}
