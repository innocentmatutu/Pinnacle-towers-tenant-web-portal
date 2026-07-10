import React, { useState, useEffect } from 'react';

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

    // 2. Fetch Data
    const fetchRent = async () => {
      try {
        const response = await fetch('/rent_data.json');
        if (!response.ok) throw new Error("Could not find rent data.");
        
        const data = await response.json();
        setRent(data[user.username]);
      } catch (err) {
        console.error("Rent Load Error:", err);
        setError("Unable to retrieve rent details at this time. Please contact administration.");
      }
    };

    fetchRent();
  }, []);

  // 3. Conditional Rendering
  if (error) return <p>{error}</p>;
  if (!rent) return <p>Loading your rent information...</p>;

  return (
    <div className="rent-details" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
      <p><strong>Current Rent:</strong> KES {rent.currentRent.toLocaleString()}</p>
      
      <p style={{ color: rent.outstandingBalance > 0 ? 'var(--pinnacle-crimson)' : 'inherit' }}>
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