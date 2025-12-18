import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0); // TODO: Get from context/state

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo">
            <span>☕</span> CSB
          </Link>
          
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/cart" className="cart-link" onClick={() => setIsOpen(false)}>
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
          
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



