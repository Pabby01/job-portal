// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EmployersPage from './pages/EmployersPage';
import CreateAccountPage from './pages/CreateAccountPage';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        {/* Additional routes can be added here */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
