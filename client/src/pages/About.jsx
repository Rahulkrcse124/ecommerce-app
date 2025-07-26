import React from 'react';
import Layout from '../components/Layout/Layout';
import './About.css';

const About = () => {
  return (
    <Layout title="About Us | Ecommerce App">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Our Ecommerce Platform</h1>
          <p>
            Discover the future of shopping with our seamless, secure, and personalized ECommerce experience.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <h2>Our Achievements</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <h3>10K+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-box">
            <h3>5K+</h3>
            <p>Products Delivered</p>
          </div>
          <div className="stat-box">
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
          <div className="stat-box">
            <h3>99%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          {[
            {
              title: 'Secure Shopping',
              desc: 'Your transactions are safe with our encrypted checkout process.',
            },
            {
              title: 'Fast Delivery',
              desc: 'We ensure your products reach your doorstep quickly and safely.',
            },
            {
              title: 'Best Prices',
              desc: 'Affordable pricing with premium quality products across all categories.',
            },
            {
              title: '24/7 Support',
              desc: 'Got a query? Our customer care team is ready to help anytime.',
            },
            {
              title: 'Easy Returns',
              desc: 'Hassle-free return policy to build trust and comfort.',
            },
            {
              title: 'User Friendly',
              desc: 'Enjoy a clean, intuitive interface that works on all devices.',
            },
          ].map((item, idx) => (
            <div className="feature-box" key={idx}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Join Thousands of Happy Shoppers Today</h2>
        <p>Experience fast, secure and satisfying online shopping with us.</p>
        <a href="/" className="cta-btn">Start Shopping</a>
      </section>
    </Layout>
  );
};

export default About;

