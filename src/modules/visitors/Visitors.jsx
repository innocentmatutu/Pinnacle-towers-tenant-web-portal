import { useState, useRef, useEffect } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./visitors.css";

const initialVisitors = [
  {
    id: 5287456,
    name: "Daniel Kiptoo",
    phone: "+254 722 555 010",
    purpose: "Family visit",
    date: "2026-09-04",
    time: "14:00",
    status: "expected",
  },
  {
    id: 5287457,
    name: "Aisha Bello",
    phone: "+254 733 221 044",
    purpose: "Furniture delivery",
    date: "2026-08-05",
    time: "10:30",
    status: "checked",
  },
  {
    id: 5287458,
    name: "James Otieno",
    phone: "+254 700 998 112",
    purpose: "Plumbing contractor",
    date: "2026-07-30",
    time: "09:00",
    status: "completed",
  },
];

const purposes = [
  { value: 'empty', label: 'Select Option'},
  { value: 'delivery', label: 'Delivery / Courier'},
  { value: 'contractor', label: 'Contractor / Maintenance'},
  { value: 'guest', label: 'Guest / Family'},
];

const STATUS = {
  expected: { label: "Expected", tone: "blue" },
  checked: { label: "Checked in", tone: "green" },
  completed: { label: "Completed", tone: "blue" },
  cancelled: { label: "Cancelled", tone: "amber" },
};

const emptyForm = {
  name: "",
  id: "",
  phone: "",
  purpose: "",
  date: "",
  time: "",
};

export default function Visitors() {
  const [visitors, setVisitors] = useState(initialVisitors);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [qrFor, setQrFor] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const formRef = useRef(null);

  // Auto-scroll to form when opened
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

  const updateForm = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const registerVisitor = (e) => {
    e.preventDefault();
    // TODO: POST /api/visitors { name, phone, purpose, date, time }
    setVisitors([{ ...form, status: "expected" }, ...visitors]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const cancelVisitor = (id) => {
    // TODO: PATCH /api/visitors/:id { status: 'cancelled' }
    setVisitors(
      visitors.map((v) => (v.id === id ? { ...v, status: "cancelled" } : v)),
    );
    if (qrFor === id) setQrFor(null);
  };

  const filteredVisitors = visitors.filter(
    (v) => filter === "all" || v.status === filter,
  );
  const initials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="visitors-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY &amp; ACCESS</p>
          <h1>Visitor Management</h1>
        </div>
        <button className="primary-button" onClick={toggleForm}>
          <Icon name="users" size={16} />
          {showForm ? "Close form" : "Register visitor"}
        </button>
      </div>

      {/* Metrics Header */}
      <div className="summary-grid">
        <Card className="metric-card">
          <div className="card-top">
            <span className="icon-tile wine">
              <Icon name="users" size={18} />
            </span>
          </div>
          <p>Total Registered</p>
          <h2>{visitors.length}</h2>
          <small>All time visitor records</small>
        </Card>
        <Card className="metric-card">
          <div className="card-top">
            <span className="icon-tile blue">
              <Icon name="calendar" size={18} />
            </span>
          </div>
          <p>Expected Today</p>
          <h2>{visitors.filter((v) => v.status === "expected").length}</h2>
          <small>Awaiting check-in</small>
        </Card>
        <Card className="metric-card">
          <div className="card-top">
            <span className="icon-tile gold">
              <Icon name="building" size={18} />
            </span>
          </div>
          <p>Currently On Site</p>
          <h2>{visitors.filter((v) => v.status === "checked").length}</h2>
          <small>Active access passes</small>
        </Card>
      </div>

      {showForm && (
        <div ref={formRef}>
          <Card className="visitor-form-card">
            <div className="card-top">
              <div>
                <h3>Register New Visitor</h3>
                <p className="card-subtitle">
                  Generate digital entry pass for your upcoming guests
                </p>
              </div>
            </div>
            <form onSubmit={registerVisitor} className="visitor-form">
              <div className="visitor-form-grid">
                <label>
                  Full name
                  <input
                    required
                    placeholder="e.g. Daniel Kiptoo"
                    value={form.name}
                    onChange={updateForm("name")}
                  />
                </label>
                <label>
                  ID number
                  <input
                    required
                    placeholder="52923698"
                    value={form.id}
                    onChange={updateForm("id")}
                  />
                </label>
                <label>
                  Phone number
                  <input
                    required
                    placeholder="+254 704 329 664"
                    value={form.phone}
                    onChange={updateForm("phone")}
                  />
                </label>
                <label>
                  Purpose of visit
                  <select
                    required
                    value={form.purpose}
                    onChange={updateForm("purpose")}
                  >
                    <option key="delivery" value="delivery">
                      Delivery / Courier
                    </option>
                    <option key="service" value="service">
                      Service
                    </option>
                    <option key="guest" value="guest">
                      Guest / Family
                    </option>
                  </select>
                </label>
                <label>
                  Date
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={updateForm("date")}
                  />
                </label>
                <label>
                  Time
                  <input
                    required
                    type="time"
                    value={form.time}
                    onChange={updateForm("time")}
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
                  Register visitor
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Main Visitor Feed */}
      <Card className="visitor-list-card">
        <div className="list-header">
          <h3>Visitor Activity</h3>
          <div className="filter-tabs">
            {["all", "expected", "checked", "completed"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${filter === tab ? "active" : ""}`}
                onClick={() => setFilter(tab)}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="visitor-grid">
          {filteredVisitors.map((v) => (
            <div className={`visitor-card ${v.status}`} key={v.id}>
              <div className="visitor-card-header">
                <span className="visitor-avatar">{initials(v.name)}</span>
                <span className={`status ${STATUS[v.status].tone}`}>
                  {STATUS[v.status].label}
                </span>
              </div>
              <div className="visitor-card-body">
                <h4>{v.name}</h4>
                <p className="visitor-phone">{v.phone}</p>
                <div className="visitor-meta">
                  <span>
                    <Icon name="file" size={14} /> {v.purpose}
                  </span>
                  <span>
                    <Icon name="calendar" size={14} /> {v.date} at {v.time}
                  </span>
                </div>
              </div>

              {v.status === "expected" && (
                <div className="visitor-card-footer">
                  <button
                    className="outline-button compact"
                    onClick={() => setQrFor(qrFor === v.id ? null : v.id)}
                  >
                    {qrFor === v.id ? "Hide QR" : "QR code"}
                  </button>
                  <button
                    className="outline-button compact"
                    onClick={() => cancelVisitor(v.id)}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {qrFor === v.id && (
                <div className="visitor-qr-panel">
                  <div className="qr-code-box" />
                  <div className="qr-details">
                    <div>
                      <small>Visitor code</small>
                      <b>PT-VIS-{v.id}</b>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
