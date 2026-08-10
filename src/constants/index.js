export const initials = (name) =>
  name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "SO";

export const getStatusBadge = (status) => {
  const map = {
    active: "green",
    pending: "amber",
    expected: "blue",
    rejected: "red",
    expired: "red",
    cancelled: "red",
    completed: "green",
    approved: "blue",
  };
  return `status ${map[status] || ""}`;
};

export const sampleVisitors = [
  {
    id: 1,
    name: "John Mwangi",
    contact: "+254 712 345 678",
    visitDate: "2026-08-10",
    arrivalTime: "10:00",
    departureTime: "12:00",
    purpose: "Business Meeting",
    notes: "Discussing work",
    status: "expected",
    createdAt: "2026-08-08",
    qrCode: "data:image/svg+xml,...",
  },
  {
    id: 4,
    name: "Amos Tori",
    contact: "+254 745 678 901",
    visitDate: "2026-08-08",
    arrivalTime: "16:00",
    departureTime: "18:00",
    purpose: "Family visit",
    notes: "",
    status: "active",
    createdAt: "2026-08-06",
  },
  {
    id: 2,
    name: "Sarah Akinyi",
    contact: "+254 723 456 789",
    visitDate: "2026-08-09",
    arrivalTime: "14:30",
    departureTime: "16:00",
    purpose: "Package delivery",
    notes: "Large package, need help",
    status: "completed",
    createdAt: "2026-08-07",
  },
  {
    id: 3,
    name: "David Ochieng",
    contact: "+254 734 567 890",
    visitDate: "2026-08-12",
    arrivalTime: "09:00",
    departureTime: "11:00",
    purpose: "Maintenance inspection",
    notes: "Inspecting water heater",
    status: "pending",
    createdAt: "2026-08-09",
  },
  {
    id: 4,
    name: "Grace Wanjiru",
    contact: "+254 745 678 901",
    visitDate: "2026-08-08",
    arrivalTime: "16:00",
    departureTime: "18:00",
    purpose: "Family visit",
    notes: "",
    status: "cancelled",
    createdAt: "2026-08-06",
  },
];

export const sampleBay = {
  bayNumber: "B-12",
  level: "Level 2",
  status: "active",
  permitNumber: "P-2026-001",
  validFrom: "2026-01-01",
  validUntil: "2026-12-31",
  vehicle: "Toyota Camry",
  plate: "KCB 123A",
};

export const sampleRequests = [
  {
    id: 1,
    visitorName: "Jane Doe",
    vehicle: "Honda Civic",
    plate: "KCE 456B",
    date: "2026-08-10",
    time: "10:00-12:00",
    status: "pending",
  },
  {
    id: 2,
    visitorName: "John Smith",
    vehicle: "Nissan X-Trail",
    plate: "KCF 789C",
    date: "2026-08-09",
    time: "14:00-16:00",
    status: "approved",
  },
];

export const sampleUserVehicles = [
  { id: 1, make: "BMW", model: "M3", plate: "KEG 500L", isDefault: true },
  {
    id: 2,
    make: "Toyota",
    model: "Camry",
    plate: "KDB 552Q",
    isDefault: false,
  },
];

