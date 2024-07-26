import React, { useState } from 'react';

const TeamCreationForm = ({ onCreateTeam, onCancel }) => {
  const [teamName, setTeamName] = useState('');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [task, setTask] = useState('');

  const handleAddUser = () => {
    if (userId.trim() && task.trim()) {
      setUsers([...users, { userId, tasks: [task] }]);
      setUserId('');
      setTask('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      onCreateTeam(teamName, users);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Team Name</label>
        <input
          type="text"
          className="form-control"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">User ID</label>
        <input
          type="text"
          className="form-control"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Task</label>
        <input
          type="text"
          className="form-control"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={handleAddUser}
      >
        Add User and Task
      </button>
      <button type="submit" className="btn btn-primary me-2">
        Create Team
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TeamCreationForm;
