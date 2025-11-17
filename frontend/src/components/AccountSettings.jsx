import React, { useState } from 'react';
import './AccountSettings.css';

const AccountSettings = ({ onBack }) => {
  const [fullName, setFullName] = useState('Tommy Kang');
  const [preferredEmail, setPreferredEmail] = useState('tkang51@uic.edu');
  const [otherEmails, setOtherEmails] = useState(['tommyk8477@gmail.com']);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSave = () => {
    console.log('Saving settings:', { fullName, preferredEmail, otherEmails });
    // In a real app, this would send to backend
  };

  const handleUnlinkEmail = (email) => {
    setOtherEmails(otherEmails.filter(e => e !== email));
  };

  const handleAddEmail = () => {
    console.log('Add another email');
  };

  const handleChangePassword = () => {
    console.log('Change password');
  };

  const handleUploadPicture = () => {
    console.log('Upload profile picture');
  };

  const enrolledClasses = [
    {
      id: 1,
      code: 'CS 421',
      name: 'Natural Language Processing',
      term: 'Fall 2025',
      notifications: 'Daily Digest • Real Time'
    },
    {
      id: 2,
      code: 'CS 421 (CRN 43946, 43947)',
      name: 'CS 421: Natural Language Processing (Parde)',
      term: 'Fall 2025',
      notifications: 'Daily Digest • Real Time'
    },
    {
      id: 3,
      code: 'CS 484',
      name: 'Secure Web Application Development',
      term: 'Fall 2025',
      notifications: 'Daily Digest • Real Time'
    }
  ];

  return (
    <div className="account-settings">
      <button className="back-button" onClick={onBack}>← Back</button>
      
      <h1 className="settings-title">Account Settings</h1>

      {/* Personal Settings */}
      <section className="settings-section">
        <h2 className="section-title">Personal Settings</h2>
        
        <div className="settings-row">
          <div className="settings-left">
            <div className="form-group">
              <label htmlFor="fullName">Full Name*</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
              />
              <p className="field-hint">Your real name please!</p>
            </div>

            <div className="form-group">
              <label htmlFor="preferredEmail">Preferred Email*</label>
              <input
                id="preferredEmail"
                type="email"
                value={preferredEmail}
                onChange={(e) => setPreferredEmail(e.target.value)}
                className="form-input"
              />
              <p className="field-hint">Your preferred email address is where you receive email notifications.</p>
            </div>

            <div className="form-group">
              <label>Other Emails</label>
              {otherEmails.map((email, index) => (
                <div key={index} className="email-row">
                  <span className="email-text">{email}</span>
                  <button 
                    className="unlink-btn"
                    onClick={() => handleUnlinkEmail(email)}
                  >
                    Unlink
                  </button>
                </div>
              ))}
              <button className="add-email-btn" onClick={handleAddEmail}>
                + Add Another Email
              </button>
              <p className="field-hint">If you have multiple accounts on Piazza with different email addresses, add them here to merge the accounts.</p>
            </div>

            <button className="change-password-btn" onClick={handleChangePassword}>
              Change Password
            </button>

            <p className="required-note">* Required fields</p>

            <div className="form-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={onBack}>Cancel</button>
            </div>
          </div>

          <div className="settings-right">
            <div className="profile-picture-section">
              <div className="profile-picture-circle">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" />
                ) : (
                  <div className="default-avatar">TK</div>
                )}
              </div>
              <p className="picture-label">Profile Picture</p>
              <button className="upload-btn" onClick={handleUploadPicture}>
                ⬆ Upload
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Class & Email Settings */}
      <section className="settings-section">
        <h2 className="section-title">Class & Email Settings</h2>
        
        <div className="class-list">
          {enrolledClasses.map((course) => (
            <div key={course.id} className="class-item">
              <div className="class-icon">📘</div>
              <div className="class-info-column">
                <div className="class-name">
                  <strong>{course.code}:</strong> {course.name}
                </div>
                <div className="class-term">{course.term}</div>
                <div className="class-notifications">
                  <span className="notification-icon">✉️</span>
                  {course.notifications}
                  <button className="edit-notifications-btn">Edit Email Notifications</button>
                </div>
              </div>
              <button className="drop-class-btn">× Drop Class</button>
            </div>
          ))}
        </div>

        <button className="show-inactive-btn">Show Inactive Classes</button>
      </section>
    </div>
  );
};

export default AccountSettings;