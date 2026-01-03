import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import supabase from '../config/supabase';
import './AdminOrders.css';
import { toast } from '../components/ui/toaster';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'

    useEffect(() => {
        fetchOrders();

        // Real-time subscription
        const subscription = supabase
            .channel('orders_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            fetchOrders(); // Optimistic update or wait for realtime
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status: ' + (error.message || 'Unknown error'));
        }
    };

    // Filter orders based on status
    const activeStatuses = ['Waiting for Approval', 'Food Getting Ready', 'Out for Delivery'];

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'active') {
            return activeStatuses.includes(order.status);
        } else {
            return !activeStatuses.includes(order.status); // Delivered/Completed or Cancelled
        }
    });

    return (
        <div className="admin-orders container">
            <h2>Manage Orders</h2>

            <div className="orders-tabs">
                <button
                    className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    Active Orders
                </button>
                <button
                    className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    Order History
                </button>
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="orders-list">
                    {filteredOrders.length === 0 ? (
                        <p className="no-orders">No {activeTab} orders found.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id.slice(0, 8)}...</td>
                                        <td>
                                            {order.customer_name}<br />
                                            <small>{order.customer_email}</small><br />
                                            <small>{order.customer_phone}</small>
                                        </td>
                                        <td>
                                            <ul className="order-items-list">
                                                {/* Start: Items rendering logic */}
                                                {(Array.isArray(order.items) ? order.items : []).map((item, idx) => (
                                                    <li key={idx}>
                                                        {item.quantity}x {item.name}
                                                    </li>
                                                ))}
                                                {/* End: Items rendering logic */}
                                            </ul>
                                        </td>
                                        <td>₹{order.total_amount}</td>
                                        <td>
                                            <span className={`status-badge ${order.status.toLowerCase().replace(/ /g, '-')}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <StatusSelector
                                                currentStatus={order.status}
                                                onChange={(newStatus) => updateStatus(order.id, newStatus)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

const StatusSelector = ({ currentStatus, onChange }) => {
    // Helper to get color class based on status
    const getStatusClass = (status) => {
        switch (status) {
            case 'Waiting for Approval': return 'status-select-waiting';
            case 'Food Getting Ready': return 'status-select-preparing';
            case 'Out for Delivery': return 'status-select-delivery';
            case 'Delivered/Completed': return 'status-select-completed';
            case 'Rejected': return 'status-select-rejected';
            case 'Cancelled': return 'status-select-cancelled';
            default: return '';
        }
    };

    return (
        <div className="status-select-wrapper">
            <select
                value={currentStatus}
                onChange={(e) => onChange(e.target.value)}
                className={`status-select-native ${getStatusClass(currentStatus)}`}
            >
                <option value="Waiting for Approval">⏳ Waiting for Approval</option>
                <option value="Food Getting Ready">🍳 Food Getting Ready</option>
                <option value="Out for Delivery">🛵 Out for Delivery</option>
                <option value="Delivered/Completed">✅ Delivered/Completed</option>
                <option disabled>──────────</option>
                <option value="Rejected">❌ Rejected</option>
                <option value="Cancelled">🚫 Cancelled</option>
            </select>
        </div>
    );
};

export default AdminOrders;
