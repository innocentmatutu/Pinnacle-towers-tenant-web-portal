import { useState } from "react";
import Documents from './components/records/documents.jsx';
import Invoice from "./components/records/Invoices.jsx";
import Paymentreceipts from "./components/records/Receipt.jsx";

import './app.css'
function Billings(){
  
  return(
     <>
     <header>Billing & Payments</header>
      <p style= {{fontSize:"35px", color:"#0c0c0c"}}>Monthly Invoices</p>
    <Invoice/>
   <p style= {{fontSize:"35px", color:"#0c0c0c"}}>Payment Receipts</p>
   
  <Paymentreceipts/>
   
     </>
  );
}

export default Billings