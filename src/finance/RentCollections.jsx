import { useState, useEffect } from 'react';
import './payments.css';

export default function RentCollections() {
  const [collections, setCollections] = useState([]);
  const [inputAmounts, setInputAmounts] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let savedData = localStorage.getItem('rent_data');

    if (!savedData) {
      const initialData = {
        "dfghjk": { "currentRent": 45000, "outstandingBalance": 10000, "lastPayment": { "date": "2026-07-01", "amount": 35000 } },
        "rtyui": { "currentRent": 50000, "outstandingBalance": 25000, "lastPayment": { "date": "2026-06-15", "amount": 25000 } }
      };
      localStorage.setItem('rent_data', JSON.stringify(initialData));
      savedData = JSON.stringify(initialData);
    }

    const data = JSON.parse(savedData);
    setCollections(Object.keys(data).map(key => ({ tenantId: key, ...data[key] })));
  };

  const handleUpdate = (tenantId) => {
    const amount = parseFloat(inputAmounts[tenantId]);
    if (!amount || amount <= 0) return alert("Please enter a valid amount greater than 0");

    const rawData = localStorage.getItem('rent_data');
    if (!rawData) return;

    const data = JSON.parse(rawData);
    
    if (data[tenantId]) {
      // 1. Update balance and payment record
      data[tenantId].outstandingBalance = Math.max(0, data[tenantId].outstandingBalance - amount);
      const paymentDate = new Date().toISOString().split('T')[0];
      data[tenantId].lastPayment = { 
        date: paymentDate, 
        amount: amount 
      };
      
      localStorage.setItem('rent_data', JSON.stringify(data));

      // 2. Update Total Rent Collected Dashboard Storage
      const currentTotal = parseFloat(localStorage.getItem('total_rent_collected') || '95000');
      localStorage.setItem('total_rent_collected', currentTotal + amount);

      // 3. Update existing invoice status instead of creating new duplicates
      const existingInvoices = JSON.parse(localStorage.getItem('invoices_data') || '[]');
      
      // Look for a pending invoice for this tenant, or default to updating the latest one
      const targetInvoiceIndex = existingInvoices.findIndex(inv => inv.tenantId === tenantId && inv.status === 'Pending');
      
      if (targetInvoiceIndex !== -1) {
        existingInvoices[targetInvoiceIndex].status = 'Paid';
        existingInvoices[targetInvoiceIndex].amount = amount;
        existingInvoices[targetInvoiceIndex].date = paymentDate;
      } else {
        // If no explicit stored invoice, create/update structured invoice entry tied to tenant
        existingInvoices.unshift({
          id: `INV-${new Date().getFullYear()}-${tenantId.toUpperCase()}`,
          tenantId: tenantId,
          date: paymentDate,
          amount: amount,
          status: 'Paid'
        });
      }
      
      localStorage.setItem('invoices_data', JSON.stringify(existingInvoices));
      
      // Reset input field and refresh the list
      setInputAmounts(prev => ({ ...prev, [tenantId]: '' }));
      loadData();
      alert(`Successfully updated payment for ${tenantId}`);
    }
  };

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
            <th>Outstanding</th>
            <th>Update Payment (KES)</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((item) => (
            <tr key={item.tenantId}>
              <td>{item.tenantId}</td>
              <td className={item.outstandingBalance > 0 ? 'text-crimson' : 'text-success'}>
                KES {item.outstandingBalance.toLocaleString()}
              </td>
              <td>
                <input 
                  type="number" 
                  value={inputAmounts[item.tenantId] || ''}
                  placeholder="Enter amount" 
                  onChange={(e) => setInputAmounts({...inputAmounts, [item.tenantId]: e.target.value})}
                  style={{ marginRight: '10px', padding: '5px' }}
                />
                <button className="primary-btn" onClick={() => handleUpdate(item.tenantId)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}