// components/Header.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const [dashboardUrl, setDashboardUrl] = useState('');
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading === false) {
      if (user) {
        setDashboardUrl(user.role === 'employer' ? 'employer' : 'job-seeker');
      }
    }
  }, [user, loading, dashboardUrl]);

  return (
    <header className="site-header">
      <div className='container'>
        <div className="logo">
          <Link to="/">MyJobPortal</Link>
        </div>
        {!!user ? (
          user.role === 'employer' ? (
            <nav className='nav-links'>
              <ul>
                <li><Link to={`/dashboard/${dashboardUrl}`}>Dashboard</Link></li>
                <li><Link to='/post-job'>Post a Job</Link></li>
                <li><Link to='/manage-jobs'>Manage Jobs</Link></li>
                <li><Link to='/applications'>Applications</Link></li>
                <li><Link to='/messages'>Messages</Link></li>
                <ProfileDropdown />
              </ul>
            </nav>

          ) : (
            <nav className='nav-links'>
              <ul>
                <li><Link to={`/dashboard/job-seeker`}>Dashboard</Link></li>
                <li><Link to='/jobs'>Find Jobs</Link></li>
                <li><Link to='/applications'>My Applications</Link></li>
                <li><Link to='/saved-jobs'>Saved Jobs</Link></li>
                <li><Link to='/messages'>Messages</Link></li>
                <ProfileDropdown />
              </ul>
            </nav>

          )
        ) : (
          <nav className='nav-links'>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about-us'>About us</Link></li>
              <li><Link to='/blogs'>Blog</Link></li>
              <li><Link to='/jobs'>Jobs</Link></li> {/* Optional Jobs link */}
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Sign up</Link></li>
            </ul>
          </nav>
        )}

      </div>
    </header >
  );
};

export default Header;
