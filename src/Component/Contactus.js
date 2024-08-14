import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Contactus.css';

const ContactUs = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/LandingPage');
  };

  return (
    <div className="main-container">
      <div className="contact-us-section">
        <div className="contact-form-container">
          <div className="contact-image">
            <img src="https://media.istockphoto.com/id/184346942/photo/contact-us.jpg?s=612x612&w=0&k=20&c=41eyRn9A4nuqH-R7wFlbMjXXn8cpl3v1ymdJPSmCLrI=" alt="Contact Us" />
          </div>
          <div className="contact-form-info">
            <form className="contact-form">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" required></textarea>

              <button type="submit">Send Message</button>
            </form>

            <div className="contact-info">
              <h2>Contact Information</h2>
              <h2>Email: support@possystem.com</h2>
              <h2>Phone: +1 234 567 890</h2>
              <h2>Address: 123 POS Street, Business City, BC 12345</h2>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default ContactUs;
