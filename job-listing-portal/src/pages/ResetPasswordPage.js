import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Import the styles
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email'); // Get the email from the query params
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    // Simulate resetting the password
    // In a real scenario, you would send this data to your backend to reset the user's password
    alert(`Password for ${email} has been reset!`);
    navigate('/login'); // Redirect to login page after successful password reset
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
