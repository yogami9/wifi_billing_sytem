const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const saltRounds = 10;
const jwtSecret = 'your_jwt_secret';  // Ideally, store this in environment variables

// Registration
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user!' });
    }
};

// Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid username or password!' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user!' });
    }
};



const SECRET_KEY = 'your-secret-key'; // Replace with your secret key

// Handle admin login
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the admin user
        const admin = await User.findOne({ username, role: 'admin' });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create a token
        const token = jwt.sign({ id: admin._id, role: admin.role }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// backend/controllers/authController.js

//const logout = (req, res) => {
    // Destroy the session
//    req.session.destroy(err => {
//      if (err) {
//        console.error('Error destroying session:', err);
//        return res.status(500).json({ message: 'Failed to log out' });
//      }
      
      // Optionally clear any cookies (if using them for session management)
//      res.clearCookie('connect.sid', { path: '/' });
      
      // Send a response to indicate successful logout
//      res.status(200).json({ message: 'Logged out successfully' });
//    });
//  };
  
//  module.exports = {
//    logout
//  };
  