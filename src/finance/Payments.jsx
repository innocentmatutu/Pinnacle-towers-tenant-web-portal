import React, { useState, useEffect } from 'react';
import './payments.css';

export default function Payments() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("user"));
    setUser(session);
  }, []);

  const processPayment = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Update 'users_db' record
    let users = JSON.parse(localStorage.getItem("users_db") || "[]");
    let tenant = users.find(u => u.username === user.username);
    
    if (tenant) {
      tenant.outstandingBalance -= val;
      localStorage.setItem("users_db", JSON.stringify(users));
    }

    // Update 'payments_log'
    let logs = JSON.parse(localStorage.getItem("payments_log") || "[]");
    logs.push({
      username: user.username,
      amount: val,
      date: new Date().toISOString().split('T')[0],
      status: "Completed"
    });
    localStorage.setItem("payments_log", JSON.stringify(logs));

    alert(`Payment of KES ${val} successful!`);
  };

  if (!user || user.role !== 'Tenant') {
    return <div className="card"><h2>Access Denied</h2><p>Dashboard access is restricted to Tenants.</p></div>;
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>Rent & Payments</h1>
      
      <section className="card">
        <h2 style={{ color: 'var(--pinnacle-crimson)' }}>Make Payment</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Amount to Pay (KES):</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="5000" 
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <div className="payment-tabs">
          <button className="tab-btn" onClick={() => setMethod('mpesa')}>M-Pesa</button>
          <button className="tab-btn" onClick={() => setMethod('bank')}>Bank Deposit</button>
        </div>

        {method === 'mpesa' && (
          <div className="payment-form">
            <label>Enter M-Pesa Phone Number:</label>
            <input type="tel" placeholder="2547XXXXXXXX" style={{ width: '100%', padding: '8px' }} />
            <button onClick={processPayment} className="primary-btn">Pay Now</button>
          </div>
        )}

        {method === 'bank' && (
          <div className="payment-form">
            <p><strong>Bank:</strong> Equity Bank</p>
            <p><strong>Account No:</strong> 1234567890</p>
            <button onClick={processPayment} className="primary-btn">Confirm Bank Transfer</button>
          </div>
        )}
      </section>
    </main>
  );
}