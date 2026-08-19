import './report.css';

function Activity() {
    return (
        <>
        <div className="activity-container">

            {/*     PROPERTY REPORT  */}

            <h3 className="title">
                Property Report
            </h3>


               {/* Rent Collection */}
                <div className="metric-card">

                    <div className="card-top">
                        <span className="card-label">
                            Rent Collection
                        </span>
                    </div>

                    <h2 style={{color:"#d2930a"}}>
                        Ksh. 5,420,000
                    </h2>

                </div>

            <div className="property-report">

                {/* Outstanding Balance */}
                <div className="metric-card">

                    <div className="card-top">
                        <span className="card-label">
                            Outstanding Balance
                        </span>
                    </div>

                    <h2 style={{color:"#d2930a"}}>
                        Ksh. 29,678.00
                    </h2>

                </div>


             

            </div>
              <div className="facility-card">
                   <h2>Lease Expires</h2>

                    <div className="stats">
                       <div>
                        <span className="number">
                            20
                        </span>
                      <span className='label'>Tentants Expires this Month</span>  
                    </div>
                </div>
                
                
                <div >
                    <span className="number">
                        5
                        </span>
                        <br/>
                        <span className="label"> Tenants Expires the Next Month</span>
                        </div>
                   </div>
                


            {/* MAINTENANCE REPORT */}

            <h3 className="title">
                Maintenance Report
            </h3>

            <div className="feed-card">

                <div className="feed-header">

                    <h4>
                        <i className="fa-solid fa-wrench text-warning"></i>
                        Maintenance Requests
                    </h4>

                </div>


                <ul className="feed-list">

                    <li>
                        <div className="feed-item-left">
                            <div>
                                <strong>Leaking sink</strong>
                                <br/>
                                <small  className="item">
                                    Submitted on 2 Jul 2026
                                </small>
                            </div>
                        </div>

                        <span className="badge -pending">
                            PENDING
                        </span>
                    </li>


                    <li>
                        <div className="feed-item-left">
                            <div>
                                <strong>Broken light</strong>
                                <br/>
                                <small className="item">
                                    Closed on 28 Jun 2026
                                </small>
                            </div>
                        </div>

                        <span className="badge">
                            CLOSED
                        </span>
                    </li>


                    <li>
                        <div className="feed-item-left">
                            <div>
                                <strong>Door lock issue</strong>
                                  <br/>
                                <small className="item">
                                    Assigned to: John
                                </small>
                            </div>
                        </div>

                        <span className="badge ">
                            IN PROGRESS
                        </span>
                    </li>

                </ul>

            </div>

 {/* FACILITY REPORT */}
            
 <h3 className="title">
                Facility Report
            </h3>
             <ul className="feed-list">

                    <li>
                        <div className="feed-item-left">
                            <div>
                                <strong>booking</strong>
                               
                            </div>
                        </div>

                        <span className="number">
                            24
                        </span>
                    </li>


                    <li>
                        <div className="feed-item-left">
                            <div>
                                <strong>Available Facilities</strong>
                                <br/>
                            
                            </div>
                        </div>

                        <span className="number">
                            8
                        </span>
                    </li>


                    <li>
                        <div className="feed-item-left">
                            <div>
                                <strong>Active Booking</strong>
                                  <br/>
                              
                            </div>
                        </div>

                        <span className="number ">
                            20
                        </span>
                    </li>

                </ul>

            </div>
        
       
        {/* Visitor Logs */} 

        
            <h3 className="title">
                Vistor logs
            </h3>

            <div className="feed-card">
                 
                <div className="feed-header">
 <span>Visitor ID  & Visit Details</span>
        <span>Host</span>
                </div>


                <ul className="feed-list">

                    <li>
                        <div className="feed-item-left">
                            <div>
                                <strong>John Kiragu</strong>
                                <br/>
                                <small  className="item">
                                    checked in on 2 Jul 2026
                                </small>
                            </div>
                        </div>

                        <span className="label">
                            Dan Maina
                        </span>
                    </li>


                    <li>
                        <div className="feed-item-left">
                            <div>
                                <strong>Fred Justin</strong>
                                <br/>
                                <small className="item">
                                    checked in on 28 Jun 2026
                                </small>
                            </div>
                        </div>

                        <span className="label">
                            Grace Francis
                        </span>
                    </li>


                    <li>
                        <div className="feed-item-left">
                            <div>
                                <strong>Plumber</strong>
                                  <br/>
                                <small className="item">
                                    Checked in on 1 August 2026
                                </small>
                            </div>
                        </div>

                        <span className=" label">
                        Hariet Wanjiku
                        </span>
                    </li>

                </ul>

            </div>
    
             {/* Tenant Activity */} 
           <h3 className="title">
                Tenant Activity
            </h3>    
   <div className='feed-card'>
          <div className="feed-header">
    <span>Date</span>
   <span>Tenant Name</span>
    <span>Unit</span>
    <span>Activity Logged</span>
    <span>Logged By</span>
</div>

<ul className="feed-list">

    <li>
        <div>

            <strong>17 July 2026</strong>
        </div>
        <div>

            <small>John Kiragu</small>
        </div>

        <small className="item">
            402
        </small>

        <span className="label">
              Submitted Request:<br/>Leaking Sink
        </span>
        
        <span className="item">
            Tenant Portal
        </span>
    </li>

    <li>
          <div>
            <strong>1 August 2026</strong>
        </div>
        <div>
            <small>Hariet Wanjiku</small>
        </div>

        <small className="item">
            405
        </small>

        <span className="label">
            Maintaence dispatched :<br/>plumber for 2:00pm
        </span>
          <span className="item">
            System Auto
        </span>
    </li>

    <li>
        <div>
            <strong>30 July 2026</strong>
        </div>
        <div>
            <small>Maureen Ocheing</small>
        </div>

        <small className="item">
            401
        </small>

        <span className="label">
Occupany:<br/>Moved out And gave out Physical Keys 
        </span>

          <span className="item">
            Care Taker
        </span>
    </li>

</ul>
</div>
              
               </>

    );
}

export default Activity;