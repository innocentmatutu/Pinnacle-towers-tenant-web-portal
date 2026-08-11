import React, { useState, useEffect } from 'react';
import RentOverview from './RentOverview'; // Import the overview component
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
    if (isNaN(val) || val <= 0) return alert("Please enter a valid amount.");

    // Sync with the same 'rent_data' key used in Collections and Dashboard
    const rentData = JSON.parse(localStorage.getItem("rent_data") || "{}");
    
    if (user && rentData[user.username]) {
      // Update the balance in rent_data
      rentData[user.username].outstandingBalance = Math.max(0, rentData[user.username].outstandingBalance - val);
      rentData[user.username].lastPayment = { 
        date: new Date().toISOString().split('T')[0], 
        amount: val 
      };
      
      localStorage.setItem("rent_data", JSON.stringify(rentData));
      alert(`Payment of KES ${val.toLocaleString()} successful!`);
      setAmount(''); // Reset input
    } else {
      alert("Error: Could not find rent record for this user.");
    }
  };

  if (!user || user.role !== 'tenant') {
    return <div className="card"><h2>Access Denied</h2><p>Restricted to Tenants.</p></div>;
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>Rent & Payments</h1>
      
      {/* Show the summary at the top */}
      <section className="card">
        <RentOverview />
      </section>

      <section className="card" style={{ marginTop: '20px' }}>
        <h2 style={{ color: 'var(--pinnacle-crimson)' }}>Make Payment</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Amount to Pay (KES):</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 5000" 
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <div className="payment-tabs" style={{ marginBottom: '15px' }}>
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