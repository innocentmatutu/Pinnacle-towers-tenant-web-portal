import React, { useState, useEffect } from 'react';
import './payments.css';

export default function RentOverview() {
  const [rent, setRent] = useState(null);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // 1. Security Check
    if (!user || user.role !== 'Tenant') {
      setError("Dashboard access restricted to Tenants.");
      return;
    }

    // 2. Load and Sync Data from localStorage
    const loadRentData = () => {
      try {
        let savedData = localStorage.getItem('rent_data');

        // AUTO-INITIALIZER: Seed data if missing so it never breaks
        if (!savedData) {
          const initialData = {
            "dfghjk": { "currentRent": 45000, "outstandingBalance": 10000, "lastPayment": { "date": "2026-07-01", "amount": 35000 } },
            "rtyui": { "currentRent": 50000, "outstandingBalance": 25000, "lastPayment": { "date": "2026-06-15", "amount": 25000 } }
          };
          localStorage.setItem('rent_data', JSON.stringify(initialData));
          savedData = JSON.stringify(initialData);
        }

        const data = JSON.parse(savedData);

        // Check if user exists in the data
        if (data && data[user.username]) {
          setRent(data[user.username]);
        } else {
          setError("No rent records found for this user.");
        }
      } catch (err) {
        console.error("Rent Load Error:", err);
        setError("Unable to retrieve rent details at this time.");
      }
    };

    loadRentData();
  }, [user?.username]);

  // 3. Conditional Rendering
  if (error) return <p style={{ color: 'var(--pinnacle-crimson)' }}>{error}</p>;
  if (!rent) return <p>Loading your rent information...</p>;

  return (
    <div className="rent-details" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
      <p><strong>Current Rent:</strong> KES {rent.currentRent.toLocaleString()}</p>
      
      <p style={{ color: rent.outstandingBalance > 0 ? 'var(--pinnacle-crimson)' : 'var(--pinnacle-success)' }}>
        <strong>Outstanding Balance:</strong> KES {rent.outstandingBalance.toLocaleString()}
      </p>
      
      <p><strong>Last Payment:</strong> KES {rent.lastPayment.amount.toLocaleString()} (Paid on {rent.lastPayment.date})</p>
      
      {rent.outstandingBalance > 0 ? (
        <p style={{ color: 'var(--pinnacle-crimson)', fontWeight: 'bold', marginTop: '10px' }}>
          Please use the payment portal below to clear your balance.
        </p>
      ) : (
        <p style={{ color: 'var(--pinnacle-success)', fontWeight: 'bold', marginTop: '10px' }}>
          ✓ Account is up to date.
        </p>
      )}
    </div>
  );
}