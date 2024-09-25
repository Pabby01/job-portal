import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Import the styles

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic to authenticate the user
    onLogin();
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email or Username</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/forgot-password">Forgot Password?</a>
      <a href="/register">Don't have an account? Register</a>
    </div>
  );
};

export default LoginPage;
