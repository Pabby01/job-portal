// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedJobs from '../components/FeaturedJobs';
import WhyUs from '../components/WhyUs';
import OurClients from '../components/OurClients';
import OurPartners from '../components/OurPartners';
import BackToTop from '../components/BackToTop';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className='h1'>Find Your Dream Job</h1>
        <p className='p'>Search for jobs that match your skills and passion</p>
        <form className='search-container'>
          <input className='input' type="text" placeholder="Job title" />
          <input type="text" placeholder="Location" />
          <select className='select'>
            <option >Back-end Developer</option>
            <option >Frontend Developer</option>
            <option >Back-end Developer</option>
            <option >Back-end Developer</option>
            <option >Back-end Developer</option>
          </select>
          <button className='search-btn'>Search Jobs</button>
        </form>

        {/* Login/Create Account Buttons */}
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/create-account" className="create-btn">Create Account</Link>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <FeaturedJobs />

      {/* Why Us Section */}
      <WhyUs />

      {/* Our Clients Section */}
      <OurClients />

      {/* Our Partners Section */}
      <OurPartners />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default HomePage;
