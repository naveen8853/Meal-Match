import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="nav-bar glass-panel">
            <div className="container nav-container">
                <Link to="/dashboard" className="nav-logo text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    MealMatch
                </Link>

                <div className="search-bar-container">
                    <input type="text" placeholder="Search for meals..." className="search-input glass-panel" />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="nav-profile">
                    <div className="profile-avatar">N</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
