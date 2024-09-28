import React, { useState, useEffect } from 'react';
import '../styles/UserDashboard.css';
import axios from 'axios';
import useSocket from '../hooks/useSocket';

const UserDashboard = () => {
    const [jobApplications, setJobApplications] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        resume: null,
        skills: []
    });
    const [newApplicationNotification, setNewApplicationNotification] = useState(null);
    const [updatingProfile, setUpdatingProfile] = useState(false);

    // useSocket(null, (notification) => {
    //   setNewApplicationNotification(notification);
    // });

    useEffect(() => {
        axios.get('/api/user/job-applications')
            .then(response => setJobApplications(response.data))
            .catch(error => console.error('Error fetching job applications:', error));

        axios.get('/api/user/saved-jobs')
            .then(response => setSavedJobs(response.data))
            .catch(error => console.error('Error fetching saved jobs:', error));

        axios.get('/api/user/profile')
            .then(response => setUserProfile(response.data))
            .catch(error => console.error('Error fetching user profile:', error));
    }, []);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setUpdatingProfile(true);
        axios.post('/api/user/update-profile', userProfile)
            .then(() => {
                alert('Profile updated successfully!');
                setUpdatingProfile(false);
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                setUpdatingProfile(false);
            });
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('resume', file);

        axios.post('/api/user/upload-resume', formData)
            .then(response => {
                setUserProfile({ ...userProfile, resume: response.data.resumeUrl });
                alert('Resume uploaded successfully!');
            })
            .catch(error => console.error('Error uploading resume:', error));
    };

    return (
        <div className="user-dashboard">
            <h1>Welcome to Your User Dashboard</h1>

            {newApplicationNotification && (
                <div className="notification">
                    <p><strong>Application Update:</strong> {newApplicationNotification.message}</p>
                </div>
            )}

            <section className="user-profile">
                <h2>Update Your Profile</h2>
                <form onSubmit={handleProfileUpdate}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Skills (comma-separated)</label>
                        <input
                            type="text"
                            value={userProfile.skills.join(', ')}
                            onChange={(e) => setUserProfile({ ...userProfile, skills: e.target.value.split(',').map(skill => skill.trim()) })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Resume</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                        />
                    </div>
                    <button type="submit" className="btn-update" disabled={updatingProfile}>
                        {updatingProfile ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </section>

            <section className="job-applications">
                <h2>Your Job Applications</h2>
                {jobApplications.length > 0 ? (
                    <ul>
                        {jobApplications.map(application => (
                            <li key={application.id}>
                                <div className="application-info">
                                    <div className="job-title">{application.jobTitle}</div>
                                    <div className="company-name">{application.companyName}</div>
                                    <div className="application-status">Status: {application.status}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You haven't applied to any jobs yet.</p>
                )}
            </section>

            <section className="saved-jobs">
                <h2>Saved Jobs</h2>
                {savedJobs.length > 0 ? (
                    <ul>
                        {savedJobs.map(job => (
                            <li key={job.id}>
                                <div className="job-info">
                                    <div className="job-title">{job.title}</div>
                                    <div className="company-name">{job.companyName}</div>
                                    <div className="job-location">{job.location}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You haven't saved any jobs yet.</p>
                )}
            </section>
        </div>
    );
};

export default UserDashboard;
