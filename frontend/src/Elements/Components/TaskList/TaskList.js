import React from 'react';
import TaskItem from '../TaskItem/TaskItem'; // Ensure correct path
import './TaskList.css';

const TaskList = ({
  tasks,
  teamIndex, // Ensure this is passed down
  onCheckboxChange,
  onStatusChange,
  onUrgencyToggle,
  onDeleteTask,
  onUpdateTask,
  isPersonal
}) => {
  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          teamIndex={teamIndex} // Pass teamIndex down here
          onCheckboxChange={onCheckboxChange}
          onStatusChange={onStatusChange}
          onUrgencyToggle={onUrgencyToggle}
          isPersonal={isPersonal}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
