
const Task = require('../models/Task'); // Import the Task model

/**
 * Get tasks for the current user.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getTasksForCurrentUser = async (req, res) => {
  try {
    // Get the current user ID from the authenticated user
    const userId = req.user.id; // Assumes the auth middleware sets req.user

    // Fetch tasks for the current user
    const tasks = await Task.find({ user: userId }).populate('team', 'name'); // Populate team field if needed

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks for user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getTasksForCurrentUser,
};

const Task = require('../models/Task'); // Import the Task model

/**
 * Get tasks for the current team.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getTasksForCurrentTeam = async (req, res) => {
  try {
    // Get the current team ID from the authenticated user
    const teamId = req.user.teamId; // Assumes the auth middleware sets req.user.teamId

    // Fetch tasks for the current team
    const tasks = await Task.find({ team: teamId }).populate('user', 'name'); // Populate user field if needed

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks for team:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getTasksForCurrentTeam,
};
