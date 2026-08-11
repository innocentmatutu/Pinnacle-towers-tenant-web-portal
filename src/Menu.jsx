
import { useState } from "react";
import { Link } from "react-router-dom";
import './App.css'
function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="menu-container">
      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {open && (
        <div className="menu-links">
          <Link to="/Billings">Billing History</Link>
          <Link to="/documents">Documents</Link>
          <Link to="/report">Report</Link>
        </div>
      )}
    </div>
  );
}

export default Menu;