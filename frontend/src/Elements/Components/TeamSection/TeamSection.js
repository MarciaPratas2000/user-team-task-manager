import React, { useState } from 'react';
import TaskList from '../TaskList/TaskList';
import AddTaskForm from '../AddTaskForm/AddTaskForm'; // Ensure correct path
import './TeamSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import trash can icon
import { Droppable } from 'react-beautiful-dnd';

const TeamSection = ({
  team,
  teamIndex,
  onCheckboxChange,
  onStatusChange,
  onUrgencyToggle,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onDeleteTeam,
  userid,
  isCreator,
  isPersonal,
  onAddComment,
  onDuplicateTask,
  onIconDrop
}) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const toggleAddTaskForm = () => setShowAddTaskForm(!showAddTaskForm);

  const handleAddTask = (newTask) => {
    onAddTask(newTask, teamIndex); // Pass the new task and team index
    setShowAddTaskForm(false); // Hide the form after adding the task
  };




  return (
    <div className="team-section">
    <Droppable droppableId={`teamTasks-${teamIndex.toString()}`} type="TASK" direction='vertical'  >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}

          >
          <div className='d-flex justify-content-between'>
            <h3>{team.name}</h3>
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
            onIconDrop={(icon ,iconIndex, taskIndex, isPersonal) => onIconDrop(icon, iconIndex, taskIndex, isPersonal, teamIndex)}
            onDeleteTask={(taskIndex) => {
              const task = team.tasks[taskIndex];
              if (task.userId === userid || isCreator) {
                onDeleteTask(teamIndex, taskIndex);
              }
            }}
            onUpdateTask={(taskIndex, updatedTask) => {
              const task = team.tasks[taskIndex];
              if (task.userId === userid || isCreator) {
                onUpdateTask(taskIndex, updatedTask);
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
            //here we are only dealing with one team, so taskindex is the only argument       
            onDuplicateTask={(taskIndex, isPersonal) => onDuplicateTask(teamIndex, taskIndex, isPersonal)} // Pass as callback
       
          />

          {provided.placeholder}

          <div className="text-center mb-4">
            <button
              className="btn btn-primary"
              onClick={toggleAddTaskForm}
            >
              {showAddTaskForm ? 'Cancel' : 'Add Task to Team'}
            </button>
          </div>
          {showAddTaskForm && (
             <AddTaskForm
            onAddTask={handleAddTask}
            isCreator={isCreator}
           />
          )}
        </div>
      )}
    </Droppable>
    </div>
  );
};

export default TeamSection;
