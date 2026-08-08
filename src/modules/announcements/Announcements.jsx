import { useState, useRef } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./announcements.css";

const initialNotices = [
  {
    id: 1,
    category: "water",
    title: "Planned water interruption",
    body: "Water supply will be interrupted building-wide from 9:00 AM to 3:00 PM while the main tank is cleaned and inspected. Please store enough water in advance.",
    date: "2026-08-25",
    priority: true,
    read: false,
  },
  {
    id: 2,
    category: "events",
    title: "Rooftop movie night",
    body: "Join fellow tenants for an outdoor screening on the rooftop terrace, weather permitting.",
    date: "2026-08-14",
    priority: false,
    read: false,
  },
  {
    id: 3,
    category: "security",
    title: "Updated visitor sign-in procedure",
    body: "All visitors must now be pre-registered through the portal at least 2 hours before arrival.",
    date: "2026-08-02",
    priority: false,
    read: true,
  },
  {
    id: 4,
    category: "power",
    title: "Backup generator test",
    body: "A routine 15-minute generator test will run in the evening; a brief power flicker is expected.",
    date: "2026-07-30",
    priority: false,
    read: true,
  },
];

const CATEGORY = {
  water: { label: "Water", tone: "blue" },
  power: { label: "Power", tone: "gold" },
  events: { label: "Events", tone: "wine" },
  security: { label: "Security", tone: "blue" },
  general: { label: "General", tone: "gold" },
};

const initialAlerts = [
  { id: 1, type: "rent", title: "Rent due in 5 days", detail: "KSh 24,500 due 01 September 2026", time: "2h ago", read: false },
  { id: 2, type: "payment", title: "Payment received", detail: "June rent payment confirmed", time: "3d ago", read: true },
  { id: 3, type: "approval", title: "Booking approved", detail: "Rooftop terrace · 02 August 2026", time: "5d ago", read: true },
  { id: 4, type: "approval", title: "Maintenance request closed", detail: "Kitchen sink drainage marked resolved", time: "1w ago", read: true },
];

const ALERT_ICON = { rent: "card", payment: "check", approval: "file" };

const emptyForm = { category: "general", title: "", body: "", priority: false };

export default function Announcements() {
  const [notices, setNotices] = useState(initialNotices);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState(emptyForm);

  const formRef = useRef(null);

  const toggleForm = () => {
    setShowForm((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
      return next;
    });
  };

  const publishNotice = (e) => {
    e.preventDefault();
    // TODO: POST /api/notices { category, title, body, priority }
    setNotices([
      { id: Date.now(), ...form, date: new Date().toISOString().slice(0, 10), read: false },
      ...notices,
    ]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const toggleRead = (id) => {
    // TODO: PATCH /api/notices/:id { read }
    setNotices(notices.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  const markAllAlertsRead = () => {
    // TODO: PATCH /api/alerts/mark-all-read
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  const filteredNotices = notices.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    if (filter === "priority") return n.priority;
    return n.category === filter;
  });

  const unreadCount = notices.filter((n) => !n.read).length;
  const priorityCount = notices.filter((n) => n.priority).length;
  const unreadAlerts = alerts.filter((a) => !a.read).length;

  return (
    <div className="announcements-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY & ACCESS</p>
          <h1>Announcements</h1>
        </div>
        <button className="primary-button" onClick={toggleForm}>
          <Icon name="bell" size={16} />
          {showForm ? "Close form" : "Publish notice"}
        </button>
      </div>

      <div className="summary-grid">
        <Card className="metric-card">
          <div className="card-top">
            <span className="icon-tile wine"><Icon name="bell" size={18} /></span>
          </div>
          <p>Unread notices</p>
          <h2>{unreadCount}</h2>
          <small>out of {notices.length} total</small>
        </Card>
        <Card className="metric-card">
          <div className="card-top">
            <span className="icon-tile gold"><Icon name="check" size={18} /></span>
          </div>
          <p>Priority alerts</p>
          <h2>{priorityCount}</h2>
          <small>flagged as urgent</small>
        </Card>
        <Card className="metric-card">
          <div className="card-top">
            <span className="icon-tile blue"><Icon name="card" size={18} /></span>
          </div>
          <p>In-app alerts</p>
          <h2>{unreadAlerts}</h2>
          <small>unread in notification center</small>
        </Card>
      </div>

      {showForm && (
        <div ref={formRef}>
          <Card className="notice-form-card">
            <div className="card-top">
              <h3>Publish a notice</h3>
            </div>
            <form onSubmit={publishNotice} className="notice-form">
              <div className="notice-form-grid">
                <label>
                  Category
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {Object.entries(CATEGORY).map(([key, c]) => (
                      <option key={key} value={key}>{c.label}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Title
                  <input
                    required
                    placeholder="e.g. Planned water interruption"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </label>
              </div>
              <label className="notice-body-label">
                Message
                <textarea
                  required
                  rows={3}
                  placeholder="Details tenants need to know"
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                />
              </label>
              <label className="notice-priority">
                <input
                  type="checkbox"
                  checked={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.checked })}
                />
                Mark as priority / urgent
              </label>
              <div className="form-actions">
                <button type="button" className="outline-button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Publish notice
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <Card className="notice-list-card">
        <div className="list-header">
          <h3>All notices</h3>
          <div className="filter-tabs">
            {["all", "unread", "priority", "water", "power", "events", "security"].map((tab) => (
              <button key={tab} className={`tab-btn ${filter === tab ? "active" : ""}`} onClick={() => setFilter(tab)}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="notice-grid">
          {filteredNotices.map((n) => (
            <div className={`notice-card ${n.read ? "is-read" : ""}`} key={n.id}>
              <div className="notice-card-header">
                <span className={`status ${CATEGORY[n.category]?.tone || "blue"}`}>
                  {CATEGORY[n.category]?.label || n.category}
                </span>
                {n.priority && <span className="status amber">Priority</span>}
              </div>
              <h4>{n.title}</h4>
              <p>{n.body}</p>
              <div className="notice-card-footer">
                <small>{n.date}</small>
                <button className="text-button" onClick={() => toggleRead(n.id)}>
                  {n.read ? "Read" : "Mark as read"}
                </button>
              </div>
            </div>
          ))}
          {filteredNotices.length === 0 && <p className="muted">No notices match this filter.</p>}
        </div>
      </Card>

      <Card>
        <div className="card-top">
          <h3>Notification center</h3>
          <button className="text-button" onClick={markAllAlertsRead}>
            Mark all as read
          </button>
        </div>
        <div className="alert-list">
          {alerts.map((a) => (
            <div className={`alert-row ${a.read ? "" : "is-unread"}`} key={a.id}>
              <span className="alert-icon">
                <Icon name={ALERT_ICON[a.type] || "bell"} size={16} />
              </span>
              <div>
                <b>{a.title}</b>
                <small>{a.detail}</small>
              </div>
              <time>{a.time}</time>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}