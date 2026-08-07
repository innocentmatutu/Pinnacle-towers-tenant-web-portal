import { useState } from "react";
import DownloadFiles from './components/records/documents.jsx';
import BillingHistory from './components/records/Invoices.jsx';
import Invoice from "./components/records/Invoices.jsx";
import Receipt from "./components/records/Receipt.jsx"
import Paymentreceipts from "./components/records/Receipt.jsx";

function Billings(){
  
  return(
     <>
    <Invoice/>
   <hr></hr> 
    <p style={{fontSize:"40px" ,color:"#161616"}}>Payment Receipts</p>
  <Paymentreceipts/>
     </>
  );
}

export default Billings