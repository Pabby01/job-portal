import React, { useState, useEffect } from 'react';
import './JobSeekerProfile.css'; // Add styles for profile
import axios from 'axios';

const JobSeekerProfile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [pastApplications, setPastApplications] = useState([]);

  useEffect(() => {
    // Fetch the user's personal information and past applications
    axios.get('/api/job-seeker/profile')
      .then(response => setPersonalInfo(response.data.personalInfo))
      .catch(error => console.error('Error fetching profile data:', error));

    axios.get('/api/job-seeker/past-applications')
      .then(response => setPastApplications(response.data))
      .catch(error => console.error('Error fetching past applications:', error));
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Logic to update personal information
    axios.post('/api/job-seeker/profile/update', personalInfo)
      .then(() => alert('Profile updated successfully!'))
      .catch(error => console.error('Error updating profile:', error));
  };

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCoverLetterUpload = (e) => {
    setCoverLetter(e.target.files[0]);
  };

  const handleDocumentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);
    // Logic to upload resume and cover letter
    axios.post('/api/job-seeker/upload-documents', formData)
      .then(() => alert('Documents uploaded successfully!'))
      .catch(error => console.error('Error uploading documents:', error));
  };

  return (
    <div className="job-seeker-profile">
      <h2>Job Seeker Profile</h2>

      {/* Personal Information */}
      <section className="personal-info">
        <h3>Edit Personal Information</h3>
        <form onSubmit={handleProfileUpdate}>
          <div>
            <label>Name</label>
            <input type="text" value={personalInfo.name} onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} />
          </div>
          <div>
            <label>Phone</label>
            <input type="tel" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} />
          </div>
          <div>
            <label>Address</label>
            <input type="text" value={personalInfo.address} onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} />
          </div>
          <button type="submit">Update Information</button>
        </form>
      </section>

      {/* Upload Resume and Cover Letter */}
      <section className="upload-documents">
        <h3>Upload Resume and Cover Letter</h3>
        <form onSubmit={handleDocumentSubmit}>
          <div>
            <label>Resume</label>
            <input type="file" onChange={handleResumeUpload} />
          </div>
          <div>
            <label>Cover Letter</label>
            <input type="file" onChange={handleCoverLetterUpload} />
          </div>
          <button type="submit">Upload Documents</button>
        </form>
      </section>

      {/* Past Applications */}
      <section className="past-applications">
        <h3>Past Applications</h3>
        <ul>
          {pastApplications.map(app => (
            <li key={app.id}>
              {app.jobTitle} - {app.companyName} ({app.status})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default JobSeekerProfile;
