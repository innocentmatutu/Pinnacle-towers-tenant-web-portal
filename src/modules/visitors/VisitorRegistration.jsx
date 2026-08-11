import { useState } from 'react';
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./visitors.css";
import Input from './Input';
import Select from './Select';
import { purposeOptions } from '../../constants';

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
            <Input
              label="Visitor Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              required
              error={errors.name}
            />

            <Input
              label="ID No."
              name="idNumber"
              type="number"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="ID Number"
              required
              error={errors.idNumber}
            />

            <Input
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone number or email"
              required
              error={errors.contact}
            />

            <Input
              label="Visit Date"
              name="visitDate"
              type="date"
              value={formData.visitDate}
              onChange={handleChange}
              required
              error={errors.visitDate}
              min={new Date().toISOString().split('T')[0]}
            />

            <Input
              label="Expected Arrival Time"
              name="arrivalTime"
              type="time"
              value={formData.arrivalTime}
              onChange={handleChange}
              required
              error={errors.arrivalTime}
            />

            <Input
              label="Expected Departure Time"
              name="departureTime"
              type="time"
              value={formData.departureTime}
              onChange={handleChange}
              required
              error={errors.departureTime}
            />
            
            <Input
              label="Return Date"
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
              required
              error={errors.departureDate}
              min={new Date().toISOString().split('T')[0]}
            />

            <Select
              label="Purpose of Visit"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              options={purposeOptions}
              placeholder="Select purpose"
              required
              error={errors.purpose}
            />
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