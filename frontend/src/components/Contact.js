import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    axios.post(`${apiUrl}/contact/add`, formData)
      .then(res => {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setLoading(false);

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      })
      .catch(err => {
        setError('Failed to send message. Please try again.');
        setLoading(false);
        console.error("Error:", err);
      });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Let's connect and create something amazing together</p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>shivendra16062005@gmail.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3>Phone</h3>
              <p>9770155849</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>Jabalpur</p>
            </div>

            <div className="social-links">
              <a href="#" className="social-btn">GitHub</a>
              <a href="#" className="social-btn">LinkedIn</a>
              <a href="#" className="social-btn">Twitter</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted && (
              <div className="success-message">
                ✓ Thank you for your message! I'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="error-message">
                ✗ {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
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
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Message subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
