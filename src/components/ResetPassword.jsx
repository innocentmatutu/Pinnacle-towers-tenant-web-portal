import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setSuccess(true);

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.authCard}>
        <header style={styles.authHeader}>
          <h1 style={styles.title}>Change Password</h1>
          <p style={styles.subtitle}>Create a secure, fresh password for your portal account</p>
        </header>

        {error && <div style={styles.errorBanner}>{error}</div>}
        {success && (
          <div style={styles.successBox}>
            <strong>Success!</strong> Your password has been updated. Redirecting you to the login screen...
          </div>
        )}

        {!success && (
          <form onSubmit={handlePasswordReset}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>New Password</label>
              <div style={styles.passwordWrapper}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  style={{ ...styles.authField, paddingRight: '60px' }}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  style={styles.toggleBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm New Password</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                style={styles.authField}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" style={styles.loginBtn}>Update Password</button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <Link to="/" style={styles.backLink}>
            Cancel and Return
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
  title: { color: '#212529', fontSize: '1.7rem', fontWeight: '700', margin: '0 0 4px 0' },
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
  passwordWrapper: { position: 'relative', width: '100%' },
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
  backLink: { color: '#800000', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none', display: 'inline-block' },
  errorBanner: {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.85rem', // Corrected typo here
    marginBottom: '14px',
    textAlign: 'center'
  },
  successBox: {
    color: '#155724',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    padding: '15px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    textAlign: 'left',
    lineHeight: '1.4',
    marginBottom: '10px'
  }
};

export default ResetPassword;