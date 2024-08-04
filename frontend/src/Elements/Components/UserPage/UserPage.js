import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserPage.css';
import TeamCreationForm from '../TeamCreationForm/TeamCreationForm';
import TeamSection from '../TeamSection/TeamSection';
import PersonalSection from '../PersonalSection/PersonalSection';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useTaskManagement from '../TaskManagement/TaskManagement'; // Adjust the path as necessary
import teamsTasks from '../../data/teamsTasks';
import personalTasks from '../../data/personalTasks';
import { createUniqueId } from '../taskUtils/taskUtils';

const UserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username = '', userid = '' } = location.state || {};

  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  // Use TaskManagement hook for managing state
  const {
    teams,
    personalTasks: managedPersonalTasks, // Renamed to avoid shadowing issue
    handleCheckboxChange,
    handleStatusChange,
    handleUrgencyToggle,
    handleAddTask,
    handleUpdateTask,
    handleAddComment,
    handleDragEnd,
    handleAddTeam,
    handleDeleteTeam,
  } = useTaskManagement(teamsTasks, personalTasks, userid, username);


  // Create a new team
  const handleCreateTeam = (teamName, users) => {
    const newTeam = {
      id: createUniqueId(), // Ensure you have a unique ID
      name: teamName,
      creatorId: userid,
      tasks: users.map(user =>
        user.tasks.map(task => ({
          ...task,
          status: 'Not-yet',
          isUrgent: false,
          isChecked: false,
          createdBy: user.userName,
          userId: user.userId,
          id: createUniqueId(), // Ensure you have a unique ID for tasks
        }))
      ),
    };
    handleAddTeam(newTeam);
    setIsCreatingTeam(false);
  };

  // Handle team deletion
  const handleDeleteTeamClick = (teamIndex) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this team?");
    if (isConfirmed) {
      handleDeleteTeam(teamIndex);
    }
  };

  return (
    <div className="container mt-5 user-page">
      <div className="text-center mb-4">
        <h1>Welcome, {username}!</h1>
        <p>
          Your User ID: <strong>{userid}</strong>
        </p>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          <div className="col-md-6">
            <div className="card personal-section">
            <Droppable droppableId="personalTasks" type="TASK" direction='vertical' >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="card-body"
                  >
                    <div className="card-header">Personal Tasks</div>
                    <PersonalSection
                      personalTasks={managedPersonalTasks}
                      onCheckboxChange={(taskIndex) =>
                        handleCheckboxChange(null, taskIndex, true)
                      }
                      onStatusChange={(taskIndex, newStatus) =>
                        handleStatusChange(null, taskIndex, newStatus, true)
                      }
                      onUrgencyToggle={(taskIndex) =>
                        handleUrgencyToggle(null, taskIndex, true)
                      }
                      onAddTask={handleAddTask}
                      onUpdateTask={(taskIndex, updatedTask) =>
                        handleUpdateTask(taskIndex, null, updatedTask, true)
                      }
                      userid={userid}
                      isPersonal={true}
                      onAddComment={handleAddComment}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card team-tasks">
              <div className="card-header">Team Tasks</div>
              <div className="d-flex justify-content-end mt-4 me-4">
                <button
                  className="btn btn-secondary rounded"
                  onClick={() => setIsCreatingTeam(true)}
                >
                  Create New Team
                </button>
              </div>
              {isCreatingTeam && (
                <div className="card team-creation-form">
                  <TeamCreationForm
                    onCreateTeam={handleCreateTeam}
                    onCancel={() => setIsCreatingTeam(false)}
                    onAddComment={handleAddComment}
                  />
                </div>
              )}
              <div className="card-body">
                
                {teams.map((team, teamIndex) => (
                  <TeamSection
                    key={team.id}
                    team={team}
                    teamIndex={teamIndex}
                    onCheckboxChange={handleCheckboxChange}
                    onStatusChange={handleStatusChange}
                    onUrgencyToggle={handleUrgencyToggle}
                    onAddTask={handleAddTask}
                    onUpdateTask={(taskIndex, updatedTask) =>
                      handleUpdateTask(taskIndex, teamIndex, updatedTask, false)
                    }
                    onDeleteTeam={handleDeleteTeamClick}
                    userid={userid}
                    isCreator={team.creatorId === userid}
                    isPersonal={false}
                    onAddComment={handleAddComment}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-secondary rounded"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserPage;
