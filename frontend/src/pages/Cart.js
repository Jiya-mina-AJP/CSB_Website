import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import './Cart.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // TODO: Get from context/state
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id || item._id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => (item.id !== id && item._id !== id)));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsSubmitting(true);
    try {
      const items = cartItems.map(item => ({
        menuItemId: item.id || item._id,
        quantity: item.quantity,
        price: item.price
      }));

      const response = await axios.post(`${API_URL}/orders`, {
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        items
      });

      alert('Order placed successfully! Order ID: ' + response.data.id);
      setCartItems([]);
      setOrderData({ customerName: '', customerEmail: '', customerPhone: '' });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-page">
      <div className="container section">
        <h1 className="page-title">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items from our menu!</p>
            <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => {
                const itemId = item.id || item._id;
                return (
                  <div key={itemId} className="cart-item">
                    <div className="cart-item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="placeholder">🍽️</div>
                      )}
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p className="category">{item.category}</p>
                      <p className="price">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(itemId, -1)}>
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(itemId, 1)}>
                          <FaPlus />
                        </button>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(itemId)}>
                        <FaTrash />
                      </button>
                    </div>
                    <div className="cart-item-total">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>₹{(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{(calculateTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <form className="order-form" onSubmit={handleSubmit}>
                <h3>Delivery Information</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={orderData.customerName}
                    onChange={(e) => setOrderData({ ...orderData, customerName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={orderData.customerEmail}
                    onChange={(e) => setOrderData({ ...orderData, customerEmail: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={orderData.customerPhone}
                    onChange={(e) => setOrderData({ ...orderData, customerPhone: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

