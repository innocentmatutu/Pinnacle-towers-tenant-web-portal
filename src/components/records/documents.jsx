import React from 'react'
import lease from '/lease Agreement.pdf';
import Rules from'/BuildingRules.pdf';
import HandBook from'/Handbook.pdf';
import Circulars from '/Circulars.pdf';
import Policies from '/Policies.pdf';

import './documents.css'
function Documents() {

 


  return (

    <>

    <header>Files & Documents</header>
    <div className='document-container'>
     <div style={{ padding: '20px' }}>
      <h2>Download Your Lease Agreement</h2>
      {/* The '/' refers directly to the public folder.
        The 'download' attribute forces the browser to download instead of opening it.
      */}
      <a 
        href="/lease Agreement.pdf" 
        download="Lease_Agreement_Template.pdf" 
        className="download-btn"
       
      >
        Download Lease Agreement (PDF)
      </a>
       
    </div>
   
    
    
<div style={{ padding: '20px' }}>
      <h2>Download Building Rules</h2>
      {/* The '/' refers directly to the public folder.
        The 'download' attribute forces the browser to download instead of opening it.
      */}
      <a 
        href="/BuildingRules.pdf" 
        download="BuildingRules.pdf" 
        className="download-btn"
      >
        Download Building Rules (PDF)
      </a>
    
    </div>

    <div style={{ padding: '20px' }}>
      <h2>Download Tenant HandBook </h2>
      {/* The '/' refers directly to the public folder.
        The 'download' attribute forces the browser to download instead of opening it.
      */}
      <a 
        href="/Handbook.pdf" 
        download="TenantHandBook.pdf" 
        className="download-btn"
      >
        Download Tenant HandBook (PDF)
       
      </a>
    </div>

    <div style={{ padding: '20px' }}>
      <h2>Download Circulars</h2>
      {/* The '/' refers directly to the public folder.
        The 'download' attribute forces the browser to download instead of opening it.
      */}
      <a 
        href="/Circulars.pdf" 
        download="Circulars_Template.pdf" 
        className="download-btn"
      >
        Download Circulars (PDF)
      </a>
      
    </div>
    <div style={{ padding: '20px' }}>
      <h2>Download Policies </h2>
      {/* The '/' refers directly to the public folder.
        The 'download' attribute forces the browser to download instead of opening it.
      */}
      <a 
        href="/Policies.pdf" 
        download="Policies_Template.pdf" 
        className="download-btn"
      >
        Download Policies (PDF)
      </a>
   
    </div>
    </div>
    </>
   
  );
  
    
}

export default Documents


