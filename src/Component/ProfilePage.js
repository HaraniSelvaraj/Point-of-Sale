import React from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Admin </h2>
        <p>Access admin features and settings.</p>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlO7XFp0nUDd3UCKc0Q5d298T7NcZYHW87AQTIjYhRKAlI_evLtjo5CFD9idEQ_mywiYQ&usqp=CAU'></img>
       
        <Link to="/AdminLogin" className="profile-link">Admin Login</Link>
      </div>
      <div className="profile-card">
        <h2>User </h2>
        <p>Access your user account and settings.</p>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2-qY0uuj4fMrPbKQ2XOPoBEwW7U-2ewUqmxQ7xuHMXRRPu5TBxHi59ol6MpoKsH-XROA&usqp=CAU'></img>
        <Link to="/Login" className="profile-link">User Login</Link>
      </div>
    </div>
  );
};

export default ProfilePage;
