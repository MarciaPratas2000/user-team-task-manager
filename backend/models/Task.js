// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Task model
const TaskSchema = new mongoose.Schema({
  // Reference to the User who owns the task
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Optional reference to the Team associated with the task
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  // Description of the task, required field
  description: {
    type: String,
    required: true,
  },
  // Boolean indicating whether the task is completed
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create the Task model using the TaskSchema
const Task = mongoose.model('Task', TaskSchema);

// Export the Task model for use in other parts of the application
module.exports = Task;
