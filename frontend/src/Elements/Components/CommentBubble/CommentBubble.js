import React, { useState, useEffect } from 'react';
import './CommentBubble.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faTimes, faCommentDots, faEdit } from '@fortawesome/free-solid-svg-icons'; // Import icons

const CommentBubble = ({ onSave, existingComments, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(existingComments || []);

  // Update comments when existingComments prop changes
  useEffect(() => {
    console.log('Existing comments updated:', existingComments);
    setComments(existingComments || []);
  }, [existingComments]);

  const toggleBubble = () => {
    console.log('Toggling bubble. Current state:', isOpen);
    setIsOpen(!isOpen);
  };

  const handleSave = () => {
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      console.log('Saving new comment:', trimmedComment);
      setComments([...comments, trimmedComment]);
      onSave(trimmedComment);
      setNewComment('');
      setIsEditing(false); // Exit editing mode after saving
    } else {
      console.log('No comment entered or comment is just whitespace.');
    }
  };

  const handleRemove = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    if (onRemove) {
      onRemove(index);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setNewComment(''); // Clear the textarea when exiting edit mode
    }
  };

  return (
    <div className="comment-bubble">
      <button
        className="comment-bubble-button"
        onClick={toggleBubble}
        title="Open comment bubble"
      >
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      {isOpen && (
        <div className="comment-bubble-content ">
            <button
                onClick={toggleEdit}
                className="btn btn-edit mt-2 d-block"
                title="Edit Comment"
              >
                <FontAwesomeIcon icon={faEdit} />
                Add Notes
              </button>
          {isEditing ? (
            <div className="comment-edit-mode">
              <textarea
                value={newComment}
                onChange={(e) => {
                  console.log('Comment text changed:', e.target.value);
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
            <>
              <ul className="comment-list">
                {comments.map((comment, index) => (
                  <li key={index} className="comment-item">
                    {comment}
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
            
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentBubble;
