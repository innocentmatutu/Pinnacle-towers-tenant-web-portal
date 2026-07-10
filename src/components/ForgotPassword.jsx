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
  authHeader: { marginBottom: '20px' },
  title: { 
    color: '#212529', 
    fontSize: '1.7rem', 
    fontWeight: '700',
    margin: '0 0 4px 0'
  },
  subtitle: { color: '#6c757d', fontSize: '0.85rem', margin: 0 },
  inputGroup: { marginBottom: '14px', textAlign: 'left' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#212529', marginBottom: '6px' },
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
  backLink: {
    color: '#800000',
    fontSize: '0.85rem',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block'
  },
  successBox: {
    color: '#155724',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    padding: '15px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    textAlign: 'left',
    marginBottom: '10px',
    lineHeight: '1.4'
  }
};

export default ForgotPassword;