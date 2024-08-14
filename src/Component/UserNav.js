import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import UserDash from './UserDash';
import './LandingPage.css';

const Navbar = () => {
  const [isDashboardOpen, setDashboardOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDashboard = () => {
    setDashboardOpen(!isDashboardOpen);
  };

  const handleMenuOpen = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-icon" onClick={toggleDashboard}>
            <DashboardIcon sx={{ color: 'white', fontSize: 30 }} className="dashboard-icon" />
          </div>
        </div>
        <div className="navbar-center-adjusted">
          <div className="navbar-logo">
            <Link to="/">POS</Link>
          </div>
          <ul className="navbar-links-adjusted">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/ItemPage">Product</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Contactus">Contact</Link></li>
          </ul>
          <ul>
            <li className="profile-menu">
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt="Profile Picture" src="https://i.pinimg.com/474x/a3/f4/bc/a3f4bc0dc7d1b030b782c62d7a4781cf.jpg" />
              </IconButton>
              <div className={`dropdown ${menuOpen ? 'show' : ''}`}>
                <ul className="dropdown-content">
                  <li><Link to='/AdminLogin'>AdminLogin</Link></li>
                  <li><Link to='/Login'>UserLogin</Link></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <UserDash isOpen={isDashboardOpen} onClose={toggleDashboard} />
    </>
  );
};

export default Navbar;
