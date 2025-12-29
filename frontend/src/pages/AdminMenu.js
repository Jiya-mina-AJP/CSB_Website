import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import supabase from '../config/supabase';
import './AdminMenu.css';

const AdminMenu = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Chai',
        image: '',
        featured: false,
        available: true
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            // Fetching plain menu list (public)
            const response = await axios.get(`${API_URL}/menu?category=All`);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching menu:', error);
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

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('menu-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image: data.publicUrl }));
        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            if (editingItem) {
                await axios.put(`${API_URL}/menu?id=${editingItem.id}`, formData, { headers });
            } else {
                await axios.post(`${API_URL}/menu`, formData, { headers });
            }

            setFormData({
                name: '', description: '', price: '', category: 'Chai', image: '', featured: false, available: true
            });
            setEditingItem(null);
            fetchItems();
            alert('Success!');
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Failed to save item. Ensure you are an Admin.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this item?')) return;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            await axios.delete(`${API_URL}/menu?id=${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchItems();
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Failed to delete.');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image: item.image || '',
            featured: item.featured,
            available: item.available
        });
        window.scrollTo(0, 0);
    };

    return (
        <div className="admin-menu container">
            <h2>Manage Menu</h2>

            {/* Form Section */}
            <div className="admin-form-card">
                <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleInputChange}>
                            {['Chai', 'Cold Coffee', 'Hot Coffee', 'Milk', 'Burger', 'Pasta', 'Bites', 'Sandwich', 'Maggi', 'Healthy Feast', 'Pizza', 'Chai Combo', 'Toast', 'Meal Combo', 'Monsoon Delight', 'Ice Tea', 'Milk Shake', 'Ice Crusher', 'Lemonade', 'Soda', 'Mojito', 'Dessert'].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" onChange={handleImageUpload} accept="image/*" />
                        {uploading && <p>Uploading...</p>}
                        {formData.image && <img src={formData.image} alt="Preview" className="image-preview" />}
                    </div>

                    <div className="checkbox-group">
                        <label>
                            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} /> Featured?
                        </label>
                        <label>
                            <input type="checkbox" name="available" checked={formData.available} onChange={handleInputChange} /> Available?
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={uploading} className="btn btn-primary">
                            {editingItem ? 'Update' : 'Create'}
                        </button>
                        {editingItem && (
                            <button type="button" onClick={() => { setEditingItem(null); setFormData({ name: '', description: '', price: '', category: 'Chai', image: '', featured: false, available: true }); }} className="btn btn-secondary">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List Section */}
            <div className="items-list">
                <h3>Current Items</h3>
                {loading ? <p>Loading...</p> : (
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td>{item.image ? <img src={item.image} alt={item.name} width="50" /> : 'No Img'}</td>
                                    <td>{item.name}</td>
                                    <td>₹{item.price}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item)} className="btn-small">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="btn-small btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminMenu;
