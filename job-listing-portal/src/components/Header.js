// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Add styles for header

import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="site-header">
      <div className='container'>
        <div className="logo">
          <Link to="/">MyJobPortal</Link>
        </div>
        <nav className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/job-seeker-dashboard">Dashboard</Link></li>
            <li><Link to="/employer-dashboard">Employer</Link></li>
            {isAuthenticated === true ? (
              <li><Link to="/">logout</Link></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>

        {/* <nav>
          <ul>
            <li><a href="/">Home</a></li>
            {isAuthenticated ? (
              <li><a href="/profile">Profile</a></li>
            ) : (
              <>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
              </>
            )}
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
