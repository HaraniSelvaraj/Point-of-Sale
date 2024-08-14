import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardPanel.css';

const DashboardPanel = ({ isOpen, onClose }) => {
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
          <h2>Stock</h2>
          <p>$123</p>
          <Link to="/InventoryManagement" className="product-link">View Stocks</Link>
        </div>
        <div className="widget">
          <h2>Sales</h2>
          <p>$12,345</p>
          <Link to="/SalesReporting" className="product-link">View Sales</Link>
        </div>
        
        <div className="widget">
          <h2>Customers</h2>
          <p>$1000</p>
          <Link to="/Customeradmin" className="product-link">View Customers</Link>
        </div>
        
       
      </div>
    </div>
  );
}

export default DashboardPanel;
