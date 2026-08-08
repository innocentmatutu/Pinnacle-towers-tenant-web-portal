import { useState, useRef, useEffect } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import VisitorCard from "./VisitorCard";
import "./visitors.css";
import VisitorRegistration from "./VisitorRegistration";
import VisitorQRCode from "./VisitorQRCode";
import Nav from "./Nav";

const purposes = [
  { value: "empty", label: "Select Option" },
  { value: "delivery", label: "Delivery / Courier" },
  { value: "contractor", label: "Contractor / Maintenance" },
  { value: "guest", label: "Guest / Family" },
];

export default function VisitorsDashboard() {
  const [visitors, setVisitors] = useState([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading visitor data
    const loadVisitors = async () => {
      setLoading(true);
      // In production, this would be an API call
      setTimeout(() => {
        setVisitors([
          {
            id: 1,
            name: "John Mwangi",
            contact: "+254 712 345 678",
            visitDate: "2026-08-10",
            arrivalTime: "10:00",
            departureTime: "12:00",
            purpose: "Meeting with property manager",
            notes: "Discussing lease renewal",
            status: "approved",
            createdAt: "2026-08-08",
            qrCode: "data:image/svg+xml,...",
          },
          {
            id: 2,
            name: "Sarah Akinyi",
            contact: "+254 723 456 789",
            visitDate: "2026-08-09",
            arrivalTime: "14:30",
            departureTime: "16:00",
            purpose: "Package delivery",
            notes: "Large package, need help",
            status: "completed",
            createdAt: "2026-08-07",
          },
          {
            id: 3,
            name: "David Ochieng",
            contact: "+254 734 567 890",
            visitDate: "2026-08-12",
            arrivalTime: "09:00",
            departureTime: "11:00",
            purpose: "Maintenance inspection",
            notes: "Inspecting water heater",
            status: "pending",
            createdAt: "2026-08-09",
          },
          {
            id: 4,
            name: "Grace Wanjiru",
            contact: "+254 745 678 901",
            visitDate: "2026-08-08",
            arrivalTime: "16:00",
            departureTime: "18:00",
            purpose: "Family visit",
            notes: "",
            status: "cancelled",
            createdAt: "2026-08-06",
          },
          {
            id: 5,
            name: "Peter Njoroge",
            contact: "+254 756 789 012",
            visitDate: "2026-08-11",
            arrivalTime: "11:30",
            departureTime: "13:30",
            purpose: "Business meeting",
            notes: "Boardroom booking",
            status: "active",
            createdAt: "2026-08-09",
          },
          {
            id: 5287456,
            name: "Daniel Kiptoo",
            contact: "+254 722 555 010",
            purpose: "Family visit",
            notes: "Boardroom booking",
            visitDate: "2026-09-04",
            arrivalTime: "11:30",
            departureTime: "13:30",
            status: "expected",
            createdAt: "2026-08-09",
          },
          {
            id: 5287457,
            name: "Aisha Bello",
            contact: "+254 733 221 044",
            purpose: "Furniture delivery",
            notes: "Boardroom booking",
            visitDate: "2026-08-05",
            arrivalTime: "11:30",
            departureTime: "13:30",
            status: "active",
            createdAt: "2026-08-09",
          },
          {
            id: 5287458,
            name: "James Otieno",
            contact: "+254 700 998 112",
            purpose: "Plumbing contractor",
            notes: "Boardroom booking",
            visitDate: "2026-07-30",
            arrivalTime: "11:30",
            departureTime: "13:30",
            status: "completed",
            createdAt: "2026-08-09",
          },
        ]);
        setLoading(false);
      }, 800);
    };
    loadVisitors();
  }, []);

  const handleRegister = (newVisitor) => {
    setVisitors([{ ...newVisitor, status: "expected" }, ...visitors]);
    setShowRegistration(false);
  };

  const handleCancel = (id) => {
    if (
      window.confirm("Are you sure you want to cancel this visitor request?")
    ) {
      setVisitors(
        visitors.map((v) => (v.id === id ? { ...v, status: "cancelled" } : v)),
      );
    }
  };

  const handleViewQR = (visitor) => {
    setSelectedVisitor(visitor);
    setShowQR(true);
  };

  const filteredVisitors = visitors.filter(
    (v) => filter === "all" || v.status === filter,
  );
  const pendingCount = visitors.filter((v) => v.status === "pending").length;
  const activeCount = visitors.filter((v) => v.status === "active").length;

  return (
    <div className="visitors-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY &amp; ACCESS</p>
          <h1>Visitor Management</h1>
        </div>
        <button
          className="primary-button"
          onClick={() => setShowRegistration(true)}
        >
          <Icon name="users" size={16} />
          Register visitor
        </button>
      </div>

      {/* Metrics Header */}
      <div className="summary-grid">
        <Card className="visitor-summary-card">
          <div className="card-top">
            <span className="icon-tile wine">
              <Icon name="users" size={18} />
            </span>
          </div>
          <h2>{visitors.length}</h2>
          <p>All time visitor records</p>
        </Card>
        <Card className="visitor-summary-card">
          <div className="card-top">
            <span className="icon-tile blue">
              <Icon name="calendar" size={18} />
            </span>
            <span className="status blue">Expected</span>
          </div>
          <h2>{visitors.filter((v) => v.status === "expected").length}</h2>
          <p>Awaiting check-in</p>
        </Card>
        <Card className="visitor-summary-card">
          <div className="card-top">
            <span className="icon-tile gold">
              <Icon name="clock" size={18} />
            </span>
            <span className="status amber">Pending</span>
          </div>
          <h3>{pendingCount}</h3>
          <p>Awaiting approval</p>
        </Card>
        <Card className="visitor-summary-card">
          <div className="card-top">
            <span className="icon-tile green">
              <Icon name="building" size={18} />
            </span>
            <span className="status green">On Site</span>
          </div>
          <h3>{activeCount}</h3>
          <p>Currently On Site</p>
        </Card>
      </div>

      <Nav
        filters={[
          "all",
          "pending",
          "approved",
          "active",
          "completed",
          "cancelled",
        ]}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Main Visitor Feed */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading visitors...</p>
        </div>
      ) : (
        <div className="visitor-list">
          {filteredVisitors.length === 0 ? (
            <Card className="empty-state">
              <Icon name="users" size={48} />
              <h3>No visitors found</h3>
              <p>
                You don't have any {filter !== "all" ? filter : ""} visitors at
                the moment.
              </p>
              <button
                className="primary-button"
                onClick={() => setShowRegistration(true)}
              >
                Register a visitor
              </button>
            </Card>
          ) : (
            <VisitorCard
              visitors={filteredVisitors}
              isVisitor={true}
              handleViewQR={handleViewQR}
              handleCancel={handleCancel}
            />
          )}
        </div>
      )}

      {showRegistration && (
        <VisitorRegistration
          onClose={() => setShowRegistration(false)}
          onRegister={handleRegister}
        />
      )}

      {showQR && selectedVisitor && (
        <VisitorQRCode
          visitor={selectedVisitor}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
}
