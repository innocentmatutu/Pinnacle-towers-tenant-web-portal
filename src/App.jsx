import { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Placeholder from "./components/Placeholder";
import Messages from "./modules/messages/Messages";
import Announcements from "./modules/announcements/Announcements";
import Support from "./modules/support/Support";
import ParkingDashboard from "./modules/parking/ParkingDashboard";
import VisitorsDashboard from "./modules/visitors/VisitorsDashboard";
import CarDashboard from "./modules/cars/CarDashboard";

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

  const renderContent = () => {
    switch (active) {
      case "Messages":
        return (
          <Messages
            message={message}
            setMessage={setMessage}
            attachment={attachment}
            fileInput={fileInput}
            setAttachment={setAttachment}
            sent={sent}
            sendMessage={sendMessage}
          />
        );
      case "My Cars":
        return <CarDashboard/>;
      case "Visitors":
        return <VisitorsDashboard selectNav={selectNav}/>;
      case "Parking":
        return <ParkingDashboard/>;
      case "Announcements":
        return <Announcements/>;
      case "Support":
        return <Support/>;
      default:
        return <Placeholder title={active} selectNav={selectNav} />;
    }
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
        <div className="page-content">{renderContent()}</div>
        <footer>
          © 2026 Pinnacle Towers. All rights reserved.{" "}
          <span>Privacy policy</span>
          <span>Support</span>
        </footer>
      </main>
    </div>
  );
}
