import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Import the styles
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:5000/api/users/login';
    const login = await fetch(url, {
      method: 'POST', // Ensure method is set to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (login.ok) {
      const data = await login.json();
      console.log('Login successful:', data);
      setIsAuthenticated(true);
      onLogin(); // Call onLogin to perform any additional actions
    } else {
      const errorData = await login.json(); // Get the error message
      setErrorMessage(errorData.message || 'Login failed. Please try again.');
      console.error('Login failed:', login.statusText);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email or Username</label>
          <input
            type="text"
            id="email" // Add id for better accessibility
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password" // Add id for better accessibility
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
        <button type="submit">Login</button>
      </form>
      <a href="/forgot-password">Forgot Password?</a>
      <a href="/register">Don't have an account? Register</a>
    </div>
  );
};

export default LoginPage;
