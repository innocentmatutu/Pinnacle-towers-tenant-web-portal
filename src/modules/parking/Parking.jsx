import { useState } from 'react';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import './parking.css';

const myBay = { bay: 'B-214', level: 'Basement 2', vehicle: 'KDA 214X', active: true };

const initialRequests = [
  { id: 1, type: 'Visitor parking', detail: 'For Daniel Kiptoo · 09 Aug 2026', status: 'pending' },
  { id: 2, type: 'Additional permit', detail: 'Second vehicle · KDB 552Q', status: 'approved' },
  { id: 3, type: 'Visitor parking', detail: 'For Aisha Bello · 05 Aug 2026', status: 'expired' },
];

const STATUS = {
  pending: { label: 'Pending', tone: 'amber' },
  approved: { label: 'Approved', tone: 'green' },
  expired: { label: 'Expired', tone: 'blue' },
};

const emptyForm = { type: 'Visitor parking', detail: '' };

export default function Parking() {
  const [requests, setRequests] = useState(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const submitRequest = (e) => {
    e.preventDefault();
    // TODO: POST /api/parking-requests { type, detail }
    setRequests([{ id: Date.now(), ...form, status: 'pending' }, ...requests]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const visitorCount = requests.filter((r) => r.type === 'Visitor parking').length;
  const activeCount = requests.filter((r) => r.status === 'approved').length;

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY &amp; ACCESS</p>
          <h1>Parking</h1>
        </div>
        <button className="primary-button" onClick={() => setShowForm((s) => !s)}>
          <Icon name="calendar" size={16} />
          {showForm ? 'Close form' : 'New request'}
        </button>
      </div>

      <div className="summary-grid">
        <Card>
          <div className="card-top">
            <span className="icon-tile wine"><Icon name="building" size={18} /></span>
            <span className={`status ${myBay.active ? 'green' : 'amber'}`}>{myBay.active ? 'Active' : 'Inactive'}</span>
          </div>
          <p>Allocated bay</p>
          <h2>{myBay.bay}</h2>
          <small>{myBay.level} · {myBay.vehicle}</small>
        </Card>
        <Card>
          <div className="card-top"><span className="icon-tile gold"><Icon name="users" size={18} /></span></div>
          <p>Visitor parking</p>
          <h2>{visitorCount}</h2>
          <small>requests on record</small>
        </Card>
        <Card>
          <div className="card-top"><span className="icon-tile blue"><Icon name="file" size={18} /></span></div>
          <p>Active permits</p>
          <h2>{activeCount}</h2>
          <small>currently approved</small>
        </Card>
      </div>

      {showForm && (
        <Card className="parking-form">
          <div className="card-top"><h3>New parking request</h3></div>
          <form onSubmit={submitRequest}>
            <label>
              Request type
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option>Visitor parking</option>
                <option>Additional permit</option>
                <option>Bay change request</option>
              </select>
            </label>
            <label>
              Details
              <input
                required
                placeholder="e.g. visitor name and date, or vehicle plate"
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
              />
            </label>
            <button type="submit" className="primary-button">Submit request</button>
          </form>
        </Card>
      )}

      <Card>
        <div className="card-top"><h3>Requests &amp; permits</h3></div>
        <div className="parking-list">
          {requests.map((r) => (
            <div className="parking-row" key={r.id}>
              <div>
                <b>{r.type}</b>
                <small>{r.detail}</small>
              </div>
              <span className={`status ${STATUS[r.status].tone}`}>{STATUS[r.status].label}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}