import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { Input } from "../visitors";

export default function CarRegistration({ onClose, onRequest }) {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    color: "",
    plate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.brand.trim()) {
      newErrors.brand = "Vehicle Brand is required";
    }
    if (!formData.model.trim()) {
      newErrors.model = "Vehicle make/model is required";
    }
    if (!formData.plate.trim()) {
      newErrors.plate = "Plate number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onRequest();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Car Registration</h2>
          <button className="icon-button" onClick={onClose}>
            <Icon name="close" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <Input
              label="Plate Number"
              name="plate"
              value={formData.plate}
              onChange={handleChange}
              placeholder="e.g. KCB 123A"
              required
              error={errors.plate}
            />

            <Input
              label="Vehicle Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g. BMW"
              required
              error={errors.brand}
            />

            <Input
              label="Vehicle Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g. M3 G80"
              required
              error={errors.model}
            />

            <Input
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g. Black"
              error={errors.color}
            />
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
                <>Add</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
