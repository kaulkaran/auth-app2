const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendEmail = require('../utils/sendEmail'); 
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');



// User registration
exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

// Password reset request
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a password reset token (optional but recommended)
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Save the reset token and expiration to the user model
        user.resetPasswordToken = resetToken; // Ensure your User model has this field
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
        await user.save();

        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Prepare the email options
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset Request',
            text: `To reset your password, click the following link: http://localhost:3000/reset-password/${user._id}`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email', error });
            }
            res.status(200).json({ message: 'Password reset email sent' });
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    const { userId, newPassword } = req.body; // Assuming you're sending userId and newPassword
    // Check if the userId is a valid MongoDB ObjectId

    console.log('Received userId:', userId);
    
    try {
        
        const user = await User.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("Received userId:", userId);


        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error("Error updating password:", error); 
        res.status(500).json({ message: 'Error updating password' });
    }
};

