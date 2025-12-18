import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <div className="container">
          <h1>About CSB</h1>
        </div>
      </div>

      <div className="container section">
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Welcome to CSB (Chai Sutta Bar), where every cup of chai tells a story. We started with a simple mission:
              to create a space where people can enjoy authentic Indian chai, delicious food, and great company.
            </p>
            <p>
              Located at IIT Patna Main Gate, we've been committed to serving the finest quality chai, coffee, and snacks,
              prepared fresh daily with care and traditional recipes. Our cozy atmosphere makes us the perfect
              spot for students, faculty, and visitors to relax, study, or catch up with friends.
            </p>
            <p>
              At CSB, we believe that great chai brings people together. Whether you're starting
              your day with a morning masala chai or enjoying an evening cold coffee, we're here to
              make your experience memorable with authentic flavors and warm hospitality.
            </p>
          </div>

          <div className="about-image">
            <div className="image-placeholder">
              <span>☕</span>
            </div>
          </div>
        </div>

        <div className="values">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We're committed to eco-friendly practices and supporting sustainable farming.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Quality</h3>
              <p>Every ingredient is carefully selected to ensure the best taste and freshness.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>We're proud to be part of the local community and support local businesses.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Excellence</h3>
              <p>We strive for excellence in every cup we serve and every interaction we have.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;



