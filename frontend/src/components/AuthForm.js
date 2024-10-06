import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Adjust the path according to your folder structure

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(true); // Track whether it's a register or login
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await authService.register({ email, password });
                navigate('/login'); // Redirect to login page after successful registration
            } else {
                const response = await authService.login({ email, password });
                localStorage.setItem('token', response.data.token); // Save token in local storage
                navigate('/dashboard'); // Redirect to dashboard after login
            }
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                Switch to {isRegistering ? 'Login' : 'Register'}
            </button>
        </form>
    );
};

export default AuthForm;
