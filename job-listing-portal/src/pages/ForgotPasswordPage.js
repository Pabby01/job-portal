import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Import the styles
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Simulate sending the reset code to the email
    // In a real scenario, you would send this data to your backend server
    setMessage('A password reset code has been sent to your email.');
    
    // Navigate to the code verification page after a successful email submission
    navigate(`/verify-code?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handlePasswordReset}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Request Reset Code</button>
      </form>
      {message && <p>{message}</p>}
      <a href="/login">Back to Login</a>
    </div>
  );
};

export default ForgotPasswordPage;
