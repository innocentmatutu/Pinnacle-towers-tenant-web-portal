// // components/ParkingManagement/ParkingDashboard.jsx
// import { useState, useEffect } from 'react';
// import Icon from '../Icon';
// import Card from '../Card';
// import ParkingRequest from './ParkingRequest';
// import './ParkingManagement.css';

// export default function ParkingDashboard({ selectNav }) {
//   const [parking, setParking] = useState(null);
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showRequest, setShowRequest] = useState(false);

//   useEffect(() => {
//     const loadParking = async () => {
//       setLoading(true);
//       setTimeout(() => {
//         setParking({
//           bayNumber: 'B-12',
//           level: 'Level 2',
//           status: 'active',
//           permitNumber: 'P-2026-001',
//           validFrom: '2026-01-01',
//           validUntil: '2026-12-31',
//           vehicle: 'Toyota Camry',
//           plate: 'KCB 123A'
//         });
//         setRequests([
//           {
//             id: 1,
//             visitorName: 'Jane Doe',
//             vehicle: 'Honda Civic',
//             plate: 'KCE 456B',
//             date: '2026-08-10',
//             time: '10:00-12:00',
//             status: 'pending'
//           },
//           {
//             id: 2,
//             visitorName: 'John Smith',
//             vehicle: 'Nissan X-Trail',
//             plate: 'KCF 789C',
//             date: '2026-08-09',
//             time: '14:00-16:00',
//             status: 'approved'
//           }
//         ]);
//         setLoading(false);
//       }, 600);
//     };
//     loadParking();
//   }, []);

//   const getStatusBadge = (status) => {
//     const map = {
//       active: 'green',
//       pending: 'amber',
//       approved: 'blue',
//       rejected: '',
//       expired: '',
//       cancelled: ''
//     };
//     return `status ${map[status] || ''}`;
//   };

//   return (
//     <div className="parking-management">
//       <div className="page-heading">
//         <div>
//           <p className="eyebrow">PARKING MANAGEMENT</p>
//           <h1>My Parking</h1>
//         </div>
//         <button className="primary-button" onClick={() => setShowRequest(true)}>
//           <Icon name="car" size={16} /> Request Parking
//         </button>
//       </div>

//       <div className="parking-grid">
//         {loading ? (
//           <div className="loading-state">
//             <div className="spinner"></div>
//             <p>Loading parking information...</p>
//           </div>
//         ) : parking ? (
//           <>
//             <Card className="parking-card main">
//               <div className="parking-header">
//                 <span className="icon-tile gold">
//                   <Icon name="pin" size={20} />
//                 </span>
//                 <span className={`status ${parking.status === 'active' ? 'green' : ''}`}>
//                   {parking.status.charAt(0).toUpperCase() + parking.status.slice(1)}
//                 </span>
//               </div>
//               <div className="parking-details">
//                 <div className="parking-bay">
//                   <h2>{parking.bayNumber}</h2>
//                   <p>{parking.level}</p>
//                 </div>
//                 <div className="parking-info-grid">
//                   <div>
//                     <label>Vehicle</label>
//                     <p>{parking.vehicle}</p>
//                   </div>
//                   <div>
//                     <label>Plate Number</label>
//                     <p>{parking.plate}</p>
//                   </div>
//                 </div>
//                 <div className="parking-permit">
//                   <div>
//                     <label>Permit Number</label>
//                     <p>{parking.permitNumber}</p>
//                   </div>
//                   <div>
//                     <label>Valid Until</label>
//                     <p>{new Date(parking.validUntil).toLocaleDateString('en-KE')}</p>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             <div className="parking-side">
//               <Card className="visitor-parking-card">
//                 <div className="card-top">
//                   <h3>Visitor Parking</h3>
//                   <span className="badge">{requests.filter(r => r.status === 'pending').length} pending</span>
//                 </div>
//                 {requests.length === 0 ? (
//                   <div className="empty-state-small">
//                     <Icon name="car" size={32} />
//                     <p>No visitor parking requests</p>
//                     <button className="outline-button" onClick={() => setShowRequest(true)}>
//                       Request visitor parking
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="visitor-requests">
//                     {requests.map(req => (
//                       <div key={req.id} className="visitor-request-item">
//                         <div>
//                           <strong>{req.visitorName}</strong>
//                           <small>{req.vehicle} ({req.plate})</small>
//                         </div>
//                         <span className={getStatusBadge(req.status)}>
//                           {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </Card>
//             </div>
//           </>
//         ) : (
//           <Card className="empty-state">
//             <Icon name="pin" size={48} />
//             <h3>No Parking Allocated</h3>
//             <p>You currently don't have a parking space allocated.</p>
//             <button className="primary-button" onClick={() => setShowRequest(true)}>
//               Request Parking
//             </button>
//           </Card>
//         )}
//       </div>

//       {showRequest && (
//         <ParkingRequest 
//           onClose={() => setShowRequest(false)}
//           onRequest={() => {
//             // Add request logic
//             setShowRequest(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }