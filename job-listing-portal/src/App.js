import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobApplicationForm from './pages/JobApplicationForm';
import JobDetails from './pages/JobDetails';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyCodePage from './pages/VerifyCodePage.js';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Layout from './components/Layout'; // Import the layout

function App() {
  const [ setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/apply/:jobId" element={<JobApplicationForm />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<RegisterPage onRegister={() => setIsAuthenticated(true)} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-code" element={<VerifyCodePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
        </Layout>
    </Router>
  );
}

export default App;
