import './report.css'
function Activity(){
 <section className="metrics-row">
                        
                        {/* Card 1: Balance */}
                        <div className="metric-card">
                            <div className="card-top">
                                <div className="icon-circle icon-danger"><i className="fa-solid fa-wallet"></i></div>
                                <span className="card-label">Outstanding Balance</span>
                            </div>
                            <h2 className="text-danger">Rent Collection</h2>
                            <p className="due-date">ksh.2,678,890</p>

                            
                        </div>
                        </section>

                          {/* Feed 2: Maintenance Requests */}
                        <div className="feed-card">
                            <div className="feed-header">
                                <h4><i className="fa-solid fa-wrench text-warning"></i> Maintenance Requests</h4>
                                <a href="#" className="view-all">View All</a>
                            </div>
                            <ul className="feed-list">
                                <li>
                                    <div className="feed-item-left">
                                        <div>
                                            <strong>Leaking sink</strong>
                                            <small>Submitted on 2 Jul 2026</small>
                                        </div>
                                    </div>
                                    <span className="badge badge-pending">PENDING</span>
                                </li>
                                <li>
                                    <div className="feed-item-left">
                                        <div>
                                            <strong>Broken light</strong>
                                            <small>Closed on 28 Jun 2026</small>
                                        </div>
                                    </div>
                                    <span className="badge badge-closed">CLOSED</span>
                                </li>
                                <li>
                                    <div className="feed-item-left">
                                        <div>
                                            <strong>Door lock issue</strong>
                                            <small>Assigned to: John <br />Status: <span className="text-primary">In Progress</span></small>
                                        </div>
                                    </div>
                                    <span className="badge badge-progress">IN PROGRESS</span>
                                </li>
                            </ul>
                            <div className="feed-footer">
                                <a href="#" className="view-all-link">View All Requests &rarr;</a>
                            </div>
                        </div>
}
export default Activity