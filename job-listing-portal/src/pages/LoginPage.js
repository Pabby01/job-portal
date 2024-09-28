import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Import the styles
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:5000/api/users/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    // if (data.token) {
    //   login({ token: data.token }); // Set user data on successful login
    // } else {
    //   // Handle login error
    //   console.error('Login failed:', data.message);
    // }

    // if (login.ok && login.token) {
    //   const data = await login.json();
    //   // setUser(() => data);

    //   localStorage.setItem('user', JSON.stringify(data));
    //   navigate('/login/success/')
    //   return;
    //   // openModal();
    // } else {
    //   const errorData = await login.json();
    //   setErrorMessage(errorData.message || 'Login failed. Please try again.');
    //   console.error('Login failed:', login.statusText);
    // }
    if (data) {
      login(data);
      navigate('/dashboard/')
    } else {
      setErrorMessage(data.message || 'Login failed. Please try again.');
      console.error('login failed')
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
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
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

      {/* Modal for successful login */}
      {/* <Modal show={showModal} onClose={closeModal} title="Login Successful">
        <p>You have successfully logged in!</p>
      </Modal> */}
    </div>
  );
};

export default LoginPage;
