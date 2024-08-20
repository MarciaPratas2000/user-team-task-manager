import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskItem from '../TaskItem/TaskItem'; // Ensure correct path
import './TaskList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons'; // Import toolbox icon
import Toolbox from '../toolbox/toolbox'; // Ensure correct path

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
  onDuplicateTask,
  onIconDrop,
}) => {
  // State to manage visibility of Toolbox for each task
  const [visibleToolboxes, setVisibleToolboxes] = useState({});


  // Toggle visibility of the toolbox for a specific task
  const toggleToolbox = (taskIndex) => {
    setVisibleToolboxes((prevState) => ({
      ...prevState,
      [taskIndex]: !prevState[taskIndex],
    }));
    console.log(visibleToolboxes)
  };

  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <React.Fragment key={task.id}>
          <Draggable
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
                  onDuplicateTask={onDuplicateTask}
                  onIconDrop={onIconDrop}
                  visibleToolboxes ={visibleToolboxes[index]} // Use no-op if onIconDrop is not provided
                />
              </li>
            )}
          </Draggable>
          {!isPersonal  && (
            <div className="mt-2">
              <button
                className="btn text-dark border-none"
                onClick={() => toggleToolbox(index)}
                aria-label="Toggle Toolbox"
              >
                <FontAwesomeIcon icon={faToolbox} size="sm" />
              </button>
              {visibleToolboxes[index] && <Toolbox />}
            </div>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default TaskList;
