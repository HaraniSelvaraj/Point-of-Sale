import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Signup.css';
import file from '../assets/file.jpg';
import background from '../assets/background.mp4'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8084/reg', {
        username,
        mobileNumber,
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess('Signup successful!');
        // Redirect after 2 seconds
      } else {
        setError(response.data || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
    }
  };

  return (
    <div>
      <video autoPlay muted loop className="background-video">
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="signup-container">
        <div className="card">
          <img src={file} alt="Logo" className="logo" />
          <h2 style={{ marginBottom: '9px' }}>Sign Up</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <form onSubmit={handleSignup}>
            <div className="input">
              <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                <AccountCircle sx={{ color: 'black', mr: 1, my: 0.5 }} />
                <TextField
                  id="username"
                  label="UserName"
                  variant="standard"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                <CallIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
                <TextField
                  id="mobile-number"
                  label="Mobile Number"
                  variant="standard"
                  fullWidth
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                <EmailIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                <VisibilityOff sx={{ color: 'black', mr: 1, my: 0.5 }} />
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p>
            Already have an account? <h3><Link to="/Login">Login here</Link></h3>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
