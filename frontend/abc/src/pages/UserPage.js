import React, { useEffect, useState } from 'react';
import { fetchUserTasks, createTask, createTeam } from '../api'; // Import the specific functions

const UserPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newTask, setNewTask] = useState('');
  const [taskError, setTaskError] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamError, setTeamError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetchUserTasks(token); // Pass token as argument
        setTasks(response);
      } catch (err) {
        setError('Error loading tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await createTask({ description: newTask }, token);
      setNewTask(''); // Clear the input field
      setTaskError(''); // Clear any previous errors
      // Fetch updated tasks
      const updatedTasks = await fetchUserTasks(token);
      setTasks(updatedTasks);
    } catch (err) {
      setTaskError('Error creating task');
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await createTeam({ name: teamName }, token);
      setTeamName(''); // Clear the input field
      setTeamError(''); // Clear any previous errors
      // Optionally, fetch or handle teams here
    } catch (err) {
      setTeamError('Error creating team');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Tasks</h1>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task description"
          required
        />
        <button type="submit">Add Task</button>
        {taskError && <div className="error">{taskError}</div>}
      </form>
      <form onSubmit={handleTeamSubmit}>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="New team name"
          required
        />
        <button type="submit">Create Team</button>
        {teamError && <div className="error">{teamError}</div>}
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
