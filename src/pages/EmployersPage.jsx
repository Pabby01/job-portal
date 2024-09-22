// src/pages/EmployersPage.jsx
import { useState } from 'react';
import EmployerForm from '../components/EmployerForm';
import JobList from '../components/JobList';
import  './EmployersPage.css'

const EmployersPage = () => {
  const [jobs, setJobs] = useState([]);

  const addJob = (newJob) => {
    // Add new job to the state
    setJobs((prevJobs) => [...prevJobs, { ...newJob, id: prevJobs.length + 1 }]);
  };

  return (
    <div className="employers-page">
      <h1>Employer Dashboard</h1>
      <EmployerForm addJob={addJob} />
      
      <h2>Your Job Listings</h2>
      {jobs.length > 0 ? (
        <JobList jobs={jobs} />
      ) : (
        <p>No jobs posted yet. Start adding new roles!</p>
      )}
    </div>
  );
};

export default EmployersPage;
