import React, { useState } from 'react';
import CommentBubble from '../CommentBubble/CommentBubble';
import './TaskItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons

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
      setIsEditing(true);
      setUpdatedTask(task.task);
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
    setUpdatedTask(task.task); // Reset the task text to the original
    setIsEditing(false);
  };

  const handleAddComment = (comment) => {
    if (onAddComment && comment.trim()) {
      onAddComment(index, comment.trim(), isPersonal);
    }
  };

  return (
    <div className='taskItem'>
      <div className={`list-group-item d-flex justify-content-between align-items-center ${getTaskClassName(task)}`}>
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
            onChange={(e) => onStatusChange && onStatusChange(index, e.target.value, isPersonal)}
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
            onClick={() => onUrgencyToggle && onUrgencyToggle(index, isPersonal)}
            aria-label="Mark as urgent"
          >
            Urgent
          </button>
        </div>
      </div>

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
