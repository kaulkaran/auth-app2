// src/components/RegisterForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService'; // Adjust the path as needed
import './RegisterForm.css'; // Import the CSS file

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await authService.register({ email, password });
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
        alert('Registration failed. Please try again.'); // Show an alert or error message
        }
    };

    return (
        <div className="register-container">
             <h2>Register</h2>
        <form onSubmit={handleRegister} className='register-form'>
           
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
            <button type="submit" className='register-button'>Register</button>
            <Link to="/login" className="link">Already have an account? Login</Link>
        </form>
        </div>
    );
};

export default RegisterForm;
