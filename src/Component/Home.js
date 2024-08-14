import React, { useState } from 'react';
import Carousel from './Carousel.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';  
import { Link } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd'; // Import necessary components from antd
import UserNav from './UserNav.js';

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return ( 
    <div style={{height:"100vh"}}>
      <UserNav/>
      <div>
        <Carousel/>
        <h1 style={{textAlign:'center',color:'#e75450'}}>Welcome to SellerHaus</h1>
      </div>

      <div className="card-section">
        <div className="card11-container">
        <div className="card11">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVx7PxxhHL-DReYds632U60_M9Epl3m_Rx6A&s" alt="Inventory Management" className='img-size' /> 
            <p className='content'>Manage your stock and inventory effectively.</p>
            <Link to="/Inventory"><button className='span'>Inventory Management</button></Link>
          </div>
          {/* Card 2: Sales Management */}
          <div className="card11">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYw-Sqx2Ue1EkLkYOc7KhG6EK9HtXGMb_26Q&s" alt="Sales Management" className='img-size' /> 
            <p className='content'>Track and manage your sales efficiently.</p>
            <Link to="/Sales"><button className='span'>Sales Management</button></Link>
          </div>
          {/* Card 3: Customer Management */}
          <div className="card11">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB6XKDIndkgxDL2UCHjNqL4Zkr3CpP-QFUWA&s" alt="Customer Management" className='img-size' /> 
            <p className='content'>Handle customer relationships seamlessly.</p>
            <Link to="/Customer"><button className='span'>Customer Management</button></Link>
          </div>
          {/* Card 4: Reporting and Analytics */}
          <div className="card11">
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivMjk7e2qF9pmHOdgShcKK3f6D7UYsP9rvvxuFtn_tQ7o9jSAuKDkbooW_lyrXJRZyukjGbzw9-NvhkWjerHNYZ0lY3lkqdkHRjfTNvEAlaAOBEfqQQoKpR_nZEFx8xG7o3w03VBQutbgi/s1130/report+writing+2.jpg" alt="Reporting and Analytics" className='img-size' /> 
            <p className='content'>Analyze your business performance with detailed reports.</p>
            <Link to="/Reports"><button className='span'>Reporting & Analytics</button></Link>
          </div>
        </div>
        <Button type="primary" onClick={showModal} className="learn-more-btn">Learn More</Button>
      </div>
      
      <div className="newsletter">
        <h2>Stay Updated</h2>
        <Form className="newsletter-form">
          <Form.Item>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="middle" htmlType="submit">Subscribe</Button>
          </Form.Item>
        </Form>
      </div>

      {/* Modal for Learn More */}
      <Modal title="Learn More" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Here you can provide more detailed information about your POS system, including features, benefits, and how it can help potential customers.</p>
      </Modal>

      <footer className="footer" style={{marginTop:"50px"}}>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href="mailto:someone@example.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <p>&copy; 2024 SellerHaus. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
