// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Add styles for header

const Header = () => {
  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">MyJobPortal</Link>
      </div>
      <nav className="nav-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/job-seeker-dashboard">Dashboard</Link></li>
          <li><Link to="/employer-dashboard">Employer</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
