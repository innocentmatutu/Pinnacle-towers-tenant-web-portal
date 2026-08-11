import { useState, useEffect } from "react";
import Icon from "../../components/Icon.jsx";
import Card from "../../components/Card.jsx";
import ParkingRequest from "./ParkingRequest.jsx";
import "./parking.css";
import VisitorCard from "../visitors/VisitorCard.jsx";
import Nav from "../visitors/Nav.jsx";
import { getStatusBadge, sampleBay, sampleRequests } from "../../constants/index.js";

export default function ParkingDashboard({ selectNav }) {
  const [parking, setParking] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequest, setShowRequest] = useState(false);

  useEffect(() => {
    const loadParking = async () => {
      setLoading(true);
      setTimeout(() => {
        setParking(sampleBay);
        setRequests(sampleRequests);
        setLoading(false);
      }, 600);
    };
    loadParking();
  }, []);



  return (
    <div className="parking-management">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PARKING MANAGEMENT</p>
          <h1>My Parking</h1>
        </div>
        <button className="primary-button" onClick={() => setShowRequest(true)}>
          <Icon name="car" size={16} /> Request Parking
        </button>
      </div>

      <div className="parking-grid">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading parking information...</p>
          </div>
        ) : parking ? (
          <>
            <Card className="parking-card main">
              <div className="parking-header">
                <span className="icon-tile gold">
                  <Icon name="pin" size={20} />
                </span>
                <span className={`status ${parking.status === 'active' ? 'green' : ''}`}>
                  {parking.status.charAt(0).toUpperCase() + parking.status.slice(1)}
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
                    <p>{new Date(parking.validUntil).toLocaleDateString('en-KE')}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="parking-side">
              <Card className="visitor-parking-card">
                <div className="card-top">
                  <h3>Visitor Parking</h3>
                </div>
                {requests.length === 0 ? (
                  <div className="empty-state-small">
                    <Icon name="car" size={32} />
                    <p>No visitor parking requests</p>
                    <button className="outline-button" onClick={() => setShowRequest(true)}>
                      Request visitor parking
                    </button>
                  </div>
                ) : (
                  <div className="visitor-requests">
                    {requests.map(req => (
                      <div key={req.id} className="visitor-request-item">
                        <div>
                          <strong>{req.visitorName}</strong>
                          <small>{req.brand} {req.model} ({req.plate})</small>
                        </div>
                        <span className={getStatusBadge(req.status)}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </>
        ) : (
          <Card className="empty-state">
            <Icon name="pin" size={48} />
            <h3>No Parking Allocated</h3>
            <p>You currently don't have a parking space allocated.</p>
            <button className="primary-button" onClick={() => setShowRequest(true)}>
              Request Parking
            </button>
          </Card>
        )}
      </div>

      {showRequest && (
        <ParkingRequest 
          onClose={() => setShowRequest(false)}
          onRequest={() => {
            // Add request logic
            setShowRequest(false);
          }}
        />
      )}
    </div>
  );
}