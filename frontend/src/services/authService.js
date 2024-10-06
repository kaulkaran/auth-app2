import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your actual backend API URL




const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; // Return response data
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Registration failed' };
    }
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // Return only the data
};

     

// Function to reset password
const resetPassword = async (userId, newPassword) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, {
            userId,
            password: newPassword,
        });
        return response.data; // Return response data
    } catch (error) {
        throw error.response.data; // Handle errors by throwing them for the caller to catch
    }
};

// Function to authenticate user


const requestPasswordReset = async (email) => {
    const response = await axios.post(`${API_URL}/request-password-reset`, { email });
    return response.data;
};

// Exporting the functions to be used in components
const authService = {
    resetPassword,
    login,
    register,
    requestPasswordReset,
};

export default authService;
