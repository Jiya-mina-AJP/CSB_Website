import React, { useState, useEffect } from 'react';
import {
    PlusCircle,
    Sparkles,
    Image as ImageIcon,
    Camera,
    RefreshCw,
    Pencil,
    Trash2,
    UtensilsCrossed,
    CheckCircle2,
    XCircle,
    Eye,
    EyeOff
} from 'lucide-react';
import supabase from '../config/supabase';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import './AdminMenu.css';

const AdminMenu = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Chai',
        image: '',
        featured: false,
        available: true,
        show: true
    });

    // Cropper State
    const [imageToCrop, setImageToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            // Fetch directly from supabase table 'menu_items'
            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error('Error fetching menu:', error);
            // Fallback to empty list or alert user if table doesn't exist yet
            if (error.code === '42P01') {
                console.warn('Table "menu_items" does not exist in Supabase yet.');
            }
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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageToCrop(reader.result);
            setShowCropper(true);
        };
    };

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropSave = async () => {
        try {
            setUploading(true);
            setShowCropper(false);

            const croppedImageBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
            const fileName = `${Date.now()}_cropped.jpg`;
            const filePath = `menu/${fileName}`;

            // Upload cropped blob to Supabase
            const { error: uploadError } = await supabase.storage
                .from('menu-images')
                .upload(filePath, croppedImageBlob, {
                    contentType: 'image/jpeg'
                });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath);
            setFormData(prev => ({ ...prev, image: data.publicUrl }));
            setImageToCrop(null);
        } catch (error) {
            console.error('Crop/Upload error:', error);
            alert('Error processing image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setImageToCrop(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const itemData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (editingItem) {
                const { error } = await supabase
                    .from('menu_items')
                    .update(itemData)
                    .eq('id', editingItem.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('menu_items')
                    .insert([itemData]);
                if (error) throw error;
            }

            resetForm();
            fetchItems();
            alert('Item saved successfully!');
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Failed to save item. Ensure table "menu_items" exists in Supabase.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const { error } = await supabase
                .from('menu_items')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchItems();
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Failed to delete item.');
        }
    };

    const handleToggleShow = async (item) => {
        try {
            const { error } = await supabase
                .from('menu_items')
                .update({ show: !item.show })
                .eq('id', item.id);
            if (error) throw error;
            fetchItems();
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    const handleToggleFeatured = async (item) => {
        try {
            const { error } = await supabase
                .from('menu_items')
                .update({ featured: !item.featured })
                .eq('id', item.id);
            if (error) throw error;
            fetchItems();
        } catch (error) {
            console.error('Error toggling featured status:', error);
        }
    };

    const handleToggleAvailable = async (item) => {
        try {
            const { error } = await supabase
                .from('menu_items')
                .update({ available: !item.available })
                .eq('id', item.id);
            if (error) throw error;
            fetchItems();
        } catch (error) {
            console.error('Error toggling availability:', error);
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
            featured: item.featured || false,
            available: item.available ?? true,
            show: item.show ?? true
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({
            name: '', description: '', price: '', category: 'Chai', image: '', featured: false, available: true, show: true
        });
        setEditingItem(null);
    };

    const categoryList = ['Chai', 'Cold Coffee', 'Hot Coffee', 'Milk', 'Burger', 'Pasta', 'Bites', 'Sandwich', 'Maggi', 'Healthy Feast', 'Pizza', 'Chai Combo', 'Toast', 'Meal Combo', 'Monsoon Delight', 'Ice Tea', 'Milk Shake', 'Ice Crusher', 'Lemonade', 'Soda', 'Mojito', 'Dessert'];

    return (
        <div className="admin-menu">
            {/* Image Cropper Modal */}
            {showCropper && (
                <div className="cropper-modal-overlay">
                    <div className="cropper-modal-content">
                        <h3>✂️ Crop Your Menu Image</h3>
                        <p>Adjust the image to fit perfectly (Square 1:1)</p>
                        <div className="cropper-container">
                            <Cropper
                                image={imageToCrop}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={handleCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className="cropper-controls">
                            <div className="zoom-slider">
                                <span>Zoom:</span>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(e.target.value)}
                                />
                            </div>
                            <div className="cropper-actions">
                                <button onClick={handleCropCancel} className="btn-secondary">Cancel</button>
                                <button onClick={handleCropSave} className="btn-primary">Set Image</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="admin-container">
                <header className="admin-header">
                    <h2>Manage Menu</h2>
                    <p>Add new delicacies or update existing offerings for CSB.</p>
                </header>

                {/* Rich Form Section */}
                <div className="admin-form-card">
                    <h3>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {editingItem ? <Sparkles size={24} className="text-amber-500" /> : <PlusCircle size={24} className="text-amber-500" />}
                            {editingItem ? 'Edit Menu Item' : 'Add New Item'}
                        </span>
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Item Name</label>
                                <input name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Adarak Chai" required />
                            </div>

                            <div className="form-group">
                                <label>Price (₹)</label>
                                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} placeholder="0.00" required />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange}>
                                    {categoryList.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe the taste..." rows="3" required />
                            </div>

                            <div className="form-group full-width">
                                <label>Image</label>
                                <div className="image-upload-wrapper" onClick={() => document.getElementById('fileInput').click()}>
                                    <input id="fileInput" type="file" onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                                    {uploading ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            <RefreshCw size={20} className="animate-spin" />
                                            <span>Uploading amazing shot...</span>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                            <Camera size={32} />
                                            <span>Click to upload item image</span>
                                        </div>
                                    )}
                                    {formData.image && (
                                        <div className="image-preview-container">
                                            <img src={formData.image} alt="Preview" className="image-preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="checkbox-row">
                            <label className="toggle-group">
                                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} />
                                <span className="toggle-label">Featured Item</span>
                            </label>
                            <label className="toggle-group">
                                <input type="checkbox" name="available" checked={formData.available} onChange={handleInputChange} />
                                <span className="toggle-label">Currently Available</span>
                            </label>
                            <label className="toggle-group">
                                <input type="checkbox" name="show" checked={formData.show} onChange={handleInputChange} />
                                <span className="toggle-label">Show on Website</span>
                            </label>
                        </div>

                        <div className="form-actions">
                            {editingItem && (
                                <button type="button" onClick={resetForm} className="btn btn-secondary">
                                    Cancel
                                </button>
                            )}
                            <button type="submit" disabled={uploading} className="btn btn-primary">
                                {editingItem ? 'Update Item' : 'Create Item'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div className="items-list-container">
                    <div className="list-header">
                        <h3>Current Menu Items ({items.length})</h3>
                        <button onClick={fetchItems} className="btn-icon" title="Refresh">
                            <RefreshCw size={18} />
                        </button>
                    </div>

                    <div className="table-responsive">
                        {loading ? (
                            <div style={{ padding: '2rem', textAlign: 'center' }}>Loading items...</div>
                        ) : items.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center' }}>No items found. Add your first item above!</div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Item Details</th>
                                        <th>Price</th>
                                        <th>Featured</th>
                                        <th>Stock Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id}>
                                            <td className="td-image">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} />
                                                ) : (
                                                    <div className="placeholder-icon">
                                                        <UtensilsCrossed size={24} />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="item-name">{item.name}</div>
                                                <div className="item-category">{item.category}</div>
                                            </td>
                                            <td><strong>₹{item.price}</strong></td>
                                            <td>
                                                <span
                                                    className={`badge ${item.featured ? 'badge-featured' : 'badge-hide'}`}
                                                    onClick={() => handleToggleFeatured(item)}
                                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                                                >
                                                    {item.featured ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                                    {item.featured ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`badge ${item.available ? 'badge-show' : 'badge-hide'}`}
                                                    onClick={() => handleToggleAvailable(item)}
                                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}
                                                >
                                                    {item.available ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                                    {item.available ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button onClick={() => handleEdit(item)} className="btn-icon btn-edit" title="Edit">
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(item.id)} className="btn-icon btn-delete" title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
