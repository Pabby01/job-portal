/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/JobList.jsx
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './JobList.css';

const JobList = ({ jobs }) => {
  const [visibleJobId, setVisibleJobId] = useState(null); // State to track which job details are visible  

  const toggleJobDetails = (jobId) => {  
    // Toggle visibility of the job's details  
    setVisibleJobId(prevId => (prevId === jobId ? null : jobId));  
  };
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-item">
          <h3>Job Title: {job.title}</h3>
          <p>Location: {job.location}</p>
          <p>Experience Level: {job.experience}</p>
          <p>Salary: ${job.salary.toLocaleString()}</p>
          <button onClick={() => toggleJobDetails(job.id)}>  
            {visibleJobId === job.id ? 'Hide Details' : 'View Details'}  
          </button>

          {visibleJobId === job.id && (  
            <div className="job-details">
              <p>Category: {job.category}</p>  
              <p>Requirements: {job.qualifications}</p>  
              <p>Description: {job.description}</p> 
              <Link to={`/jobs/${job.id}`}>Go to Job Page</Link>  
            </div>  
          )}
        </div>
      ))}
    </div>
  );
};

export default JobList;
