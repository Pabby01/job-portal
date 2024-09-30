import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <div>
        <Link to={`/jobs/${job.id}`} className="details-link">View Details</Link>
        <Link to={`/apply/${job.id}`} className="apply-button">Apply Now</Link>
      </div>
    </div>
  );
};

export default JobCard;
