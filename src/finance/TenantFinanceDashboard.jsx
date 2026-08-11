import { useState, useEffect } from 'react';
import RentOverview from './RentOverview'; // Integrated RentOverview
import './payments.css';

export default function TenantDashboard() {
  const [user, setUser] = useState(null);
  const [rentData, setRentData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCollected, setTotalCollected] = useState(0);

  useEffect(() => {
    const sessionUser = JSON.parse(localStorage.getItem("user"));
    setUser(sessionUser);

    // Load data from localStorage to ensure sync with RentCollections
    const loadData = () => {
      const storedData = localStorage.getItem('rent_data');
      if (storedData) {
        const data = JSON.parse(storedData);
        setRentData(data);
      }

      // Load synchronized total rent collected or compute default base
      const storedTotal = localStorage.getItem('total_rent_collected');
      if (storedTotal) {
        setTotalCollected(parseFloat(storedTotal));
      } else {
        // Fallback initial combined sum based on initial seed data (e.g. 35000 + 25000 = 60000 or custom)
        const initialTotal = 95000; 
        setTotalCollected(initialTotal);
        localStorage.setItem('total_rent_collected', initialTotal);
      }
    };

    loadData();
  }, []);

  const filteredTenants = Object.keys(rentData).filter(tenantId => 
    tenantId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="dashboard-container">
      <h1>Dashboard</h1>
      
      {user?.role === 'finance' && (
        <section className="card">
          <h2>Finance Overview</h2>
          <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px' }}>
            <h3>Total Rent Collected: KES {totalCollected.toLocaleString()}</h3>
          </div>

          <input 
            type="text" 
            placeholder="Search tenant by ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
          />

          <table className="collections-table">
            <thead>
              <tr><th>Tenant ID</th><th>Current Rent</th></tr>
            </thead>
            <tbody>
              {filteredTenants.map(id => (
                <tr key={id}><td>{id}</td><td>KES {rentData[id].currentRent.toLocaleString()}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {user?.role === 'tenant' && (
        <section className="card">
          <h2>Welcome, {user.username}</h2>
          {/* Integrated RentOverview for consistent tenant data */}
          <RentOverview />
        </section>
      )}
    </main>
  );
}