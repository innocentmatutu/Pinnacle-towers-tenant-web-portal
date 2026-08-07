import { useState } from 'react';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import './visitors.css';

const initialVisitors = [
  { id: 1, name: 'Daniel Kiptoo', ID: 5287456, phone: '+254 722 555 010', purpose: 'Family visit', date: '2026-09-04', time: '14:00', status: 'expected' },
  { id: 2, name: 'Aisha Bello', ID: 5287456, phone: '+254 733 221 044', purpose: 'Furniture delivery', date: '2026-08-05', time: '10:30', status: 'checked-in' },
  { id: 3, name: 'James Otieno', ID: 5287456, phone: '+254 700 998 112', purpose: 'Plumbing contractor', date: '2026-07-30', time: '09:00', status: 'completed' },
];

const STATUS = {
  expected: { label: 'Expected', tone: 'blue' },
  'checked-in': { label: 'Checked in', tone: 'green' },
  completed: { label: 'Completed', tone: 'blue' },
  cancelled: { label: 'Cancelled', tone: 'amber' },
};

const emptyForm = { name: '', id: '', phone: '', purpose: '', date: '', time: '' };

export default function Visitors() {
  const [visitors, setVisitors] = useState(initialVisitors);
  const [showForm, setShowForm] = useState(false);
  const [qrFor, setQrFor] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const updateForm = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const registerVisitor = (e) => {
    e.preventDefault();
    // TODO: POST /api/visitors { name, phone, purpose, date, time }
    setVisitors([{ id: Date.now(), ...form, status: 'expected' }, ...visitors]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const cancelVisitor = (id) => {
    // TODO: PATCH /api/visitors/:id { status: 'cancelled' }
    setVisitors(visitors.map((v) => (v.id === id ? { ...v, status: 'cancelled' } : v)));
    if (qrFor === id) setQrFor(null);
  };

  const initials = (name) => name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY &amp; ACCESS</p>
          <h1>Visitor Management</h1>
        </div>
        <button className="primary-button" onClick={() => setShowForm((s) => !s)}>
          <Icon name="users" size={16} />
          {showForm ? 'Close form' : 'Register visitor'}
        </button>
      </div>

      {showForm && (
        <Card className="visitor-form">
          <div className="card-top"><h3>New visitor</h3></div>
          <form onSubmit={registerVisitor}>
            <div className="visitor-form-grid">
              <label>
                Full name
                <input required value={form.name} onChange={updateForm('name')} />
              </label>
              <label>
                ID number
                <input required value={form.phone} onChange={updateForm('id')} />
              </label>
              <label>
                Phone number
                <input required value={form.phone} onChange={updateForm('phone')} />
              </label>
              <label>
                Purpose of visit
                <input required value={form.purpose} onChange={updateForm('purpose')} />
              </label>
              <label>
                Date
                <input required type="date" value={form.date} onChange={updateForm('date')} />
              </label>
              <label>
                Time
                <input required type="time" value={form.time} onChange={updateForm('time')} />
              </label>
            </div>
            <button type="submit" className="primary-button">Register visitor</button>
          </form>
        </Card>
      )}

      <Card>
        <div className="card-top">
          <h3>Visitor history</h3>
          <span className="muted">{visitors.length} total</span>
        </div>
        <div className="visitor-list">
          {visitors.map((v) => (
            <div className="visitor-entry" key={v.id}>
              <div className="visitor-row">
                <span className="visitor-avatar">{initials(v.name)}</span>
                <div className="visitor-info">
                  <b>{v.name}</b>
                  <small>{v.purpose} · {v.date} at {v.time}</small>
                </div>
                <span className={`status ${STATUS[v.status].tone}`}>{STATUS[v.status].label}</span>
                {v.status === 'expected' && (
                  <div className="visitor-actions">
                    <button className="text-button" onClick={() => setQrFor(qrFor === v.id ? null : v.id)}>
                      {qrFor === v.id ? 'Hide QR' : 'QR code'}
                    </button>
                    <button className="text-button danger" onClick={() => cancelVisitor(v.id)}>Cancel</button>
                  </div>
                )}
              </div>
              {qrFor === v.id && (
                <div className="visitor-qr">
                  <div className="qr-mock" aria-hidden="true" />
                  <div>
                    <small>Visitor code</small>
                    <b>PT-VIS-{v.id}</b>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}