import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./support.css";
import { emergency } from "../../constants";

export default function EmergencyContacts() {
  return (
    <div className="emergency-section">
      <div className="emergency-header">
        <Icon name="siren" size={32} />
        <div>
          <h2>Emergency Contacts</h2>
          <p>
            These contacts are for emergency situations only. For non-emergency
            inquiries, please use the regular contact information.
          </p>
        </div>
      </div>

      <div className="emergency-grid">
        {emergency.map((contact) => (
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
