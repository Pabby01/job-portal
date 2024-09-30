// Dashboard.js
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// import UserDashboard from '../pages/UserDashboard';
// import EmployerDashboardPage from '../pages/EmployerDashboardPage';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Dashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            switch (user.role) {
                case 'employer':
                    navigate('/dashboard/employer');
                    break;
                case 'job-seeker':
                    navigate('/dashboard/job-seeker');
                    break;
                default:
                    navigate('/login');
            }
        } else if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};


export default Dashboard;
