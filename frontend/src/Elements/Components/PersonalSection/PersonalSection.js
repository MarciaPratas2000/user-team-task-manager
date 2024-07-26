import React, { useState } from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm'; // Correct path
import TaskList from '../TaskList/TaskList'; // Ensure correct path
import './PersonalSection.css'; // Ensure you have a CSS file for custom styles

const PersonalSection = ({
  personalTasks,
  onCheckboxChange,
  onStatusChange,
  onUrgencyToggle,
  onAddTask
}) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleAddTask = (newTask) => {
    onAddTask(newTask);
    setShowTaskForm(false); // Hide the form after adding the task
  };

  return (
    <div className="personal-section">
      <TaskList
        tasks={personalTasks}
        onCheckboxChange={onCheckboxChange}
        onStatusChange={onStatusChange}
        onUrgencyToggle={onUrgencyToggle}
      />
      <div className="text-center mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>
      {showTaskForm && <AddTaskForm onAddTask={handleAddTask} />}
    </div>
  );
};

export default PersonalSection;
