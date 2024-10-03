import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            console.log(user.role)
            switch (user.role) {
                case 'employer':
                    navigate('/dashboard/employer');
                    break;
                case 'job_seeker':
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
};


export default DashboardPage
