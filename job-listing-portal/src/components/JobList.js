import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import axios from 'axios';

const JobList = ({ featured }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch job listings from the backend API
    let url = null;
    url = featured ? 'http://localhost:5000/api/jobs/featured/' : 'http://localhost:5000/api/jobs/';
    axios.get(url)
      .then((response) => {
        console.log(response.data, 'Jobs')
        setJobs(response.data); // Assume the API returns an array of jobs
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, [featured]);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  return (
    <div className="job-list">
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p>No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default JobList;
