// Import the Team and User models for interacting with team and user data
const Team = require('../models/Team');
const User = require('../models/User');

// Controller function to create a new team
exports.createTeam = async (req, res) => {
  const { name, members } = req.body;
  try {
    // Create a new team instance with provided data
    const team = new Team({ name, members });
    // Save the team to the database
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Controller function to get team details by ID
exports.getTeam = async (req, res) => {
  try {
    // Find the team by ID and populate the members field with user data
    const team = await Team.findById(req.params.id).populate('members');
    res.json(team);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Controller function to add a user to a team
exports.addUserToTeam = async (req, res) => {
  const { userId } = req.body;
  try {
    // Find the team by ID and add the user ID to the members array
    const team = await Team.findById(req.params.id);
    team.members.push(userId);
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Controller function to remove a user from a team
exports.removeUserFromTeam = async (req, res) => {
  const { userId } = req.body;
  try {
    // Find the team by ID and remove the user ID from the members array
    const team = await Team.findById(req.params.id);
    team.members = team.members.filter(member => member.toString() !== userId);
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
