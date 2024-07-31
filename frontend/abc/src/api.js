import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://localhost:5001'; // Adjust if backend is on a different URL or port

// Create an instance of axios with default settings
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API calls

/**
 * Fetches the list of users from the backend API.
 * @returns {Promise<Array>} A promise that resolves to the array of users.
 */
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Creates a new user in the backend.
 * @param {Object} userData The user data to send to the server.
 * @returns {Promise<Object>} A promise that resolves to the created user object.
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Fetches the current user's information from the backend API.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
export const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

/**
 * Fetches the tasks for the current user from the backend API.
 * @returns {Promise<Array>} A promise that resolves to the array of tasks.
 */
export const fetchUserTasks = async () => {
  try {
    const response = await api.get('/users/me/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    throw error;
  }
};

// Team API calls

/**
 * Fetches the list of teams from the backend API.
 * @returns {Promise<Array>} A promise that resolves to the array of teams.
 */
export const fetchTeams = async () => {
  try {
    const response = await api.get('/teams');
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

/**
 * Creates a new team in the backend.
 * @param {Object} teamData The team data to send to the server.
 * @returns {Promise<Object>} A promise that resolves to the created team object.
 */
export const createTeam = async (teamData) => {
  try {
    const response = await api.post('/teams', teamData);
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

/**
 * Fetches the tasks for the current team from the backend API.
 * @returns {Promise<Array>} A promise that resolves to the array of tasks.
 */
export const fetchTeamTasks = async () => {
  try {
    const response = await api.get('/team-tasks'); // Adjust endpoint if necessary
    return response.data;
  } catch (error) {
    console.error('Error fetching team tasks:', error);
    throw error;
  }
};

/**
 * Creates a new task in the backend.
 * @param {Object} taskData The task data to send to the server.
 * @returns {Promise<Object>} A promise that resolves to the created task object.
 */
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};
/**
 * Adds a user to a team.
 * @param {string} teamId The ID of the team.
 * @param {string} userId The ID of the user to add.
 * @param {string} token The authorization token.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 */
export const addUserToTeam = async (teamId, userId, token) => {
  try {
    const response = await api.put(`/teams/${teamId}/addUser`, { userId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user to team:', error);
    throw error;
  }
};