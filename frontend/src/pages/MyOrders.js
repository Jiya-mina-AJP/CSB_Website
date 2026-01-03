import React, { useEffect, useState } from 'react';
import supabase from '../config/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, ChevronRight, Package, Truck, Utensils } from 'lucide-react';
import './MyOrders.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('current'); // 'current' or 'history'

    useEffect(() => {
        const fetchOrders = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (!error) setOrders(data);
            setLoading(false);

            // Realtime subscription
            const subscription = supabase
                .channel('my_orders')
                .on('postgres_changes', {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `user_id=eq.${user.id}`
                }, (payload) => {
                    setOrders(prev => prev.map(o => o.id === payload.new.id ? payload.new : o));
                })
                .subscribe();

            return () => subscription.unsubscribe();
        };

        fetchOrders();
    }, []);

    const activeStatuses = ['Waiting for Approval', 'Food Getting Ready', 'Out for Delivery', 'pending', 'confirmed', 'preparing'];

    const currentOrders = orders.filter(o => activeStatuses.includes(o.status));
    const pastOrders = orders.filter(o => !activeStatuses.includes(o.status));
    const displayedOrders = activeTab === 'current' ? currentOrders : pastOrders;

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Waiting for Approval': return <Clock className="text-yellow-500" />;
            case 'Food Getting Ready': return <Utensils className="text-orange-500" />;
            case 'Out for Delivery': return <Truck className="text-blue-500" />;
            case 'Delivered/Completed': return <CheckCircle className="text-green-500" />;
            case 'Cancelled':
            case 'Rejected': return <XCircle className="text-red-500" />;
            default: return <Package />;
        }
    };

    return (
        <div className="my-orders-page container">
            <h1 className="page-title">My Orders</h1>

            <div className="tabs-container">
                <button
                    className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
                    onClick={() => setActiveTab('current')}
                >
                    Current Orders ({currentOrders.length})
                </button>
                <button
                    className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    Order History
                </button>
            </div>

            <div className="orders-grid">
                <AnimatePresence mode="wait">
                    {displayedOrders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="no-orders"
                        >
                            <p>No {activeTab} orders found.</p>
                        </motion.div>
                    ) : (
                        displayedOrders.map(order => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`order-card ${order.status.toLowerCase().replace(/ /g, '-')}`}
                            >
                                <div className="order-header">
                                    <div className="order-id">
                                        <span className="label">Order #</span>
                                        <span className="value">{order.id.slice(0, 8)}</span>
                                    </div>
                                    <div className={`status-badge ${order.status}`}>
                                        {getStatusIcon(order.status)}
                                        <span>{order.status}</span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    {order.items && order.items.map((item, idx) => (
                                        <div key={idx} className="order-item-row">
                                            <span className="qty">{item.quantity}x</span>
                                            <span className="name">{item.name}</span>
                                            <span className="price">₹{item.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-footer">
                                    <div className="total-row">
                                        <span>Total</span>
                                        <span className="total-amount">₹{order.total_amount}</span>
                                    </div>
                                    <span className="date">
                                        {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                                    </span>
                                </div>

                                {activeTab === 'current' && (
                                    <div className="live-tracker">
                                        <div className="tracker-bar">
                                            <div className={`tracker-progress ${getProgressClass(order.status)}`}></div>
                                        </div>
                                        <p className="tracker-text">
                                            Live Status: <strong>{order.status}</strong>
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const getProgressClass = (status) => {
    if (status === 'Waiting for Approval') return 'step-1';
    if (status === 'Food Getting Ready') return 'step-2';
    if (status === 'Out for Delivery') return 'step-3';
    return 'step-0';
};

export default MyOrders;
