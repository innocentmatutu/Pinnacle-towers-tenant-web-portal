
import React, { useState } from "react";
import "./Receipt.css";
import { jsPDF } from "jspdf";

// Example Mock Data
const Receipts = [
  {
    receiptNo: "Rec-1001",
    invoiceNo: "INV-1003",
    tenant: "John Doe",
    apartment: "A-204",
    paymentDate: "2026-08-01",
    amountPaid: 45000,
    paymentMethod: "M-Pesa",
    transactionCode: "TQX7H8K9LM",
    status: "Paid",
  },
  {
    receiptNo: "Rec-1002",
    invoiceNo: "INV-1001",
    tenant: "Jane Doe",
    apartment: "A-214",
    paymentDate: "2026-08-01",
    amountPaid: 35000,
    paymentMethod: "M-Pesa",
    transactionCode: "T90X7H8K9LM",
    status: "Paid",
  },
  {
    receiptNo: "Rec-1003",
    invoiceNo: "INV-1002",
    tenant: "Ken Doe",
    apartment: "A-211",
    paymentDate: "2026-08-01",
    amountPaid: 30000,
    paymentMethod: "M-Pesa",
    transactionCode: "THI09H8K9LM",
    status: "Paid",
  },
];

function Paymentreceipts() {
  const [downloadingId, setDownloadingId] = useState(null);

  const handlePaymentreceipts = (receiptNo) => {
    const receipt = Receipts.find(
      (rec) => rec.receiptNo === receiptNo
    );

    if (!receipt) {
      console.error("Receipt not found");
      return;
    }

    setDownloadingId(receiptNo);

    // Create PDF
    const doc = new jsPDF();

   const pageWidth = doc.internal.pageSize.getWidth(); 
   const pageHeight = doc.internal.pageSize.getHeight(); 
   const centerX = pageWidth / 2; 
   //                      HEADER  
   
   doc.setFillColor(139,0,0); doc.rect(0, 0, pageWidth, 42, "F");
    // Property name // 
    doc.setTextColor(255, 255, 255); 
    doc.setFont("helvetica", "bold");
     doc.setFontSize(22);
      doc.text("PINNACLE TOWERS", centerX, 18, { align: "center", }); 
      // Property management 
      
      doc.setFont("helvetica", "normal"); 
      doc.setFontSize(10); 
      doc.text("PROPERTY MANAGEMENT", centerX, 27, { align: "center", });
       //                  Payment receipt title 
       doc.setFont("helvetica", "bold"); 
       doc.setFontSize(14); 
       doc.text("PAYMENT RECEIPT", centerX, 37, { align: "center", }); 
        doc.setTextColor(0, 0, 0); 
       //                  RECEIPT INFORMATION
       doc.setFontSize(10);
        doc.setFont("helvetica", "normal"); 
        doc.text("Receipt No:", 20, 55); 
        doc.setFont("helvetica", "bold"); 
        doc.text(receipt.receiptNo, 50, 55); 
        doc.setFont("helvetica", "normal"); 
        doc.text("Payment Date:", 125, 55); 
        doc.setFont("helvetica", "bold");
         doc.text(receipt.paymentDate, 160, 55);
          doc.setFont("helvetica", "normal"); 
          doc.text("Invoice No:", 20, 65);
           doc.setFont("helvetica", "bold");
            doc.text(receipt.invoiceNo, 50, 65);
             // Divider 
             doc.setDrawColor(200, 200, 200);
             doc.line(20, 72, 190, 72);
              //              TENANT INFORMATION    



              doc.setFont("helvetica", "bold"); 
              doc.setFontSize(12);
               doc.text("TENANT INFORMATION", 20, 83);
                doc.setFont("helvetica", "normal");
                 doc.setFontSize(10); doc.text("Tenant Name:", 20, 95); 
                 doc.setFont("helvetica", "bold"); 
                 doc.text(receipt.tenant, 55, 95); doc.setFont("helvetica", "normal"); 
                 doc.text("Apartment:", 120, 95); doc.setFont("helvetica", "bold");
                  doc.text(receipt.apartment, 150, 95); // Divider 
                  doc.setDrawColor(200, 200, 200); doc.line(20, 103, 190, 103);
                   // =PAYMENT DETAILS
                  doc.setFont("helvetica", "bold"); 
                  doc.setFontSize(12); 
                  doc.text("PAYMENT DETAILS", 20, 115); 
                  doc.setFont("helvetica", "normal");
                   doc.setFontSize(10); 
                   doc.text("Payment Method:", 20, 127); 
                   doc.setFont("helvetica", "bold"); 
                   doc.text(receipt.paymentMethod, 65, 127);
                    doc.setFont("helvetica", "normal");
                     doc.text("Transaction Code:", 20, 137);
                      doc.setFont("helvetica", "bold"); 
                      doc.text(receipt.transactionCode, 65, 137);
                       //AMOUNT BOX 
                   doc.setFillColor(245, 247, 250); doc.roundedRect(20, 148, 170, 32, 3, 3, "F");
                    doc.setFont("helvetica", "normal");
                     doc.setFontSize(10); doc.text("AMOUNT PAID", centerX, 158, 
                      { align: "center", }); 
                      doc.setFont("helvetica", "bold");
                       doc.setFontSize(20);
                        doc.text( `Ksh. ${receipt.amountPaid.toLocaleString()}`, centerX, 172, { align: "center", } ); 
                   //           PAYMENT STATUS

                    doc.setFillColor(218,165,32); 
                    doc.roundedRect(65, 188, 80, 12, 3, 3, "F");
                     doc.setTextColor(184,134,27); doc.setFont("helvetica", "bold"); 
                     doc.setFontSize(10); doc.text( `✓ ${receipt.status.toUpperCase()}`, centerX, 196, { align: "center", } );
                     // Reset text color 
                    doc.setTextColor(0, 0, 0); 
                    // FOOTER 
                    doc.setDrawColor(200, 200, 200); 
                    doc.line(20, 215, 190, 215);
                     doc.setFont("helvetica", "bold");
                      doc.setFontSize(11); 
                       doc.text( "Issued By:Pinnacle Towers Property Management.",65, 210, { align: "center", } );
                        doc.setFont("helvetica", "normal");
                      doc.text( "Thank you for your payment.",40, 225, { align: "center", } ); 
                      doc.setFontSize(8);
                     
                        doc.text( "Pinnacle Towers Property Management", centerX, 239, { align: "center", } );

    // Create PDF URL
    const pdfUrl = doc.output("bloburl");

    // Open PDF in a new tab
    window.open(pdfUrl, "_blank");

    setDownloadingId(null);
  };

  return (

     <div className="billing-container">
      <div className="billing-header">
        <h2>  Payment Receipts</h2>
        <p>View your past Payments and download PDFs for your records.</p>

      </div>
    <div className="table-responsive">
      <table className="billing-table">
      
        <thead>
          <tr>
            <th>Receipt No</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {Receipts.map((receipt) => (
            <tr key={receipt.receiptNo}>
              <td className="Receipt-No">
                {receipt.receiptNo}
              </td>

              <td>{receipt.paymentDate}</td>

              <td>
                Ksh. {receipt.amountPaid.toLocaleString()}
              </td>

              <td>{receipt.paymentMethod}</td>

              <td>
                <span
                  className={`status-badge ${receipt.status.toLowerCase()}`}
                >
                  {receipt.status}
                </span>
              </td>

              <td style={{ textAlign: "right" }}>
                <button
                  onClick={() =>
                    handlePaymentreceipts(receipt.receiptNo)
                  }
                  className="download-receipts-btn"
                  disabled={downloadingId !== null}
                >
                  {downloadingId === receipt.receiptNo ? (
                    <span className="spinner">
                      Veiwing...
                    </span>
                  ) : (
                    <>
                      <span style={{ marginRight: "6px" }}>
                        📄
                      </span>
                      View PDF
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

