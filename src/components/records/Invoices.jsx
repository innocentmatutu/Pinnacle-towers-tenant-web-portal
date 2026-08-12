import React, { useState } from 'react';
import {jsPDF} from "jspdf";

import './invoices.css'
// Example Mock Data 

function Invoice() {
  const INVOICES = [
  {
  
    invoiceNo: "INV-1003",
    tenant: "John Doe",
    apartment: "A-204",
    DateOfIssue: "2026-08-01",
    DueDate:"2026-08-30",
    amountDue: 45000,
    TILL: 13466,
    AccountNO: "12345670P",
    status: "Pending",
  },
  {

    invoiceNo: "INV-1001",
    tenant: "Jane Doe",
    apartment: "A-214",
    DateOfIssue: "2026-08-01",
    DueDate:"2026-08-30",
    amountDue: 35000,
     TILL: 13466,
    AccountNO: "12345670P",
    status: "Pending",
  },
  {
   
    invoiceNo: "INV-1002",
    tenant: "Ken Doe",
    apartment: "A-211",
    DateOfIssue: "2026-08-01",
    DueDate:"2026-08-30",
    amountDue: 30000,
    TILL: 13466,
    AccountNO: "12345670P",
    status: "Pending",
  },
]

   const [downloadingId, setDownloadingId] = useState(null);
  
    const handleInvoice = (invoiceNo) => {
      const invoice = INVOICES.find(
        (inv) => inv.invoiceNo === invoiceNo
      );
  
      if (!invoice) {
        console.error("Receipt not found");
        return;
      }
  
      setDownloadingId(invoiceNo);
  
      // Create PDF
      const doc = new jsPDF();
  
     const pageWidth = doc.internal.pageSize.getWidth(); 
     const pageHeight = doc.internal.pageSize.getHeight(); 
     const centerX = pageWidth / 2; 
     //        HEADER
       

     
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
         //                  MONTHLY  INVOICE title 
         doc.setFont("helvetica", "bold"); 
         doc.setFontSize(14); 
         doc.text("MONTHLY INVOICE", centerX, 37, { align: "center", }); 
          doc.setTextColor(0, 0, 0); 
         //                  INVOICE INFORMATION
         doc.setFontSize(10);
          doc.setFont("helvetica", "normal"); 
          doc.text("Invoice No:", 20, 55); 
          doc.setFont("helvetica", "bold"); 
          doc.text(invoice.invoiceNo, 50, 55); 
          doc.setFont("helvetica", "normal"); 
          doc.text(" Date Of Issue:", 125, 55); 
          doc.setFont("helvetica", "bold");
           doc.text(invoice.DateOfIssue, 160, 55);
            doc.setFont("helvetica", "normal"); 
            doc.text("Due Date:", 20, 65);
             doc.setFont("helvetica", "bold");
              doc.text(invoice.DueDate, 50, 65);
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
                   doc.text(invoice.tenant, 55, 95); doc.setFont("helvetica", "normal"); 
                   doc.text("Apartment:", 120, 95); doc.setFont("helvetica", "bold");
                    doc.text(invoice.apartment, 150, 95); 
                    // Divider 
                    doc.setDrawColor(200, 200, 200); doc.line(20, 103, 190, 103);
                     // =PAYMENT DETAILS
                    doc.setFont("helvetica", "bold"); 
                    doc.setFontSize(12); 
                    doc.text("BILL TO", 20, 115); 
                    doc.setFont("helvetica", "normal");
                     doc.setFontSize(10); 
                     doc.text("Account Till:", 20, 127); 
                     doc.setFont("helvetica", "bold"); 
                     doc.text(invoice.TILL, 65, 127);
                      doc.setFont("helvetica", "normal");
                       doc.text("Account Number:", 20, 137);
                        doc.setFont("helvetica", "bold"); 
                        doc.text(invoice.AccountNO, 65, 137);
                         //AMOUNT BOX 
                     doc.setFillColor(245, 247, 250); doc.roundedRect(20, 148, 170, 32, 3, 3, "F");
                      doc.setFont("helvetica", "normal");
                       doc.setFontSize(10); doc.text("AMOUNT PENDING", centerX, 158, 
                        { align: "center", }); 
                        doc.setFont("helvetica", "bold");
                         doc.setFontSize(20);
                          doc.text( `Ksh. ${invoice.amountDue.toLocaleString()}`, centerX, 172, { align: "center", } ); 
                     //           PAYMENT STATUS
  
                      doc.setFillColor(218,165,32); 
                      doc.roundedRect(65, 188, 80, 12, 3, 3, "F");
                       doc.setTextColor(184,134,27); doc.setFont("helvetica", "bold"); 
                       doc.setFontSize(10); doc.text( `✓ ${invoice.status.toUpperCase()}`, centerX, 196, { align: "center", } );
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
        <h2>  Monthly Invoices</h2>
        <p>View your past  Monthly Invoices and download PDFs for your records.</p>
      </div>

      <div className="table-responsive">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((invoice) => (
              <tr key={invoice.invoiceNo}>
                <td className="invoice-id">{invoice.invoiceNo}</td>
                <td>{invoice.DueDate}</td>
                <td>{invoice.amountDue}</td>
                <td>
                  <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => handleInvoice(invoice.invoiceNo)}
                    className="download-invoice-btn"
                    disabled={downloadingId !== null}
                  >
                    {downloadingId === invoice.invoiceNo ? (
                      <span className="spinner">Viewing...</span>
                    ) : (
                      <>
                        <span style={{ marginRight: '6px' }}> 📄</span> PDF
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



export default Invoice;


