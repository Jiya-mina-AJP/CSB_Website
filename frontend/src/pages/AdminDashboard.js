import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import { Hamburger, Clipboard, Tag, ChartLine } from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard container">
            <h1>Admin Dashboard</h1>
            <div className="admin-grid group">
                <AnimatedBackground
                    className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
                    transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                    }}
                    enableHover
                >
                    <Link to="/admin/menu" className="admin-card" data-id="menu">
                        <div className="card-content">
                            <div className="icon"><Hamburger /></div>
                            <h2>Manage Menu</h2>
                            <p>Add, edit, or remove menu items and upload images.</p>
                        </div>
                    </Link>
                    <Link to="/admin/orders" className="admin-card" data-id="orders">
                        <div className="card-content">
                            <div className="icon"><Clipboard /></div>
                            <h2>Manage Orders</h2>
                            <p>View incoming orders and update their status.</p>
                        </div>
                    </Link>
                    <Link to="/admin/discounts" className="admin-card" data-id="discounts">
                        <div className="card-content">
                            <div className="icon"><Tag /></div>
                            <h2>Manage Discounts</h2>
                            <p>Create and manage coupons and promotional offers.</p>
                        </div>
                    </Link>
                    <Link to="/admin/analysis" className="admin-card" data-id="analysis">
                        <div className="card-content">
                            <div className="icon"><ChartLine /></div>
                            <h2>Sales Analysis</h2>
                            <p>Visualize trends, revenue, and customer insights.</p>
                        </div>
                    </Link>
                </AnimatedBackground>
            </div>
        </div>
    );
};

export default AdminDashboard;
