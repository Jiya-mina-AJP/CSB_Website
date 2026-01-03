import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabase';
import { AuroraBackground } from '../components/AuroraBackground';
import { motion } from 'framer-motion';
import { toast } from '../components/ui/toaster';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we have a session (which happens after clicking the email link)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                // If no session, user might not have clicked the link or link expired
                toast.error("Invalid or expired reset link.");
                navigate('/login');
            }
        });
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            toast.success("Password updated successfully!");
            navigate('/'); // Go home or login
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="auth-content"
                style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '400px' }}
            >
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Set New Password</h2>
                <form onSubmit={handleUpdate}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Enter new password"
                            required
                            minLength={6}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#0f172a',
                            color: 'white',
                            borderRadius: '0.5rem',
                            fontWeight: '600',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </motion.div>
        </AuroraBackground>
    );
};

export default UpdatePassword;
