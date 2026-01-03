import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, AreaChart, Area
} from 'recharts';
import { Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';
import './AdminAnalysis.css';

const AdminAnalysis = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [timeframe, setTimeframe] = useState('month');

    // Mock Data
    const salesData = [
        { name: 'Week 1', sales: 4000, orders: 24, visitors: 2400 },
        { name: 'Week 2', sales: 3000, orders: 18, visitors: 1398 },
        { name: 'Week 3', sales: 2000, orders: 12, visitors: 9800 },
        { name: 'Week 4', sales: 2780, orders: 32, visitors: 3908 },
    ];

    const categoryData = [
        { name: 'Chai', value: 400 },
        { name: 'Coffee', value: 300 },
        { name: 'Snacks', value: 300 },
        { name: 'Desserts', value: 200 },
    ];

    const StatCard = ({ title, value, icon: Icon, trend }) => (
        <div className="stat-card">
            <div className="stat-header">
                <span className="stat-title">{title}</span>
                <div className="stat-icon-bg">
                    <Icon size={20} className="stat-icon" />
                </div>
            </div>
            <div className="stat-value">{value}</div>
            <div className={`stat-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last {timeframe}
            </div>
        </div>
    );

    return (
        <div className="admin-analysis">
            <div className="analysis-container">
                <header className="analysis-header">
                    <div>
                        <h2>Business Analytics</h2>
                        <p>Track your performance and growth</p>
                    </div>
                    <div className="controls">
                        <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="time-select">
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>
                </header>

                <div className="stats-grid">
                    <StatCard title="Total Revenue" value="₹45,231" icon={DollarSign} trend={12.5} />
                    <StatCard title="Total Orders" value="156" icon={Calendar} trend={-2.4} />
                    <StatCard title="Avg. Order Value" value="₹290" icon={TrendingUp} trend={5.1} />
                    <StatCard title="Active Customers" value="89" icon={Users} trend={8.2} />
                </div>

                <div className="tabs-container">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'sales' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sales')}
                    >
                        Sales Trends
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Product Performance
                    </button>
                </div>

                <div className="chart-section">
                    {activeTab === 'overview' && (
                        <div className="chart-card">
                            <h3>Revenue Overview</h3>
                            <div className="chart-wrapper">
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={salesData}>
                                        <defs>
                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} prefix="₹" />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        />
                                        <Area type="monotone" dataKey="sales" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSales)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sales' && (
                        <div className="chart-card">
                            <h3>Orders vs Visitors</h3>
                            <div className="chart-wrapper">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={salesData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis yAxisId="left" orientation="left" stroke="#f59e0b" />
                                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="orders" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                        <Bar yAxisId="right" dataKey="visitors" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminAnalysis;
