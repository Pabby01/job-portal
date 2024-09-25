import React, { useState, useEffect } from 'react';
import './JobPostingPage.css'; // Add custom styles for job posting
import axios from 'axios';

const JobPostingPage = () => {
  const [jobs, setJobs] = useState([]); // List of posted jobs
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    qualifications: ''
  });
  const [editingJobId, setEditingJobId] = useState(null); // To track the job being edited

  useEffect(() => {
    // Fetch jobs posted by the employer
    axios.get('/api/employer/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleJobPost = (e) => {
    e.preventDefault();
    if (editingJobId) {
      // Update existing job
      axios.put(`/api/employer/jobs/${editingJobId}`, newJob)
        .then(response => {
          setJobs(jobs.map(job => (job.id === editingJobId ? response.data : job)));
          setEditingJobId(null);
          setNewJob({ title: '', description: '', location: '', salary: '', qualifications: '' });
        })
        .catch(error => console.error('Error updating job:', error));
    } else {
      // Post a new job
      axios.post('/api/employer/jobs', newJob)
        .then(response => {
          setJobs([...jobs, response.data]);
          setNewJob({ title: '', description: '', location: '', salary: '', qualifications: '' });
        })
        .catch(error => console.error('Error posting job:', error));
    }
  };

  const handleEditJob = (job) => {
    setNewJob(job);
    setEditingJobId(job.id);
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      axios.delete(`/api/employer/jobs/${id}`)
        .then(() => setJobs(jobs.filter(job => job.id !== id)))
        .catch(error => console.error('Error deleting job:', error));
    }
  };

  return (
    <div className="job-posting-page">
      <h2>{editingJobId ? 'Edit Job' : 'Post a New Job'}</h2>
      <form onSubmit={handleJobPost}>
        <div>
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={newJob.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            value={newJob.salary}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Qualifications</label>
          <textarea
            name="qualifications"
            value={newJob.qualifications}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">{editingJobId ? 'Update Job' : 'Post Job'}</button>
      </form>

      {/* List of posted jobs */}
      <h3>Your Posted Jobs</h3>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            {job.title} - {job.location}
            <button onClick={() => handleEditJob(job)}>Edit</button>
            <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobPostingPage;
    