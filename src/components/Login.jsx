import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tenant');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Read the password from localStorage.
    // If none exists, use the default password.
    const savedPassword =
      localStorage.getItem('password') || 'password123';

    if (password === savedPassword && username.trim() !== '') {
      setError('');

      const sessionUser = {
        username: username.trim(),
        role: role,
        authenticated: true,
        loginTime: Date.now().toString()
      };

      localStorage.setItem('user', JSON.stringify(sessionUser));

      if (role === 'tenant') {
        navigate('/tenant/dashboard');
      } else {
        alert(`Logged in as a ${role}. Dynamic dashboard routing will trigger as features are built!`);
      }
    } else {
      setError('Authentication failed. Hint: use password123');
    }
  };

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.authCard}>
        <header style={styles.authHeader}>
          <h1 style={styles.title}>Pinnacle Towers</h1>
          <p style={styles.subtitle}>Portal Authentication Gateway</p>
        </header>

        {error && <div style={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleLoginSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input 
              type="text" 
              style={styles.authField}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                style={{ ...styles.authField, paddingRight: '60px' }}
                placeholder="Enter your password"
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
            <label style={styles.label}>Portal Access Role</label>
            <select 
              style={styles.authDropdown}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="tenant">Tenant</option>
              <option value="manager">Property Manager</option>
              <option value="finance">Finance Officer</option>
              <option value="maintenance">Maintenance Officer</option>
              <option value="security">Security Officer</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

          <button type="submit" style={styles.loginBtn}>Secure Login</button>
          
          <div style={{ textAlign: 'center' }}>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>
        </form>
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
    height: '100vh', // Switched to exact viewport height
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    overflow: 'hidden', // Strictly disables any window scrolling
    fontFamily: 'sans-serif'
  },
  authCard: {
    background: '#ffffff',
    padding: '24px 40px', // Shorter vertical padding (was 35px)
    borderRadius: '12px', 
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)', 
    borderTop: '5px solid #800000', 
    width: '100%',
    maxWidth: '460px', 
    boxSizing: 'border-box',
    textAlign: 'center'
  },
  authHeader: { 
    marginBottom: '20px' // Tighter spacing under header
  },
  title: { 
    color: '#212529', 
    fontSize: '1.7rem', // Slightly smaller title font to save space
    fontWeight: '700',
    margin: '0 0 4px 0'
  },
  subtitle: { 
    color: '#6c757d', 
    fontSize: '0.85rem', 
    margin: 0 
  },
  inputGroup: { 
    marginBottom: '14px', // Tighter field spacing (was 20px)
    textAlign: 'left' 
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
    height: '42px', // Compact input boxes (was 46px)
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
  authDropdown: {
    width: '100%',
    height: '42px', // Compact dropdown box
    padding: '0 12px', 
    fontSize: '0.9rem',
    color: '#212529',
    backgroundColor: '#ffffff', 
    border: '1px solid #ced4da', 
    borderRadius: '6px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    appearance: 'none', 
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23212529' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 15px center',
    backgroundSize: '16px'
  },
  loginBtn: {
    width: '100%',
    height: '44px', // Tighter action button
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
    marginTop: '14px' // Pulled upward
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

export default Login;