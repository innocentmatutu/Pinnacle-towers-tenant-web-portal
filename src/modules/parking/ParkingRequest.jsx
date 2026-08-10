import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./parking.css";
import { sampleUserVehicles, sampleVisitors, typeOptions } from "../../constants";
import { Input, Select } from "../visitors";

export default function ParkingRequest({ onClose, onRequest }) {
  const [formData, setFormData] = useState({
    type: "My parking",
    visitorID: "",
    detail: "",
    brand: "",
    model: "",
    plate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userVehicles, setUserVehicles] = useState([]);

  useEffect(() => {
    setUserVehicles(sampleUserVehicles);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (formData.type === "Visitor parking") {
      if (!formData.visitorID) {
        newErrors.visitorID = "Please select a visitor";
      }
      if (!formData.brand.trim()) {
        newErrors.brand = "Vehicle Brand is required";
      }
      if (!formData.model.trim()) {
        newErrors.model = "Vehicle make/model is required";
      }
      if (!formData.plate.trim()) {
        newErrors.plate = "Plate number is required";
      }

      if (formData.type === "Bay change" || formData.type === "My parking") {
        if (!formData.detail.trim()) {
          newErrors.detail = "Please select a vehicle";
        }
      }

      if (formData.type === "Bay change") {
        if (!formData.detail.trim()) {
          newErrors.detail = "Please provide details about your request";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const activeVisitors = sampleVisitors.filter((v) =>
    ["expected", "pending", "active"].includes(v.status),
  );

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

  const handleVehicleSelect = (vehicleId) => {
    const selected = userVehicles.find((v) => v.id === parseInt(vehicleId));
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        vehicle: `${selected.make} ${selected.model}`,
        plate: selected.plate,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const visitorOptions = activeVisitors.map((visitor) => ({
    value: visitor.id.toString(),
    label: `${visitor.name} (${visitor.status})`,
  }));

  const vehicleOptions = sampleUserVehicles.map((vehicle) => ({
    value: vehicle.plate.toString(),
    label: `${vehicle.model} (${vehicle.plate})`,
  }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Parking Request</h2>
          <button className="icon-button" onClick={onClose}>
            <Icon name="close" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <Select
                label="Request Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={typeOptions}
                required
              />
            </div>

            {formData.type === "Visitor parking" && (
              <div className="form-group">
                <Select
                label="Select Visitor"
                name="visitorID"
                value={formData.visitorID}
                onChange={handleChange}
                options={visitorOptions}
                placeholder={activeVisitors.length === 0 ? "No active visitors found" : "Select a visitor..."}
                required
                error={errors.visitorID}
              />
              </div>
            )}

            {(formData.type === "My parking" ||
              formData.type === "Bay change") && (
              <div className="form-group">
                <Select
                  name="vehicleSelect"
                  label="Select Vehicle"
                  value=""
                  onChange={(e) => handleVehicleSelect(e.target.value)}
                  options={userVehicles}
                  placeholder="Choose saved vehicle"
                  required
                />
              </div>
            )}

            {formData.type === "Visitor parking" && (
              <>
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
              </>
            )}

            {formData.type === "Bay change" && (
              <div className="form-group full-width">
                <label>Details *</label>
                <textarea
                  name="detail"
                  value={formData.detail}
                  onChange={handleChange}
                  placeholder="Describe your bay change request in detail..."
                  rows="3"
                  className={errors.detail ? "error" : ""}
                />
                {errors.detail && (
                  <span className="error-message">{errors.detail}</span>
                )}
              </div>
            )}
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
