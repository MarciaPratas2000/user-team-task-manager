import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask, onCancel }) => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('Doing');
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onAddTask({ task, status, isUrgent });
      setTask('');
      setStatus('Doing');
      setIsUrgent(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="taskInput" className="form-label">Task</label>
        <input
          type="text"
          id="taskInput"
          className="form-control"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="statusSelect" className="form-label">Status</label>
        <select
          id="statusSelect"
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Doing">Doing</option>
          <option value="Help">Help</option>
          <option value="Complete">Complete</option>
          <option value="Eliminate">Eliminate</option>
        </select>
      </div>
      <div className="mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            id="urgentCheckbox"
            className="form-check-input"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
          />
          <label htmlFor="urgentCheckbox" className="form-check-label">
            Urgent
          </label>
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">Add Task</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default AddTaskForm;
