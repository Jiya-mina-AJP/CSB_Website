import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import supabase from '../config/supabase';
import { AuroraBackground } from '../components/AuroraBackground';
import './Login.css';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            alert("Account created! Please check your email to verify (if enabled) or sign in.");
            navigate('/login');

        } catch (error) {
            console.error('Signup error:', error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <AuroraBackground header={
            <div className="back-button-container" style={{ position: 'absolute', top: '6rem', left: '2rem', zIndex: 20 }}>
                <Link to="/" className="social-button" style={{ textDecoration: 'none' }}>
                    <ChevronLeft size={16} /> Go back
                </Link>
            </div>
        }>

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.25, ease: "easeInOut" }}
                className="auth-content"
            >
                <div className="logo-container">
                    <span style={{ fontSize: '2rem' }}>☕</span>
                    <span className="logo-text">Chai Sutta Bar</span>
                </div>

                <div className="header-container">
                    <h1 className="header-title">Create an account</h1>
                    <p className="header-subtitle">
                        Already have an account?{" "}
                        <Link to="/login" className="header-link">Sign in.</Link>
                    </p>
                </div>

                <div className="social-buttons-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <button className="social-button" onClick={handleGoogleLogin}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
                        Sign up with Google
                    </button>
                </div>

                <div className="divider">
                    <div className="divider-line" />
                    <span className="divider-text">OR</span>
                    <div className="divider-line" />
                </div>

                <form onSubmit={handleSubmit}>
                    {errorMessage && (
                        <div style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
                            {errorMessage}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="your.email@provider.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Terms removed as per request */}

            </motion.div>
        </AuroraBackground>
    );
};

export default Signup;
