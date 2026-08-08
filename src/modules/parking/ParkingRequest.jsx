import { useState } from 'react';
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import './parking.css';

export default function ParkingRequest({ onClose, onRequest }) {
  const [formData, setFormData] = useState({
    type: 'Visitor parking',
    detail: '',
    visitorName: '',
    vehicle: '',
    plate: '',
    date: '',
    timeRange: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.detail.trim()) {
      newErrors.detail = 'Please provide details about your request';
    }
    if (formData.type === 'Visitor parking') {
      if (!formData.visitorName.trim()) newErrors.visitorName = 'Visitor name is required';
      if (!formData.vehicle.trim()) newErrors.vehicle = 'Vehicle make/model is required';
      if (!formData.plate.trim()) newErrors.plate = 'Plate number is required';
      if (!formData.date) newErrors.date = 'Date is required';
    }
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
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Parking Request</h2>
          <button className="icon-button" onClick={onClose}>
            <Icon name="close" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Request Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Visitor parking">Visitor Parking</option>
                <option value="Additional permit">Additional Permit</option>
                <option value="Bay change">Bay Change Request</option>
              </select>
            </div>

            {formData.type === 'Visitor parking' && (
              <>
                <div className="form-group">
                  <label>Visitor Name *</label>
                  <input
                    type="text"
                    name="visitorName"
                    value={formData.visitorName}
                    onChange={handleChange}
                    placeholder="Full name"
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
                    onChange={handleChange}
                    placeholder="e.g. Toyota Camry"
                    className={errors.vehicle ? 'error' : ''}
                  />
                  {errors.vehicle && <span className="error-message">{errors.vehicle}</span>}
                </div>

                <div className="form-group">
                  <label>Plate Number *</label>
                  <input
                    type="text"
                    name="plate"
                    value={formData.plate}
                    onChange={handleChange}
                    placeholder="e.g. KCB 123A"
                    className={errors.plate ? 'error' : ''}
                  />
                  {errors.plate && <span className="error-message">{errors.plate}</span>}
                </div>

                <div className="form-group">
                  <label>Visit Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? 'error' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>

                <div className="form-group full-width">
                  <label>Time Range</label>
                  <input
                    type="text"
                    name="timeRange"
                    value={formData.timeRange}
                    onChange={handleChange}
                    placeholder="e.g. 10:00 AM - 12:00 PM"
                  />
                </div>
              </>
            )}

            <div className="form-group full-width">
              <label>Details *</label>
              <textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                placeholder="Please provide any additional details about your request..."
                rows="3"
                className={errors.detail ? 'error' : ''}
              />
              {errors.detail && <span className="error-message">{errors.detail}</span>}
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