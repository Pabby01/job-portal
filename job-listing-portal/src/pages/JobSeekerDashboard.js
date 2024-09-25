import React, { useState, useEffect } from 'react';
import './JobSeekerDashboard.css'; // Add styles for the dashboard
import axios from 'axios';
import useSocket from '../hooks/useSocket'; // Custom hook to handle socket.io

const JobSeekerDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0); // Profile completion percentage
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null
  });
  const [statusUpdate, setStatusUpdate] = useState(null); // State for real-time status updates
  const [updating, setUpdating] = useState(false); // Loading state for profile updates

  // Connect to the real-time notifications using the custom Socket.IO hook
  useSocket((status) => {
    // Handle real-time updates here
    setStatusUpdate(status);
    // Optionally, update the status of a job in the `appliedJobs` list here
  });

  useEffect(() => {
    // Fetch the applied jobs
    axios.get('/api/job-seeker/applied-jobs')
      .then(response => setAppliedJobs(response.data))
      .catch(error => console.error('Error fetching applied jobs:', error));

    // Fetch job recommendations
    axios.get('/api/job-seeker/recommendations')
      .then(response => setJobRecommendations(response.data))
      .catch(error => console.error('Error fetching job recommendations:', error));

    // Fetch profile completion status
    axios.get('/api/job-seeker/profile-completion')
      .then(response => setProfileCompletion(response.data.completion))
      .catch(error => console.error('Error fetching profile completion:', error));

    // Fetch personal details
    axios.get('/api/job-seeker/personal-details')
      .then(response => setPersonalDetails(response.data))
      .catch(error => console.error('Error fetching personal details:', error));
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setUpdating(true); // Set loading state during update
    // Logic to update personal details
    axios.post('/api/job-seeker/update-details', personalDetails)
      .then(() => {
        alert('Profile updated successfully!');
        setUpdating(false);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        setUpdating(false);
      });
  };

  const handleResumeUpload = (e) => {
    setPersonalDetails({ ...personalDetails, resume: e.target.files[0] });
  };

  return (
    <div className="job-seeker-dashboard">
      <h1>Welcome, {personalDetails.name || 'Job Seeker'}</h1>

      {/* Display Real-Time Notification */}
      {statusUpdate && (
        <div className="notification">
          <p><strong>Application Status Updated:</strong> {statusUpdate}</p>
        </div>
      )}

      {/* Profile Completion */}
      <section className="profile-completion">
        <h3>Profile Completion: {profileCompletion}%</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${profileCompletion}%` }}></div>
        </div>
      </section>

      {/* Personal Details */}
      <section className="personal-details">
        <h3>Update Your Personal Information</h3>
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              value={personalDetails.name} 
              onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={personalDetails.email} 
              onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel" 
              value={personalDetails.phone} 
              onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Resume</label>
            <input type="file" onChange={handleResumeUpload} />
          </div>
          <button type="submit" className="btn-update" disabled={updating}>
            {updating ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </section>

      {/* Applied Jobs */}
      <section className="applied-jobs">
        <h3>Applied Jobs</h3>
        {appliedJobs.length > 0 ? (
          <ul>
            {appliedJobs.map(job => (
              <li key={job.id} className={`job-status-${job.status.toLowerCase()}`}>
                <div className="job-title">{job.title} at {job.company}</div>
                <div className="job-status">Status: {job.status}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not applied to any jobs yet.</p>
        )}
      </section>

      {/* Job Recommendations */}
      <section className="job-recommendations">
        <h3>Recommended Jobs</h3>
        {jobRecommendations.length > 0 ? (
          <ul>
            {jobRecommendations.map(job => (
              <li key={job.id}>
                <div className="job-title">{job.title} at {job.company}</div>
                <div className="job-location">{job.location}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No job recommendations available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default JobSeekerDashboard;
