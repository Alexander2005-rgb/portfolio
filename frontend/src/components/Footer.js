import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Portfolio</h3>
            <p>Creating modern, interactive web experiences with cutting-edge technology.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Me</h3>
            <div className="footer-social">
              <a href="https://github.com/Alexander2005-rgb" className="footer-social-link">GitHub</a>
              <a href="https://www.linkedin.com/feed/" className="footer-social-link">LinkedIn</a>
              <a href="#" className="footer-social-link">Twitter</a>
              <a href="#" className="footer-social-link">Portfolio</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Your Name. All rights reserved.</p>
          <p>Built with React, Node.js, and MongoDB</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
