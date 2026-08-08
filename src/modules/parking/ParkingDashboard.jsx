import { useState, useEffect } from "react";
import Icon from "../../components/Icon.jsx";
import Card from "../../components/Card.jsx";
import ParkingRequest from "./ParkingRequest.jsx";
import "./parking.css";
import VisitorCard from "../visitors/VisitorCard.jsx";
import Nav from "../visitors/Nav.jsx";

export default function ParkingDashboard() {
  const [parking, setParking] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showRequest, setShowRequest] = useState(false);

  useEffect(() => {
    const loadParking = async () => {
      setLoading(true);
      setTimeout(() => {
        setParking({
          bayNumber: "B-214",
          level: "Basement 2",
          status: "active",
          permitNumber: "P-2026-001",
          validFrom: "2026-01-01",
          validUntil: "2026-12-31",
          vehicle: "Toyota Camry",
          plate: "KCB 123A",
        });
        setRequests([
          {
            id: 1,
            name: "Daniel Kiptoo",
            type: "Visitor parking",
            detail: "For Daniel Kiptoo",
            status: "pending",
            date: "2026-08-05",
            time: "8:05",
          },
          {
            id: 2,
            name: "Rose Mulewa",
            type: "Additional permit",
            detail: "Second vehicle · KDB 552Q",
            status: "approved",
            date: "2026-08-05",
            time: "8:05",
          },
          {
            id: 3,
            name: "Aisha Bello",
            type: "Visitor parking",
            detail: "For Aisha Bello",
            status: "expired",
            date: "2026-08-05",
            time: "8:05",
          },
        ]);
        setLoading(false);
      }, 600);
    };
    loadParking();
  }, []);

  const getStatusBadge = (status) => {
    const map = {
      active: "green",
      pending: "amber",
      approved: "green",
      rejected: "",
      expired: "blue",
      cancelled: "",
    };
    return `status ${map[status] || ""}`;
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredRequests = requests.filter(
    (r) => filter === "all" || r.status === filter,
  );

  return (
    <div className="parking-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY & ACCESS</p>
          <h1>Parking</h1>
        </div>
        <button className="primary-button" onClick={() => setShowRequest(true)}>
          <Icon name="car" size={16} /> New Request
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading parking information...</p>
        </div>
      ) : parking ? (
        <>
          <div className="parking-grid">
            <Card className="parking-card main">
              <div className="parking-header">
                <div className="parking-header-left">
                  <span className="icon-tile gold">
                    <Icon name="pin" size={20} />
                  </span>
                  <div>
                    <h3>My Parking Bay</h3>
                    <p className="parking-subtitle">Assigned parking space</p>
                  </div>
                </div>
                <span className={getStatusBadge(parking.status)}>
                  {getStatusLabel(parking.status)}
                </span>
              </div>
              <div className="parking-details">
                <div className="parking-bay">
                  <h2>{parking.bayNumber}</h2>
                  <p>{parking.level}</p>
                </div>
                <div className="parking-info-grid">
                  <div>
                    <label>Vehicle</label>
                    <p>{parking.vehicle}</p>
                  </div>
                  <div>
                    <label>Plate Number</label>
                    <p>{parking.plate}</p>
                  </div>
                </div>
                <div className="parking-permit">
                  <div>
                    <label>Permit Number</label>
                    <p>{parking.permitNumber}</p>
                  </div>
                  <div>
                    <label>Valid Until</label>
                    <p>
                      {new Date(parking.validUntil).toLocaleDateString(
                        "en-KE",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Permit Card 
            <Card className="permit-card">
              <div className="permit-header">
                <div>
                  <span className="permit-badge">
                    <Icon name="file" size={14} /> PARKING PERMIT
                  </span>
                  <h3>Permit Details</h3>
                </div>
                <span
                  className={`status ${parking.status === "active" ? "green" : ""}`}
                >
                  {getStatusLabel(parking.status)}
                </span>
              </div>
              <div className="permit-details">
                <div className="permit-row">
                  <span className="permit-label">Permit Number</span>
                  <span className="permit-value">{parking.permitNumber}</span>
                </div>
                <div className="permit-row">
                  <span className="permit-label">Vehicle</span>
                  <span className="permit-value">{parking.vehicle}</span>
                </div>
                <div className="permit-row">
                  <span className="permit-label">Plate Number</span>
                  <span className="permit-value">{parking.plate}</span>
                </div>
                <div className="permit-row">
                  <span className="permit-label">Valid From</span>
                  <span className="permit-value">
                    {new Date(parking.validFrom).toLocaleDateString("en-KE")}
                  </span>
                </div>
                <div className="permit-row">
                  <span className="permit-label">Valid Until</span>
                  <span className="permit-value">
                    {new Date(parking.validUntil).toLocaleDateString("en-KE")}
                  </span>
                </div>
                <div className="permit-row">
                  <span className="permit-label">Parking Bay</span>
                  <span className="permit-value">
                    {parking.bayNumber} · {parking.level}
                  </span>
                </div>
              </div>
              <div className="permit-actions">
                <button className="outline-button">
                  <Icon name="download" size={14} /> Download Permit
                </button>
              </div>
            </Card>*/}
          </div>
          {/* My Parking Card - Main Bay Display */}

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

          <VisitorCard visitors={filteredRequests} isVisitor={false} />
        </>
      ) : (
        <Card className="empty-state">
          <Icon name="car" size={48} />
          <h3>No Parking Allocated</h3>
          <p>You currently don't have a parking space allocated.</p>
          <button
            className="primary-button"
            onClick={() => setShowRequest(true)}
          >
            Request Parking
          </button>
        </Card>
      )}

      {showRequest && (
        <ParkingRequest
          onClose={() => setShowRequest(false)}
          onRequest={() => {
            setShowRequest(false);
          }}
        />
      )}
    </div>
  );
}
