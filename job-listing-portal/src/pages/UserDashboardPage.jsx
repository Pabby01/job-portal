import React, { useState, useEffect } from 'react';
import '../styles/UserDashboard.css';
import axios from 'axios';
import useSocket from '../hooks/useSocket';

import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
    const { user, loading } = useAuth();
    const [fileName, setFileName] = useState('No file chosen');
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

    // API
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = user?.token;

    useEffect(() => {
        if (!loading && user) {
            axios.get(`${apiUrl}/api/user/job-applications`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => setJobApplications(response.data))
                .catch(error => console.error('Error fetching job applications:', error));

            axios.get(`${apiUrl}/api/user/saved-jobs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => setSavedJobs(response.data))
                .catch(error => console.error('Error fetching saved jobs:', error));

            axios.get(`${apiUrl}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUserProfile(response.data);
                    if (response.data.resume) {
                        setFileName(response.data.resume.split('/').pop()); // Set file name from URL
                    }
                })
                .catch(error => console.error('Error fetching user profile:', error));
        }
    }, [apiUrl, token, loading, user]);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setUpdatingProfile(true);

        const formData = new FormData();
        for (const key in userProfile) {
            if (key === 'skills') {
                formData.append(key, JSON.stringify(userProfile[key]));
            } else if (key === 'resume') {
                if (userProfile[key] instanceof File) {
                    formData.append(key, userProfile[key], userProfile[key].name);
                } else if (userProfile[key]) {
                    // If it's a string (URL), append it as is
                    formData.append(key, userProfile[key]);
                }
            } else {
                formData.append(key, userProfile[key]);
            }
        }

        // For debugging purposes
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        axios.post(`${apiUrl}/api/user/update-profile`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                alert('Profile updated successfully!');
                setUpdatingProfile(false);
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                setUpdatingProfile(false);
            });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setUserProfile(prevProfile => ({
                ...prevProfile,
                resume: file
            }));
        }
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
                    <div className="file-input-container form-group">
                        <label className="file-input-label">
                            <span className="file-input-button">Choose File</span>
                            <input
                                type="file"
                                className="file-input"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />
                        </label>
                        <span className="file-name">{fileName}</span>
                        <style jsx>{`
                                .file-input-container {
                                display: flex;
                                align-items: center;
                                gap: 10px;
                                }
                                .file-input-label {
                                cursor: pointer;
                                }
                                .file-input-button {
                                background-color: #3498db;
                                color: white;
                                padding: 10px 20px;
                                border-radius: 5px;
                                font-weight: bold;
                                display: inline-block;
                                transition: background-color 0.3s;
                                }
                                .file-input-button:hover {
                                background-color: #2980b9;
                                }
                                .file-input {
                                display: none;
                                }
                                .file-name {
                                color: #333;
                                }
                            `}
                        </style>
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
