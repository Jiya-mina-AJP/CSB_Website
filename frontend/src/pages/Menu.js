import React, { useState, useEffect } from 'react';
import supabase from '../config/supabase';
import { useCart } from '../context/CartContext';
import { toast } from '../components/ui/toaster';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const categories = ['All', 'Coffee', 'Tea', 'Snacks', 'Desserts', 'Beverages'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, menuItems]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('show', true)
        .order('name');

      if (error) throw error;
      setMenuItems(data || []);
      setFilteredItems(data || []);
    } catch (error) {
      console.error('Error loading menu items:', error);
      toast.error('Failed to load menu items.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      description: "You can view it in your cart.",
      action: {
        label: "View Cart",
        onClick: () => window.location.href = '/cart'
      }
    });
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <div className="container">
          <h1>CSB Menu</h1>
          <p>Discover our delicious selection of chai, coffee, food, and beverages</p>
        </div>
      </div>

      <div className="container section">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading menu...</div>
        ) : filteredItems.length > 0 ? (
          <div className="menu-items-grid">
            {filteredItems.map(item => (
              <div key={item.id || item._id} className="menu-item-card">
                <div className="menu-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="placeholder-image">🍽️</div>
                  )}
                  {item.featured && <span className="featured-badge">Featured</span>}
                </div>
                <div className="menu-item-content">
                  <h3>{item.name}</h3>
                  <p className="category">{item.category}</p>
                  <p className="description">{item.description}</p>
                  <div className="menu-item-footer">
                    <span className="price">₹{item.price.toFixed(2)}</span>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                    >
                      {item.available ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-items">
            <p>No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
