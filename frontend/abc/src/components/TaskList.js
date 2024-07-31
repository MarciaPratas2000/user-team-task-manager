import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = ({ tasks }) => {
  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li className="list-group-item d-flex align-items-center" key={task.id}>
          <input 
            className="form-check-input me-2" 
            type="checkbox" 
            checked={task.completed} 
            readOnly 
          />
          {task.title}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
