import React, { useState } from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm'; // Ensure the path is correct
import TaskList from '../TaskList/TaskList'; // Ensure the path is correct
import './PersonalSection.css'; // Ensure this CSS file exists and is correctly styled

const PersonalSection = ({
  personalTasks,
  onCheckboxChange,
  onStatusChange,
  onUrgencyToggle,
  onAddTask,
  onUpdateTask,
  userid,
  onAddComment,
  onDuplicateTask

}) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleAddTask = (newTask) => {
    onAddTask(newTask);
    setShowTaskForm(false); // Hide the form after adding the task
  };

  return (
    //dropable has to be inside personal-section
    <div className="personal-section">
            <TaskList
              tasks={personalTasks}
              onCheckboxChange={onCheckboxChange}
              onStatusChange={onStatusChange}
              onUrgencyToggle={onUrgencyToggle}
              onUpdateTask={onUpdateTask} // Pass the function reference
              userid={userid}
              isPersonal={true}
              isCreator={true}
              onAddComment={onAddComment}
              onDuplicateTask ={onDuplicateTask}             

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
