import React from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";

const STATUS = {
  // Visitor statuses
  expected: { label: "Expected", tone: "blue" },
  checked: { label: "Checked in", tone: "green" },
  completed: { label: "Completed", tone: "green" },
  // Parking statuses
  active: { label: "Active", tone: "green" },
  pending: { label: "Pending", tone: "amber" },
  approved: { label: "Approved", tone: "green" },
  rejected: { label: "Rejected", tone: "amber" },
  expired: { label: "Expired", tone: "blue" },
  cancelled: { label: "Cancelled", tone: "amber" },
};

function VisitorCard({
  visitors = [],
  isVisitor = true,
  handleViewQR,
  handleCancel,
}) {
  const initials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "SO";

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: "status amber", label: "Pending" },
      approved: { class: "status blue", label: "Approved" },
      active: { class: "status green", label: "Active" },
      completed: { class: "status green", label: "Completed" },
      cancelled: { class: "status", label: "Cancelled" },
      expired: { class: "status", label: "Expired" },
    };
    return statusMap[status] || { class: "status", label: status };
  };

  return (
    <Card className="visitor-list-card">
      <div className="list-header">
        <h3>{isVisitor ? "Visitor Activity" : "Parking Activity Requests"}</h3>
      </div>

      <div className="visitor-grid">
        {visitors.map((visitor) => {
          const subtitle = isVisitor ? visitor.phone : visitor.type;
          const statusConfig = STATUS[visitor.status] || {
            label: visitor.status,
            tone: "blue",
          };
          const statusInfo = getStatusBadge(visitor.status);
          const date = visitor.date || visitor.visitDate;
          const time = visitor.time || visitor.arrivalTime;

          return (
            <div className={`visitor-card ${visitor.status}`} key={visitor.id}>
              <div className="visitor-card-header">
                <span className="visitor-avatar">{initials(visitor.name)}</span>
                <span className={`status ${statusConfig.tone}`}>
                  {statusConfig.label}
                </span>
              </div>

              <div className="visitor-card-body">
                <h4>{visitor.name}</h4>
                <p className="visitor-phone">{subtitle}</p>
                <div className="visitor-meta">
                  {isVisitor ? (
                    <span>
                      <Icon name="file" size={14} /> {visitor.purpose}
                    </span>
                  ) : (
                    <span>
                      <Icon name="file" size={14} /> {visitor.detail}
                    </span>
                  )}
                  <span>
                    <Icon name="calendar" size={14} /> {date} at {time}
                  </span>
                </div>
              </div>

              {/* Visitor Action Controls */}
              {(isVisitor && ["expected", "pending"].includes(visitor.status) && (
                  <div className="visitor-card-footer">
                    {visitor.status === "expected" && (
                      <button
                        className="outline-button compact"
                        onClick={() => handleViewQR && handleViewQR(visitor)}
                      >
                        QR code
                      </button>
                    )}
                    <button
                      className="outline-button compact"
                      onClick={() => handleCancel && handleCancel(visitor.id)}
                    >
                      Cancel
                    </button>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default VisitorCard;
