import React from 'react';
import TaskItem from '../TaskItem/TaskItem'; // Ensure correct path
import './TaskList.css';

const TaskList = ({
  tasks,
  onCheckboxChange,
  onStatusChange,
  onUrgencyToggle,
  onDeleteTask,
  onUpdateTask,
  isPersonal,
  userid,
  isCreator,
  onAddComment

}) => {
  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onCheckboxChange={onCheckboxChange}
          onStatusChange={onStatusChange}
          onUrgencyToggle={onUrgencyToggle}
          isPersonal={isPersonal}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          userid={userid}
          isCreator={isCreator}
          onAddComment={onAddComment}
        />
      ))}
    </ul>
  );
};

export default TaskList;
