import React, { useState } from 'react';

const TeamCreationForm = ({ onCreateTeam, onCancel }) => {
  const [teamName, setTeamName] = useState('');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [taskTitle, setTaskTitle] = useState(''); // Alterado para taskTitle
  const [userAdded, setUserAdded] = useState(false); // Novo estado para controlar se um usuário foi adicionado

  const handleAddUser = () => {
    if (userId.trim() && userName.trim() && taskTitle.trim()) {
      if (users.some(user => user.userId === userId)) {
        alert('User with this ID already exists.');
        return;
      }

      setUsers([...users, { userId, userName, tasks: [{ title: taskTitle }] }]); // Inclui o título da tarefa
      setUserId('');
      setUserName('');
      setTaskTitle('');
      setUserAdded(true); // Define userAdded como true após adicionar um usuário
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim() && users.length > 0) {
      onCreateTeam(teamName, users);
    } else {
      alert('Please provide a team name and add at least one user.');
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
        <label className="form-label">User Name</label>
        <input
          type="text"
          className="form-control"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Task Title</label>
        <input
          type="text"
          className="form-control"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={handleAddUser}
      >
        Add User and Task
      </button>
      <button
        type="submit"
        className="btn btn-primary me-2"
        disabled={!userAdded} // Desabilita o botão se nenhum usuário for adicionado
      >
        Create Team
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default TeamCreationForm;
