import { useState } from "react";
import "../parking/parking.css";
import Icon from "../../components/Icon";
import CarRegistration from "./CarRegistration";

const CarDashboard = () => {
  const [showRequest, setShowRequest] = useState(false);

  return (
    <div className="parking-management">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CAR MANAGEMENT</p>
          <h1>My Cars</h1>
        </div>
        <button className="primary-button" onClick={() => setShowRequest(true)}>
          <Icon name="car" size={16} /> Add Vehicle
        </button>
      </div>

      {showRequest && (
              <CarRegistration 
                onClose={() => setShowRequest(false)}
                onRequest={() => {
                  setShowRequest(false);
                }}
              />
            )}
    </div>
  );
};

export default CarDashboard;
