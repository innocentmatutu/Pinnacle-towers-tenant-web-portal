
import React from 'react';
import './dashboard.css';

const TenantDashboard = ({user}) => {
    return (
        <div className="tenant-dashboard">

            {/* DASHBOARD HEADER */}
            <header className="tenant-dashboard__header">
                <div className="tenant-dashboard__header-info">
                    <h1>Welcome {user.username}! 👋</h1>

                    <p className="tenant-dashboard__unit">
                        Unit 402, Block A &bull; 2-Bedroom
                    </p>

                    <div className="tenant-dashboard__meta">
                        <span>{user.username}</span>
                        <span>Tenant since March 2024</span>
                        <span>Tenant ID: TEN-402-A</span>
                    </div>
                </div>

                <div className="tenant-dashboard__actions">
                    <button className="tenant-dashboard__btn tenant-dashboard__btn--primary">
                        Pay Rent
                    </button>

                    <button className="tenant-dashboard__btn tenant-dashboard__btn--outline">
                        Report Issue
                    </button>
                </div>
            </header>


            {/* METRICS */}
            <section className="tenant-dashboard__metrics">

                <article className="tenant-dashboard__metric-card">
                    <div className="tenant-dashboard__card-top">
                        <span>Outstanding Balance</span>
                    </div>

                    <h2 className="tenant-dashboard__danger">
                        KSh 25,000
                    </h2>

                    <p>Due on 10th July 2026</p>

                    <a href="#">
                        View Details →
                    </a>
                </article>


                <article className="tenant-dashboard__metric-card">
                    <div className="tenant-dashboard__card-top">
                        <span>Upcoming Rent</span>
                    </div>

                    <h2 className="tenant-dashboard__success">
                        KSh 45,000
                    </h2>

                    <p>Due on 10th July 2026</p>

                    <a href="#">
                        Make Payment →
                    </a>
                </article>


                <article className="tenant-dashboard__metric-card">
                    <div className="tenant-dashboard__card-top">
                        <span>Lease Status</span>
                    </div>

                    <h2 className="tenant-dashboard__primary">
                        Active
                    </h2>

                    <p>Ends on 30th Nov 2026</p>

                    <a href="#">
                        View Lease →
                    </a>
                </article>


                <article className="tenant-dashboard__metric-card">
                    <div className="tenant-dashboard__card-top">
                        <span>Maintenance Status</span>
                    </div>

                    <h2 className="tenant-dashboard__warning">
                        2 Pending
                    </h2>

                    <p>1 In Progress &bull; 1 Closed</p>

                    <a href="#">
                        View All Requests →
                    </a>
                </article>

            </section>


            {/* ACTIVITY FEEDS */}
            <h3 className="tenant-dashboard__section-title">
                Activity Feeds
            </h3>

            <section className="tenant-dashboard__activity">

                {/* RECENT PAYMENTS */}
                <article className="tenant-dashboard__feed">

                    <div className="tenant-dashboard__feed-header">
                        <h4>Recent Payments</h4>

                        <a href="#">View All</a>
                    </div>

                    <ul>

                        <li>
                            <div>
                                <strong>July Rent</strong>
                                <small>Paid on 10 Jul 2026</small>
                            </div>

                            <span className="tenant-dashboard__amount">
                                KSh 45,000
                            </span>
                        </li>

                        <li>
                            <div>
                                <strong>June Rent</strong>
                                <small>Paid on 10 Jun 2026</small>
                            </div>

                            <span className="tenant-dashboard__amount">
                                KSh 45,000
                            </span>
                        </li>

                        <li>
                            <div>
                                <strong>May Rent</strong>
                                <small>Paid on 10 May 2026</small>
                            </div>

                            <span className="tenant-dashboard__amount">
                                KSh 45,000
                            </span>
                        </li>

                    </ul>

                    <div className="tenant-dashboard__feed-footer">
                        <a href="#">
                            View All Payments →
                        </a>
                    </div>

                </article>


                {/* MAINTENANCE */}
                <article className="tenant-dashboard__feed">

                    <div className="tenant-dashboard__feed-header">
                        <h4>Maintenance Requests</h4>

                        <a href="#">View All</a>
                    </div>

                    <ul>

                        <li>
                            <div>
                                <strong>Leaking sink</strong>
                                <small>Submitted on 2 Jul 2026</small>
                            </div>

                            <span className="tenant-dashboard__badge tenant-dashboard__badge--pending">
                                PENDING
                            </span>
                        </li>

                        <li>
                            <div>
                                <strong>Broken light</strong>
                                <small>Closed on 28 Jun 2026</small>
                            </div>

                            <span className="tenant-dashboard__badge tenant-dashboard__badge--closed">
                                CLOSED
                            </span>
                        </li>

                        <li>
                            <div>
                                <strong>Door lock issue</strong>

                                <small>
                                    Assigned to: John
                                    <br />
                                    Status:{' '}
                                    <span className="tenant-dashboard__primary">
                                        In Progress
                                    </span>
                                </small>
                            </div>

                            <span className="tenant-dashboard__badge tenant-dashboard__badge--progress">
                                IN PROGRESS
                            </span>
                        </li>

                    </ul>

                    <div className="tenant-dashboard__feed-footer">
                        <a href="#">
                            View All Requests →
                        </a>
                    </div>

                </article>


                {/* NOTICES */}
                <article className="tenant-dashboard__feed">

                    <div className="tenant-dashboard__feed-header">
                        <h4>Active Notices</h4>

                        <a href="#">View All</a>
                    </div>

                    <ul className="tenant-dashboard__notices">

                        <li>
                            <span className="tenant-dashboard__dot"></span>

                            <div>
                                <strong>
                                    Water out on 10th July
                                </strong>

                                <small>
                                    Posted on 8 Jul 2026
                                </small>
                            </div>
                        </li>

                        <li>
                            <span className="tenant-dashboard__dot"></span>

                            <div>
                                <strong>
                                    Gym closed on Friday
                                </strong>

                                <small>
                                    Posted on 7 Jul 2026
                                </small>
                            </div>
                        </li>

                        <li>
                            <span className="tenant-dashboard__dot"></span>

                            <div>
                                <strong>
                                    Lift maintenance schedule
                                </strong>

                                <small>
                                    Posted on 5 Jul 2026
                                </small>
                            </div>
                        </li>

                        <li>
                            <span className="tenant-dashboard__dot"></span>

                            <div>
                                <strong>
                                    Fire drill on 15th July
                                </strong>

                                <small>
                                    Posted on 3 Jul 2026
                                </small>
                            </div>
                        </li>

                    </ul>

                    <div className="tenant-dashboard__feed-footer">
                        <a href="#">
                            View All Notices →
                        </a>
                    </div>

                </article>

            </section>


            {/* FOOTER */}
            <footer className="tenant-dashboard__footer">
                © 2026 Pinnacle Towers. All rights reserved.
            </footer>

        </div>
    );
};

export default TenantDashboard;

