import { useState } from "react";
import DownloadFiles from './components/documents.jsx';
import BillingHistory from './components/Invoices.jsx';
import Invoice from "./components/Invoices.jsx";
import Receipt from "./components/Receipt.jsx"
import Paymentreceipts from "./components/Receipt.jsx";

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