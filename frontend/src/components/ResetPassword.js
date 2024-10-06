import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css'; // Import the CSS file

const ResetPassword = () => {
    const { userId } = useParams(); // Get userId from the URL
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(''); // For more specific error messages

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
                userId,
                newPassword,
            });
            setMessage(response.data.message);
            setError(''); // Clear any previous error
        } catch (error) {
            // If there is an error response from the server, display that
            setError(error.response?.data?.message || 'Error updating password');
            setMessage(''); // Clear success message
        }
    };

    return (
        <div className='rest-password-container'>
            <h2 className='reset-password-title'>Reset Password</h2>
            <form onSubmit={handleResetPassword} className='reset-password-form'>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className='reset-button'>Reset Password</button>
            </form>
            {message && <p className='reset-password-message'>{message}</p>}
            {error && <p className='reset-password-message'>{error}</p>}
        </div>
    );
};

export default ResetPassword;
