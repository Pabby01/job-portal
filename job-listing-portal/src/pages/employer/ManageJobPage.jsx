// ManageJobPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../styles/ManageJobPage.css';

const ManageJobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: ''
    });

    // API
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/jobs`);
            setJobs(response.data);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingJob) {
                await axios.put(`${apiUrl}/api/jobs/${editingJob.id}`, formData);
            } else {
                await axios.post(`${apiUrl}/api/jobs`, formData);
            }
            setIsModalVisible(false);
            setEditingJob(null);
            setFormData({ title: '', company: '', location: '', description: '' });
            fetchJobs();
        } catch (error) {
            console.error('Failed to save job:', error);
        }
    };

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await axios.delete(`${apiUrl}/api/jobs/${jobId}`);
                fetchJobs();
            } catch (error) {
                console.error('Failed to delete job:', error);
            }
        }
    };

    const openModal = (job = null) => {
        if (job) {
            setEditingJob(job);
            setFormData(job);
        } else {
            setEditingJob(null);
            setFormData({ title: '', company: '', location: '', description: '' });
        }
        setIsModalVisible(true);
    };

    return (
        <div className="manage-job-page">
            <div className="header">
                <h1>Manage Jobs</h1>
                <Link style={{ textDecoration: 'none' }} className="btn btn-primary" to={'/post-job'}>Add New Job</Link>
                {/* <button onClick={() => openModal()} className="btn btn-primary">
                    Add New Job
                </button> */}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        {/* <th>Location</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job._id}>
                            <td>{job.title}</td>
                            {/* <td>{job.company}</td> */}
                            <td>{job.location}</td>
                            <td>
                                <button onClick={() => openModal(job)} className="btn btn-secondary">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(job.id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingJob ? 'Edit Job' : 'Add New Job'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Job Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                <button type="button" onClick={() => setIsModalVisible(false)} className="btn btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageJobPage;
