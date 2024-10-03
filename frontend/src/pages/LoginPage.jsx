/* eslint-disable no-unused-vars */
// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [userType, setUserType] = useState('employee'); // default to employee

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic based on userType
    console.log(`${userType} logging in`);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div className="user-type-switch">
        <button
          className={userType === 'employee' ? 'active' : ''}
          onClick={() => setUserType('employee')}
        >
          Employee
        </button>
        <button
          className={userType === 'employer' ? 'active' : ''}
          onClick={() => setUserType('employer')}
        >
          Employer
        </button>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" className="login-btn">Login as {userType}</button>
      </form>
    </div>
  );
};

export default LoginPage;
