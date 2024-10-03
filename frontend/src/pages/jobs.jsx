/* eslint-disable no-unused-vars */
import React from 'react';
import JobList from '../components/JobList';  // Import the JobList component

const JobsPage = () => {
  return (
    <div className="jobs-page">
      <h1>Available Jobs</h1>
      <JobList /> {/* This will display the jobs */}
    </div>
  );
};

export default JobsPage;
