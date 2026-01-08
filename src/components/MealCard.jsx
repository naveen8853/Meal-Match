import React from 'react';
import { Plus, Flame } from 'lucide-react';

const MealCard = ({ title, calories, macros, time, price }) => {
    return (
        <div className="meal-card">
            <div className="meal-image-container">
                {/* Placeholder for real image */}
                <div className="meal-image-placeholder" style={{ background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Replace with <img src={image} /> when available */}
                    <span style={{ fontSize: '3rem', opacity: 0.2 }}>🥘</span>
                </div>
                <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    ${price?.toFixed(2) || '12.00'}
                </div>
                <div className="meal-time-badge" style={{ background: 'rgba(255,255,255,0.9)', color: '#000', fontWeight: 'bold' }}>
                    {time} min
                </div>
            </div>
            <div className="meal-content">
                <h3 className="meal-title" style={{ fontWeight: 'bold', color: 'var(--color-text-main)' }}>{title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Flame size={14} color="var(--color-secondary)" /> {calories} kcal
                    </div>
                </div>

                <div className="meal-macros" style={{ marginTop: '0.8rem', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <span style={{ fontSize: '0.75rem', background: '#F3F4F6', padding: '2px 6px', borderRadius: '4px', color: '#6B7280' }}>P: {macros.p}g</span>
                        <span style={{ fontSize: '0.75rem', background: '#F3F4F6', padding: '2px 6px', borderRadius: '4px', color: '#6B7280' }}>C: {macros.c}g</span>
                    </div>
                    <button className="btn-add" style={{ position: 'static', width: '32px', height: '32px', boxShadow: 'none' }}>
                        <Plus size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealCard;
