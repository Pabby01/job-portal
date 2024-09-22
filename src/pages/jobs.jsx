
import React from 'react';
import JobList from '../components/JobList';  // Import the JobList component

import './JobsPage.css';  // Import the CSS file
const JobsPage = () => {
  // return (

    
  //   <div className="jobs-container">
  //     <h1>Available Jobs</h1>
  //     <JobList /> {/* This will display the jobs */}
  //   </div>


  // );
    return (
      <div className="jobs-container">
        <h1>Available Jobs</h1>
        <div className="job-list">
          <div className="job-item">
            <h2>Frontend Developer</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary:$119,224</p>
            <button className="apply-btn">Apply Now</button>
          </div>
          <div className="job-item">
            <h2>Backend Developer</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary:$120,000</p>
            <button className="apply-btn">Apply Now</button>
          </div>
          <div className="job-item">
            <h2>Data Analyst</h2>
            <p>Company: XYZ</p>
            <p>Location: Hybrid</p>
            <p>Salary: $110,000</p>
            <button className="apply-btn">Apply Now</button>
          </div><div className="job-item">
            <h2>Project Manager</h2>
            <p>Company: XYZ</p>
            <p>Location: On-site</p>
            <p>Salary: $150,000</p>
            <button className="apply-btn">Apply Now</button>
          </div><div className="job-item">
            <h2>UI/UX Designer</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary:$110,000</p>
            <button className="apply-btn">Apply Now</button>
          </div><div className="job-item">
            <h2>Mobile Developer</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary: $84,000</p>
            <button className="apply-btn">Apply Now</button>
          </div>
          <div className="job-item">
            <h2>Python Developer</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary: $102,000</p>
            <button className="apply-btn">Apply Now</button>
          </div>
          <div className="job-item">
            <h2>Cloud Architect</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary: $120,000</p>
            <button className="apply-btn">Apply Now</button>
          </div>
          <div className="job-item">
            <h2>Devops Manager</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary: $115,000</p>
            <button className="apply-btn">Apply Now</button>
          </div><div className="job-item">
            <h2>Quality Assurance Specialist</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary: $80,912</p>
            <button className="apply-btn">Apply Now</button>
          </div>
          <div className="job-item">
            <h2>Games Developer</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary: $66,178</p>
            <button className="apply-btn">Apply Now</button>
          </div><div className="job-item">
            <h2>Computer Graphics Animator</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary: $47,273</p>
            <button className="apply-btn">Apply Now</button>
          </div><div className="job-item">
            <h2>Data Scientist</h2>
            <p>Company: XYZ</p>
            <p>Location: Remote</p>
            <p>Salary: $79,000</p>
            <button className="apply-btn">Apply Now</button>
          </div>
        </div>
      </div>
    );
};

export default JobsPage;
