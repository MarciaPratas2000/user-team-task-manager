import React, { useState, useEffect } from 'react';
import './CommentBubble.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faTimes, faCommentDots, faEdit } from '@fortawesome/free-solid-svg-icons'; // Import icons

const CommentBubble = ({ onSave, existingComments, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(existingComments || []);
  const [checkedComments, setCheckedComments] = useState(new Array((existingComments || []).length).fill(false));

  useEffect(() => {
    setComments(existingComments || []);
    setCheckedComments(new Array((existingComments || []).length).fill(false));
  }, [existingComments]);

  const toggleBubble = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = () => {
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      setComments([...comments, trimmedComment]);
      setCheckedComments([...checkedComments, false]); // Add a new unchecked item
      onSave(trimmedComment);
      setNewComment('');
      setIsEditing(false);
    }
  };

  const handleRemove = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    const updatedCheckedComments = checkedComments.filter((_, i) => i !== index);
    setComments(updatedComments);
    setCheckedComments(updatedCheckedComments);
    if (onRemove) {
      onRemove(index);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setNewComment('');
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedComments = [...checkedComments];
    updatedCheckedComments[index] = !updatedCheckedComments[index];
    setCheckedComments(updatedCheckedComments);
  };

  return (
    <div className="comment-bubble mt-0">
      <button
        className="comment-bubble-button"
        onClick={toggleBubble}
        title="Open comment bubble"
      >
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      {isOpen && (
        <div className="comment-bubble-content">
          <span className='my-notes'>My Notes</span>
          <button
            onClick={() => setIsOpen(false)}
            className="comment-bubble-close-button btn  p-2 btn-cancel"
            title="Close comment bubble"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <button
            onClick={toggleEdit}
            className="btn btn-edit mt-2 d-block"
            title="Add Comment"
          >
            <FontAwesomeIcon icon={faEdit} />
            Add Notes
          </button>
          {isEditing ? (
            <div className="comment-edit-mode m-3">
              <textarea
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
                placeholder="Write a comment"
              />
              <button
                onClick={handleSave}
                className="btn btn-save"
                title="Save comment"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-cancel"
                title="Cancel"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ) : (
            <ul className="comment-list ms-4">
              {comments.map((comment, index) => (
                <li key={index} className="comment-item ">
                  <input
                    type="checkbox"
                    checked={checkedComments[index]}
                    onChange={() => handleCheckboxChange(index)}
                    className="comment-checkbox"
                  />
                  <span className='ms-2'
                  >{comment}</span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="btn btn-outline-danger ms-2"
                    title="Remove comment"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentBubble;
