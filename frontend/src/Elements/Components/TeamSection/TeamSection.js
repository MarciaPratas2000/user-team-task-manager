import React, { useState } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTaskForm from '../AddTaskForm/AddTaskForm'; // Ensure correct path
import './TeamSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import trash can icon

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
  userid,
  isCreator,
  isPersonal,
  onAddComment

}) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
   isCreator = team.creatorId === userid;

  const toggleAddTaskForm = () => setShowAddTaskForm(!showAddTaskForm);

  const handleAddTask = (newTask) => {
    onAddTask(newTask, teamIndex); // Pass the new task and team index
    setShowAddTaskForm(false); // Hide the form after adding the task
  };

  return (
    <div className="team-section">
      <div className='d-flex justify-content-between'>
        <h3>{team.teamName}</h3>
        {isCreator && (
          <button
            className="btn text-dark border rounded-circle mb-3 ps-3 pe-3"
            onClick={() => onDeleteTeam(teamIndex)}
            aria-label="Delete Team"
          >
            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
          </button>
        )}
      </div>

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
            onUpdateTask(taskIndex,updatedTask);
          }
        }}

        onAddComment={(taskIndex, comment) => {
          const task = team.tasks[taskIndex];
          if (task.userId === userid || isCreator) {
            onAddComment(teamIndex, taskIndex, comment);
          }
        }}
        userid={userid}
        isCreator={isCreator}
        isPersonal={isPersonal}

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
