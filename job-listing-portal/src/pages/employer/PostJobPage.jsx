import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/PostJobPage.css';

const PostJobPage = () => {
    const { user, loading } = useAuth();
    let token = user?.token;
    // State to handle form fields
    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        jobType: '',
        featured: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setJobDetails({
            ...jobDetails,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL;

        const jobFormData = new FormData();

        for (const key in jobDetails) {
            jobFormData.append(key, jobDetails[key]);
        }

        try {

            console.log(jobFormData)
            alert('formdata')
            axios.post(`${apiUrl}/api/jobs`, jobFormData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data, 'Data')
                    // alert('submitted successfully')
                })
                .catch(e => console.error('An error occurred ', e));


        } catch (e) {
            console.log('An error occured', e)
        }
    };

    return (
        <div className="post-job-page">
            <h1>Post a New Job</h1>
            <form onSubmit={handleSubmit} className="post-job-form">
                <div className="form-group">
                    <label htmlFor="title">Job Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={jobDetails.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Job Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={jobDetails.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={jobDetails.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Salary:</label>
                    <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={jobDetails.salary}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="jobType">Job Type:</label>
                    <select
                        id="jobType"
                        name="jobType"
                        value={jobDetails.jobType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a job type</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="freelance">Freelance</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="featured">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={jobDetails.featured}
                            onChange={handleChange}
                        />
                        Featured Job
                    </label>
                </div>

                <button type="submit" className="submit-btn">Post Job</button>
            </form>
        </div>
    );
};

export default PostJobPage;
