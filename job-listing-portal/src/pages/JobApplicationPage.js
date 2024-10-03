import React, { useState } from 'react';
import './JobApplicationForm.css'; // Add custom styles for the form
import axios from 'axios';

const JobApplicationForm = ({ jobId }) => {
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setApplicationData({ ...applicationData, resume: files[0] });
    } else {
      setApplicationData({ ...applicationData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', applicationData.name);
    formData.append('email', applicationData.email);
    formData.append('phone', applicationData.phone);
    formData.append('resume', applicationData.resume);
    formData.append('coverLetter', applicationData.coverLetter);

    axios.post(`/api/jobs/${jobId}/apply`, formData)
      .then(() => alert('Application submitted successfully!'))
      .catch(error => console.error('Error submitting application:', error));
  };

  return (
    <div className="job-application-form">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={applicationData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={applicationData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Phone</label>
          <input type="tel" name="phone" value={applicationData.phone} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Resume</label>
          <input type="file" name="resume" onChange={handleInputChange} required />
        </div>
        <div>
          <label>Cover Letter</label>
          <textarea name="coverLetter" value={applicationData.coverLetter} onChange={handleInputChange} required></textarea>
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
