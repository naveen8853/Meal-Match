import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Settings, User, Activity, ChevronRight } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        weight: '',
        height: '',
        age: '',
        gender: 'male', // default
        activity: 'moderate'
    });
    const [macros, setMacros] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setUser(user);
        };
        getUser();
    }, []);

    const calculateMacros = () => {
        // Simple BMR (Mifflin-St Jeor)
        let bmr = 0;
        const w = parseFloat(stats.weight); // kg
        const h = parseFloat(stats.height); // cm
        const a = parseFloat(stats.age);

        if (!w || !h || !a) return;

        if (stats.gender === 'male') {
            bmr = 10 * w + 6.25 * h - 5 * a + 5;
        } else {
            bmr = 10 * w + 6.25 * h - 5 * a - 161;
        }

        const multipliers = { sedentary: 1.2, moderate: 1.55, active: 1.9 };
        const tdee = bmr * multipliers[stats.activity];

        // Split 40/40/20 for "Balanced"
        setMacros({
            calories: Math.round(tdee),
            protein: Math.round((tdee * 0.4) / 4),
            carbs: Math.round((tdee * 0.4) / 4),
            fat: Math.round((tdee * 0.2) / 9),
            fiber: Math.round(tdee / 1000 * 14) // 14g per 1000kcal
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', paddingBottom: '100px' }}>
            <h2 style={{ marginBottom: '20px' }}>My Profile</h2>

            {/* User Card */}
            <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', marginBottom: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }}>
                    {user?.email?.[0].toUpperCase() || 'U'}
                </div>
                <div>
                    <h3 style={{ margin: 0 }}>{user?.user_metadata?.full_name || 'Valued Member'}</h3>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{user?.email}</p>
                </div>
            </div>

            {/* Stats Calculator */}
            <section style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Personal Nutrition <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', background: '#ECFDF5', padding: '2px 8px', borderRadius: '10px' }}>Verify Stats</span></h3>

                <div className="glass-panel" style={{ padding: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'gray', marginBottom: '5px' }}>Weight (kg)</label>
                            <input type="number" className="form-input" value={stats.weight} onChange={e => setStats({ ...stats, weight: e.target.value })} placeholder="75" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'gray', marginBottom: '5px' }}>Height (cm)</label>
                            <input type="number" className="form-input" value={stats.height} onChange={e => setStats({ ...stats, height: e.target.value })} placeholder="180" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'gray', marginBottom: '5px' }}>Age</label>
                            <input type="number" className="form-input" value={stats.age} onChange={e => setStats({ ...stats, age: e.target.value })} placeholder="25" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'gray', marginBottom: '5px' }}>Gender</label>
                            <select className="form-input" value={stats.gender} onChange={e => setStats({ ...stats, gender: e.target.value })}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={calculateMacros} className="btn-primary" style={{ width: '100%', marginBottom: '20px', cursor: 'pointer' }}>Calculate Needs</button>

                    {macros && (
                        <div style={{ background: '#F9FAFB', padding: '15px', borderRadius: '12px' }}>
                            <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Daily Targets</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{macros.protein}g</div>
                                    <div style={{ fontSize: '0.7rem', color: 'gray' }}>Protein</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3B82F6' }}>{macros.carbs}g</div>
                                    <div style={{ fontSize: '0.7rem', color: 'gray' }}>Carbs</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#F59E0B' }}>{macros.fat}g</div>
                                    <div style={{ fontSize: '0.7rem', color: 'gray' }}>Fats</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{macros.fiber}g</div>
                                    <div style={{ fontSize: '0.7rem', color: 'gray' }}>Fiber</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Menu Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Activity size={20} /> My Activity Log
                    </div>
                    <ChevronRight size={20} color="gray" />
                </button>
                <button className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Settings size={20} /> Preferences
                    </div>
                    <ChevronRight size={20} color="gray" />
                </button>
                <button onClick={handleLogout} style={{ marginTop: '20px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Profile;
