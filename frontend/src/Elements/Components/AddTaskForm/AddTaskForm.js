import React, { useState } from 'react';
import './AddTaskForm.css'; // Adjust path as needed

const AddTaskForm = ({ 
  onAddTask, 
  isCreator 
}) => {
  // Task states
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Todo");
  const [isUrgent, setIsUrgent] = useState(false);
  
  // User states (only used when isCreator)
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  // Handle task submission
  const handleAddTask = (e) => {
    e.preventDefault();
    
    const newTask = {
      title: isCreator ? taskTitle : task,
      status,
      isUrgent,
      isChecked: false,
      isEliminating: false,
      userName: isCreator ? userName : "",
      userId: isCreator ? userId : ""
    };
  
    if (isCreator) {
      // Add user and task
      onAddTask(newTask);
      setUserId('');
      setUserName('');
      setTaskTitle('');
    } else {
      // Add task only
      onAddTask(newTask);
      setTask("");
    }
  };
  
  return (
    <form className="add-task-form" onSubmit={handleAddTask}>
      {isCreator ? (
        <>
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-secondary mb-3"
            disabled={!userId || !userName || !taskTitle}
          >
            Add User Task
          </button>
        </>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Todo">Not yet!</option>
              <option value="In-progress">In Progress</option>
              <option value="Help">Help</option>
              <option value="Complete">Complete</option>
              <option value="Eliminate">Eliminate</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={() => setIsUrgent(!isUrgent)}
              />
              Urgent
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Task
          </button>
        </>
      )}
    
    </form>
  );
};

export default AddTaskForm;
