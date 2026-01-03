import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CSB</h3>
            <p>Chai Sutta Bar - Your favorite spot for authentic chai and delicious food at IIT Patna.</p>
            <div className="social-icons">
              <a href="#!" aria-label="Facebook"><FaFacebook /></a>
              <a href="#!" aria-label="Instagram"><FaInstagram /></a>
              <a href="#!" aria-label="Twitter"><FaTwitter /></a>
              <a href="#!" aria-label="Email"><FaEnvelope /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>IIT Patna Main Gate</p>
            <p>1801103</p>
            <p>Phone: 7991107492 / 8877293157</p>
            <p>Instagram: @CSBIITPATNA</p>
          </div>

          <div className="footer-section">
            <h4>Hours</h4>
            <p>Mon - Fri: 7:00 AM - 8:00 PM</p>
            <p>Sat - Sun: 8:00 AM - 9:00 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 CSB (Chai Sutta Bar). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



