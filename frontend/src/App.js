import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
 // Import the Navbar
import { AuthProvider, useAuth } from './components/AuthContext';

import NotFound from './pages/NotFound';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/Dashboard';
import ResetPasswordRequest from './components/ResetPasswordRequest';
import ResetPassword from './components/ResetPassword'; // Create this component for resetting the password




const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
};


const App = () => {
    
    return (
        <AuthProvider>
        <Router>
            <div>
         
                <Routes>
                    {/* Route for the home page */}
                    <Route path="/" element={<LoginForm />} />


                    {/* Login and Register Routes */}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />

                    {/* Password Reset Routes */}
                    <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
                    <Route path="/reset-password/:userId" element={<ResetPassword />} />

                    {/* Protected route for the dashboard */}
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

                    {/* Route for handling 404 Not Found */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
        </AuthProvider>
    );
};

export default App;
