import React, { useState, useEffect } from 'react';
import { fetchTeams, fetchTeamTasks, addUserToTeam } from '../api'; // Import the specific functions

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [message, setMessage] = useState('');
  const [teamLoading, setTeamLoading] = useState(false);

  useEffect(() => {
    const loadTeams = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetchTeams(token); // Pass token as argument
        setTeams(response);
      } catch (err) {
        setError('Error loading teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      const loadTasks = async () => {
        setTeamLoading(true);
        const token = localStorage.getItem('token');
        try {
          const response = await fetchTeamTasks(token); // Fetch tasks for current team
          setTasks(response);
        } catch (err) {
          setError('Error loading team tasks');
        } finally {
          setTeamLoading(false);
        }
      };

      loadTasks();
    }
  }, [selectedTeam]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await addUserToTeam(selectedTeam, newUserId, token);
      setMessage('User added to team successfully');
      // Optionally, reload team tasks or update state here
      if (selectedTeam) {
        const response = await fetchTeamTasks(token);
        setTasks(response);
      }
    } catch (err) {
      setMessage('Error adding user to team');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (teamLoading) return <div>Loading team tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Teams</h1>
      <form onSubmit={handleAddUser}>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          required
        >
          <option value="">Select Team</option>
          {teams.map(team => (
            <option key={team._id} value={team._id}>{team.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)}
          placeholder="User ID"
          required
        />
        <button type="submit">Add User to Team</button>
      </form>
      {message && <div className="message">{message}</div>}
      <h2>Team Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.description}</strong>
            <p>Assigned to: {task.user ? `${task.user.name} (${task.user.email})` : 'Unassigned'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamPage;
