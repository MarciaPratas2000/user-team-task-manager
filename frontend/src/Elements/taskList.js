import React, { useState } from 'react';
import AddTaskForm from './AddTaskForm'; // Adjust the path if necessary

const TaskList = ({
  tasks,
  onCheckboxChange,
  onUrgencyToggle,
  onStatusChange,
  onAddTask,
  isPersonal,
  showForm,
  toggleForm
}) => {
  const [isAddingTask, setIsAddingTask] = useState(showForm);

  const handleAddTask = (newTask) => {
    onAddTask(newTask);
    setIsAddingTask(false);
  };

  return (
    <div>
      <ul className="list-group mb-4">
        {tasks.map((task, index) => (
          <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${task.isUrgent ? 'urgent-task' : ''}`}>
            <div className="d-flex flex-grow-1 align-items-center">
              <input
                className="form-check-input me-1"
                type="checkbox"
                id={`${isPersonal ? 'personal' : 'team'}Checkbox${index}`}
                checked={task.isChecked}
                onChange={() => onCheckboxChange(index)}
              />
              <label className="form-check-label" htmlFor={`${isPersonal ? 'personal' : 'team'}Checkbox${index}`}>
                {task.task}
              </label>
              <span className="text-muted ms-2">
                {task.createdBy && `by ${task.createdBy}, ID: ${task.userId}`}
              </span>
            </div>
            <div>
              <button
                className={`btn ${task.isUrgent ? 'btn-danger' : 'btn-outline-danger'} ms-2`}
                onClick={() => onUrgencyToggle(index)}
                aria-label="Mark as urgent"
              >
                Urgent
              </button>
            </div>
            <div>
              <select
                className="form-select ms-2"
                value={task.status}
                onChange={(e) => onStatusChange(index, e.target.value)}
              >
                <option value="Doing">Doing</option>
                <option value="Help">Help</option>
                <option value="Complete">Complete</option>
                <option value="Eliminate">Eliminate</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={() => setIsAddingTask(!isAddingTask)}
        >
          {isAddingTask ? 'Cancel' : isPersonal ? 'Add Personal Task' : 'Add Team Task'}
        </button>
      </div>
      {isAddingTask && (
        <AddTaskForm
          onAddTask={handleAddTask}
          onCancel={() => setIsAddingTask(false)}
        />
      )}
    </div>
  );
};

export default TaskList;

