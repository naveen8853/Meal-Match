import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

            navigate('/dashboard');
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel">
                <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
                    Welcome Back
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '0.9rem' }}>
                        <label style={{ cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                            <input type="checkbox" style={{ marginRight: '0.5rem' }} /> Remember me
                        </label>
                        <a href="#" style={{ color: 'var(--color-primary)' }}>Forgot Password?</a>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%' }}>
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>
                <div className="auth-footer">
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
