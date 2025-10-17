import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Your SWA</h3>
            <p>Built with Azure Static Web Apps</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/features">Features</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <span className="social-placeholder">LinkedIn</span>
              <span className="social-placeholder">GitHub</span>
              <span className="social-placeholder">Twitter</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Your SWA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;