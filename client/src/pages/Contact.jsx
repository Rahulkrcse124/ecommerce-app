import React from 'react';
import Layout from '../components/Layout/Layout';
import './Contact.css';

const Contact = () => {
  return (
    <Layout title="Contact Us | Ecommerce App">
      <div className="contact-container">
        <div className="contact-content">
          <h1>Contact Us</h1>
          <p className="contact-subtitle">
            We'd love to hear from you! Whether you have a question about products, pricing, or anything else — our team is ready to help.
          </p>

          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" rows="5" placeholder="Write your message..." required></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
