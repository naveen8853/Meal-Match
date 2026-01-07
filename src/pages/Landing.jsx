import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    const diets = [
        { name: 'Keto', desc: 'High fat, low carb' },
        { name: 'Vegan', desc: 'Plant-based power' },
        { name: 'Paleo', desc: 'Ancestral eating' },
        { name: 'Mediterranean', desc: 'Balanced & heart-healthy' },
    ];

    const steps = [
        { num: '01', title: 'Profile', desc: 'Tell us your goals & preferences' },
        { num: '02', title: 'Plan', desc: 'Get your customized meal plan' },
        { num: '03', title: 'Cook', desc: 'Shop & cook with ease' },
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section flex-center">
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h1 className="hero-title text-gradient">
                        Your Personalized <br /> Nutrition Journey
                    </h1>
                    <p className="hero-subtitle">
                        Tailored meal plans that fit your lifestyle, taste, and health goals.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <Link to="/login" className="btn-primary">
                            Get Started
                        </Link>
                    </div>
                </div>
                <div className="hero-glow"></div>
            </section>

            {/* Diets Section */}
            <section className="section-diets container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
                    Diets We Cover
                </h2>
                <div className="grid-diets">
                    {diets.map((diet, index) => (
                        <div key={index} className="diet-card glass-panel">
                            <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{diet.name}</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>{diet.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Workflow Section */}
            <section className="section-workflow container">
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>
                    How It Works
                </h2>
                <div className="workflow-steps">
                    {steps.map((step, index) => (
                        <div key={index} className="step-item">
                            <div className="step-number text-gradient">{step.num}</div>
                            <h3>{step.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem' }}>
                <p style={{ color: 'var(--color-text-muted)' }}>© 2025 MealMatch. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
