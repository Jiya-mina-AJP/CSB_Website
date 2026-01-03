import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import supabase from '../config/supabase';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../context/CartContext';
import { toast } from '../components/ui/toaster';

import API_URL from '../config';

const Cart = () => {
  const { cart: cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  const [orderData, setOrderData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [useWallet, setUseWallet] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        // Fetch wallet balance (Using maybeSingle to avoid 406 if no row exists)
        const { data: wallet, error } = await supabase
          .from('user_wallets')
          .select('balance')
          .eq('user_id', user.id)
          .maybeSingle();

        if (wallet) {
          setWalletBalance(wallet.balance);
        } else {
          // If no wallet exists, create one (backfill)
          // or just set balance to 0
          setWalletBalance(0);
        }
      }
    };
    checkUser();
  }, []);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error || !data) throw new Error('Invalid or expired coupon');

      // Validate constraints
      const subtotal = getCartTotal();
      if (data.min_order_value && subtotal < data.min_order_value) {
        throw new Error(`Minimum order value is ₹${data.min_order_value}`);
      }

      // Check Global Usage Limit
      if (data.max_uses && data.current_uses >= data.max_uses) {
        throw new Error('This coupon has reached its maximum usage limit');
      }

      // Check Per-User Usage Limit (assuming 1 use per user for now)
      if (user) {
        const { count, error: usageError } = await supabase
          .from('coupon_usages')
          .select('*', { count: 'exact', head: true })
          .eq('coupon_id', data.id)
          .eq('user_id', user.id);

        if (usageError) console.error('Usage check error:', usageError);

        if (count > 0) {
          throw new Error('You have already used this coupon');
        }
      }

      setAppliedCoupon(data);
      toast.success('Coupon applied successfully!');
    } catch (error) {
      console.error('Coupon error:', error);
      toast.error(error.message);
      setAppliedCoupon(null);
    }
  };

  const calculateFinalTotal = () => {
    let total = getCartTotal();
    const subtotal = total;
    let discountAmount = 0;
    let cashbackMessage = '';

    // 1. Apply Coupon Discount (if type is percentage or flat)
    if (appliedCoupon) {
      if (appliedCoupon.discount_type === 'flat') {
        discountAmount = appliedCoupon.value;
      } else if (appliedCoupon.discount_type === 'percentage') {
        discountAmount = (total * appliedCoupon.value) / 100;
        if (appliedCoupon.max_discount_amount) {
          discountAmount = Math.min(discountAmount, appliedCoupon.max_discount_amount);
        }
      } else if (appliedCoupon.discount_type === 'cashback') {
        cashbackMessage = `You will earn ₹${appliedCoupon.value} cashback!`;
      }
    }

    total = total - discountAmount;

    // 2. Add Tax
    const tax = subtotal * 0.1;
    total = total + tax;

    // 3. Subtract Wallet Balance (if enabled)
    let walletUsed = 0;
    if (useWallet && walletBalance > 0) {
      walletUsed = Math.min(walletBalance, total);
      total = total - walletUsed;
    }

    return { total, discountAmount, walletUsed, tax, cashbackMessage };
  };

  const { total: finalTotal, discountAmount, walletUsed, tax, cashbackMessage } = calculateFinalTotal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    if (!user) {
      toast.error('Please log in to place an order');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const items = cartItems.map(item => ({
        menuItemId: item.id || item._id, // Keep both for compatibility
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      // Calculate totals again to be safe
      const { total: finalTotal, discountAmount, walletUsed } = calculateFinalTotal();

      // 1. Insert Order
      const { data: createdOrder, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          customer_name: orderData.customerName,
          customer_email: orderData.customerEmail,
          customer_phone: orderData.customerPhone,
          items: items,
          total_amount: finalTotal,
          discount_amount: discountAmount,
          status: 'Waiting for Approval' // Default status
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Record Coupon Usage (if applicable)
      if (appliedCoupon && createdOrder) {
        await supabase.from('coupon_usages').insert([{
          coupon_id: appliedCoupon.id,
          user_id: user.id,
          order_id: createdOrder.id
        }]);

        // Decrement coupon uses if needed (optional logic if you want strict counting)
        // await supabase.rpc('decrement_coupon_uses', { coupon_id: appliedCoupon.id });

        // 3. Increment Coupon Global Usage Count
        await supabase.rpc('increment_coupon_uses', { coupon_id: appliedCoupon.id });
      }

      // 3. Deduct Wallet Balance (if used)
      if (walletUsed > 0) {
        const newBalance = walletBalance - walletUsed;
        const { error: walletError } = await supabase
          .from('user_wallets')
          .update({ balance: newBalance })
          .eq('user_id', user.id);

        if (walletError) {
          console.error('Wallet update failed', walletError);
          toast.warning('Order placed but wallet update failed. Please contact support.');
        } else {
          // Log transaction
          await supabase.from('wallet_transactions').insert([{
            user_id: user.id,
            amount: -walletUsed,
            description: `Order #${createdOrder.id.slice(0, 8)} Payment`
          }]);
        }
      }

      toast.success('Order placed successfully!', {
        description: `Order ID: ${createdOrder.id}`
      });
      clearCart();

      // Reset State
      setOrderData({ customerName: '', customerEmail: '', customerPhone: '' });
      setAppliedCoupon(null);
      setCouponCode('');

    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order: ' + error.message);
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
                        <button onClick={() => updateQuantity(itemId, item.quantity - 1)}>
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(itemId, item.quantity + 1)}>
                          <FaPlus />
                        </button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(itemId)}>
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
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                {appliedCoupon && appliedCoupon.discount_type !== 'cashback' && (
                  <div className="summary-row discount">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {walletUsed > 0 && (
                  <div className="summary-row wallet">
                    <span>Wallet Used</span>
                    <span>-₹{walletUsed.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-row total">
                  <span>Total Payable</span>
                  <span>₹{Math.max(0, finalTotal).toFixed(2)}</span>
                </div>
                {cashbackMessage && <p className="cashback-msg">{cashbackMessage}</p>}
              </div>

              {user && (
                <div className="coupon-wallet-section">
                  <div className="coupon-input-group">
                    <input
                      placeholder="Enter Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="button" onClick={applyCoupon} className="btn-apply">Apply</button>
                  </div>
                  {appliedCoupon && (
                    <div className="applied-coupon-tag">
                      ✅ {appliedCoupon.code} applied
                      <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="remove-coupon">✖</button>
                    </div>
                  )}

                  <div className="wallet-toggle">
                    <label>
                      <input
                        type="checkbox"
                        checked={useWallet}
                        onChange={(e) => setUseWallet(e.target.checked)}
                        disabled={walletBalance <= 0}
                      />
                      Use Wallet Balance (Available: ₹{walletBalance})
                    </label>
                  </div>
                </div>
              )}

              {user ? (
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
              ) : (
                <div className="login-prompt">
                  <h3>Almost there!</h3>
                  <p>Please log in to place your order.</p>
                  <Link to="/login" className="btn btn-primary btn-block">Log in to Order</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default Cart;
