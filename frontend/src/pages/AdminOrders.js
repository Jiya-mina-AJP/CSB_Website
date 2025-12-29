import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import supabase from '../config/supabase';
import './AdminOrders.css';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            const response = await axios.get(`${API_URL}/orders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOrders(response.data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            await axios.put(`${API_URL}/orders?id=${id}`, { status: newStatus }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchOrders();
        } catch (error) {
            console.error('Error updates status:', error);
            alert('Failed to update status');
        }
    };

    return (
        <div className="admin-orders container">
            <h2>Manage Orders</h2>
            {loading ? <p>Loading...</p> : (
                <div className="orders-list">
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
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id.slice(0, 8)}...</td>
                                    <td>
                                        {order.customer_name}<br />
                                        <small>{order.customer_email}</small>
                                    </td>
                                    <td>
                                        <ul>
                                            {order.order_items && order.order_items.map(item => (
                                                <li key={item.id}>
                                                    {item.quantity}x {item.menu_item?.name || 'Item'}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>₹{order.total_amount}</td>
                                    <td>
                                        <span className={`status-badge ${order.status}`}>{order.status}</span>
                                    </td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="preparing">Preparing</option>
                                            <option value="ready">Ready</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
