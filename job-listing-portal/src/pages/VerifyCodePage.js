import React, { useState, useEffect } from 'react';
import '../styles/AuthPage.css'; // Import the styles
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyCodePage = () => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email'); // Get the email from the query params
  const navigate = useNavigate();

  const handleVerifyCode = (e) => {
    e.preventDefault();
    // Simulate verifying the code
    // In a real scenario, you would verify the code with your backend server
    if (code === '123456') {  // Simulate correct code
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      setErrorMessage('Invalid code. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify Code</h2>
      <p>Please enter the code sent to {email}</p>
      <form onSubmit={handleVerifyCode}>
        <div>
          <label>Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Verify Code</button>
      </form>
      <a href="/forgot-password">Back to Forgot Password</a>
    </div>
  );
};

export default VerifyCodePage;
