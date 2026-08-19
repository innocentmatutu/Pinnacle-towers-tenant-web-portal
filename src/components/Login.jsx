import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SETTINGS_KEY = 'admin_system_settings';
const LOGIN_ATTEMPTS_KEY = 'login_failed_attempts';

function Login({ setUser }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tenant');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Custom dropdown states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const roles = [
    { value: 'tenant', label: 'Tenant' },
    { value: 'manager', label: 'Property Manager' },
    { value: 'finance', label: 'Finance Officer' },
    { value: 'maintenance', label: 'Maintenance Officer' },
    //{ value: 'security', label: 'Security Officer' },
    { value: 'admin', label: 'System Administrator' }
  ];

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
  }, []);

  /*
   * Get the maximum login attempts configured
   * in System Settings.
   */
  const getMaxLoginAttempts = () => {
    const savedSettings =
      localStorage.getItem(SETTINGS_KEY);

    if (!savedSettings) {
      return 5;
    }

    try {
      const settings =
        JSON.parse(savedSettings);

      const configuredAttempts =
        Number(
          settings?.security?.maxLoginAttempts
        );

      if (
        configuredAttempts === 3 ||
        configuredAttempts === 5 ||
        configuredAttempts === 10
      ) {
        return configuredAttempts;
      }

      return 5;
    } catch {
      return 5;
    }
  };

  /*
   * Get the number of failed login attempts.
   */
  const getFailedAttempts = () => {
    const storedAttempts =
      localStorage.getItem(
        LOGIN_ATTEMPTS_KEY
      );

    const attempts =
      Number(storedAttempts);

    return Number.isFinite(attempts)
      ? attempts
      : 0;
  };

  /*
   * Store a failed login attempt.
   */
  const recordFailedAttempt = () => {
    const currentAttempts =
      getFailedAttempts();

    const newAttempts =
      currentAttempts + 1;

    localStorage.setItem(
      LOGIN_ATTEMPTS_KEY,
      String(newAttempts)
    );

    return newAttempts;
  };

  /*
   * Reset failed login attempts
   * after successful authentication.
   */
  const resetFailedAttempts = () => {
    localStorage.removeItem(
      LOGIN_ATTEMPTS_KEY
    );
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setError('');

    const maxLoginAttempts =
      getMaxLoginAttempts();

    const failedAttempts =
      getFailedAttempts();

    /*
     * Check whether the maximum number of
     * attempts has already been reached.
     */
    if (failedAttempts >= maxLoginAttempts) {
      setError(
        `Maximum login attempts reached. Please contact the administrator.`
      );

      return;
    }

    const enteredUsername =
      username.trim();

    if (!enteredUsername || !password) {
      setError(
        'Username and password are required.'
      );

      return;
    }

    const savedUsers =
      localStorage.getItem('admin_users');

    let users = [];

    if (savedUsers) {
      try {
        users = JSON.parse(savedUsers);
      } catch {
        users = [];
      }
    }

    /*
     * If User Management has never been initialized,
     * create the default accounts.
     */
    if (
      !Array.isArray(users) ||
      users.length === 0
    ) {
      users = [
        {
          id: 'USR-001',
          name: 'System Administrator',
          username: 'admin',
          email: 'admin@pinnacletowers.com',
          phone: '',
          role: 'Admin',
          status: 'Active',
          password: 'password123',
        },
        {
          id: 'USR-002',
          name: 'Tenant',
          username: 'tenant',
          email: 'tenant@example.com',
          phone: '',
          role: 'Tenant',
          status: 'Active',
          password: 'password123',
        },
        {
          id: 'USR-003',
          name: 'Property Manager',
          username: 'manager',
          email: 'manager@example.com',
          phone: '',
          role: 'Manager',
          status: 'Active',
          password: 'password123',
        },
        {
          id: 'USR-004',
          name: 'Finance Officer',
          username: 'finance',
          email: 'finance@example.com',
          phone: '',
          role: 'Finance',
          status: 'Active',
          password: 'password123',
        },
        {
          id: 'USR-005',
          name: 'Maintenance Officer',
          username: 'maintenance',
          email: 'maintenance@example.com',
          phone: '',
          role: 'Maintenance',
          status: 'Active',
          password: 'password123',
        },
      ];

      localStorage.setItem(
        'admin_users',
        JSON.stringify(users)
      );
    }

    const account = users.find(
      (user) =>
        user.username.toLowerCase() ===
          enteredUsername.toLowerCase() &&
        user.role.toLowerCase() ===
          role.toLowerCase()
    );

    /*
     * Account does not exist.
     */
    if (!account) {
      const attempts =
        recordFailedAttempt();

      const remaining =
        maxLoginAttempts - attempts;

      if (remaining <= 0) {
        setError(
          'Maximum login attempts reached. Please contact the administrator.'
        );
      } else {
        setError(
          `No account was found for this username and role. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
        );
      }

      return;
    }

    /*
     * Account exists but is inactive.
     */
    if (account.status !== 'Active') {
      const attempts =
        recordFailedAttempt();

      const remaining =
        maxLoginAttempts - attempts;

      if (remaining <= 0) {
        setError(
          'Maximum login attempts reached. Please contact the administrator.'
        );
      } else {
        setError(
          `This account is inactive. Please contact the administrator. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
        );
      }

      return;
    }

    /*
     * Incorrect password.
     */
    if (account.password !== password) {
      const attempts =
        recordFailedAttempt();

      const remaining =
        maxLoginAttempts - attempts;

      if (remaining <= 0) {
        setError(
          'Maximum login attempts reached. Please contact the administrator.'
        );
      } else {
        setError(
          `Incorrect password. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
        );
      }

      return;
    }

    /*
     * Successful authentication.
     *
     * Reset failed attempts before creating
     * the authenticated session.
     */
    resetFailedAttempts();

    const sessionUser = {
      id: account.id,
      username: account.username,
      name: account.name,
      email: account.email,
      phone: account.phone,
      role: account.role.toLowerCase(),
      authenticated: true,
      loginTime: Date.now().toString(),
    };

    localStorage.setItem(
      'user',
      JSON.stringify(sessionUser)
    );

    setUser(sessionUser);

    switch (sessionUser.role) {
      case 'finance':
        navigate('/finance/dashboard');
        break;

      case 'tenant':
        navigate('/tenant/dashboard');
        break;

      case 'admin':
        navigate('/admin/dashboard');
        break;

      case 'manager':
        navigate('/manager/dashboard');
        break;

      case 'maintenance':
        navigate('/maintenance/dashboard');
        break;

      default:
        navigate('/');
    }
  };

  const selectedRoleLabel =
    roles.find(
      (r) => r.value === role
    )?.label || 'Select Role';

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.authCard}>
        <header style={styles.authHeader}>
          <h1 style={styles.title}>
            Pinnacle Towers
          </h1>

          <p style={styles.subtitle}>
            Portal Authentication Gateway
          </p>
        </header>

        {error && (
          <div style={styles.errorBanner}>
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Username
            </label>

            <input
              type="text"
              style={styles.authField}
              placeholder="Enter your username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Password
            </label>

            <div style={styles.passwordWrapper}>
              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                style={{
                  ...styles.authField,
                  paddingRight: '60px'
                }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                style={styles.toggleBtn}
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? 'Hide'
                  : 'Show'}
              </button>
            </div>
          </div>

          {/* Custom Dropdown Container */}
          <div
            style={styles.inputGroup}
            ref={dropdownRef}
          >
            <label style={styles.label}>
              Portal Access Role
            </label>

            <div
              style={{
                ...styles.customDropdownHeader,
                ...(isDropdownOpen
                  ? styles.customDropdownHeaderOpen
                  : {})
              }}
              onClick={() =>
                setIsDropdownOpen(
                  !isDropdownOpen
                )
              }
            >
              <span>
                {selectedRoleLabel}
              </span>

              <span
                style={{
                  ...styles.dropdownArrow,
                  ...(isDropdownOpen
                    ? styles.dropdownArrowRotate
                    : {})
                }}
              >
                ▼
              </span>
            </div>

            {isDropdownOpen && (
              <ul
                style={
                  styles.customDropdownList
                }
              >
                {roles.map((r) => (
                  <li
                    key={r.value}
                    style={{
                      ...styles.customDropdownItem,
                      ...(role === r.value
                        ? styles.customDropdownItemSelected
                        : {})
                    }}
                    onClick={() => {
                      setRole(r.value);
                      setIsDropdownOpen(
                        false
                      );
                    }}
                    onMouseEnter={(e) => {
                      if (
                        role !== r.value
                      ) {
                        e.currentTarget.style.backgroundColor =
                          '#f3f4f6';
                      }

                      e.currentTarget.style.color =
                        '#800000';
                    }}
                    onMouseLeave={(e) => {
                      if (
                        role !== r.value
                      ) {
                        e.currentTarget.style.backgroundColor =
                          '#ffffff';

                        e.currentTarget.style.color =
                          '#212529';
                      }
                    }}
                  >
                    {r.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            style={styles.loginBtn}
          >
            Secure Login
          </button>

          <div
            style={{
              textAlign: 'center'
            }}
          >
            <Link
              to="/forgot-password"
              style={styles.forgotLink}
            >
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
    alignItems: 'flex-start',
    paddingTop: '6vh',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
    fontFamily: 'sans-serif'
  },

  authCard: {
    background: '#ffffff',
    padding: '24px 30px',
    borderRadius: '12px',
    boxShadow:
      '0 10px 25px rgba(0, 0, 0, 0.05)',
    borderTop: '5px solid #800000',
    width: '100%',
    maxWidth: '380px',
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
    transition:
      'border-color 0.2s, box-shadow 0.2s'
  },

  customDropdownHeaderOpen: {
    borderColor: '#800000',
    boxShadow:
      '0 0 0 3px rgba(128, 0, 0, 0.1)'
  },

  dropdownArrow: {
    fontSize: '10px',
    color: '#6c757d',
    transition:
      'transform 0.2s ease'
  },

  dropdownArrowRotate: {
    transform: 'rotate(180deg)'
  },

  customDropdownList: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    listStyle: 'none',
    padding: '4px',
    margin: 0,
    zIndex: 50,
    maxHeight: '120px',
    overflowY: 'auto',
    boxSizing: 'border-box'
  },

  customDropdownItem: {
    padding: '10px 12px',
    fontSize: '0.9rem',
    color: '#212529',
    borderRadius: '4px',
    cursor: 'pointer',
    transition:
      'background-color 0.15s, color 0.15s'
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

export default Login;

