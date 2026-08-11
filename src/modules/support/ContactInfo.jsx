import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./support.css";
import { contacts } from "../../constants";

export default function ContactInfo() {
  return (
    <div className="contact-section">
      <p className="section-description">
        Here you'll find contact information for various building services.
        Please reach out to the appropriate department for your specific needs.
      </p>

      <div className="contact-grid">
        {contacts.map((contact) => (
          <Card key={contact.name} className="contact-card">
            <div className="contact-icon">
              <Icon name={contact.icon} size={24} />
            </div>
            <h3>{contact.name}</h3>
            <div className="contact-details">
              <p>
                <Icon name="message" size={12} />{" "}
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </p>
              <p>
                <Icon name="mail" size={12} />{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <p>
                <Icon name="clock" size={12} /> {contact.hours}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
