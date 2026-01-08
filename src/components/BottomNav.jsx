import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search as SearchIcon, Calendar, User } from 'lucide-react';

const BottomNav = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bottom-nav">
            <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                <Home size={24} />
                {isActive('/dashboard') && <span className="nav-dot">•</span>}
            </Link>
            <Link to="/search" className={`nav-item ${isActive('/search') ? 'active' : ''}`}>
                <SearchIcon size={24} />
                {isActive('/search') && <span className="nav-dot">•</span>}
            </Link>
            <Link to="/plan" className={`nav-item ${isActive('/plan') ? 'active' : ''}`}>
                <Calendar size={24} />
                {isActive('/plan') && <span className="nav-dot">•</span>}
            </Link>
            <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
                <User size={24} />
                {isActive('/profile') && <span className="nav-dot">•</span>}
            </Link>
        </nav>
    );
};

export default BottomNav;
