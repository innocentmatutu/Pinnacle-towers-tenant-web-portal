import { useState, useEffect } from 'react';

export default function TenantDashboard() {
  const [user, setUser] = useState(null);
  const [rentData, setRentData] = useState(null);

  useEffect(() => {
    // 1. Load user session
    const sessionUser = JSON.parse(localStorage.getItem("user"));
    setUser(sessionUser);

    // 2. Fetch rent data (Assuming rent_data.json is in your public folder)
    const fetchRent = async () => {
      try {
        const response = await fetch('/rent_data.json');
        const data = await response.json();
        setRentData(data[sessionUser?.username]);
      } catch (err) {
        console.error("Failed to load rent data", err);
      }
    };

    if (sessionUser) fetchRent();
  }, []);

  return (
    <main className="dashboard-container">
      <h1>Dashboard</h1>
      
      {/* 3. Role-based content */}
      {user?.role === 'Tenant' ? (
        <section className="card">
          <h2>Welcome, {user.username}</h2>
          {rentData ? (
            <div className="rent-summary">
              <p><strong>Current Rent:</strong> KES {rentData.currentRent.toLocaleString()}</p>
              <p><strong>Outstanding Balance:</strong> KES {rentData.outstandingBalance.toLocaleString()}</p>
            </div>
          ) : <p>Loading rent details...</p>}
        </section>
      ) : (
        <section className="card">
          <h2>System Overview</h2>
          <p>Welcome to the Property Management Portal.</p>
        </section>
      )}
    </main>
  );
}