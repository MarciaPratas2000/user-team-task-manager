const express = require('express');
const { getUser, updateUser, deleteUser, getCurrentUser } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get user details by ID
router.get('/:id', auth, getUser);

// Route to update user details by ID
router.put('/:id', auth, updateUser);

// Route to delete a user by ID
router.delete('/:id', auth, deleteUser);

// Route to get the current user details
router.get('/me', auth, getCurrentUser);


module.exports = router;
