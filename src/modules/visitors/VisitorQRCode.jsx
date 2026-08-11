import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import "./visitors.css";

export default function VisitorQRCode({ visitor, onClose }) {
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState("../../../public/images/qrcode.png");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setLoading(true);
        // Simulate QR generation
        await new Promise((resolve) => setTimeout(resolve, 800));
        //setQrCode(visitor.qrCode || "data:image/svg+xml;base64,...");
        setError(null);
      } catch (err) {
        setError("Failed to generate QR code");
      } finally {
        setLoading(false);
      }
    };
    generateQR();
  }, [visitor]);

  const handleRegenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setQrCode("data:image/svg+xml;base64,...");
      setLoading(false);
    }, 500);
  };

  const handleCopy = async () => {
    const passCode = `PT-VIST-${visitor.id}`;
    try {
      await navigator.clipboard.writeText(passCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = passCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `QR-${visitor.name}-${visitor.id}.png`;
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content qr-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Visitor QR Code</h2>
          <button className="icon-button" onClick={onClose}>
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="qr-content">
          <div className="visitor-summary">
            <h3>{visitor.name}</h3>
            <p>{visitor.purpose}</p>
            <div className="qr-visitor-details">
              <span>
                <Icon name="calendar" size={14} />{" "}
                {new Date(visitor.visitDate).toLocaleDateString("en-KE")}
              </span>
              <span>
                <Icon name="clock" size={14} /> {visitor.arrivalTime}
              </span>
            </div>
          </div>

          <div className="qr-display">
            {loading ? (
              <div className="qr-loading">
                <div className="spinner"></div>
                <p>Generating QR Code...</p>
              </div>
            ) : error ? (
              <div className="qr-error">
                <Icon name="close" size={32} />
                <p>{error}</p>
                <button className="primary-button" onClick={handleRegenerate}>
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <p className="qr-instructions">
                  Show the QR or Pass code at the security desk for check-in.
                </p>
                
                <div className="qr-code">
                  <img src={qrCode} alt={`QR Code for ${visitor.name}`} />
                </div>
                
                {/* Pass Code with Copy Button */}
                <div className="qr-pass-section">
                  <p className="qr-pass-label">Pass Code</p>
                  <div className="qr-pass-code">
                    <code>PT-VIST-{visitor.id}</code>
                    <button 
                      className={`copy-btn ${copied ? 'copied' : ''}`}
                      onClick={handleCopy}
                    >
                      <Icon name={copied ? "check" : "copy"} size={16} />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="qr-actions">
                  <button className="outline-button" onClick={handleRegenerate}>
                    <Icon name="redo" size={16} /> Regenerate
                  </button>
                  <button className="outline-button" onClick={handleDownload}>
                    <Icon name="download" size={16} /> Download
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}