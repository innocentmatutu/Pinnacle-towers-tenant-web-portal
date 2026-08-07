import React, { useState, useEffect } from 'react';
import './Receipt.css'
// Example Mock Data (In production, you'll fetch this from your API)
const Receipts= [{
  receiptNo: "Rec-1001",
  invoiceNo: "INV-1003",
  tenant: "John Doe",
  apartment: "A-204",
  paymentDate: "2026-08-01",
  amountPaid: 45000,
  paymentMethod: "M-Pesa",
  transactionCode: "TQX7H8K9LM",
  status: "Paid"

}
,
{
  receiptNo: "Rec-1002",
  invoiceNo: "INV-1001",
  tenant: "Jane Doe",
  apartment: "A-214",
  paymentDate: "2026-08-01",
  amountPaid: 35000,
  paymentMethod: "M-Pesa",
  transactionCode: "T90X7H8K9LM",
  status: "Paid"

}

,
{
  receiptNo: "Rec-1003",
  invoiceNo: "INV-1002",
  tenant: "Ken Doe",
  apartment: "A-211",
  paymentDate: "2026-08-01",
  amountPaid: 30000,
  paymentMethod: "M-Pesa",
  transactionCode: "THI09H8K9LM",
  status: "Paid"

}];
localStorage.setItem("receipts", JSON.stringify(Receipts));

function Paymentreceipts(){
const [downloadingId, setDownloadingId] = useState(null);
const receipts = JSON.parse(localStorage.getItem("receipts")) || [];
const handlePaymentreceipts=(receiptNo)  =>{
   window.open(invoice.pdf, "_blank");
const receipt = receipts.find(Rec => Rec.receiptNo === receiptNo);
console.log(receipt);

}

return(
  <div className="billing-container">
      <div className="billing-header">
        <h2>  Paymeny Receipts</h2>
        <p>View your past  monthly Payment Receipt  click <strong>View </strong> for your record.</p>
      </div>

      <div className="table-responsive">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Receipt No</th>
              <th>Date</th>
              <th>Amount</th>
              <th> Payment Method</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>

            {
            receipts.map((receipt) => (
              <tr key={receipt.receiptNo}>
                <td className="Receipt-No">{receipt.receiptNo}</td>
                <td>{receipt.paymentDate}</td>
                <td>{receipt.amountPaid}</td>
                <td>{receipt.paymentMethod}</td>
                <td>
                  <span className={"status-badge  ${receipt.status.toLowerCase()}"}>
                    {receipt.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => handlePaymentreceipts(receipt.receiptNo)}
                    className="download-receipts-btn"
                    disabled={downloadingId !== null}
                  >
                    {downloadingId === receipt.receiptNo ? (
                      <span className="spinner">Openning...</span>
                    ) : (
                      <>
                        <span style={{ marginRight: '6px' }}></span>  View PDF
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


export default Paymentreceipts;


