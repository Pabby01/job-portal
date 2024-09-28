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
import SuccessPage from './pages/SuccessPage.js'
import Layout from './components/Layout'; // Import the layout

import './App.css'
import { AuthProvider } from './context/AuthContext.js';
import AboutUsPage from './pages/AboutUsPage.jsx';
import BlogsPage from './pages/BlogsPage.jsx';
// import Modal from './components/Modal.js';

function App() {
  const [setIsAuthenticated] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/apply/:jobId" element={<JobApplicationForm />} />
            {/* <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/success" element={<SuccessPage />} />
            <Route path="/register" element={<RegisterPage onRegister={() => setIsAuthenticated(true)} />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-code" element={<VerifyCodePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
