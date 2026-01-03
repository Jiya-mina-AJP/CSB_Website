import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../config/supabase';
import './Home.css';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
    fetchFeaturedItems();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (profile?.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  const fetchFeaturedItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('featured', true)
        .eq('show', true)
        .limit(3);

      if (error) throw error;
      setFeaturedItems(data || []);
    } catch (error) {
      console.error('Error loading featured items:', error);
      setFeaturedItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to CSB</h1>
          <p>Chai Sutta Bar - Experience authentic chai and delicious food</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
            {isAdmin && (
              <Link to="/admin" className="btn btn-secondary">Admin Dashboard</Link>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-preview section">
        <div className="container">
          <h2 className="section-title">Why Choose CSB?</h2>
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">☕</div>
              <h3>Authentic Chai</h3>
              <p>Traditional Indian chai made with fresh ingredients and love</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍔</div>
              <h3>Delicious Food</h3>
              <p>Fresh burgers, sandwiches, maggi, and more made daily</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Cozy Atmosphere</h3>
              <p>Relax and enjoy in our comfortable space at IIT Patna</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="featured-menu section">
        <div className="container">
          <h2 className="section-title">Featured Items</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : featuredItems.length > 0 ? (
            <div className="menu-grid">
              {featuredItems.slice(0, 3).map((item) => (
                <div key={item.id || item._id} className="menu-card">
                  <div className="menu-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="placeholder-image">🍽️</div>
                    )}
                  </div>
                  <div className="menu-content">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="menu-footer">
                      <span className="price">₹{item.price.toFixed(2)}</span>
                      <button className="btn btn-secondary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-items">
              <p>No featured items available. Check back soon!</p>
            </div>
          )}
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/menu" className="btn btn-primary">View Full Menu</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

