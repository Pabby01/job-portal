/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/JobList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './JobList.css';

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-item">
          <h3>Job Title: {job.title}</h3>
          <p>Location: {job.location}</p>
          <p>Experience Level: {job.experience}</p>
          <Link to={`/jobs/${job.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default JobList;
