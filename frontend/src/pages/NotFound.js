import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

const NotFound = () => {
    const navigate = useNavigate(); // Updated hook

    const handleGoHome = () => {
        navigate('/'); // Use navigate instead of history.push
    };

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <button onClick={handleGoHome}>Go to Home</button>
        </div>
    );
};

export default NotFound;
