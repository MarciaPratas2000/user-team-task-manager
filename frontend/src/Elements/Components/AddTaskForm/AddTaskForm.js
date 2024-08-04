import React, { useState } from 'react';
import './AddTaskForm.css'; // Adjust path as needed

const AddTaskForm = ({ onAddTask, onCancel, teams, selectedTeam }) => {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Todo");
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      task,
      status,
      isUrgent,
      isChecked: false,
      isEliminating: false,
      userName: "", // Will be set in UserPage
      userId: "" // Will be set in UserPage
    };
    onAddTask(newTask, selectedTeam);
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task">Task</label>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Todo">Not yet!</option>
          <option value="In-progress">In Progress</option>
          <option value="Help">Help</option>
          <option value="Complete">Complete</option>
          <option value="Complete">Eliminate</option>

        </select>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={() => setIsUrgent(!isUrgent)}
          />
          Urgent
        </label>
      </div>
      <div className="form-group d-flex justify-content-center">
        <button type="submit" className="btn btn-primary ">Add Task</button>
      </div>
    </form>
  );
};

export default AddTaskForm;
