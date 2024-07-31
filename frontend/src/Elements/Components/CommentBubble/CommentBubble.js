
import React, { useState, useEffect } from 'react';
import './CommentBubble.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faTimes, faCommentDots } from '@fortawesome/free-solid-svg-icons'; // Import icons

const CommentBubble = ({ onSave, existingComments, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(existingComments || []);

  // Log whenever existingComments prop changes
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
      setIsOpen(false);
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
        <div className="comment-bubble-content d-block">
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
            className="btn btn-success"
            title="Save comment"
          >
            <FontAwesomeIcon icon={faCheck} /> {/* Checkmark for Save */}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-danger"
            title="Cancel"
          >
            <FontAwesomeIcon icon={faTimes} /> {/* Cross for Cancel */}
          </button>
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                {comment}
                <button
                  onClick={() => handleRemove(index)}
                  className="btn btn-outline-danger ms-2"
                  title="Remove comment"
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> {/* Trash for Remove */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommentBubble;
