// Import express for routing
const express = require('express');
// Import team controller functions
const { createTeam, getTeam, addUserToTeam, removeUserFromTeam } = require('../controllers/teamController');
// Import authentication middleware to protect routes
const auth = require('../middlewares/authMiddleware');

// Create a router object
const router = express.Router();

// Define route to create a new team
router.post('/', auth, createTeam);
// Define route to get team details by ID
router.get('/:id', auth, getTeam);
// Define route to add a user to a team
router.put('/:id/addUser', auth, addUserToTeam);
// Define route to remove a user from a team
router.put('/:id/removeUser', auth, removeUserFromTeam);

// Export the router for use in other parts of the application
module.exports = router;
