import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bottom-nav glass-panel">
            <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Home</span>
            </Link>
            <Link to="/search" className={`nav-item ${isActive('/search') ? 'active' : ''}`}>
                <span className="nav-icon">🍳</span>
                <span className="nav-label">Meals</span>
            </Link>
            <Link to="/plan" className={`nav-item ${isActive('/plan') ? 'active' : ''}`}>
                <span className="nav-icon">📅</span>
                <span className="nav-label">Plan</span>
            </Link>
            <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
                <span className="nav-icon">👤</span>
                <span className="nav-label">Profile</span>
            </Link>
        </nav>
    );
};

export default BottomNav;
