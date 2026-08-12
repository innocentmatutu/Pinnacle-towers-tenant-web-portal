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

                    <h2 className="cash">
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

                    <h2 className="cash">
                        Ksh. 29,678.00
                    </h2>

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

           
                <div className="facility-card">
                   

                    <div className="stats">
                       <div>
                        <span className="number">
                            24
                        </span>
                      <span className='label'>bookings</span>  
                    </div>
                </div>




                <div >
                    <span className="number">
                        8
                        </span>
                        <br/>
                        <span className="label">Available Facilities</span>
                   

                </div>


                <div className="facility-card">
                    

                    <div class className="stats">
                        <span className='label'>Active Bookings</span>

                       <span  className='number'>20</span>
                    </div>
                </div>

            </div>

        </div>
        
       
        {/* Visitor Logs */} 
        
    
        <div className="facility-card "> 
        
             <h2> Visitor Logs </h2>
            <span className='number'>36</span>
            <br/>

            <span className='label'> Visitors this month </span> 

             </div> 
             {/* Tenant Activity */} 
             <div className="facility-card "> 
            <div className='stats'>
                 <h2> Tenant Activity </h2>
                 </div>
                 <div>
              <span  className='number'>68</span  >
              <br/> 

              <span className='label'> Active tenants </span> 
              </div> 
              </div>
              
               </>

    );
}

export default Activity;