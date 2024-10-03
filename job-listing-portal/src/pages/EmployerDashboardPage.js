import { useState, useEffect } from 'react';
import axios from 'axios';
import useSocket from '../hooks/useSocket'; // Custom hook to handle socket.io
import { useAuth } from '../context/AuthContext';

import { Link } from 'react-router-dom';

import '../styles/EmployerDashboardPage.css';

const EmployerDashboardPage = () => {
	const { user, loading } = useAuth();
	const [employerProfile, setEmployerProfile] = useState(null);
	const [activeJobList, setActiveJobList] = useState([]);
	const [featuredJobList, setFeaturedJobList] = useState([]);

	const activeJobCount = null;
	const totalApplications = null;
	const featuredJobsCount = null;
	const applications = null;
	const deleteJob = null;

	const apiUrl = process.env.REACT_APP_API_URL;
	const token = user?.token;

	useEffect(() => {
		if (loading === false) {
			if (user) {
				axios.get(`${apiUrl}/api/employer/company-profile`, {
					headers: {
						Authorization: `Bearer ${token}`,
					}
				})
					.then(response => {
						setEmployerProfile(response.data);
						console.log(response.data, 'REsponse.dat');
					})
					.catch(error => console.error('Error fetching Company Profile:', error));

				// Posted Jobs
				axios.get(`${apiUrl}/api/employer/posted-jobs`, {
					headers: {
						Authorization: `Bearer ${token}`,
					}
				})
					.then(response => {
						setActiveJobList(response.data)
					})
					.catch(error => console.error('Error fetching posted jobs:', error));

				// Featured Jobs
				axios.get(`${apiUrl}/api/jobs/featured`, {
					headers: {
						Authorization: `Bearer ${token}`,
					}
				})
					.then(response => {
						setFeaturedJobList(response.data)
					})
					.catch(error => console.error('Error fetching Featured jobs:', error));
			}
		}
	}, [loading, apiUrl, user, token]);

	// useEffect(()=> {})


	return (
		<div className="employer-dashboard">
			{/* Welcome Section */}
			<section className="welcome-section">
				<h1>Welcome back, {user?.firstName.toUpperCase()}!</h1>
				<p>Your company, <strong>{employerProfile?.companyName}</strong>, is doing great! Let’s post a job or review your applicants.</p>
			</section>

			{/* Metrics Overview */}
			<section className="metrics-overview">
				<div className="metrics">
					<div className="metric-card">
						<h2>Active Job Postings</h2>
						<p>{activeJobList.length}</p>
					</div>
					<div className="metric-card">
						<h2>Total Applications</h2>
						<p>{totalApplications}</p>
					</div>
					<div className="metric-card">
						<h2>Jobs Featured</h2>
						<p>{featuredJobList.length}</p>
					</div>
				</div>
			</section>

			{/* Job Postings Section */}
			<section className="job-postings-section">
				<h2>Your Active Job Postings</h2>
				<ul className="job-list">
					{activeJobList?.map((job) => (
						<li key={job._id} className="job-item">
							<h3>{job.title}</h3>
							<p>{job.description}</p>
							<p><strong>Location:</strong> {job.location}</p>
							<p><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
							<Link to={`/edit-job/${job.id}`} className="edit-link">Edit</Link>
							<button onClick={() => deleteJob(job.id)} className="delete-btn">Delete</button>
						</li>
					))}
				</ul>

				{/* Post a New Job Section */}
				<div className="post-job-section">
					<button className="post-job-btn">
						<Link to="/post-job">Post a New Job</Link>
					</button>
				</div>
			</section>

			{/* Post a New Job Section */}
			{/* <section className="post-job-section">
				<button className="post-job-btn">
					<Link to="/post-job">Post a New Job</Link>
				</button>
			</section> */}

			{/* Applicant Management Section */}
			<section className="applicant-management-section">
				<h2>Recent Applications</h2>
				<table className="applicant-table">
					<thead>
						<tr>
							<th>Job Title</th>
							<th>Applicant Name</th>
							<th>Email</th>
							<th>Experience</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{applications?.map((application) => (
							<tr key={application.id}>
								<td>{application.jobTitle}</td>
								<td>{application.applicantName}</td>
								<td>{application.email}</td>
								<td>{application.experience}</td>
								<td>{application.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>

			{/* Profile Settings Section */}
			<section className="profile-settings-section">
				<h2>Your Profile</h2>
				<p><strong>Company:</strong> {employerProfile?.companyName}</p>
				<p><strong>Website:</strong> {employerProfile?.companyWebsite}</p>
				<p><strong>Position:</strong> {employerProfile?.durrentPostition ? employerProfile.currentPostion : 'Staff'}</p>
				<p><strong>Company Description:</strong> {employerProfile?.description}</p>
				<Link to="/profile/edit">Edit Profile</Link>
			</section>
		</div>
	);
};

export default EmployerDashboardPage;
