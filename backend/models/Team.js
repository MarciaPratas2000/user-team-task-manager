// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Team model
const TeamSchema = new mongoose.Schema({
  // Name of the team, required field
  name: {
    type: String,
    required: true,
  },
  // Array of user IDs representing the members of the team
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

// Create the Team model using the TeamSchema
const Team = mongoose.model('Team', TeamSchema);

// Export the Team model for use in other parts of the application
module.exports = Team;
