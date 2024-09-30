import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the job details by job ID
    axios.get(`http://localhost:5000/api/jobs/${jobId}`)
      .then(response => {
        console.log(response.data, 'heooo')
        setJob(response.data);  // Assuming the API returns a single job object
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
        setLoading(false);
      });
  }, [jobId]);

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="container job-details">
      <h1>{job.title}</h1>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Qualifications:</strong> {job.qualifications}</p>
    </div>
  );
};

export default JobDetails;
