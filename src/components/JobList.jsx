// src/components/JobList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './JobList.css';

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-item">
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <Link to={`/jobs/${job.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default JobList;
