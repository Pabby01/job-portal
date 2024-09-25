import React from 'react';
import JobList from '../components/JobList';
import SearchBar from '../components/SearchBar';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section with Search */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Find Your Dream Job</h1>
          <p className="hero-subtitle">Search for jobs, explore career paths, and find your next opportunity.</p>
          <SearchBar />
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="job-listings">
        <div className="container">
          <h2>Featured Jobs</h2>
          <JobList />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
