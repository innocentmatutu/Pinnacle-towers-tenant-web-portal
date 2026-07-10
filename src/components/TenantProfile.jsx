import React, { useState } from 'react';

function TenantProfile({ onBack }) {
  // Pull current active session data
  const sessionUser = JSON.parse(localStorage.getItem('user')) || { username: 'Tenant' };

  // Component form states
  const [profilePic, setProfilePic] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    fullName: sessionUser.username,
    email: 'tenant@pinnacle.com',
    phone: '+254 700 000000',
    nationalId: '33445566'
  });

  const [emergencyContact, setEmergencyContact] = useState({
    name: 'Jane Doe',
    relationship: 'Kin / Spouse',
    phone: '+254 711 111111'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Mock Image Upload Stream
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');

    // Simulate database record mutation
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg('Your profile profile updates have been committed successfully!');
      
      // Sync names back to local session space if changed
      const updatedSession = { ...sessionUser, username: contactInfo.fullName };
      localStorage.setItem('user', JSON.stringify(updatedSession));
    }, 1500);
  };

  return (
    <div style={styles.profileContainer}>
      <header style={styles.headerRow}>
        <div>
          <button onClick={onBack} style={styles.backBtn}>← Back to Dashboard</button>
          <h1 style={styles.title}>Account Profile Settings</h1>
        </div>
      </header>

      {successMsg && <div style={styles.successBanner}>{successMsg}</div>}

      <form onSubmit={handleSaveProfile} style={styles.formLayout}>
        {/* Left Side Column: Avatar Upload Area */}
        <div style={styles.avatarColumn}>
          <div style={styles.avatarWrapper}>
            {profilePic ? (
              <img src={profilePic} alt="Profile" style={styles.avatarImg} />
            ) : (
              <div style={styles.avatarPlaceholder}>
                <span>{contactInfo.fullName.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
          <label style={styles.uploadLabel}>
            Upload New Photo
            <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          </label>
          <p style={styles.uploadFootnote}>Supports JPG, PNG up to 2MB</p>
        </div>

        {/* Right Side Column: Form Data Modules */}
        <div style={styles.fieldsColumn}>
          {/* Section A: Contact Info */}
          <h3 style={styles.sectionHeading}>Contact Information</h3>
          <div style={styles.fieldGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                style={styles.input} 
                value={contactInfo.fullName}
                onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input 
                type="email" 
                style={styles.input} 
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <input 
                type="text" 
                style={styles.input} 
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>National ID / Passport</label>
              <input 
                type="text" 
                style={{ ...styles.input, backgroundColor: '#f1f3f5', color: '#6c757d' }} 
                value={contactInfo.nationalId} 
                disabled
              />
            </div>
          </div>

          <hr style={styles.divider} />

          {/* Section B: Emergency Contacts */}
          <h3 style={styles.sectionHeading}>Emergency Contact Details</h3>
          <div style={styles.fieldGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Contact Name</label>
              <input 
                type="text" 
                style={styles.input} 
                value={emergencyContact.name}
                onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Relationship</label>
              <input 
                type="text" 
                style={styles.input} 
                value={emergencyContact.relationship}
                onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Emergency Phone</label>
              <input 
                type="text" 
                style={styles.input} 
                value={emergencyContact.phone}
                onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" style={styles.saveBtn} disabled={isSaving}>
            {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  profileContainer: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  backBtn: { background: 'none', border: 'none', color: '#800000', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', padding: 0, marginBottom: '8px' },
  title: { fontSize: '1.6rem', fontWeight: '700', color: '#212529', margin: 0 },
  formLayout: { display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '10px' },
  avatarColumn: { flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  avatarWrapper: { width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e9ecef', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid #edf2f7', marginBottom: '16px' },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarPlaceholder: { fontSize: '3rem', fontWeight: '700', color: '#adb5bd' },
  uploadLabel: { padding: '8px 16px', backgroundColor: '#f8f9fa', border: '1px solid #ced4da', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#495057', cursor: 'pointer', display: 'inline-block' },
  uploadFootnote: { fontSize: '0.75rem', color: '#6c757d', marginTop: '6px', marginContent: 0 },
  fieldsColumn: { flex: '3', minWidth: '300px' },
  sectionHeading: { fontSize: '1.1rem', fontWeight: '600', color: '#212529', margin: '0 0 16px 0' },
  fieldGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '0.8rem', fontWeight: '600', color: '#495057', marginBottom: '6px' },
  input: { height: '40px', padding: '0 12px', fontSize: '0.9rem', border: '1px solid #ced4da', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' },
  divider: { border: 'none', borderTop: '1px solid #edf2f7', margin: '30px 0' },
  saveBtn: { padding: '12px 24px', backgroundColor: '#800000', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', marginTop: '24px' },
  successBanner: { color: '#155724', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', padding: '12px 16px', borderRadius: '6px', fontSize: '0.9rem', marginBottom: '24px' }
};

export default TenantProfile;