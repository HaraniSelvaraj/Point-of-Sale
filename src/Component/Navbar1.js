import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Avatar } from '@mui/material';
import './Navbar1.css';

const Navbar1 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">
            <Link to="/">Seller Haus</Link>
          </div>
        </div>
        <div className="navbar-center">
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/ItemPage">Product</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Contactus">Contact</Link></li>
            <li className="profile-menu">
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt="Profile Picture" src="https://i.pinimg.com/474x/a3/f4/bc/a3f4bc0dc7d1b030b782c62d7a4781cf.jpg" />
              </IconButton>
              <div className={`dropdown ${menuOpen ? 'show' : ''}`}>
                <li><Link to='/AdminLogin'>AdminLogin</Link></li>
                <li><Link to='/Login'>UserLogin</Link></li>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar1;
