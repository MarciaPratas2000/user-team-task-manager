import React, { useState } from 'react';
import CommentBubble from '../CommentBubble/CommentBubble';
import './TaskItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck, faTimes, } from '@fortawesome/free-solid-svg-icons'; // Import the new icons


const TaskItem = ({
  userid,
  task,
  index,
  onCheckboxChange,
  onStatusChange,
  onUrgencyToggle,
  isPersonal,
  onUpdateTask,
  isCreator,
  onAddComment
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.task);

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
      setIsEditing((prev) => !prev);

      if (!isEditing) {
        setUpdatedTask(task.task);
      }
    }
  };

  const handleSave = () => {
    if (onUpdateTask) {
      onUpdateTask(index, { task: updatedTask }, isPersonal);
    } else {
      console.error('onUpdateTask function is not provided');
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUpdatedTask(task.task); // Reset editText to the original task text
    setIsEditing(false);
  };

  const handleAddComment = (comment) => {
    if (onAddComment && comment.trim()) {
      onAddComment(index, comment.trim(), isPersonal);
    }
  };



  

  return (
    <div className='taskItem'>
    <li className={`list-group-item d-flex justify-content-between align-items-center ${getTaskClassName(task)}`}>
      <div className="d-flex align-items-center">
 
        <input
          className="form-check-input me-1"
          type="checkbox"
          id={`${isPersonal ? 'personal' : 'team'}Checkbox${index}`}
          checked={task.isChecked}
          onChange={() => onCheckboxChange && onCheckboxChange(index, isPersonal)}
        />
        <label className="form-check-label" htmlFor={`${isPersonal ? 'personal' : 'team'}Checkbox${index}`}>
          {isEditing ? (
            <input
              type="text"
              className="form-control"
              value={updatedTask}
              onChange={(e) => setUpdatedTask(e.target.value)}
            />
          ) : (
            task.task
          )}
        </label>
        {!isPersonal && <span className="text-muted ms-2">{task.createdBy}, ID: {task.userId}</span>}
      </div>
      <div>
       
      </div>
      <button
          className={`btn ${isEditing ? 'btn-save' : 'btn-edit'} `} 
          onClick={isEditing ? handleSave : handleEdit}
          disabled={!isCreator && userid !== task.userId}
          aria-label={isEditing ? 'Save task' : 'Edit task'}
        >
          <FontAwesomeIcon icon={isEditing ? faCheck : faPencilAlt} title='Edit Task' />
        </button>
        {isEditing && (
          <button className="btn btn-cancel " onClick={handleCancel}>
          <FontAwesomeIcon icon={faTimes} /> {/* Checkmark for Save */}

          </button>
        )}
      <div>
        <select
          disabled={!isCreator && userid !== task.userId}
          className="form-select ms-2"
          value={task.status}
          onChange={(e) => onStatusChange && onStatusChange(index, e.target.value, isPersonal)}
        >
          <option value="Not-yet">Not yet!</option>
          <option value="In-progress">In Progress</option>
          <option value="Help">Help</option>
          <option value="Complete">Complete</option>
          <option value="Eliminate">Delete</option>
        </select>
      </div>
      <button
          className={`btn border ${task.isUrgent ? 'btn-danger' : 'btn-outline-danger'} m-3 p-2`}
          disabled={!isCreator && userid !== task.userId}

          onClick={() => onUrgencyToggle && onUrgencyToggle(index, isPersonal)}
          aria-label="Mark as urgent"
        >
          Urgent
        </button>
      <div>
      </div>
    </li>
    {(isCreator || userid === task.userId) && (
    <CommentBubble
      onSave={handleAddComment}
      existingComments={task.comments || []}
    />
  )}
    </div>
  );
};

export default TaskItem;
