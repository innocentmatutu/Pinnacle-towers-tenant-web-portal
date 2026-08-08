import { useState } from 'react';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import './support.css';

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      id: 1,
      category: 'Visitor Management',
      question: 'How do I register a visitor?',
      answer: 'Navigate to the Visitor Management page and click the "Register Visitor" button. Fill in the visitor\'s name, contact information, visit date and time, purpose of visit, and any additional notes. Submit the form and the visitor will be registered. You\'ll receive a confirmation once the registration is complete.'
    },
    {
      id: 2,
      category: 'Visitor Management',
      question: 'How do I cancel a visitor request?',
      answer: 'Go to your Visitor Management dashboard, find the visitor request you want to cancel, and click the cancel icon (X) next to it. Confirm the cancellation when prompted. Note: You can only cancel visitor requests that are still pending or approved.'
    },
    {
      id: 3,
      category: 'Parking',
      question: 'How do I request visitor parking?',
      answer: 'Go to the Parking Management section and click the "Request Parking" button. Fill in the visitor\'s name, vehicle information, date, and time. Submit the request. You\'ll receive an update once the parking request is processed.'
    },
    {
      id: 4,
      category: 'Parking',
      question: 'What is my allocated parking bay?',
      answer: 'Your allocated parking bay is displayed in the Parking Management section. It includes the bay number, level, and permit details. This information is also available on your parking permit.'
    },
    {
      id: 5,
      category: 'Announcements',
      question: 'How do I stay updated on building announcements?',
      answer: 'All announcements are displayed in the Announcements section. You can also receive in-app notifications. Make sure you have notifications enabled in your account settings. Unread announcements are clearly marked for your attention.'
    },
    {
      id: 6,
      category: 'Announcements',
      question: 'How do I mark announcements as read?',
      answer: 'Click on any announcement to view it in detail. The announcement will automatically be marked as read. You can also mark all announcements as read using the "Mark all read" button in the Announcements page.'
    },
    {
      id: 7,
      category: 'Notifications',
      question: 'What types of notifications do I receive?',
      answer: 'You\'ll receive notifications for rent due dates, payment confirmations, visitor approvals, parking request updates, new announcements, maintenance status updates, and other important tenant events.'
    },
    {
      id: 8,
      category: 'Support',
      question: 'Who do I contact for maintenance issues?',
      answer: 'For maintenance issues, please submit a request through the Maintenance module. For urgent matters, contact the property management office directly using the contact information available in the Support Centre.'
    }
  ];

  const faqs2 = [
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

  const filtered = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.category.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFAQ = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="faq-section">
      <div className="search-wrap faq-search">
        <Icon name="search" size={16} />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="empty-state">
          <Icon name="help" size={48} />
          <h3>No FAQs found</h3>
          <p>No results match your search. Try adjusting your search terms.</p>
        </Card>
      ) : (
        <div className="faq-list">
          {filtered.map(faq => (
            <div key={faq.id} className={`faq-item ${open === faq.id ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                <span>
                  <span className="faq-category">{faq.category}</span>
                  <strong>{faq.question}</strong>
                </span>
                <Icon name={open === faq.id ? 'close' : 'arrow'} size={16} />
              </button>
              {open === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}