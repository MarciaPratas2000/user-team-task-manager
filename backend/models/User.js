// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Import bcrypt for hashing passwords
const bcrypt = require('bcryptjs');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  // Name of the user, required field
  name: {
    type: String,
    required: true,
  },
  // Email of the user, must be unique and required
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Password for the user, required field
  password: {
    type: String,
    required: true,
  },
});

// Middleware to hash the user's password before saving to the database
UserSchema.pre('save', async function(next) {
  // Check if the password has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }
  // Generate a salt to hash the password
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
  // Proceed with saving the user
  next();
});

// Create the User model using the UserSchema
const User = mongoose.model('User', UserSchema);

// Export the User model for use in other parts of the application
module.exports = User;
