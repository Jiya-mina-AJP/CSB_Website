import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      <div className="container section">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Have a question or want to make a reservation? Feel free to reach out to us.
              We're here to help!
            </p>

            <div className="info-items">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h3>Address</h3>
                  <p>IIT Patna Main Gate<br />1801103</p>
                </div>
              </div>

              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <h3>Phone</h3>
                  <p>7991107492<br />8877293157</p>
                </div>
              </div>

              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h3>Instagram</h3>
                  <p>@CSBIITPATNA</p>
                </div>
              </div>

              <div className="info-item">
                <FaClock className="info-icon" />
                <div>
                  <h3>Hours</h3>
                  <p>Mon - Fri: 7:00 AM - 8:00 PM<br />
                  Sat - Sun: 8:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;



