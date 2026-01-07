import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                    },
                },
            });

            if (error) throw error;

            alert("Signup successful! Please check your email for verification.");
            navigate('/login');
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
                    Create Account
                </h2>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="form-input"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-input"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <div className="auth-footer">
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
