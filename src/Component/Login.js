import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import './Login.css';
import file from '../assets/file.jpg';
import background from '../assets/background.mp4';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8084/login', {
                username,
                password,
            });

            if (response.status === 200) {
                navigate('/Home');
            } else {
                setError(response.data || 'Invalid username or password');
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    return (
        <div>
            <video autoPlay muted loop className="background-video">
                <source src={background} type="video/mp4" />
            </video>
            <div className="login-container">
                <div className="card">
                    <img src={file} alt="Logo" className="logo2" />
                    <h2 style={{ marginBottom: '9px' }}>User Login</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                            <div style={{ marginBottom: '20px', width: '300px' }}>
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Username"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{
                                        style: { fontWeight: 'bold', color: '#000000' },
                                    }}
                                    InputLabelProps={{
                                        style: { fontWeight: 'bold', color: '#000000' },
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px', width: '300px' }}>
                                <TextField
                                    required
                                    id="filled-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        style: { fontWeight: 'bold', color: '#000000' },
                                    }}
                                    InputLabelProps={{
                                        style: { fontWeight: 'bold', color: '#000000' },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="forgot-password-link">
                            <Link to="/forgot-password"><h4>Forgot password?</h4></Link>
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                    <div className="social-login">
                        <h3>Or Sign Up Using</h3>
                        <div className="social-buttons">
                            <a href="https://www.facebook.com/login" className="social-btn facebook">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="https://twitter.com/login" className="social-btn twitter">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://accounts.google.com/signin" className="social-btn google">
                                <FontAwesomeIcon icon={faGoogle} />
                            </a>
                        </div>
                    </div>
                    <p className="signup-link">
                        Don't have an account? <Link to="/signup"><h4>Sign Up</h4></Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
