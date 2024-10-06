// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService'; // Adjust the path as needed
import { useAuth } from './AuthContext';
import './LoginForm.css'; // Import the CSS file

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

 const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await authService.login({ email, password });
        console.log('Login response:', response); // Log the response to see its structure
        login(response.token); // Save token
        navigate('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
        console.error('Login error:', error);
    }
};


    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className='login-form'>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='input-field'
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='input-field'
            />
            <button type="submit" className='login-button'>Login</button>
            <Link to="/reset-password-request" className='link'>Forgot Password?</Link> {/* Link for forgotten password */}
            <br />
            <Link to="/register" className='link'>Register</Link> {/* Link to the register page */}
        </form>
        </div>
    );
};

export default LoginForm;
