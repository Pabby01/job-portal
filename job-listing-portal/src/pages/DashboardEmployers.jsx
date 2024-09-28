// Dashboard.js
import { Link, Route, Routes } from 'react-router-dom';
import UserDashboard from '../pages/UserDashboard';
import EmployerDashboard from '../pages/EmployerDashboard';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to="/dashboard/user">User Dashboard</Link>
                <Link to="/dashboard/employer">Employer Dashboard</Link>
            </nav>
            <Routes>
                <Route index element={<div>Dashboard Home Content</div>} />
                <Route path="admin" element={<EmployerDashboard />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
