import React from 'react';
import { useAuth } from '../components/AuthContext';

const Dashboard = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        // Optionally navigate to login page
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
