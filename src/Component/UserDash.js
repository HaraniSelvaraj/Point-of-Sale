import React from 'react';
import { Link } from 'react-router-dom';
import './UserDash.css';

const UserDash = ({ isOpen, onClose }) => {
  return (
    <div className={`dashboard-panel ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <h1>DASHBOARD</h1>
      <div className="dashboard-content">
      <div className="widget">
          <h2>Products</h2>
          <p>$12300</p>
          <Link to="/ItemPage" className="product-link">View Products</Link>
        </div>
        <div className="widget">
          <h2>Customer</h2>
          <p>$12300</p>
          <Link to="/CustomerManagement" className="product-link">Add Details</Link>
        </div>    
      </div>
    </div>
  );
}

export default UserDash;
