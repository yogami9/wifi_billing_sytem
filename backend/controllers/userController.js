const express = require('express');
const router = express.Router();

// Mock data for demonstration purposes
const userData = {
    username: 'john_doe',
    email: 'john.doe@example.com',
};

const dataPlans = [
    { name: 'Basic Plan', details: '1GB per month' },
    { name: 'Pro Plan', details: '5GB per month' },
];

const usageStatistics = {
    usage: '3.2GB',
};

// Route to get user info
router.get('/api/user/info', (req, res) => {
    res.json(userData);
});

// Route to get data plans
router.get('/api/user/data-plans', (req, res) => {
    res.json({ plans: dataPlans });
});

// Route to get usage statistics
router.get('/api/user/usage', (req, res) => {
    res.json(usageStatistics);
});

const updateDataUsage = async (userId, dataUsed) => {
    try {
      // Fetch the user by ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      // Update data usage
      user.dataUsage += dataUsed;
  
      // Check if data usage exceeds the limit
      if (user.dataUsage > user.dataLimit) {
        user.isActive = false; // Deactivate user
        // You may want to notify the user or handle disconnection here
      }
  
      // Save changes to the database
      await user.save();
  
      return user; // Return updated user object
  
    } catch (error) {
      console.error('Error updating data usage:', error);
      throw error; // Re-throw error to be handled by caller
    }
  };



  const User = require('../models/User'); // Ensure the User model is imported

/**
 * Updates the user's data usage and deactivates the user if the limit is exceeded.
 * @param {String} userId - The ID of the user.
 * @param {Number} dataUsed - The amount of data used.
 * @returns {Object} - The updated user object.
 * @throws {Error} - Throws error if something goes wrong.
 */


module.exports = { updateDataUsage };

module.exports = router;




