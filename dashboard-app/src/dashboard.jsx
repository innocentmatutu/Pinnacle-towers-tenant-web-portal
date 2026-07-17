import React from 'react';
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="app-container">

            {/* ========================================== */}
            {/* ROSE'S TERRITORY: SIDEBAR PLACEHOLDER      */}
            {/* ========================================== */}
            <aside className="sidebar-placeholder">
                <div className="placeholder-content">
                    <i className="fa-solid fa-code"></i>
                    <p>Rose's Sidebar goes here</p>
                </div>
            </aside>

            {/* MAIN WORKSPACE */}
            <main className="main-content">

                {/* ========================================== */}
                {/* ROSE'S TERRITORY: NAVBAR PLACEHOLDER       */}
                {/* ========================================== */}
                <nav className="navbar-placeholder">
                    <div className="placeholder-content">
                        <p>Rose's Navbar goes here (Search, Notifications, Profile Dropdown)</p>
                    </div>
                </nav>

            
                {/* THE DASHBOARD            */}
               
                <div className="dashboard-wrapper">
                    
                    {/* 1. DASHBOARD HEADER */}
                    <header className="dashboard-header">
                        <div className="header-info">
                            <h1>Welcome Mark! 👋</h1>
                            <p className="unit-text">Unit 402, Block A &bull; 2-Bedroom</p>
                            
                            <div className="tenant-meta">
                                <span><i className="fa-regular fa-user"></i> Mark Ng'ang'a</span>
                                <span><i className="fa-regular fa-calendar"></i> Tenant since March 2024</span>
                                <span><i className="fa-regular fa-id-badge"></i> Tenant ID: TEN-402-A</span>
                            </div>
                        </div>
                        
                        <div className="quick-actions">
                            <button className="btn btn-primary"><i className="fa-solid fa-wallet"></i> Pay Rent</button>
                            <button className="btn btn-outline-danger"><i className="fa-solid fa-wrench"></i> Report Issue</button>
                        </div>
                    </header>

                    {/* 2. TOP METRICS: 4-CARD GRID */}
                    <section className="metrics-row">
                        
                        {/* Card 1: Balance */}
                        <div className="metric-card">
                            <div className="card-top">
                                <div className="icon-circle icon-danger"><i className="fa-solid fa-wallet"></i></div>
                                <span className="card-label">Outstanding Balance</span>
                            </div>
                            <h2 className="text-danger">KSh 25,000</h2>
                            <p className="due-date">Due on 10th July 2026</p>
                            <a href="#" className="card-link link-primary">View Details &rarr;</a>
                        </div>

                        {/* Card 2: Upcoming Rent */}
                        <div className="metric-card">
                            <div className="card-top">
                                <div className="icon-circle icon-success"><i className="fa-regular fa-calendar-check"></i></div>
                                <span className="card-label">Upcoming Rent</span>
                            </div>
                            <h2 className="text-success">KSh 45,000</h2>
                            <p className="due-date">Due on 10th July 2026</p>
                            <a href="#" className="card-link link-primary">Make Payment &rarr;</a>
                        </div>

                        {/* Card 3: Lease Status */}
                        <div className="metric-card">
                            <div className="card-top">
                                <div className="icon-circle icon-primary"><i className="fa-solid fa-file-contract"></i></div>
                                <span className="card-label">Lease Status</span>
                            </div>
                            <h2 className="text-primary">Active</h2>
                            <p className="due-date">Ends on 30th Nov 2026</p>
                            <a href="#" className="card-link link-primary">View Lease &rarr;</a>
                        </div>

                        {/* Card 4: Maintenance Status */}
                        <div className="metric-card">
                            <div className="card-top">
                                <div className="icon-circle icon-warning"><i className="fa-solid fa-wrench"></i></div>
                                <span className="card-label">Maintenance Status</span>
                            </div>
                            <h2 className="text-warning">2 Pending</h2>
                            <p className="due-date">1 In Progress &bull; 1 Closed</p>
                            <a href="#" className="card-link link-primary">View All Requests &rarr;</a>
                        </div>

                    </section>

                    {/* ACTIVITY FEEDS TITLE */}
                    <h3 className="section-title">Activity Feeds</h3>

                    {/* 3. ACTIVITY FEEDS: 3-COLUMN GRID */}
                    <section className="activity-row">
                        
                        {/* Feed 1: Recent Payments */}
                        <div className="feed-card">
                            <div className="feed-header">
                                <h4><i className="fa-solid fa-credit-card text-primary"></i> Recent Payments</h4>
                                <a href="#" className="view-all">View All</a>
                            </div>
                            <ul className="feed-list">
                                <li>
                                    <div className="feed-item-left">
                                        <i className="fa-regular fa-circle-check text-success list-icon"></i>
                                        <div>
                                            <strong>July Rent</strong>
                                            <small>Paid on 10 Jul 2026</small>
                                        </div>
                                    </div>
                                    <span className="text-success amount">KSh 45,000</span>
                                </li>
                                <li>
                                    <div className="feed-item-left">
                                        <i className="fa-regular fa-circle-check text-success list-icon"></i>
                                        <div>
                                            <strong>June Rent</strong>
                                            <small>Paid on 10 Jun 2026</small>
                                        </div>
                                    </div>
                                    <span className="text-success amount">KSh 45,000</span>
                                </li>
                                <li>
                                    <div className="feed-item-left">
                                        <i className="fa-regular fa-circle-check text-success list-icon"></i>
                                        <div>
                                            <strong>May Rent</strong>
                                            <small>Paid on 10 May 2026</small>
                                        </div>
                                    </div>
                                    <span className="text-success amount">KSh 45,000</span>
                                </li>
                            </ul>
                            <div className="feed-footer">
                                <a href="#" className="view-all-link">View All Payments &rarr;</a>
                            </div>
                        </div>

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

                        {/* Feed 3: Active Notices */}
                        <div className="feed-card">
                            <div className="feed-header">
                                <h4><i className="fa-solid fa-bullhorn text-purple"></i> Active Notices</h4>
                                <a href="#" className="view-all">View All</a>
                            </div>
                            <ul className="feed-list notices-list">
                                <li>
                                    <div className="dot-purple"></div>
                                    <div>
                                        <strong>Water out on 10th July</strong>
                                        <small>Posted on 8 Jul 2026</small>
                                    </div>
                                </li>
                                <li>
                                    <div className="dot-purple"></div>
                                    <div>
                                        <strong>Gym closed on Friday</strong>
                                        <small>Posted on 7 Jul 2026</small>
                                    </div>
                                </li>
                                <li>
                                    <div className="dot-purple"></div>
                                    <div>
                                        <strong>Lift maintenance schedule</strong>
                                        <small>Posted on 5 Jul 2026</small>
                                    </div>
                                </li>
                                <li>
                                    <div className="dot-purple"></div>
                                    <div>
                                        <strong>Fire drill on 15th July</strong>
                                        <small>Posted on 3 Jul 2026</small>
                                    </div>
                                </li>
                            </ul>
                            <div className="feed-footer">
                                <a href="#" className="view-all-link">View All Notices &rarr;</a>
                            </div>
                        </div>

                    </section>
                    
                    {/* FOOTER PLACEHOLDER */}
                    <footer className="dashboard-footer">
                        <p>&copy; 2026 Pinnacle Towers. All rights reserved.</p>
                    </footer>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;