import { useState } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./support.css";
import { guides } from "../../constants";

export default function HelpGuides() {
  const [open, setOpen] = useState(null);

  const toggleGuide = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="guides-section">
      <p className="section-description">
        Step-by-step guides to help you make the most of the Pinnacle Towers
        tenant portal.
      </p>

      <div className="guides-list">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className={`guide-item ${open === guide.id ? "open" : ""}`}
          >
            <button
              className="guide-header"
              onClick={() => toggleGuide(guide.id)}
            >
              <span className="guide-number">
                {guide.id.toString().padStart(2, "0")}
              </span>
              <h3>{guide.title}</h3>
              <Icon name={open === guide.id ? "close" : "arrow"} size={16} />
            </button>
            {open === guide.id && (
              <div className="guide-content">
                <ol>
                  {guide.content.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
