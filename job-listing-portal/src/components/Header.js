// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Add styles for header

import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="site-header">
      <div className='container'>
        <div className="logo">
          <Link to="/">MyJobPortal</Link>
        </div>
        {!!user ? (
          < nav className='nav-links'>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/'>Dashboard</Link></li>
            </ul>
          </nav>) : (
          <nav className='nav-links'>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about-us'>About us</Link></li>
              <li><Link to='/blogs'>blog</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Sign up</Link></li>
            </ul>
          </nav>
        )}
      </div>
    </header >
  );
};

export default Header;
