// GuideDetail.jsx
import Icon from "../../components/Icon";
import Card from "../../components/Card";

const GUIDE_CONTENT = {
  "getting-started": {
    title: "Getting started with the tenant portal",
    subtitle: "A walkthrough of the dashboard, payments, and messaging.",
    steps: [
      {
        step: 1,
        title: "Explore your Dashboard",
        description: "View quick summary metrics, active announcements, and quick action shortcuts.",
        image: "../public/images/s1.png",
      },
      {
        step: 2,
        title: "Navigating the Portal",
        description: "Use the sidebar menu to navigate between Payments, Maintenance, Bookings, and Support.",
        image: "../public/images/s1.png",
      },
      {
        step: 3,
        title: "Sending Messages & Support",
        description: "Reach property management directly through the Messages module.",
        image: "../public/images/s1.png",
      },
    ],
  },
  "registering-visitor": {
    title: "Registering a visitor and generating a QR pass",
    subtitle: "Step-by-step guide to the Visitor Management module.",
    steps: [
      {
        step: 1,
        title: "Navigate to Visitors",
        description: "Click on 'Visitors' in the side menu to view expected and active visitors.",
        image: "../public/images/v1.png",
      },
      {
        step: 2,
        title: "Fill in Visitor Details",
        description: "Click 'Register visitor' and enter name, contact details, date, and time.",
        image: "../public/images/v2.png",
      },
      {
        step: 3,
        title: "Generate and Share QR Pass",
        description: "Copy or send the QR access pass to your visitor prior to arrival.",
        image: "../public/images/v1.png",
      },
    ],
  },
  "parking-permit": {
    title: "Requesting a parking permit",
    subtitle: "How to request visitor parking or an additional permit.",
    steps: [
      {
        step: 1,
        title: "Go to Parking Section",
        description: "Select 'Parking' from the sidebar menu to check your active vehicle assignments.",
        image: "../public/images/p1.png",
      },
      {
        step: 2,
        title: "Click on New Request on top right corner",
        description: "",
        image: "../public/images/p2.png",
      },
      {
        step: 2,
        title: "Submit Permit Request",
        description: "Fill in the vehicle registration details and select permit type.",
        image: "../public/images/p3.png",
      },
    ],
  },
  "booking-facility": {
    title: "Booking a shared facility",
    subtitle: "How to reserve the rooftop terrace, gym, or meeting rooms.",
    steps: [
      {
        step: 1,
        title: "Access Bookings Module",
        description: "Click 'Bookings' from the sidebar to view available amenities and slots.",
        image: "../public/images/s1.png",
      },
      {
        step: 2,
        title: "Select Date and Time Slot",
        description: "Choose your preferred date, select an open slot, and confirm your reservation.",
        image: "../public/images/s1.png",
      },
    ],
  },
};

export default function GuideDetail({ guideId, onBack }) {
  const guide = GUIDE_CONTENT[guideId] || GUIDE_CONTENT["getting-started"];

  return (
    <div className="guide-detail-page">
      <div className="page-heading">
        <div>
          <button type="button" className="outline-button compact" onClick={onBack}>
            <Icon name="back"/>
            Back to Help guides
          </button>
          <p className="eyebrow" style={{ marginTop: "8px" }}>HELP GUIDE</p>
          <h1>{guide.title}</h1>
          <p className="muted">{guide.subtitle}</p>
        </div>
      </div>

      <div className="guide-steps-list">
        {guide.steps.map((s) => (
          <Card key={s.step} className="guide-step-card">
            <div className="step-badge">Step {s.step}</div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>

            <div className="screenshot-container">
              {s.image ? (
                <img src={s.image} alt={s.title} className="screenshot-img" />
              ) : (
                <div className="screenshot-placeholder">
                  <Icon name="file" size={24} />
                  <span>Insert screenshot for Step {s.step} here</span>
                  <small>Replace <code>image: null</code> in <code>GuideDetail.jsx</code></small>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}