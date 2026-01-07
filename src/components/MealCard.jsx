import React from 'react';

const MealCard = ({ title, image, calories, macros, time }) => {
    return (
        <div className="meal-card glass-panel">
            <div className="meal-image-container">
                {/* Placeholder for image */}
                <div className="meal-image-placeholder" style={{ background: `linear-gradient(135deg, ${getRandomColor()}, #1a1a1a)` }}></div>
                <div className="meal-time-badge">{time} min</div>
            </div>
            <div className="meal-content">
                <h3 className="meal-title">{title}</h3>
                <p className="meal-calories" style={{ color: 'var(--color-primary)' }}>{calories} kcal</p>

                <div className="meal-macros">
                    <span className="macro-tag">P: {macros.p}g</span>
                    <span className="macro-tag">C: {macros.c}g</span>
                    <span className="macro-tag">F: {macros.f}g</span>
                </div>

                <button className="btn-add">+</button>
            </div>
        </div>
    );
};

// Helper for demo visuals
const getRandomColor = () => {
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899'];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default MealCard;
