import { useState } from 'react';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import './support.css';

export default function HelpGuides() {
  const [open, setOpen] = useState(null);

  const guides = [
    {
      id: 1,
      title: 'Registering a Visitor',
      content: [
        'Step 1: Navigate to the Visitor Management page from the sidebar.',
        'Step 2: Click the "Register Visitor" button to open the registration form.',
        'Step 3: Fill in all required fields: visitor name, contact information, visit date, arrival time, departure time, and purpose of visit.',
        'Step 4: Add any additional notes if applicable.',
        'Step 5: Click the "Register Visitor" button to submit the request.',
        'Step 6: You will receive a confirmation and the visitor will appear in your visitor list with a "Pending" status.'
      ]
    },
    {
      id: 2,
      title: 'Managing Visitor Requests',
      content: [
        'Step 1: Access your Visitor Management dashboard to view all visitor requests.',
        'Step 2: Use the filter tabs to view specific statuses: All, Pending, Approved, Active, Completed, Cancelled.',
        'Step 3: For pending/approved visits that need to be cancelled, click the cancel icon (X) next to the visitor.',
        'Step 4: Confirm the cancellation in the dialog box.',
        'Step 5: The visitor status will update to "Cancelled" and they will no longer be able to access the building.'
      ]
    },
    {
      id: 3,
      title: 'Using Visitor QR Codes',
      content: [
        'Step 1: Once a visitor request is approved, a QR code will be generated.',
        'Step 2: Click the QR icon next to the visitor to view the QR code.',
        'Step 3: The visitor can show this QR code at the security desk for check-in.',
        'Step 4: Security will scan the QR code to verify the visitor\'s identity and visit details.',
        'Step 5: The QR code can be regenerated if needed by clicking the "Regenerate" button in the QR code view.'
      ]
    },
    {
      id: 4,
      title: 'Parking Management',
      content: [
        'Step 1: Navigate to the Parking Management page from the sidebar.',
        'Step 2: View your allocated parking bay, level, vehicle information, and permit details.',
        'Step 3: To request visitor parking, click the "Request Parking" button.',
        'Step 4: Fill in the visitor name, vehicle make/model, plate number, date, and time range.',
        'Step 5: Submit the request. You\'ll receive updates on the request status.',
        'Step 6: View all your parking requests in the visitor parking section.'
      ]
    },
    {
      id: 5,
      title: 'Staying Updated with Announcements',
      content: [
        'Step 1: Check the Announcements page regularly for building notices.',
        'Step 2: Announcements are categorized by type: Maintenance, Utility, Events, Safety, and General.',
        'Step 3: Unread announcements are clearly marked with a dot and highlighted.',
        'Step 4: Click on any announcement to read its full content.',
        'Step 5: The announcement will automatically be marked as read when opened.',
        'Step 6: Use the "Mark all read" button to mark all announcements as read at once.'
      ]
    },
    {
      id: 6,
      title: 'Using the Notification Center',
      content: [
        'Step 1: Click the bell icon in the top bar to open the notification center.',
        'Step 2: View all recent notifications from the dropdown.',
        'Step 3: Notifications include visitor approvals, parking updates, rent reminders, and announcement alerts.',
        'Step 4: Click on a notification to view more details or take action.',
        'Step 5: Unread notifications are indicated with a dot on the bell icon.',
        'Step 6: The notification count shows how many unread notifications you have.'
      ]
    }
  ];

  const guides2 = [
  { id: "getting-started", title: "Getting started with the tenant portal", detail: "A walkthrough of the dashboard, payments, and messaging." },
  { id: "registering-visitor", title: "Registering a visitor and generating a QR pass", detail: "Step-by-step guide to the Visitor Management module." },
  { id: "parking-permit", title: "Requesting a parking permit", detail: "How to request visitor parking or an additional permit." },
  { id: "booking-facility", title: "Booking a shared facility", detail: "How to reserve the rooftop terrace, gym, or meeting rooms." },
];

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

  const toggleGuide = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="guides-section">
      <p className="section-description">
        Step-by-step guides to help you make the most of the Pinnacle Towers tenant portal.
      </p>

      <div className="guides-list">
        {guides.map(guide => (
          <div key={guide.id} className={`guide-item ${open === guide.id ? 'open' : ''}`}>
            <button className="guide-header" onClick={() => toggleGuide(guide.id)}>
              <span className="guide-number">{(guide.id).toString().padStart(2, '0')}</span>
              <h3>{guide.title}</h3>
              <Icon name={open === guide.id ? 'close' : 'arrow'} size={16} />
            </button>
            {open === guide.id && (
              <div className="guide-content">
                <ol>
                  {guide.content.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}