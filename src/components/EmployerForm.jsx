/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/EmployerForm.jsx
import React, { useState } from 'react';
import './EmployerForm.css';

const EmployerForm = ({ addJob }) => {
  const [jobData, setJobData] = useState({
    title: '',
    location: '',
    salary: '',
    experience: '',
    category: '',
    qualifications: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add job (parent can handle adding to job list or sending to backend)
    addJob(jobData);
    console.log('Job submitted: ', jobData);

    // Clear form after submission
    setJobData({
      title: '',
      location: '',
      salary: '',
      experience: '',
      category: '',
      qualifications: '',
      description: '',
    });
  };

  return (
    <form className="employer-form" onSubmit={handleSubmit}>
      <h2>Post a New Job</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          placeholder='Job title'
          required
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          placeholder='Location: Remote, Hybrid,...'
          required
        />
      </div>

      <div className="form-group">
        <label>Salary</label>
        <input
          type="number"
          name="salary"
          value={jobData.salary}
          onChange={handleChange}
          placeholder='Salary'
          required
        />
      </div>

      <div className="form-group">
        <label>Experience Level</label>
        <select
          name="experience"
          value={jobData.experience}
          onChange={handleChange}
          required
        >
          <option value="">Select Experience</option>
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <div className="form-group">
        <label>Job Category</label>
        <select
          name="category"
          value={jobData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="software">Software</option>
          <option value="marketing">Marketing</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      <div className="form-group">
        <label>Qualifications Required</label>
        <textarea
          name="qualifications"
          value={jobData.qualifications}
          onChange={handleChange}
          rows="3"
          required
        />
      </div>

      <div className="form-group">
        <label>Job Description</label>
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          rows="5"
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Post Job
      </button>
    </form>
  );
};

export default EmployerForm;
