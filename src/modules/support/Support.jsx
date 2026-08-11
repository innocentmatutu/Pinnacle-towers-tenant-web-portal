import { useState } from 'react';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import FAQ from './FAQ';
import ContactInfo from './ContactInfo';
import EmergencyContacts from './EmergencyContacts';
import HelpGuides from './HelpGuides';
import './support.css';

export default function SupportCentre() {
  const [activeTab, setActiveTab] = useState('faq');

  return (
    <div className="support-centre">
      <div className="page-heading">
        <div>
          <p className="eyebrow">SUPPORT CENTRE</p>
          <h1>Help & Support</h1>
        </div>
      </div>

      <div className="support-tabs">
        <button 
          className={`support-tab ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          <Icon name="help" size={16} /> FAQs
        </button>
        <button 
          className={`support-tab ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          <Icon name="message" size={16} /> Contacts
        </button>
        <button 
          className={`support-tab ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          <Icon name="siren" size={16} /> Emergency
        </button>
        <button 
          className={`support-tab ${activeTab === 'guides' ? 'active' : ''}`}
          onClick={() => setActiveTab('guides')}
        >
          <Icon name="file" size={16} /> Guides
        </button>
      </div>

      <div className="support-content">
        {activeTab === 'faq' && <FAQ />}
        {activeTab === 'contacts' && <ContactInfo />}
        {activeTab === 'emergency' && <EmergencyContacts />}
        {activeTab === 'guides' && <HelpGuides />}
      </div>
    </div>
  );
}