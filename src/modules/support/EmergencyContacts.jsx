import Icon from '../../components/Icon';
import Card from '../../components/Card';
import './support.css';

export default function EmergencyContacts() {
  const emergency = [
    {
      name: 'Emergency Response',
      icon: 'siren',
      phone: '+254 20 123 4571',
      description: '24/7 emergency response team'
    },
    {
      name: 'Medical Emergency',
      icon: 'ambulance',
      phone: '+254 20 123 4572',
      description: 'On-site medical assistance'
    },
    {
      name: 'Fire Emergency',
      icon: 'fire',
      phone: '+254 20 123 4573',
      description: 'Fire response team'
    },
    {
      name: 'Security Emergency',
      icon: 'security',
      phone: '+254 20 123 4574',
      description: '24/7 security response'
    }
  ];

  return (
    <div className="emergency-section">
      <div className="emergency-header">
        <Icon name="siren" size={32} />
        <div>
          <h2>Emergency Contacts</h2>
          <p>These contacts are for emergency situations only. For non-emergency inquiries, please use the regular contact information.</p>
        </div>
      </div>

      <div className="emergency-grid">
        {emergency.map(contact => (
          <Card key={contact.name} className="emergency-card">
            <div className="emergency-icon">
              <Icon name={contact.icon} size={28} />
            </div>
            <div className="emergency-info">
              <h3>{contact.name}</h3>
              <p>{contact.description}</p>
              <a href={`tel:${contact.phone}`} className="emergency-phone">
                <Icon name="message" size={14} /> {contact.phone}
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}