export const guides = [
  {
    id: 1,
    title: "Registering a Visitor",
    content: [
      "Step 1: Navigate to the Visitor Management page from the sidebar.",
      'Step 2: Click the "Register Visitor" button to open the registration form.',
      "Step 3: Fill in all required fields: visitor name, contact information, visit date, arrival time, departure time, and purpose of visit.",
      "Step 4: Add any additional notes if applicable.",
      'Step 5: Click the "Register Visitor" button to submit the request.',
      'Step 6: You will receive a confirmation and the visitor will appear in your visitor list with a "Pending" status.',
    ],
  },
  {
    id: 2,
    title: "Managing Visitor Requests",
    content: [
      "Step 1: Access your Visitor Management dashboard to view all visitor requests.",
      "Step 2: Use the filter tabs to view specific statuses: All, Pending, Approved, Active, Completed, Cancelled.",
      "Step 3: For pending/approved visits that need to be cancelled, click the cancel icon (X) next to the visitor.",
      "Step 4: Confirm the cancellation in the dialog box.",
      'Step 5: The visitor status will update to "Cancelled" and they will no longer be able to access the building.',
    ],
  },
  {
    id: 3,
    title: "Using Visitor QR Codes",
    content: [
      "Step 1: Once a visitor request is approved, a QR code will be generated.",
      "Step 2: Click the QR icon next to the visitor to view the QR code.",
      "Step 3: The visitor can show this QR code at the security desk for check-in.",
      "Step 4: Security will scan the QR code to verify the visitor's identity and visit details.",
      'Step 5: The QR code can be regenerated if needed by clicking the "Regenerate" button in the QR code view.',
    ],
  },
  {
    id: 4,
    title: "Parking Management",
    content: [
      "Step 1: Navigate to the Parking Management page from the sidebar.",
      "Step 2: View your allocated parking bay, level, vehicle information, and permit details.",
      'Step 3: To request visitor parking, click the "Request Parking" button.',
      "Step 4: Fill in the visitor name, vehicle make/model, plate number, date, and time range.",
      "Step 5: Submit the request. You'll receive updates on the request status.",
      "Step 6: View all your parking requests in the visitor parking section.",
    ],
  },
  {
    id: 5,
    title: "Staying Updated with Announcements",
    content: [
      "Step 1: Check the Announcements page regularly for building notices.",
      "Step 2: Announcements are categorized by type: Maintenance, Utility, Events, Safety, and General.",
      "Step 3: Unread announcements are clearly marked with a dot and highlighted.",
      "Step 4: Click on any announcement to read its full content.",
      "Step 5: The announcement will automatically be marked as read when opened.",
      'Step 6: Use the "Mark all read" button to mark all announcements as read at once.',
    ],
  },
  {
    id: 6,
    title: "Using the Notification Center",
    content: [
      "Step 1: Click the bell icon in the top bar to open the notification center.",
      "Step 2: View all recent notifications from the dropdown.",
      "Step 3: Notifications include visitor approvals, parking updates, rent reminders, and announcement alerts.",
      "Step 4: Click on a notification to view more details or take action.",
      "Step 5: Unread notifications are indicated with a dot on the bell icon.",
      "Step 6: The notification count shows how many unread notifications you have.",
    ],
  },
];

export const guides2 = [
  {
    id: "getting-started",
    title: "Getting started with the tenant portal",
    detail: "A walkthrough of the dashboard, payments, and messaging.",
  },
  {
    id: "registering-visitor",
    title: "Registering a visitor and generating a QR pass",
    detail: "Step-by-step guide to the Visitor Management module.",
  },
  {
    id: "parking-permit",
    title: "Requesting a parking permit",
    detail: "How to request visitor parking or an additional permit.",
  },
  {
    id: "booking-facility",
    title: "Booking a shared facility",
    detail: "How to reserve the rooftop terrace, gym, or meeting rooms.",
  },
];

export const GUIDE_CONTENT = {
  "getting-started": {
    title: "Getting started with the tenant portal",
    subtitle: "A walkthrough of the dashboard, payments, and messaging.",
    steps: [
      {
        step: 1,
        title: "Explore your Dashboard",
        description:
          "View quick summary metrics, active announcements, and quick action shortcuts.",
        image: "../public/images/s1.png",
      },
      {
        step: 2,
        title: "Navigating the Portal",
        description:
          "Use the sidebar menu to navigate between Payments, Maintenance, Bookings, and Support.",
        image: "../public/images/s1.png",
      },
      {
        step: 3,
        title: "Sending Messages & Support",
        description:
          "Reach property management directly through the Messages module.",
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
        description:
          "Click on 'Visitors' in the side menu to view expected and active visitors.",
        image: "../public/images/v1.png",
      },
      {
        step: 2,
        title: "Fill in Visitor Details",
        description:
          "Click 'Register visitor' and enter name, contact details, date, and time.",
        image: "../public/images/v2.png",
      },
      {
        step: 3,
        title: "Generate and Share QR Pass",
        description:
          "Copy or send the QR access pass to your visitor prior to arrival.",
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
        description:
          "Select 'Parking' from the sidebar menu to check your active vehicle assignments.",
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
        description:
          "Fill in the vehicle registration details and select permit type.",
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
        description:
          "Click 'Bookings' from the sidebar to view available amenities and slots.",
        image: "../public/images/s1.png",
      },
      {
        step: 2,
        title: "Select Date and Time Slot",
        description:
          "Choose your preferred date, select an open slot, and confirm your reservation.",
        image: "../public/images/s1.png",
      },
    ],
  },
};

