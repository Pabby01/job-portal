import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import '../styles/ManageJobPage.css';
import '../styles/ProfileDropdown.css'; // Import the CSS styles

const ProfileDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { user, loading, logout } = useAuth();


    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const openModal = (s) => {
        if (user && !loading) {
            setIsModalVisible(true);
        } else {
            // TODO: revisit
        }
    };

    const handleLogout = async (e) => {
        logout();
    }

    return (
        <>
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
                            {/* <Link to='/logout'>Logout</Link> */}
                            <button onClick={() => openModal()} className="btn btn-primary">
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            {
                isModalVisible && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Are you sure you want to log out?</h3>
                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleLogout} // Replace with your logout function
                                >
                                    Logout
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsModalVisible(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>

                )
            }
        </>
    )
};

export default ProfileDropdown;
