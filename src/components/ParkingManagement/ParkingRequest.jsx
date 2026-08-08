// components/ParkingManagement/ParkingRequest.jsx
import { useState } from 'react';
import Icon from '../Icon';
import './ParkingManagement.css';

export default function ParkingRequest({ onClose, onRequest }) {
  const [formData, setFormData] = useState({
    visitorName: '',
    vehicle: '',
    plate: '',
    date: '',
    timeRange: '',
    purpose: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.visitorName.trim()) newErrors.visitorName = 'Visitor name is required';
    if (!formData.vehicle.trim()) newErrors.vehicle = 'Vehicle make/model is required';
    if (!formData.plate.trim()) newErrors.plate = 'Plate number is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.timeRange) newErrors.timeRange = 'Time range is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onRequest();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Request Visitor Parking</h2>
          <button className="icon-button" onClick={onClose}>
            <Icon name="close" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Visitor Name *</label>
              <input
                type="text"
                name="visitorName"
                value={formData.visitorName}
                onChange={e => setFormData({...formData, visitorName: e.target.value})}
                className={errors.visitorName ? 'error' : ''}
              />
              {errors.visitorName && <span className="error-message">{errors.visitorName}</span>}
            </div>

            <div className="form-group">
              <label>Vehicle Make/Model *</label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={e => setFormData({...formData, vehicle: e.target.value})}
                className={errors.vehicle ? 'error' : ''}
                placeholder="e.g. Toyota Camry"
              />
              {errors.vehicle && <span className="error-message">{errors.vehicle}</span>}
            </div>

            <div className="form-group">
              <label>Plate Number *</label>
              <input
                type="text"
                name="plate"
                value={formData.plate}
                onChange={e => setFormData({...formData, plate: e.target.value})}
                className={errors.plate ? 'error' : ''}
                placeholder="e.g. KCB 123A"
              />
              {errors.plate && <span className="error-message">{errors.plate}</span>}
            </div>

            <div className="form-group">
              <label>Visit Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className={errors.date ? 'error' : ''}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group full-width">
              <label>Time Range *</label>
              <input
                type="text"
                name="timeRange"
                value={formData.timeRange}
                onChange={e => setFormData({...formData, timeRange: e.target.value})}
                className={errors.timeRange ? 'error' : ''}
                placeholder="e.g. 10:00 AM - 12:00 PM"
              />
              {errors.timeRange && <span className="error-message">{errors.timeRange}</span>}
            </div>

            <div className="form-group full-width">
              <label>Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={e => setFormData({...formData, purpose: e.target.value})}
                placeholder="Brief description of the visit"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="outline-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <Icon name="send" size={16} /> Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}