import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './payments.css';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchInvoices = async () => {
      const mockInvoices = [
        { id: 'INV-2026-001', date: '2026-06-01', amount: 45000, status: 'Paid' },
        { id: 'INV-2026-002', date: '2026-07-01', amount: 45000, status: 'Pending' }
      ];
      setInvoices(mockInvoices);
    };
    fetchInvoices();
  }, []);

  const downloadPDF = (inv) => {
    const doc = new jsPDF();
    doc.text(`Pinnacle Towers - Invoice`, 14, 15);
    
    // Using the explicit autoTable function import to prevent crashing
    autoTable(doc, {
      startY: 25,
      head: [['Invoice ID', 'Date', 'Amount (KES)', 'Status']],
      body: [[inv.id, inv.date, inv.amount.toLocaleString(), inv.status]],
    });

    doc.save(`${inv.id}.pdf`);
  };

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
            <th>Action</th>
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
              <td>
                <button 
                  className="primary-btn" 
                  onClick={() => downloadPDF(inv)}
                  style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}