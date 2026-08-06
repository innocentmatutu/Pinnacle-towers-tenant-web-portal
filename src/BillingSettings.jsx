import React, { useState, useEffect } from 'react';

// Example Mock Data (In production, you'll fetch this from your API)
const MOCK_INVOICES = [
  { id: 'inv-1001', date: '2026-07-01', amount: 'Ksh.28,000.00', status: 'Paid' },
  { id: 'inv-0992', date: '2026-06-01', amount: 'Ksh.32,000.00', status: 'Paid' },
  { id: 'inv-0854', date: '2026-05-01', amount: 'Ksh.30,000.00', status: 'Paid' },
];

function BillingHistory() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null); // Tracks which PDF is downloading

  useEffect(() => {
    // Simulate API Fetch for billing history
    const fetchInvoices = async () => {
      try {
        // const res = await fetch('/api/billing/history');
        // const data = await res.json();
        // setInvoices(data);
        setInvoices(MOCK_INVOICES);
      } catch (err) {
        console.error("Failed to load billing history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleDownloadInvoice = async (invoiceId) => {
    setDownloadingId(invoiceId); // Set loading state for this specific row
    
    try {
      const token = localStorage.getItem('userToken'); // Or however you store auth
      const response = await fetch(`https://api.yourdomain.com/billing/invoices/${invoiceId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error('Failed to download invoice');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Could not download invoice. Please try again.');
    } finally {
      setDownloadingId(null); // Reset loading state
    }
  };

  if (loading) {
    return <div className="loading-container">Loading your billing history...</div>;
  }

  return (
    <div className="billing-container">
      <div className="billing-header">
        <h2>Billing History</h2>
        <p>View your past transactions and download invoice PDFs for your records.</p>
      </div>

      <div className="table-responsive">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="invoice-id">{invoice.id}</td>
                <td>{invoice.date}</td>
                <td>{invoice.amount}</td>
                <td>
                  <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    className="download-invoice-btn"
                    disabled={downloadingId !== null}
                  >
                    {downloadingId === invoice.id ? (
                      <span className="spinner">Downloading...</span>
                    ) : (
                      <>
                        <span style={{ marginRight: '6px' }}>📥</span> PDF
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BillingHistory;


