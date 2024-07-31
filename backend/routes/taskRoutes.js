const express = require('express');
const { getTasksForCurrentUser, getTasksForCurrentTeam } = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get tasks for the current user
router.get('/me/tasks', auth, getTasksForCurrentUser);

// Route to get tasks for the current team
router.get('/team-tasks', auth, getTasksForCurrentTeam);

module.exports = router;
