import React, { useState, useEffect } from 'react';
import { PlusCircle, Tag, Search, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import supabase from '../config/supabase';
import './AdminDiscounts.css';

const AdminDiscounts = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        discount_type: 'percentage',
        value: '',
        min_order_value: '',
        max_discount_amount: '',
        max_uses: '',
        is_active: true,
        show_on_home: false
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('coupons')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setCoupons(data || []);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setFormData({
            code: '', discount_type: 'percentage', value: '', min_order_value: '', max_discount_amount: '', max_uses: '', is_active: true, show_on_home: false
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                code: formData.code.toUpperCase(),
                value: parseFloat(formData.value),
                min_order_value: formData.min_order_value ? parseFloat(formData.min_order_value) : 0,
                max_discount_amount: formData.max_discount_amount ? parseFloat(formData.max_discount_amount) : null,
                max_uses: formData.max_uses ? parseInt(formData.max_uses) : null
            };

            if (editingId) {
                const { error } = await supabase.from('coupons').update(payload).eq('id', editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('coupons').insert([payload]);
                if (error) throw error;
            }
            fetchCoupons();
            resetForm();
            alert('Coupon saved successfully!');
        } catch (error) {
            console.error('Error saving coupon:', error);
            alert('Failed to save coupon: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this coupon?')) return;
        try {
            await supabase.from('coupons').delete().eq('id', id);
            fetchCoupons();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleEdit = (coupon) => {
        setFormData({
            code: coupon.code,
            discount_type: coupon.discount_type,
            value: coupon.value,
            min_order_value: coupon.min_order_value || '',
            max_discount_amount: coupon.max_discount_amount || '',
            max_uses: coupon.max_uses || '',
            is_active: coupon.is_active,
            show_on_home: coupon.show_on_home
        });
        setEditingId(coupon.id);
        setShowForm(true);
    };

    const handleToggle = async (id, field, currentValue) => {
        try {
            await supabase.from('coupons').update({ [field]: !currentValue }).eq('id', id);
            fetchCoupons();
        } catch (error) {
            console.error('Toggle error:', error);
        }
    };

    return (
        <div className="admin-discounts">
            <div className="discounts-container">
                <header className="discounts-header">
                    <div>
                        <h2>Manage Discounts</h2>
                        <p>Create and track promotional offers</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : <><PlusCircle size={18} /> Add Coupon</>}
                    </button>
                </header>

                {showForm && (
                    <div className="discount-form-card">
                        <h3>{editingId ? 'Edit Coupon' : 'New Coupon'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Coupon Code</label>
                                    <input name="code" value={formData.code} onChange={handleInputChange} placeholder="e.g. SUMMER50" required />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select name="discount_type" value={formData.discount_type} onChange={handleInputChange}>
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="flat">Flat Amount (₹)</option>
                                        <option value="cashback">Cashback (₹)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Value</label>
                                    <input type="number" name="value" value={formData.value} onChange={handleInputChange} placeholder="Amount/Percent" required />
                                </div>
                                <div className="form-group">
                                    <label>Min Order Value</label>
                                    <input type="number" name="min_order_value" value={formData.min_order_value} onChange={handleInputChange} placeholder="Optional" />
                                </div>
                                <div className="form-group">
                                    <label>Max Usage Limit</label>
                                    <input type="number" name="max_uses" value={formData.max_uses} onChange={handleInputChange} placeholder="Unlimited" />
                                </div>
                                <div className="checkbox-row">
                                    <label className="toggle-group">
                                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} />
                                        <span>Active</span>
                                    </label>
                                    <label className="toggle-group">
                                        <input type="checkbox" name="show_on_home" checked={formData.show_on_home} onChange={handleInputChange} />
                                        <span>Show on Home</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={resetForm} className="btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Coupon</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="discounts-list">
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input placeholder="Search coupons..." />
                    </div>

                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Discount</th>
                                    <th>Usage</th>
                                    <th>Status</th>
                                    <th>Visibility</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map(coupon => (
                                    <tr key={coupon.id} className={!coupon.is_active ? 'opacity-50' : ''}>
                                        <td>
                                            <div className="coupon-code-badge">
                                                <Tag size={14} />
                                                {coupon.code}
                                            </div>
                                        </td>
                                        <td>
                                            <strong>
                                                {coupon.discount_type === 'percentage' && `${coupon.value}% OFF`}
                                                {coupon.discount_type === 'flat' && `₹${coupon.value} FLAT`}
                                                {coupon.discount_type === 'cashback' && `₹${coupon.value} Cashback`}
                                            </strong>
                                        </td>
                                        <td>
                                            <span style={{ fontSize: '0.9rem', color: '#555' }}>
                                                {coupon.current_uses} / {coupon.max_uses ? coupon.max_uses : '∞'}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`status-badge ${coupon.is_active ? 'active' : 'inactive'}`}
                                                onClick={() => handleToggle(coupon.id, 'is_active', coupon.is_active)}
                                            >
                                                {coupon.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="icon-btn" onClick={() => handleToggle(coupon.id, 'show_on_home', coupon.show_on_home)}>
                                                {coupon.show_on_home ? <Eye size={18} className="text-green-600" /> : <EyeOff size={18} className="text-gray-400" />}
                                            </button>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="icon-btn" title="Edit" onClick={() => handleEdit(coupon)}><Edit2 size={18} /></button>
                                                <button className="icon-btn" title="Delete" onClick={() => handleDelete(coupon.id)}><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDiscounts;
