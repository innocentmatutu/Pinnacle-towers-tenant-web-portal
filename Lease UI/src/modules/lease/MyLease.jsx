import { useState } from 'react';
import Icon from '../../components/Icon';
import Card from '../../components/Card';

const propertyDetails = [
  ['Building', 'Pinnacle Towers'],
  ['Floor', '12'],
  ['Unit number', '12B'],
  ['Unit type', '2 bedroom'],
  ['Square footage', '1,050 sq ft'],
  ['Occupancy status', 'Occupied'],
];

const leaseDocuments = [
  { name: 'Signed lease agreement', date: '28 December 2024' },
  { name: 'Renewal offer letter', date: '1 August 2026' },
  { name: 'Building rules addendum', date: '1 January 2025' },
];

const renewalStatusCopy = {
  pending: {
    badge: 'Renewal pending',
    badgeClass: 'amber',
    title: '2027 renewal offer',
    body: 'Offer for 1 Jan 2027 – 31 Dec 2027 at KSh 26,000/month. Respond before 15 November 2026.',
  },
  requested: {
    badge: 'Request submitted',
    badgeClass: 'blue',
    title: 'Change request sent',
    body: 'Property management will contact you about your renewal request within two business days.',
  },
  accepted: {
    badge: 'Renewal accepted',
    badgeClass: 'green',
    title: 'Renewal accepted for 2027',
    body: 'Your updated lease starts 1 January 2027. A signed copy will appear in Documents within 24 hours.',
  },
};

export default function MyLease() {
  const [renewalState, setRenewalState] = useState('pending');
  const [showAgreement, setShowAgreement] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestNote, setRequestNote] = useState('');
  const [downloadNotice, setDownloadNotice] = useState('');

  const renewal = renewalStatusCopy[renewalState];

  const submitRenewalRequest = (event) => {
    event.preventDefault();
    if (!requestNote.trim()) return;
    setRenewalState('requested');
    setShowRequestForm(false);
    setRequestNote('');
  };

  const handleDownload = (name) => {
    setDownloadNotice(`"${name}" would download here once the Documents API is connected.`);
    setTimeout(() => setDownloadNotice(''), 3500);
  };

  return (
    <div className="lease-page">
      <div className="page-heading compact">
        <div>
          <p className="eyebrow">PROPERTY &amp; LEASE</p>
          <h1>My lease</h1>
          <p className="muted">Property information and lease renewal flows · Rose Mulewa scope</p>
        </div>
        <div className="lease-heading-actions">
          <button className="outline-button" type="button" onClick={() => setShowAgreement(true)}>
            <Icon name="eye" size={15} /> View agreement
          </button>
          <button className="primary-button" type="button" onClick={() => handleDownload('Lease agreement - Unit 12B.pdf')}>
            <Icon name="download" size={15} /> Download
          </button>
        </div>
      </div>

      {downloadNotice && <p className="lease-feedback">{downloadNotice}</p>}

      <div className="lease-layout">
        <Card>
          <div className="section-heading">
            <div>
              <h3>Property information</h3>
              <p>Unit 12B · Pinnacle Towers</p>
            </div>
            <span className="status green">Occupied</span>
          </div>
          <ul className="detail-list">
            {propertyDetails.map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </li>
            ))}
          </ul>
        </Card>

        <div className="lease-stack">
          <Card>
            <div className="section-heading">
              <div>
                <h3>Lease duration</h3>
                <p>Signed 28 December 2024</p>
              </div>
              <span className="status blue">Active</span>
            </div>
            <div className="term-block">
              <div>
                <small>Commencement</small>
                <b>1 Jan 2025</b>
              </div>
              <div>
                <small>Expiry</small>
                <b>31 Dec 2026</b>
              </div>
              <div>
                <small>Remaining</small>
                <b>142 days</b>
              </div>
            </div>
            <div className="progress"><i style={{ width: '62%' }} /></div>
            <p className="lease-note">Monthly rent KSh 24,500 · reviewed annually</p>
          </Card>

          <Card>
            <div className="section-heading">
              <div>
                <h3>Lease documents</h3>
                <p>View and download lease paperwork</p>
              </div>
            </div>
            <ul className="document-list">
              {leaseDocuments.map((doc) => (
                <li key={doc.name}>
                  <span>
                    <b>{doc.name}</b>
                    <small>{doc.date}</small>
                  </span>
                  <button className="text-button" type="button" onClick={() => handleDownload(doc.name)}>
                    <Icon name="download" size={13} /> Download
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="notice-content">
              <span className="notice-symbol"><Icon name="file" size={17} /></span>
              <div>
                <span className={`status ${renewal.badgeClass}`}>{renewal.badge}</span>
                <h4>{renewal.title}</h4>
                <p>{renewal.body}</p>
                {renewalState === 'pending' && (
                  <div className="renewal-actions">
                    <button className="primary-button" type="button" onClick={() => setRenewalState('accepted')}>
                      Accept renewal online
                    </button>
                    <button className="text-button" type="button" onClick={() => setShowRequestForm(true)}>
                      Submit renewal request <Icon name="arrow" size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {showAgreement && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowAgreement(false)}>
          <div className="modal-card" role="dialog" aria-labelledby="lease-agreement-title" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 id="lease-agreement-title">Lease agreement · Unit 12B</h3>
              <button className="icon-button" type="button" aria-label="Close" onClick={() => setShowAgreement(false)}>
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Tenant:</strong> Rose Mulewa</p>
              <p><strong>Property:</strong> Pinnacle Towers, Floor 12, Unit 12B</p>
              <p><strong>Term:</strong> 1 January 2025 – 31 December 2026</p>
              <p><strong>Monthly rent:</strong> KSh 24,500</p>
              <p className="modal-note">
                This is static sample content for the UI. The full agreement text and e-signature
                records will load from the lease API when the backend is connected.
              </p>
            </div>
            <div className="modal-footer">
              <button className="outline-button" type="button" onClick={() => setShowAgreement(false)}>Close</button>
              <button className="primary-button" type="button" onClick={() => handleDownload('Lease agreement - Unit 12B.pdf')}>
                <Icon name="download" size={15} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {showRequestForm && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowRequestForm(false)}>
          <form className="modal-card" role="dialog" aria-labelledby="renewal-request-title" onClick={(e) => e.stopPropagation()} onSubmit={submitRenewalRequest}>
            <div className="modal-header">
              <h3 id="renewal-request-title">Submit renewal request</h3>
              <button className="icon-button" type="button" aria-label="Close" onClick={() => setShowRequestForm(false)}>
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="modal-body">
              <label className="field-label" htmlFor="renewal-note">
                Describe the changes you would like for your 2027 renewal
              </label>
              <textarea
                id="renewal-note"
                rows="4"
                value={requestNote}
                onChange={(e) => setRequestNote(e.target.value)}
                placeholder="e.g. Request a shorter term, discuss rent adjustment, or ask about parking allocation..."
              />
            </div>
            <div className="modal-footer">
              <button className="outline-button" type="button" onClick={() => setShowRequestForm(false)}>Cancel</button>
              <button className="primary-button" type="submit" disabled={!requestNote.trim()}>
                Send request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
