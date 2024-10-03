// src/components/Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>JobPortal</h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/admin">Admin</Link>
        
      </nav>
    </header>
  );
};

export default Header;
