import React, { useState } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTaskForm from '../AddTaskForm/AddTaskForm'; // Ensure correct path
import './TeamSection.css';

const TeamSection = ({
  team,
  teamIndex,
  onCheckboxChange,
  onStatusChange,
  onUrgencyToggle,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onDeleteTeam, // Ensure this is defined
  userid
}) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const isCreator = team.creatorId === userid;

  const toggleAddTaskForm = () => setShowAddTaskForm(!showAddTaskForm);

  const handleAddTask = (newTask) => {
    onAddTask(newTask, teamIndex); // Pass the new task and team index
    setShowAddTaskForm(false); // Hide the form after adding the task
  };

  return (
    <div className="team-section">
      <h3>{team.teamName}</h3>
      {isCreator && (
        <button
          className="btn btn-danger mb-3"
          onClick={() => onDeleteTeam(teamIndex)} // Handle team deletion
        >
          Delete Team
        </button>
      )}
      <TaskList
        tasks={team.tasks}
        onCheckboxChange={(taskIndex) => onCheckboxChange(teamIndex, taskIndex)}
        onStatusChange={(taskIndex, newStatus) => onStatusChange(teamIndex, taskIndex, newStatus)}
        onUrgencyToggle={(taskIndex) => onUrgencyToggle(teamIndex, taskIndex)}
        onDeleteTask={(taskIndex) => {
          const task = team.tasks[taskIndex];
          if (task.userId === userid || isCreator) {
            onDeleteTask(teamIndex, taskIndex);
          }
        }}
        onUpdateTask={(taskIndex, updatedTask) => {
          const task = team.tasks[taskIndex];
          if (task.userId === userid || isCreator) {
            onUpdateTask(teamIndex, taskIndex, updatedTask);
          }
        }}
      />
      <div className="text-center mb-4">
        <button
          className="btn btn-primary"
          onClick={toggleAddTaskForm}
        >
          {showAddTaskForm ? 'Cancel' : 'Add Task to Team'}
        </button>
      </div>
      {showAddTaskForm && (
        <AddTaskForm onAddTask={handleAddTask} />
      )}
    </div>
  );
};

export default TeamSection;
