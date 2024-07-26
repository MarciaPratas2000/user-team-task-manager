import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, index, onCheckboxChange, onStatusChange, onUrgencyToggle, isPersonal }) => {
  const getTaskClassName = (task) => {
    let className = '';

    if (task.status === 'Help') {
      className += ' help-task';
    }

    if (task.isUrgent) {
      className += ' urgent-task';
    }

    if (task.status === 'Complete' && task.isChecked) {
      className += ' completed-task-checked';
    }

    return className;
  };

  if (task.status === 'Eliminate' && task.isChecked) {
    return null; // Skip rendering for tasks that should be eliminated.
  }

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${getTaskClassName(task)}`}>
      <div className="d-flex flex-grow-1 align-items-center">
        <input
          className="form-check-input me-1"
          type="checkbox"
          id={`${isPersonal ? 'personal' : 'team'}Checkbox${index}`}
          checked={task.isChecked}
          onChange={() => onCheckboxChange(index, isPersonal)}
        />
        <label className="form-check-label" htmlFor={`${isPersonal ? 'personal' : 'team'}Checkbox${index}`}>
          {task.task}
        </label>
        {!isPersonal && <span className="text-muted ms-2">by {task.user}, ID: {task.userId}</span>}
      </div>
      <div>
        <button
          className={`btn ${task.isUrgent ? 'btn-danger' : 'btn-outline-danger'} ms-2`}
          onClick={() => onUrgencyToggle(index, isPersonal)}
          aria-label="Mark as urgent"
        >
          Urgent
        </button>
      </div>
      <div>
        <select
          className="form-select ms-2"
          value={task.status}
          onChange={(e) => onStatusChange(index, e.target.value, isPersonal)}
        >
          <option value="In progress">Not yet!</option>
          <option value="Doing">In Progress</option>
          <option value="Help">Help</option>
          <option value="Complete">Complete</option>
          <option value="Eliminate">Eliminate</option>
        </select>
      </div>
    </li>
  );
};

export default TaskItem;
