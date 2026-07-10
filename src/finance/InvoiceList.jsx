import { useState, useEffect } from 'react';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // In a real scenario, this would be an API call to your backend
    // For now, we simulate fetching invoice records
    const fetchInvoices = async () => {
      // Mock data: replace with your actual fetch request
      const mockInvoices = [
        { id: 'INV-2026-001', date: '2026-06-01', amount: 45000, status: 'Paid' },
        { id: 'INV-2026-002', date: '2026-07-01', amount: 45000, status: 'Pending' }
      ];
      setInvoices(mockInvoices);
    };

    fetchInvoices();
  }, []);

  return (
    <div className="invoice-container">
      <header>
        <h1>My Invoices</h1>
        <p>Viewing records for: <strong>{user?.username}</strong></p>
      </header>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Amount (KES)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.date}</td>
              <td>{inv.amount.toLocaleString()}</td>
              <td>
                <span className={`status-badge ${inv.status.toLowerCase()}`}>
                  {inv.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}