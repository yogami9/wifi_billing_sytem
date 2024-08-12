require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController');
const planRoutes = require('./routes/planRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
//const session = require('express-session');

const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve static files from the frontend directory

// Middleware and other setup
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: true }));

// Routes
app.use('/api', authRoutes); // Assuming authRoutes are API-specific
app.use('/api/users', userController); // Assuming userController is for user-related API routes
app.use('/plans', planRoutes);
app.use('/', paymentRoutes);

// Database connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
