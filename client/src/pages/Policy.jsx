import React from 'react';
import Layout from "../components/Layout/Layout";
import './Policy.css';

const Policy = () => {
  return (
    <Layout title="Privacy & Policy | Ecommerce App">
      <div className="policy-container">
        <div className="policy-content">
          <h1>Privacy Policy</h1>
          <p className="intro-text">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>

          <div className="policy-section">
            <h2>1. Information We Collect</h2>
            <p>We may collect personal information such as your name, email address, contact details, and payment information when you use our services.</p>
          </div>

          <div className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use your data to provide, improve, and personalize our services, process transactions, and communicate with you.</p>
          </div>

          <div className="policy-section">
            <h2>3. Data Protection</h2>
            <p>We implement strong security measures to protect your data from unauthorized access, misuse, or disclosure.</p>
          </div>

          <div className="policy-section">
            <h2>4. Cookies</h2>
            <p>We use cookies to enhance your browsing experience and analyze site traffic. You can manage cookie settings in your browser.</p>
          </div>

          <div className="policy-section">
            <h2>5. Third-Party Sharing</h2>
            <p>We do not sell or trade your personal information. We may share data with trusted third parties for order processing and analytics, under strict confidentiality.</p>
          </div>

          <div className="policy-section">
            <h2>6. Your Rights</h2>
            <p>You can request access to, correction of, or deletion of your personal information at any time by contacting our support team.</p>
          </div>

          <div className="policy-footer">
            <p>Last Updated: July 9, 2025</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
