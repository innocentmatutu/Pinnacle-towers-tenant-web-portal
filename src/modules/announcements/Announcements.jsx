import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./announcements.css";
import Nav from "../visitors/Nav";
import AnnouncementDetail from "./AnnouncementDetail";

const CATEGORY = {
  water: { label: "Water", tone: "blue" },
  power: { label: "Power", tone: "gold" },
  events: { label: "Events", tone: "wine" },
  security: { label: "Security", tone: "blue" },
  general: { label: "General", tone: "gold" },
};

const ALERT_ICON = {
  rent: "card",
  payment: "check",
  approval: "file",
  water: "water",
  security: "security",
  event: "event",
  power: "power",
  success: "check",
  maintenance: "work",
};

export default function Announcements() {
  const [filter, setFilter] = useState("all");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const loadAnnouncements = async () => {
      setLoading(true);
      setTimeout(() => {
        setAnnouncements([
          {
            id: 1,
            title: "Water Interruption Notice - 25 July 2026",
            content:
              "The building will experience a planned water interruption on 25 July 2026 from 9:00 AM to 3:00 PM. This is due to essential maintenance work on the main water supply line. Please store sufficient water in advance. Emergency water supply will be available at the ground floor lobby during this period. We apologize for any inconvenience caused.",
            category: "maintenance",
            priority: "high",
            date: "2026-07-20",
            read: false,
          },
          {
            id: 2,
            title: "Power Maintenance - 30 July 2026",
            content:
              "There will be scheduled power maintenance on 30 July 2026 from 8:00 AM to 6:00 PM. The generator will provide backup power for common areas. Please ensure all sensitive equipment is protected. During this time, the elevators will be operational but may experience intermittent service. Thank you for your cooperation.",
            category: "power",
            priority: "medium",
            date: "2026-07-22",
            read: false,
          },
          {
            id: 3,
            title: "Annual General Meeting - 15 August 2026",
            content:
              "The Annual General Meeting for all tenants will be held on 15 August 2026 at 3:00 PM in the 5th floor conference room. Agenda items include: 2025 financial review, proposed budget for 2027, election of tenant committee members, and discussion of building improvement projects. Please RSVP by 10 August 2026.",
            category: "event",
            priority: "medium",
            date: "2026-07-18",
            read: true,
          },
          {
            id: 4,
            title: "Fire Safety Drill - 5 August 2026",
            content:
              "A mandatory fire safety drill will be conducted on 5 August 2026 at 10:00 AM. All tenants and visitors must participate. Please familiarize yourself with the evacuation routes posted on each floor. Assembly point is at the main parking lot (south side). Please bring your tenant ID for attendance tracking.",
            category: "security",
            priority: "high",
            date: "2026-07-25",
            read: false,
          },
          {
            id: 5,
            category: "rent",
            title: "Rent due in 5 days",
            content: "KSh 24,500 due 01 September 2026",
            date: "2026-07-30",
            priority: "high",
            read: false,
          },
          {
            id: 6,
            category: "payment",
            title: "Payment received",
            content: "June rent payment confirmed",
            date: "2026-07-30",
            priority: "medium",
            read: true,
          },
          {
            id: 7,
            category: "success",
            title: "Booking approved",
            content: "Rooftop terrace · 02 August 2026",
            date: "2026-07-30",
            priority: "medium",
            read: true,
          },
          {
            id: 8,
            category: "success",
            title: "Maintenance request closed",
            content: "Kitchen sink drainage marked resolved",
            date: "2026-07-30",
            priority: "low",
            read: true,
          },
          {
            id: 9,
            category: "water",
            title: "Planned water interruption",
            content:
              "Water supply will be interrupted building-wide from 9:00 AM to 3:00 PM while the main tank is cleaned and inspected. Please store enough water in advance.",
            date: "2026-08-25",
            priority: "high",
            read: false,
          },
          {
            id: 10,
            category: "event",
            title: "Rooftop movie night",
            content:
              "Join fellow tenants for an outdoor screening on the rooftop terrace, weather permitting.",
            date: "2026-08-14",
            priority: "low",
            read: false,
          },
          {
            id: 11,
            category: "security",
            title: "Updated visitor sign-in procedure",
            content:
              "All visitors must now be pre-registered through the portal at least 2 hours before arrival.",
            date: "2026-08-02",
            priority: "medium",
            read: true,
          },
          {
            id: 12,
            category: "power",
            title: "Backup generator test",
            content:
              "A routine 15-minute generator test will run in the evening; a brief power flicker is expected.",
            date: "2026-07-30",
            priority: "medium",
            read: true,
          },
        ]);
        setLoading(false);
      }, 500);
    };
    loadAnnouncements();
  }, []);

  const markAsRead = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a))
    );
  };

  const markAllRead = () => {
    setAnnouncements((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const getPriorityIcon = (priority) => {
    const icons = { high: "bell", medium: "clock", low: "check" };
    return icons[priority] || "bell";
  };

  const getPriorityClass = (priority) => {
    const classes = {
      high: "priority-high",
      medium: "priority-medium",
      low: "priority-low",
    };
    return classes[priority] || "";
  };

  // Expanded filtering logic to match Nav filter options
  const filtered = announcements.filter((a) => {
    if (filter === "all") return true;
    if (filter === "read") return a.read;
    if (filter === "unread") return !a.read;
    if (filter === "priority") return a.priority === "high";
    return a.category.toLowerCase() === filter;
  });

  const selectedAnnouncement = announcements.find((a) => a.id === selectedId);
  const unreadCount = announcements.filter((a) => !a.read).length;
  const priorityCount = announcements.filter((a) => a.priority === "high").length;

  return (
    <div className="announcements-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY & ACCESS</p>
          <h1>Announcements</h1>
        </div>
      </div>

      <div className="summary-grid">
        <Card className="metric-card">
          <div className="card-top">
            <span className="icon-tile wine">
              <Icon name="bell" size={18} />
            </span>
          </div>
          <p>Unread notices</p>
          <h2>{unreadCount}</h2>
        </Card>
        <Card className="metric-card">
          <div className="card-top">
            <span className="icon-tile gold">
              <Icon name="check" size={18} />
            </span>
          </div>
          <p>Priority alerts</p>
          <h2>{priorityCount}</h2>
          <small>flagged as urgent</small>
        </Card>
      </div>

      <Nav
        filters={[
          "all",
          "rent",
          "read",
          "unread",
          "priority",
          "water",
          "power",
          "events",
          "security",
        ]}
        filter={filter}
        setFilter={setFilter}
      />

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading announcements...</p>
        </div>
      ) : filtered.length === 0 ? (
        <Card className="empty-state">
          <Icon name="bell" size={48} />
          <h3>No announcements</h3>
          <p>
            There are no {filter !== "all" ? filter : ""} announcements at this
            time.
          </p>
        </Card>
      ) : (
        <Card>
          <div className="card-top">
            <h3>Notification center</h3>
            {/* Fixed conditional syntax here */}
            {unreadCount > 0 && (
              <button className="text-button" onClick={markAllRead}>
                <Icon name="check" size={14} /> Mark all as read
              </button>
            )}
          </div>
          <div className="alert-list">
            {filtered.map((announcement) => (
              <Card
                /* Combined duplicate classNames here */
                className={`announcement-item alert-row ${
                  !announcement.read ? "unread is-unread" : ""
                }`}
                key={announcement.id}
                onClick={() => {
                  setSelectedId(announcement.id);
                  markAsRead(announcement.id);
                }}
              >
                <div>
                  <div>
                    <span
                      className={`priority-badge ${getPriorityClass(
                        announcement.priority
                      )}`}
                    >
                      <Icon
                        name={getPriorityIcon(announcement.priority)}
                        size={10}
                      />
                      {announcement.priority}
                    </span>
                    <span className="category-tag">
                      {announcement.category}
                    </span>
                  </div>

                  <span className="alert-icon">
                    <Icon
                      name={ALERT_ICON[announcement.category] || "bell"}
                      size={16}
                    />
                  </span>
                  <div>
                    <b>{announcement.title}</b>
                    <p className="announcement-excerpt">
                      {announcement.content.slice(0, 120)}...
                    </p>
                  </div>
                  <div className="announcement-meta">
                    <span>
                      <Icon name="calendar" size={12} />{" "}
                      {new Date(announcement.date).toLocaleDateString("en-KE")}
                    </span>
                    <span className="read-indicator">
                      {announcement.read ? (
                        <>
                          <Icon name="check" size={12} /> Read
                        </>
                      ) : (
                        <>
                          <Icon name="bell" size={12} /> Unread
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {selectedAnnouncement && (
        <AnnouncementDetail
          announcement={selectedAnnouncement}
          onClose={() => setSelectedId(null)}
          onMarkRead={() => markAsRead(selectedAnnouncement.id)}
        />
      )}
    </div>
  );
}