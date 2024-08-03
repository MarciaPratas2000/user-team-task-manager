import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
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
  onAddComment,
  isDraggable = true // Add a prop to control draggable behavior
}) => {
  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <Draggable
          key={task.id} // Ensure each task has a unique id
          draggableId={task.id} // Use a unique identifier for draggableId
          index={index}
        >
          {(provided) => (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="list-group-item"
            >
              <TaskItem
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
            </li>
          )}
        </Draggable>
      ))}
    </ul>
  );
};

export default TaskList;
