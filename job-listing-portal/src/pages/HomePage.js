import React from 'react';
import JobList from '../components/JobList';
import SearchBar from '../components/SearchBar';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div>
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
          <JobList featured />
        </div>
      </section>


      {/* How It Works and Why Choose Us */}
      <section>
        <div className='container'>
          <h2>Why Choose Us</h2>
          <div className='reasons'>
            <div className='reason'>
              <h3>For Job Seekers</h3>
              <ul>
                <li>
                  <strong>Extensive Job Listings:</strong> Access hundreds of job opportunities from top companies across various industries.
                </li>
                <li>
                  <strong>Personalized Matches:</strong> Get job recommendations based on your profile, skills, and location.
                </li>
                <li>
                  <strong>Easy Application Process:</strong> Apply to jobs with just a few clicks, right from your profile.
                </li>
                <li>
                  <strong>Career Resources:</strong> Learn from experts with our free tips on resume building, interviews, and more.
                </li>
              </ul>
            </div>

            <div className='reason'>
              <h3>For Employers</h3>
              <ul>
                <li>
                  <strong>Find Top Talent:</strong> Reach qualified candidates with the right skill sets to help grow your business.
                </li>
                <li>
                  <strong>Post Jobs Easily:</strong> Create and manage job listings with our simple-to-use platform.
                </li>
                <li>
                  <strong>Efficient Hiring:</strong> Review applications, filter candidates, and hire faster with our streamlined system.
                </li>
                <li>
                  <strong>Cost-Effective:</strong> Competitive pricing plans tailored to your hiring needs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonial */}
      <section>
        <div className='container'>
          <h2>Testimonials</h2>
          <div className='testimonials'>
            <div className='testimonial'>
              <p>"This platform made it so easy for me to find a job that matches my skills. I was able to apply to multiple positions with just one click, and I landed my dream job in no time!"</p>
              <h4>– Jane Doe, Software Developer</h4>
            </div>

            <div className='testimonial'>
              <p>"As an employer, I was impressed by the number of qualified candidates I could reach. The hiring process was smooth, and I found the perfect fit for our team quickly!"</p>
              <h4>– John Smith, HR Manager at TechCorp</h4>
            </div>

            <div className='testimonial'>
              <p>"I had been searching for a job for months before I found this platform. Within weeks of signing up, I received multiple interview invitations. Thank you for helping me get my career back on track!"</p>
              <h4>– Sarah Lee, Data Analyst</h4>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Employers */}
      <section>
        <div className='container'>
          <h2>Featured Employers</h2>
          <div className='employers'>
            <div className='employer'>
              <img src='/path/to/logo1.png' alt='TechCorp Logo' />
            </div>
            <div className='employer'>
              <img src='/path/to/logo2.png' alt='FinBank Logo' />
            </div>
            <div className='employer'>
              <img src='/path/to/logo3.png' alt='HealthPlus Logo' />
            </div>
            <div className='employer'>
              <img src='/path/to/logo4.png' alt='EduWorld Logo' />
            </div>
          </div>
        </div>
      </section>


    </div>

  );
};

export default HomePage;
