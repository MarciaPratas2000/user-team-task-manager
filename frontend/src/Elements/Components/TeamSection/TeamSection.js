import React, { useState } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTaskForm from '../AddTaskForm/AddTaskForm'; // Ensure correct path
import './TeamSection.css';

const TeamSection = ({ team, teamIndex, onCheckboxChange, onStatusChange, onUrgencyToggle, onAddTask }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleAddTask = (task) => {
    onAddTask(task, teamIndex); // Use the provided handler to add task to the team
    setShowTaskForm(false); // Hide the form after adding the task
  };

  return (
    <div className="team-section">
      <h3>{team.teamName}</h3>
      <TaskList
        tasks={team.tasks}
        onCheckboxChange={(taskIndex) => onCheckboxChange(teamIndex, taskIndex)}
        onStatusChange={(taskIndex, newStatus) => onStatusChange(teamIndex, taskIndex, newStatus)}
        onUrgencyToggle={(taskIndex) => onUrgencyToggle(teamIndex, taskIndex)}
        isPersonal={false}
      />
      <div className="text-center mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>
      {showTaskForm && (
        <AddTaskForm
          onAddTask={handleAddTask}
          onCancel={() => setShowTaskForm(false)} // Hide form on cancel
          teams={[]} // Teams data not needed here
          selectedTeam={teamIndex} // Pass the current team index
        />
      )}
    </div>
  );
};

export default TeamSection;
