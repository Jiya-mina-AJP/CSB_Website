import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard container">
            <h1>Admin Dashboard</h1>
            <div className="admin-grid">
                <Link to="/admin/menu" className="admin-card">
                    <div className="icon">🍔</div>
                    <h2>Manage Menu</h2>
                    <p>Add, edit, or remove menu items and upload images.</p>
                </Link>
                <Link to="/admin/orders" className="admin-card">
                    <div className="icon">📋</div>
                    <h2>Manage Orders</h2>
                    <p>View incoming orders and update their status.</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
