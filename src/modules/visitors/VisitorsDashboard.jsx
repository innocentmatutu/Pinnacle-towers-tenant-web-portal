import { useState, useRef, useEffect } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./visitors.css";
import VisitorRegistration from "./VisitorRegistration";
import VisitorQRCode from "./VisitorQRCode";
import Nav from "./Nav";
import { getStatusBadge, initials, sampleVisitors } from "../../constants";

export default function VisitorsDashboard() {
  const [visitors, setVisitors] = useState([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisitors = async () => {
      setLoading(true);
      setTimeout(() => {
        setVisitors(sampleVisitors);
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
          "expected",
          "active",
          "completed",
          "cancelled",
        ]}
        filter={filter}
        setFilter={setFilter}
        filteredList={filteredVisitors}
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
              {filter === "all" && (
                <button
                  className="primary-button"
                  onClick={() => setShowRegistration(true)}
                >
                  Register a visitor
                </button>
              )}
            </Card>
          ) : (
            <Card className="visitor-list-card">
              <div className="list-header">
                <h3>Visitor Activity</h3>
              </div>

              <div className="visitor-grid">
                {filteredVisitors.map((visitor) => {
                  return (
                    <div
                      className={`visitor-card ${visitor.status}`}
                      key={visitor.id}
                    >
                      <div className="visitor-card-header">
                        <span className="visitor-avatar">
                          {initials(visitor.name)}
                        </span>
                        <span
                          className={`status ${getStatusBadge(visitor.status)}`}
                        >
                          {visitor.status}
                        </span>
                      </div>

                      <div className="visitor-card-body">
                        <h4>{visitor.name}</h4>
                        <p className="visitor-phone">{visitor.contact}</p>
                        <div className="visitor-meta">
                          <span>
                            <Icon name="file" size={14} /> {visitor.purpose}
                          </span>
                          <span>
                            <Icon name="calendar" size={14} />{" "}
                            {visitor.visitDate} at {visitor.arrivalTime}
                          </span>
                        </div>
                      </div>

                      {/* Visitor Action Controls */}
                      {["expected", "pending", "active"].includes(
                        visitor.status,
                      ) && (
                        <div className="visitor-card-footer">
                          {visitor.status === "expected" && (
                            <button
                              className="outline-button compact"
                              onClick={() => handleViewQR(visitor)}
                            >
                              QR code
                            </button>
                          )}
                          <button
                            className="outline-button compact"
                            onClick={() => {}}
                          >
                            Request Parking
                          </button>
                          <button
                            className="outline-button compact"
                            onClick={() => handleCancel(visitor.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
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
