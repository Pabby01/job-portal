import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetailsPage.css'; // Add custom styles for job details
import axios from 'axios';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    // Fetch job details
    axios.get(`/api/jobs/${jobId}`)
      .then(response => setJob(response.data))
      .catch(error => console.error('Error fetching job details:', error));

    // Fetch company information related to the job
    axios.get(`/api/jobs/${jobId}/company`)
      .then(response => setCompanyInfo(response.data))
      .catch(error => console.error('Error fetching company info:', error));
  }, [jobId]);

  const handleApply = () => {
    // Apply for the job
    axios.post(`/api/jobs/${jobId}/apply`)
      .then(() => setApplied(true))
      .catch(error => console.error('Error applying for job:', error));
  };

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="job-details-page">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {companyInfo ? companyInfo.name : 'Loading...'}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Qualifications:</strong> {job.qualifications}</p>

      {!applied ? (
        <button onClick={handleApply}>Apply Now</button>
      ) : (
        <p>You have applied for this job.</p>
      )}

      {/* Company Information Section */}
      {companyInfo && (
        <div className="company-info">
          <h3>About the Company</h3>
          <p><strong>Website:</strong> <a href={companyInfo.website} target="_blank" rel="noreferrer">{companyInfo.website}</a></p>
          <p>{companyInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
