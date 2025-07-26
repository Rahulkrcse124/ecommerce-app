import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="footer-container">
        <h4>All Rights Reserved &copy; 2025</h4>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/policy">Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;