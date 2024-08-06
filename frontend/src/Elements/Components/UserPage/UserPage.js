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
    handleDuplicateTask
  } = useTaskManagement(teamsTasks, personalTasks, userid, username);


  const handleCreateTeam = (teamName, users) => {
    // Debugging: Log the inputs to the function
    console.log('Creating team with name:', teamName);
    console.log('Users:', users);
  
    // Create the new team object
    const newTeam = {
      id: createUniqueId(), // Ensure you have a unique ID for the team
      name: teamName,
      creatorId: userid, // Assuming `userid` is defined in the parent scope
  
      // Map through the users and their tasks to create the tasks array for the team
      tasks: users.flatMap(user => { // Use flatMap to flatten the tasks array
        console.log('Processing user:', user);
        
        return user.tasks.map(task => {
          console.log('Processing task:', task);
  
          return {
            id: createUniqueId(), // Unique ID for each task
            title: task.title || '', // Ensure task.title exists
            description: task.description || '', // Default empty description if not provided
            status: 'Not-yet',
            isUrgent: task.isUrgent || false, // Default to false if not specified
            isChecked: task.isChecked || false, // Default to false if not specified
            userName: user.userName,
            userId: user.userId,
            comments: task.comments || [] // Initialize with an empty comments array
          };
        });
      }),
    };
  
    // Debugging: Log the new team object
    console.log('New team object:', newTeam);
  
    handleAddTeam(newTeam); // Function to handle adding the new team
    setIsCreatingTeam(false); // Close the team creation form
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
                      onDuplicateTask ={handleDuplicateTask}             

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
                    onDuplicateTask ={handleDuplicateTask}             

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