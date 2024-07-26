import React from 'react';
import TaskItem from '../TaskItem/TaskItem'; // Import the TaskItem component
import './TaskList.css'; // Import the CSS file for styling

// TaskList Component
const TaskList = ({ tasks, onCheckboxChange, onStatusChange, onUrgencyToggle, isPersonal }) => {
  return (
    <ul className="list-group mb-4">
      {tasks.map((task, index) => (
        <TaskItem
          key={index} // Key should be unique, consider using a unique task ID if available
          task={task}
          index={index}
          onCheckboxChange={onCheckboxChange}
          onStatusChange={onStatusChange}
          onUrgencyToggle={onUrgencyToggle}
          isPersonal={isPersonal}
        />
      ))}
    </ul>
  );
};

export default TaskList;
