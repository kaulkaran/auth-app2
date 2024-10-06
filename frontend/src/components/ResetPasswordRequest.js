import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Adjust the path according to your folder structure
import './ResetPasswordRequest.css'; // Import the CSS file

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('');
    const [linkSent, setLinkSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.requestPasswordReset(email); // Call to your password reset function
            alert('A password reset link has been sent to your email.');
            setLinkSent(true); // Set linkSent to true to show the button
        } catch (error) {
            console.error("Error sending password reset request:", error);
            alert('Failed to send reset link. Please try again.');
        }
    };

    return (
        <div className='reset-password-container'>
            <h2>Request Password Reset</h2>
            <form onSubmit={handleSubmit} className='reset-request-form'>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className='reset-button'>Send Reset Link</button>
            </form>

            {/* Show button to go to the password reset page only if linkSent is true */}
            {linkSent && (
                <button className='go-to-login-button' onClick={() => navigate('/login')}>
                    Go to login
                </button>
            )}
        </div>
    );
};

export default ResetPasswordRequest;
