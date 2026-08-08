import { useState } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./support.css";

const contacts = [
  {
    title: "Property Management",
    detail: "+254 700 100 200",
    hours: "Mon–Fri, 8am–6pm",
    icon: "building",
    tone: "wine",
  },
  {
    title: "Security & Emergencies",
    detail: "+254 700 999 911",
    hours: "Available 24/7",
    icon: "bell",
    tone: "gold",
  },
  {
    title: "Maintenance Hotline",
    detail: "+254 700 555 044",
    hours: "Mon–Sat, 7am–7pm",
    icon: "tools",
    tone: "blue",
  },
];

const faqCategories = ["all", "visitors", "parking", "payments", "general"];

const faqs = [
  {
    category: "visitors",
    q: "How do I register a visitor before they arrive?",
    a: 'Go to Visitors in the sidebar, choose "Register visitor" and fill in their details at least 2 hours before arrival. They\'ll be checked in at the gate using those details.',
  },
  {
    category: "parking",
    q: "What happens if I lose my parking permit?",
    a: 'Submit a new request from the Parking page under "Additional permit" and mention that the original was lost. Management will deactivate the old permit before issuing a new one.',
  },
  {
    category: "general",
    q: "How will I know about planned maintenance or water interruptions?",
    a: "Building-wide notices are posted under Announcements and also appear in the notification bell at the top of the portal.",
  },
  {
    category: "payments",
    q: "Where can I see my past rent payments?",
    a: "Your payment history is available under Payments, including receipts for each month.",
  },
  {
    category: "general",
    q: "Who do I contact about a dispute with a neighbour?",
    a: "Reach out to Property Management using the contact details above, or submit it through Complaints & Feedback once that section is live.",
  },
];

const guides = [
  {
    title: "Getting started with the tenant portal",
    detail: "A walkthrough of the dashboard, payments, and messaging.",
  },
  {
    title: "Registering a visitor and generating a QR pass",
    detail: "Step-by-step guide to the Visitor Management module.",
  },
  {
    title: "Requesting a parking permit",
    detail: "How to request visitor parking or an additional permit.",
  },
  {
    title: "Booking a shared facility",
    detail: "How to reserve the rooftop terrace, gym, or meeting rooms.",
  },
];

function Support({ selectNav }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [category, setCategory] = useState("all");

  const filteredFaqs = faqs.filter(
    (f) => category === "all" || f.category === category,
  );

  return (
    <div className="support-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY & ACCESS</p>
          <h1>Support Centre</h1>
        </div>
      </div>

      <div className="summary-grid">
        {contacts.map((c) => (
          <Card className="metric-card" key={c.title}>
            <div className="card-top">
              <span className={`icon-tile ${c.tone}`}>
                <Icon name={c.icon} size={18} />
              </span>
            </div>
            <p>{c.title}</p>
            <h2>{c.detail}</h2>
            <div className="action">
              <small>{c.hours}</small>

              <button
                type="button"
                className="contact-msg-btn"
                style={{
                  marginTop: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onClick={() => selectNav?.("Messages")}
              >
                <Icon name="send" size={14} />
                Send message
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="faq-card">
        <div className="list-header">
          <h3>Frequently asked questions</h3>
          <div className="filter-tabs">
            {faqCategories.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${category === tab ? "active" : ""}`}
                onClick={() => setCategory(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="faq-list">
          {filteredFaqs.map((f) => (
            <div className="faq-item" key={f.q}>
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === f.q ? null : f.q)}
                aria-expanded={openFaq === f.q}
              >
                <span>{f.q}</span>
                <span className="faq-toggle" aria-hidden="true">
                  {openFaq === f.q ? "−" : "+"}
                </span>
              </button>
              {openFaq === f.q && <p className="faq-answer">{f.a}</p>}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="muted">No FAQs in this category yet.</p>
          )}
        </div>
      </Card>

      <Card>
        <div className="card-top">
          <h3>Help guides</h3>
        </div>
        <div className="guide-list">
          {guides.map((g) => (
            <div className="guide-row" key={g.title}>
              <span className="guide-icon">
                <Icon name="file" size={14} />
              </span>
              <div>
                <b>{g.title}</b>
                <small>{g.detail}</small>
              </div>
              <Icon name="arrow" size={14} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Support;
