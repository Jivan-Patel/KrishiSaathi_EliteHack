const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/User');

// Load seed data for demo/fallback
let seedUsers = [];
try {
    seedUsers = require(path.join(__dirname, '../../usersData.json'));
} catch (e) {
    console.log('usersData.json not found, using MongoDB only');
}

// GET /api/users?email=&password=
router.get('/', async (req, res) => {
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Try MongoDB first
        let user = await User.findOne({ email: email.toLowerCase(), password });

        if (!user) {
            // Fallback: check seed data
            const seedUser = seedUsers.find(
                u => u.email === email.toLowerCase() && u.password === password
            );
            if (!seedUser) {
                return res.status(404).json({ message: 'Invalid email or password' });
            }
            return res.json({
                _id: seedUser._id,
                username: seedUser.username,
                email: seedUser.email,
                role: seedUser.role,
            });
        }

        return res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        // MongoDB not available – fall back to seed data
        const seedUser = seedUsers.find(
            u => u.email === email.toLowerCase() && u.password === password
        );
        if (!seedUser) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        return res.json({
            _id: seedUser._id,
            username: seedUser.username,
            email: seedUser.email,
            role: seedUser.role,
        });
    }
});

// POST /api/users/signup
router.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password,
            role
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            message: 'User registered successfully'
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error during signup. Ensure MongoDB is running.' });
    }
});

module.exports = router;
