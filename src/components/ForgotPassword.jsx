import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      // For now, we simulate sending a recovery email link
      setSubmitted(true);

      // 3. Automatically redirect to the reset screen after 2.5 seconds
      setTimeout(() => {
        navigate('/reset-password');
      }, 2500);
    }
  };

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.authCard}>
        <header style={styles.authHeader}>
          <h1 style={styles.title}>Reset Password</h1>
          <p style={styles.subtitle}>
            {!submitted 
              ? "Enter your account email to receive a recovery link" 
              : "Check your inbox for further instructions"}
          </p>
        </header>

        {!submitted ? (
          <form onSubmit={handleResetSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Registered Email Address</label>
              <input 
                type="email" 
                style={styles.authField}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <button type="submit" style={styles.loginBtn}>Send Recovery Link</button>
          </form>
        ) : (
          <div style={styles.successBox}>
            A secure recovery link has been dispatched to <strong>{email}</strong>. 
            <br /><br />
            <span style={{ fontSize: '0.8rem', color: '#155724' }}>
              Redirecting you to password configuration screen...
            </span>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <Link to="/" style={styles.backLink}>
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  bodyWrapper: {
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
    fontFamily: 'sans-serif'
  },
  authCard: {
    background: '#ffffff',
    padding: '24px 40px',
    borderRadius: '12px', 
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)', 
    borderTop: '5px solid #800000', 
    width: '100%',
    maxWidth: '460px', 
    boxSizing: 'border-box',
    textAlign: 'center'
  },
  authHeader: { 
    marginBottom: '20px' 
  },
  title: { 
    color: '#212529', 
    fontSize: '1.7rem', 
    fontWeight: '700',
    margin: '0 0 4px 0'
  },
  subtitle: { 
    color: '#6c757d', 
    fontSize: '0.85rem', 
    margin: 0 
  },
  inputGroup: { 
    marginBottom: '14px', 
    textAlign: 'left',
    position: 'relative' 
  },
  label: { 
    display: 'block', 
    fontSize: '0.85rem', 
    fontWeight: '600', 
    color: '#212529', 
    marginBottom: '6px' 
  },
  authField: {
    width: '100%',
    height: '42px', 
    padding: '0 12px', 
    fontSize: '0.9rem',
    color: '#212529',
    backgroundColor: '#ffffff', 
    border: '1px solid #ced4da', 
    borderRadius: '6px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  passwordWrapper: { 
    position: 'relative', 
    width: '100%' 
  },
  toggleBtn: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#800000',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    outline: 'none'
  },
  customDropdownHeader: {
    width: '100%',
    height: '42px',
    padding: '0 12px',
    fontSize: '0.9rem',
    color: '#212529',
    backgroundColor: '#ffffff',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  customDropdownHeaderOpen: {
    borderColor: '#800000',
    boxShadow: '0 0 0 3px rgba(128, 0, 0, 0.1)'
  },
  dropdownArrow: {
    fontSize: '10px',
    color: '#6c757d',
    transition: 'transform 0.2s ease'
  },
  dropdownArrowRotate: {
    transform: 'rotate(180deg)'
  },
  // Adjusted max-height so it scrolls comfortably within bounds
  customDropdownList: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    listStyle: 'none',
    padding: '4px',
    margin: 0,
    zIndex: 50,
    maxHeight: '150px', // Restricts height so scrollbar kicks in cleanly
    overflowY: 'auto',  // Enables smooth vertical scrolling
    boxSizing: 'border-box'
  },
  customDropdownItem: {
    padding: '10px 12px',
    fontSize: '0.9rem',
    color: '#212529',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.15s, color 0.15s'
  },
  customDropdownItemSelected: {
    backgroundColor: '#fdf2f2',
    color: '#800000',
    fontWeight: '600'
  },
  loginBtn: {
    width: '100%',
    height: '44px', 
    marginTop: '6px',
    backgroundColor: '#800000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px', 
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  forgotLink: { 
    color: '#800000', 
    fontSize: '0.85rem', 
    fontWeight: '600', 
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '14px' 
  },
  errorBanner: {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    marginBottom: '14px',
    textAlign: 'center'
  }
};

export default ForgotPassword;