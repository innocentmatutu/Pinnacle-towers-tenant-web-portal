import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./announcements.css";
import Nav from "../visitors/Nav";
import AnnouncementDetail from "./AnnouncementDetail";
import { ALERT_ICON, sampleAnnouncements } from "../../constants";

export default function Announcements() {
  const [filter, setFilter] = useState("all");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const loadAnnouncements = async () => {
      setLoading(true);
      setTimeout(() => {
        setAnnouncements(sampleAnnouncements);
        setLoading(false);
      }, 500);
    };
    loadAnnouncements();
  }, []);

  const markAsRead = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a)),
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
  const priorityCount = announcements.filter(
    (a) => a.priority === "high",
  ).length;

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
          "read",
          "unread",
          "rent",
          "priority",
          "water",
          "power",
          "events",
          "security",
        ]}
        filter={filter}
        setFilter={setFilter}
        filteredList={filtered}
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
                        announcement.priority,
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
