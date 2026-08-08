import { useState } from 'react';
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./visitors.css";

export default function VisitorRegistration({ onClose, onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    contact: '',
    visitDate: '',
    arrivalTime: '',
    departureTime: '',
    departureDate: '',
    purpose: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Visitor name is required';
    if (!formData.idNumber.trim()) newErrors.idNumber = 'Visitor ID No. is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact information is required';
    if (!formData.visitDate) newErrors.visitDate = 'Visit date is required';
    if (!formData.arrivalTime) newErrors.arrivalTime = 'Arrival time is required';
    if (!formData.departureTime) newErrors.departureTime = 'Departure time is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose of visit is required';
    
    // Validate time logic
    if (formData.arrivalTime && formData.departureTime && formData.departureDate && formData.visitDate) {
      if (formData.arrivalTime >= formData.departureTime) {
        newErrors.departureTime = 'Departure time must be after arrival time';
      }

      if (formData.visitDate >= formData.departureDate) {
        newErrors.departureTime = 'Departure date must be after visit date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newVisitor = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      onRegister(newVisitor);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setErrors({ submit: 'Failed to register visitor. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Register Visitor</h2>
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>ID No. *</label>
              <input
                type="number"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="ID Number"
                className={errors.idNumber ? 'error' : ''}
              />
              {errors.idNumber && <span className="error-message">{errors.idNumber}</span>}
            </div>

            <div className="form-group">
              <label>Contact *</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Phone number or email"
                className={errors.contact ? 'error' : ''}
              />
              {errors.contact && <span className="error-message">{errors.contact}</span>}
            </div>

            <div className="form-group">
              <label>Visit Date *</label>
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className={errors.visitDate ? 'error' : ''}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.visitDate && <span className="error-message">{errors.visitDate}</span>}
            </div>

            <div className="form-group">
              <label>Expected Arrival Time *</label>
              <input
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                className={errors.arrivalTime ? 'error' : ''}
              />
              {errors.arrivalTime && <span className="error-message">{errors.arrivalTime}</span>}
            </div>

            <div className="form-group">
              <label>Expected Departure Time *</label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                className={errors.departureTime ? 'error' : ''}
              />
              {errors.departureTime && <span className="error-message">{errors.departureTime}</span>}
            </div>
            
            <div className="form-group">
              <label>Return Date *</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className={errors.departureDate ? 'error' : ''}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.departureDate && <span className="error-message">{errors.departureDate}</span>}
            </div>

            <div className="form-group">
              <label>Purpose of Visit *</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={errors.purpose ? 'error' : ''}
              >
                <option value="">Select purpose</option>
                <option value="Meeting with property manager">Meeting with property manager</option>
                <option value="Maintenance inspection">Maintenance inspection</option>
                <option value="Package delivery">Package delivery</option>
                <option value="Business meeting">Business meeting</option>
                <option value="Family visit">Family visit</option>
                <option value="Other">Other</option>
              </select>
              {errors.purpose && <span className="error-message">{errors.purpose}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional information..."
              rows="3"
            />
          </div>

          {errors.submit && <div className="error-message submit">{errors.submit}</div>}

          <div className="form-actions">
            <button type="button" className="outline-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Registering...
                </>
              ) : success ? (
                <>
                  <Icon name="check" size={16} /> Registered!
                </>
              ) : (
                <>
                  <Icon name="users" size={16} /> Register Visitor
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}