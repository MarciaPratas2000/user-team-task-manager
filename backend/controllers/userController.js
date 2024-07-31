// Import the User model for interacting with user data
const User = require('../models/User');

// Controller function to get user details by ID
exports.getUser = async (req, res) => {
  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Controller function to update user details by ID
exports.updateUser = async (req, res) => {
  try {
    // Find the user by ID and update with provided data
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Controller function to delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    // Find and delete the user by ID
    await User.findByIdAndDelete(req.params.id);
    res.send('User deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

 exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

