import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Route, Routes } from 'react-router-dom';
import EmployerDashboard from './EmployerDashboard';
import UserDashboard from './UserDashboard';

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) navigate('/')
    return (
        <>
            <div>
                DashboardPage
            </div>
{/* 
            <Routes>
                <Route index element={<div>Dashboard Home Content</div>} />
                <Route path="user" element={<UserDashboard />} />
                <Route path="/employer" element={<EmployerDashboard />} />
            </Routes> */}
        </>
    )
}

export default DashboardPage
