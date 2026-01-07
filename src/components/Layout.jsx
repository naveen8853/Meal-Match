import React from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <BottomNav />
        </div>
    );
};

export default Layout;
