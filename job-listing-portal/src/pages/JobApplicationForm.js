import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';

const JobApplicationForm = () => {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
    coverLetter: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = new FormData();
    applicationData.append('name', formData.name);
    applicationData.append('email', formData.email);
    applicationData.append('resume', formData.resume);
    applicationData.append('coverLetter', formData.coverLetter);
    applicationData.append('jobId', jobId);

    axios.post('http://localhost:5000/api/apply', applicationData)
      .then(response => {
        console.log('Application submitted successfully:', response.data);
        alert('Your application has been submitted.');
      })
      .catch(error => {
        console.error('Error submitting application:', error);
        alert('There was an error submitting your application.');
      });
  };

  return (
    <div className="container application-form-container">
      <h2>Apply for Job</h2>
      <form className='jobapplicationform' onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Resume</label>
          <input type="file" name="resume" onChange={handleChange} required />
        </div>
        <div>
          <label>Cover Letter</label>
          <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="submit-button">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
