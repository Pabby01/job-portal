import React, { useState, useEffect } from 'react';
import './EmployerProfile.css'; // Add styles for profile
import axios from 'axios';

const EmployerProfile = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    description: ''
  });
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    // Fetch company information and job postings
    axios.get('/api/employer/profile')
      .then(response => setCompanyInfo(response.data.companyInfo))
      .catch(error => console.error('Error fetching company info:', error));

    axios.get('/api/employer/jobs')
      .then(response => setJobPostings(response.data))
      .catch(error => console.error('Error fetching job postings:', error));
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Logic to update company information
    axios.post('/api/employer/profile/update', companyInfo)
      .then(() => alert('Company information updated successfully!'))
      .catch(error => console.error('Error updating company information:', error));
  };

  return (
    <div className="employer-profile">
      <h2>Employer Profile</h2>

      {/* Company Information */}
      <section className="company-info">
        <h3>Edit Company Information</h3>
        <form onSubmit={handleProfileUpdate}>
          <div>
            <label>Company Name</label>
            <input type="text" value={companyInfo.name} onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={companyInfo.email} onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })} />
          </div>
          <div>
            <label>Phone</label>
            <input type="tel" value={companyInfo.phone} onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })} />
          </div>
          <div>
            <label>Website</label>
            <input type="url" value={companyInfo.website} onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })} />
          </div>
          <div>
            <label>Company Description</label>
            <textarea value={companyInfo.description} onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}></textarea>
          </div>
          <button type="submit">Update Information</button>
        </form>
      </section>

      {/* Job Postings */}
      <section className="job-postings">
        <h3>Your Job Postings</h3>
        <ul>
          {jobPostings.map(job => (
            <li key={job.id}>
              {job.title} - {job.location}
              <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EmployerProfile;
