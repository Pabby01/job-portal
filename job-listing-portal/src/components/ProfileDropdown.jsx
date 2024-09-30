import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileDropdown.css'; // Import the CSS styles

const ProfileDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="profile-dropdown">
            <button className="profile-button" onClick={toggleDropdown}>
                Profile
                <span className={`arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
            </button>

            {dropdownOpen && (
                <ul className="dropdown-menu">
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/billing'>Billing</Link>
                    </li>
                    <li>
                        <Link to='/settings'>Settings</Link>
                    </li>
                    <li>
                        <Link to='/help'>Help</Link>
                    </li>
                    <li>
                        <Link to='/logout'>Logout</Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProfileDropdown;
