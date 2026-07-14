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

    // 2. Load and Sync Data
    const loadRentData = async () => {
      try {
        let data = JSON.parse(localStorage.getItem('rent_data'));

        // If data is missing in localStorage, fetch it from the server
        if (!data) {
          const response = await fetch('/rent_data.json');
          if (!response.ok) throw new Error("Could not fetch rent data.");
          data = await response.json();
          // Save to localStorage for future use
          localStorage.setItem('rent_data', JSON.stringify(data));
        }

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
  }, [user]);

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