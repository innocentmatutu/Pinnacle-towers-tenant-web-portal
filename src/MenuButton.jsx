import { useState } from "react";
import DownloadFiles from './downloadableFiles.jsx';
import BillingHistory from './BillingSettings.jsx';

function Menu(){
   const[open,setopen]=useState(false)   
  return(
     <>
     
   <div className="container">
<button className="menu-btn"onClick={()=>setopen(!open)}>
 ☰

</button>
{/*{open &&(
<div className="menu-box">
  <a href="./download.jsx"> Downloadable Media</a>
  <a href="/LeaseAgreement.pdf"> Billing History</a>
  <a href="/LeaseAgreement.pdf"download> Reports</a>
</div>
)} */}

</div>



    <BillingHistory/>
     
       <br></br>
   < DownloadFiles/>
     
     </>
  );
}

export default Menu