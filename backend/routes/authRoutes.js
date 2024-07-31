const express = require('express');
const { registerUser, loginUser, fetchCurrentUser } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Route to fetch current user details
router.get('/current', auth, fetchCurrentUser);

module.exports = router;

