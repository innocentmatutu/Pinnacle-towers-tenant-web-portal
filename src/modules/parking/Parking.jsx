import { useState, useRef } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./parking.css";

const myBay = {
  bay: "B-214",
  level: "Basement 2",
  vehicle: "KDA 214X",
  active: true,
};

const initialRequests = [
  {
    id: 1,
    type: "Visitor parking",
    detail: "For Daniel Kiptoo",
    status: "pending",
    date: "2026-08-05"
  },
  {
    id: 2,
    type: "Additional permit",
    detail: "Second vehicle · KDB 552Q",
    status: "approved",
    date: "2026-08-05"
  },
  {
    id: 3,
    type: "Visitor parking",
    detail: "For Aisha Bello",
    status: "expired",
    date: "2026-08-05"
  },
];

const STATUS = {
  pending: { label: "Pending", tone: "amber" },
  approved: { label: "Approved", tone: "green" },
  expired: { label: "Expired", tone: "blue" },
};

const emptyForm = { type: "Visitor parking", detail: "" };

export default function Parking() {
  const [requests, setRequests] = useState(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const formRef = useRef(null);

  const toggleForm = () => {
    setShowForm((prev) => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
      return nextState;
    });
  };

  const submitRequest = (e) => {
    e.preventDefault();
    // TODO: POST /api/parking-requests { type, detail }
    setRequests([{ id: Date.now(), ...form, status: "pending" }, ...requests]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const visitorCount = requests.filter(
    (r) => r.type === "Visitor parking",
  ).length;
  const activeCount = requests.filter((r) => r.status === "approved").length;

  return (
    <div className="parking-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY & ACCESS</p>
          <h1>Parking</h1>
        </div>
        <button className="primary-button" onClick={toggleForm}>
          <Icon name="calendar" size={16} />
          {showForm ? "Close form" : "New request"}
        </button>
      </div>

      {/* Summary Grid */}
      <div className="summary-grid">
        <Card className="parking-hero-card">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="icon-tile wine">
                <Icon name="building" size={20} />
              </span>
              <span className="wine">Assigned Parking Bay</span>
            </div>
            <div className="hero-bay-id">{myBay.bay}</div>
            <p className="hero-details">
              {myBay.level} &emsp; • &emsp; Registered Vehicle:{" "}
              <strong>{myBay.vehicle}</strong>
            </p>
          </div>
          <div className="hero-status">
            <span className={`status ${myBay.active ? "green" : "amber"}`}>
              {myBay.active ? "Active" : "Inactive"}
            </span>
          </div>
        </Card>
        <Card className="parking-hero-card">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="icon-tile gold">
                <Icon name="users" size={18} />
              </span>
              <span>Visitor parking</span>
            </div>
            <div className="hero-bay-id">{visitorCount}</div>
            <p className="hero-details">requests on record</p>
          </div>
        </Card>
        <Card className="parking-hero-card">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="icon-tile blue">
                <Icon name="file" size={18} />
              </span>
              <span className="blue">Active permits</span>
            </div>
            <div className="hero-bay-id">{activeCount}</div>
            <p className="hero-details">currently approved</p>
          </div>
        </Card>
      </div>

      {/* Form Card */}
      {showForm && (
        <div ref={formRef}>
          <Card className="parking-form-card">
            <div className="card-top">
              <h3>Request Parking Permit or Change</h3>
            </div>
            <form onSubmit={submitRequest} className="parking-form">
              <div className="parking-form-grid">
                <label>
                  Request type
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option>Visitor parking</option>
                    <option>Additional permit</option>
                    <option>Bay change request</option>
                  </select>
                </label>
                <label>
                  Details
                  <input
                    required
                    placeholder="e.g. visitor name and date, or vehicle plate"
                    value={form.detail}
                    onChange={(e) =>
                      setForm({ ...form, detail: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="outline-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Submit Request
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* History Card */}
      <Card>
        <div className="card-top">
          <h3>History</h3>
          <span className="muted">{requests.length} records</span>
        </div>

        <div className="parking-table">
          <div className="table-header">
            <span>Type</span>
            <span>Details</span>
            <span>Requested On</span>
            <span>Status</span>
          </div>
          <div className="table-body">
            {requests.map((r) => (
              <div className="table-row" key={r.id}>
                <span className="col-type">
                  <Icon name="file" size={14} />
                  <b>{r.type}</b>
                </span>
                <span className="col-detail">{r.detail}</span>
                <span className="col-date">{r.date}</span>
                <span className="col-status">
                  <span className={`status ${STATUS[r.status].tone}`}>
                    {STATUS[r.status].label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
