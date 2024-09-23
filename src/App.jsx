// src/App.jsx
//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EmployersPage from './pages/EmployersPage';
import JobsPage from './pages/jobsPage';
import CreateAccountPage from './pages/CreateAccountPage';
import EmployeeDash from './pages/EmployeeDash';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/employeeDash" element={<EmployeeDash/>} />
        <Route path="/employersPage" element={<EmployersPage/>}/>
        {/* Additional routes can be added here */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
