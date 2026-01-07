import React from 'react';

const Splash = ({ show }) => {
    return (
        <div className={`splash-screen ${!show ? 'fade-out' : ''}`}>
            <div className="splash-content">
                <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                    MealMatch
                </h1>
                <p style={{ color: 'var(--color-text-muted)', letterSpacing: '2px' }}>
                    YOUR PERSONALIZED NUTRITION
                </p>
            </div>
        </div>
    );
};

export default Splash;
