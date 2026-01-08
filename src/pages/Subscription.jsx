import React, { useState } from 'react';
import { Check, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState('monthly');

    const plans = [
        {
            id: 'weekly',
            title: 'Weekly Starter',
            price: '99',
            period: '/week',
            desc: 'Perfect for trying out our nutritious meals.',
            features: ['5 Meals per week', 'Lunch or Dinner', 'Weekly Menu Customization', 'Free Delivery']
        },
        {
            id: 'monthly',
            title: 'Monthly Pro',
            price: '349',
            period: '/month',
            desc: 'Our most popular plan for consistent nutrition.',
            features: ['22 Meals per month', 'Lunch + Dinner Options', 'Nutrition Consultation', 'Free Delivery', 'Rollover Unused Meals'],
            isPopular: true
        }
    ];

    return (
        <div style={{ background: 'var(--color-bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ background: '#FFFFFF', padding: '20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Daily Delivery 🚚</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Healthy meals at your doorstep, just like a newspaper.</p>
            </div>

            <div className="container" style={{ marginTop: '2rem' }}>
                {/* Toggle */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: '#E5E7EB', padding: '4px', borderRadius: '30px', display: 'flex' }}>
                        <button
                            onClick={() => setSelectedPlan('weekly')}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '25px',
                                border: 'none',
                                background: selectedPlan === 'weekly' ? 'black' : 'transparent',
                                color: selectedPlan === 'weekly' ? 'white' : 'gray',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setSelectedPlan('monthly')}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '25px',
                                border: 'none',
                                background: selectedPlan === 'monthly' ? 'var(--color-primary)' : 'transparent',
                                color: selectedPlan === 'monthly' ? 'white' : 'gray',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Monthly
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="subscription-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {plans.map(plan => (
                        <div key={plan.id} style={{
                            background: '#FFFFFF',
                            padding: '2rem',
                            borderRadius: '24px',
                            position: 'relative',
                            border: plan.isPopular ? '2px solid var(--color-primary)' : '1px solid transparent',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            {plan.isPopular && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'var(--color-primary)',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}>
                                    MOST POPULAR
                                </span>
                            )}

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{plan.desc}</p>

                            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>${plan.price}</span>
                                <span style={{ color: 'var(--color-text-muted)' }}>{plan.period}</span>
                            </div>

                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                                {plan.features.map((feature, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <div style={{ background: '#ECFDF5', padding: '4px', borderRadius: '50%', color: 'var(--color-primary)' }}>
                                            <Check size={16} />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '16px',
                                border: 'none',
                                background: 'black',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}>
                                Subscribe Now <ArrowRight size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                <span style={{ color: 'var(--color-text-muted)', textDecoration: 'underline' }}>Maybe later, back to menu</span>
            </div>
        </div>
    );
};

export default Subscription;
