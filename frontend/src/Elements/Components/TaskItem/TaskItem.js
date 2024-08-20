import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import CommentBubble from '../CommentBubble/CommentBubble';
import './TaskItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';


const TaskItem = ({
  userid,
  task,
  index,
  onStatusChange,
  onUrgencyToggle,
  onUpdateTask,
  onAddComment,
  isCreator,
  isPersonal,
  onDuplicateTask,
  onIconDrop,
  visibleToolboxes
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.title);

  const [{ isOver }, drop] = useDrop({
    accept: 'ICON',
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleDrop = (item) => {
    onIconDrop(item.icon, item.iconIndex, index, isPersonal);
  };

  const handleIconRemove = (iconIndex) => {
    const updatedIcons = task.icons.filter(icon => icon.iconIndex !== iconIndex);
    onUpdateTask(index, { icons: updatedIcons });
  };

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

  const handleEdit = () => {
    if (task.userId === userid || isCreator) {
      setIsEditing(true);
      setUpdatedTask(task.title);
    }
  };

  const handleSave = () => {
    onUpdateTask(index, { title: updatedTask });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUpdatedTask(task.title);
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    onUpdateTask(index, { isChecked: !task.isChecked });
  };

  const handleUrgencyToggle = () => {
    onUrgencyToggle(index);
  };

  const handleDoubleClick = () => {
    if (isPersonal) {
      onDuplicateTask(null, index, true);
    } else if (task.userId === userid || isCreator) {
      onDuplicateTask(index, false);
    }
  };

  return (
    <div className='taskItem' onDoubleClick={handleDoubleClick}>
      <div
        className={`list-group-item d-flex justify-content-between align-items-center ${getTaskClassName(task)}`}
      >
        <div className="d-flex align-items-center">
          <input
            className="form-check-input me-1"
            type="checkbox"
            checked={task.isChecked}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label">
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
              />
            ) : (
              task.title
            )}
          </label>
          {!isPersonal && (
            <span className="text-muted ms-2">
              {task.userName}, ID: {task.userId}
            </span>
          )}
        </div>

        <div className="d-flex align-items-center">
          <button
            className={`btn ${isEditing ? 'btn-save' : 'btn-edit'} ms-2`}
            onClick={isEditing ? handleSave : handleEdit}
            disabled={!isCreator && userid !== task.userId}
            aria-label={isEditing ? 'Save task' : 'Edit task'}
          >
            <FontAwesomeIcon icon={isEditing ? faCheck : faPencilAlt} />
          </button>
          {isEditing && (
            <button
              className="btn btn-cancel ms-2"
              onClick={handleCancel}
              aria-label="Cancel edit"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <div className="d-flex align-items-center ms-2">
          <select
            disabled={!isCreator && userid !== task.userId}
            className="form-select"
            value={task.status}
            onChange={(e) => onStatusChange(index, e.target.value)}
          >
            <option value="Not-yet">Not yet!</option>
            <option value="In-progress">In Progress</option>
            <option value="Help">Help</option>
            <option value="Complete">Complete</option>
            <option value="Eliminate">Delete</option>
          </select>
          <button
            className={`btn border ms-2 ${task.isUrgent ? 'btn-danger' : 'btn-outline-danger'} p-2`}
            disabled={!isCreator && userid !== task.userId}
            onClick={handleUrgencyToggle}
            aria-label="Mark as urgent"
          >
            Urgent
          </button>
        </div>
      </div>

      {(isCreator || userid === task.userId) && (
        <CommentBubble
          onSave={(comment) => onAddComment(index, comment, isPersonal, null)}
          existingComments={task.comments || []}
        />
      )}
      {!isPersonal  &&  visibleToolboxes && (
      <div
        ref={drop}
        className={`icon-droppable-area border ${isOver ? 'highlight' : ''}`}
      >
        <p>Drop icons here</p>
        {task.icons && task.icons.length > 0 && (
          <div className="icons-container container-fluid">
            {task.icons.map((icon, idx) => (
              
              <div key={idx} className="icon d-flex col border">
                <FontAwesomeIcon icon={icon.icon}  size="sm"/>
                
                <div className='fs-6 p-2'>User: {icon.iconUsername}, ID:{icon.iconUser}</div> 
                <div className="icon-functions-container border border-info">
                  <CommentBubble
                    onSave={(comment) => {
                      console.log(`Adding comment for icon at index ${idx}:`, comment);
                      onAddComment(index, comment, isPersonal, icon.iconIndex);
                    }}
                    existingComments={Array.isArray(icon.comments) ? icon.comments : []}
                  />
                  <button
                    onClick={() => handleIconRemove(icon.iconIndex)}
                    className="icon-button"
                    title="Remove icon"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      )}
    </div>
      
  );
};

export default TaskItem