// TaskItem.js
import React from 'react';


const TaskItem = ({ task, index, onCheckboxChange, onUrgencyToggle, onStatusChange, isPersonal }) => {
  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${task.isUrgent ? 'urgent-task' : ''} ${task.isEliminating ? 'eliminating-task' : ''}`}>
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
        {task.createdBy && (
          <span className="text-muted ms-2">by {task.createdBy}, ID: {task.userId}</span>
        )}
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
          <option value="Doing">Doing</option>
          <option value="Help">Help</option>
          <option value="Complete">Complete</option>
          <option value="Eliminate">Eliminate</option>
        </select>
      </div>
    </li>
  );
};

export default TaskItem;
