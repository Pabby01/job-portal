// src/pages/CreateAccountPage.jsx
import React, { useState } from 'react';
import './CreateAccountPage.css';

const CreateAccountPage = () => {
  const [accountType, setAccountType] = useState('employee'); // default to employee
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '', // only for employers
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log(`${accountType} account created:`, formData);
    // Handle account creation logic (API call)
  };

  return (
    <div className="create-account-page">
      <h2>Create Account</h2>

      <div className="account-type-switch">
        <button
          className={accountType === 'employee' ? 'active' : ''}
          onClick={() => setAccountType('employee')}
        >
          Employee
        </button>
        <button
          className={accountType === 'employer' ? 'active' : ''}
          onClick={() => setAccountType('employer')}
        >
          Employer
        </button>
      </div>

      <form className="create-account-form" onSubmit={handleCreateAccount}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {accountType === 'employer' && (
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit" className="submit-btn">
          Create {accountType === 'employee' ? 'Employee' : 'Employer'} Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
