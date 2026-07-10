import { useState, useEffect } from 'react';

export default function RentCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch rent data for all tenants
    const fetchCollections = async () => {
      try {
        const response = await fetch('/rent_data.json');
        const data = await response.json();
        // Convert the JSON object into an array for easy mapping
        const formattedData = Object.keys(data).map(key => ({
          tenantId: key,
          ...data[key]
        }));
        setCollections(formattedData);
      } catch (error) {
        console.error("Error loading collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return <p>Loading collection records...</p>;

  return (
    <div className="collections-container">
      <header>
        <h1>Rent Collections</h1>
        <p>Manage and monitor tenant payment statuses.</p>
      </header>

      <table className="collections-table">
        <thead>
          <tr>
            <th>Tenant ID</th>
            <th>Current Rent</th>
            <th>Outstanding</th>
            <th>Last Payment</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((item) => (
            <tr key={item.tenantId}>
              <td>{item.tenantId}</td>
              <td>KES {item.currentRent.toLocaleString()}</td>
              <td className={item.outstandingBalance > 0 ? 'text-crimson' : 'text-success'}>
                KES {item.outstandingBalance.toLocaleString()}
              </td>
              <td>{item.lastPayment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}