export const faqs = [
  {
    id: 1,
    category: "Visitor Management",
    question: "How do I register a visitor?",
    answer:
      "Navigate to the Visitor Management page and click the \"Register Visitor\" button. Fill in the visitor's name, contact information, visit date and time, purpose of visit, and any additional notes. Submit the form and the visitor will be registered. You'll receive a confirmation once the registration is complete.",
  },
  {
    id: 2,
    category: "Visitor Management",
    question: "How do I cancel a visitor request?",
    answer:
      "Go to your Visitor Management dashboard, find the visitor request you want to cancel, and click the cancel icon (X) next to it. Confirm the cancellation when prompted. Note: You can only cancel visitor requests that are still pending or approved.",
  },
  {
    id: 3,
    category: "Parking",
    question: "How do I request visitor parking?",
    answer:
      "Go to the Parking Management section and click the \"Request Parking\" button. Fill in the visitor's name, vehicle information, date, and time. Submit the request. You'll receive an update once the parking request is processed.",
  },
  {
    id: 4,
    category: "Parking",
    question: "What is my allocated parking bay?",
    answer:
      "Your allocated parking bay is displayed in the Parking Management section. It includes the bay number, level, and permit details. This information is also available on your parking permit.",
  },
  {
    id: 5,
    category: "Announcements",
    question: "How do I stay updated on building announcements?",
    answer:
      "All announcements are displayed in the Announcements section. You can also receive in-app notifications. Make sure you have notifications enabled in your account settings. Unread announcements are clearly marked for your attention.",
  },
  {
    id: 6,
    category: "Announcements",
    question: "How do I mark announcements as read?",
    answer:
      'Click on any announcement to view it in detail. The announcement will automatically be marked as read. You can also mark all announcements as read using the "Mark all read" button in the Announcements page.',
  },
  {
    id: 7,
    category: "Notifications",
    question: "What types of notifications do I receive?",
    answer:
      "You'll receive notifications for rent due dates, payment confirmations, visitor approvals, parking request updates, new announcements, maintenance status updates, and other important tenant events.",
  },
  {
    id: 8,
    category: "Support",
    question: "Who do I contact for maintenance issues?",
    answer:
      "For maintenance issues, please submit a request through the Maintenance module. For urgent matters, contact the property management office directly using the contact information available in the Support Centre.",
  },
];

export const faqs2 = [
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

export const emergency = [
  {
    name: "Emergency Response",
    icon: "siren",
    phone: "+254 20 123 4571",
    description: "24/7 emergency response team",
  },
  {
    name: "Medical Emergency",
    icon: "ambulance",
    phone: "+254 20 123 4572",
    description: "On-site medical assistance",
  },
  {
    name: "Fire Emergency",
    icon: "fire",
    phone: "+254 20 123 4573",
    description: "Fire response team",
  },
  {
    name: "Security Emergency",
    icon: "security",
    phone: "+254 20 123 4574",
    description: "24/7 security response",
  },
];

export const contacts = [
  {
    name: "Property Management",
    icon: "building",
    phone: "+254 20 123 4567",
    email: "management@pinnacletowers.co.ke",
    hours: "Mon-Fri 8:00 AM - 6:00 PM",
  },
  {
    name: "Reception Desk",
    icon: "message",
    phone: "+254 20 123 4568",
    email: "reception@pinnacletowers.co.ke",
    hours: "24/7",
  },
  {
    name: "Maintenance Department",
    icon: "tools",
    phone: "+254 20 123 4569",
    email: "maintenance@pinnacletowers.co.ke",
    hours: "Mon-Fri 7:00 AM - 8:00 PM",
  },
  {
    name: "Security Office",
    icon: "security",
    phone: "+254 20 123 4570",
    email: "security@pinnacletowers.co.ke",
    hours: "24/7",
  },
];

export const sampleAnnouncements = [
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
];

export const CATEGORY = {
  water: { label: "Water", tone: "blue" },
  power: { label: "Power", tone: "gold" },
  events: { label: "Events", tone: "wine" },
  security: { label: "Security", tone: "blue" },
  general: { label: "General", tone: "gold" },
};

export const ALERT_ICON = {
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

export const typeOptions = [
  { value: "My parking", label: "My Parking" },
  { value: "Visitor parking", label: "Visitor Parking" },
  { value: "Bay change", label: "Bay Change Request" },
];

export const purposeOptions = [
  { value: "Service", label: "Service" },
  { value: "Delivery", label: "Delivery" },
  { value: "Meeting", label: "Business meeting" },
  { value: "Family", label: "Family visit" },
  { value: "Other", label: "Other" },
];
