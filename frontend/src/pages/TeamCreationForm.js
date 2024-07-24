import React, { useState } from 'react';

const TeamCreationForm = ({ onCreateTeam, onCancel, existingUsers }) => {
  const [teamName, setTeamName] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [newUserId, setNewUserId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleAddUser = () => {
    if (newUserId.trim() && !userIds.includes(newUserId.trim())) {
      setUserIds([...userIds, newUserId.trim()]);
      setNewUserId('');
    }
  };

  const handleRemoveUser = (id) => {
    setUserIds(userIds.filter(userId => userId !== id));
  };

  const handleAddTask = () => {
    if (newTask.trim() && selectedUserId.trim()) {
      setTasks([...tasks, { task: newTask.trim(), assignedTo: selectedUserId.trim() }]);
      setNewTask('');
      setSelectedUserId('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      onCreateTeam(teamName, userIds, tasks);
      setTeamName('');
      setUserIds([]);
      setTasks([]);
    }
  };

  return (
    <div className="team-creation-form">
      <h4 className="text-center mb-3">Create a New Team</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="teamName" className="form-label">Team Name</label>
          <input
            type="text"
            className="form-control"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="userIds" className="form-label">Add Users by ID</label>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control me-2"
              id="userIds"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              placeholder="User ID"
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddUser}
            >
              Add User
            </button>
          </div>
          <ul className="list-group mt-2">
            {userIds.map(id => (
              <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>User ID: {id}</span>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveUser(id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <label htmlFor="taskInput" className="form-label">Suggest Tasks</label>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control me-2"
              id="taskInput"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Task Description"
            />
            <select
              className="form-select me-2"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select User</option>
              {userIds.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </div>
          <ul className="list-group mt-2">
            {tasks.map((task, index) => (
              <li key={index} className="list-group-item">
                <span>Task: {task.task} (Assigned to: {task.assignedTo})</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary me-2">Create Team</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TeamCreationForm;
