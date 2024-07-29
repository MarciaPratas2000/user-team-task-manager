import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserPage.css';
import TeamCreationForm from '../TeamCreationForm/TeamCreationForm';
import TeamSection from '../TeamSection/TeamSection';
import PersonalSection from '../PersonalSection/PersonalSection';

// Initial data
const initialTeams = [
  {
    teamName: "Development",
    creatorId: "0002",
    tasks: [
      { task: "Implement feature X", status: "In-progress", isUrgent: false, isChecked: false, createdBy: "Alice", userId: "0002" },
      { task: "Fix bug Y", status: "Help", isUrgent: true, isChecked: false, createdBy: "Bob", userId: "0003" }
    ]
  },
  {
    teamName: "Marketing",
    creatorId: "0004",
    tasks: [
      { task: "Prepare campaign", status: "Complete", isUrgent: false, isChecked: true, createdBy: "Carol", userId: "0004" }
    ]
  }
];
const initialPersonalTasks = [
  { task: "Read React documentation", status: "In-progress", isUrgent: false, isChecked: false, createdBy: "Alice", userId: "0002" },
  { task: "Write blog post", status: "Help", isUrgent: true, isChecked: false, createdBy: "Alice", userId: "0002" }
];

const UserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username = '', userid = '' } = location.state || {};
  const [teams, setTeams] = useState(initialTeams);
  const [personalTasks, setPersonalTasks] = useState(initialPersonalTasks);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  // Handle task checkbox changes
  const handleCheckboxChange = (teamIndex, taskIndex, isPersonal = false) => {
    if (isPersonal) {
      setPersonalTasks(prevTasks =>
        prevTasks.map((task, index) =>
          index === taskIndex ? { ...task, isChecked: !task.isChecked } : task
        )
      );
    } else {
      setTeams(prevTeams =>
        prevTeams.map((team, index) =>
          index === teamIndex
            ? {
                ...team,
                tasks: team.tasks.map((task, tIndex) =>
                  tIndex === taskIndex ? { ...task, isChecked: !task.isChecked } : task
                )
              }
            : team
        )
      );
    }
  };

  // Handle status changes for tasks
  const handleStatusChange = (teamIndex, taskIndex, newStatus, isPersonal = false) => {
    if (isPersonal) {
      setPersonalTasks(prevTasks => 
        prevTasks
          .map((task, index) =>
            index === taskIndex ? { ...task, status: newStatus } : task
          )
          .filter(task => !(task.status === 'Eliminate' && task.isChecked))
      );
    } else {
      const team = teams[teamIndex];
      const task = team.tasks[taskIndex];
      if (task.userId === userid || team.creatorId === userid) {
        setTeams(prevTeams =>
          prevTeams.map((team, index) =>
            index === teamIndex
              ? {
                  ...team,
                  tasks: team.tasks
                    .map((task, tIndex) =>
                      tIndex === taskIndex ? { ...task, status: newStatus } : task
                    )
                    .filter(task => !(task.status === 'Eliminate' && task.isChecked))
                }
              : team
          )
        );
      }
    }
  };

  // Toggle urgency of tasks
  const handleUrgencyToggle = (teamIndex, taskIndex, isPersonal = false) => {
    if (isPersonal) {
      setPersonalTasks(prevTasks =>
        prevTasks.map((task, index) =>
          index === taskIndex ? { ...task, isUrgent: !task.isUrgent } : task
        )
      );
    } else {
      const team = teams[teamIndex];
      const task = team.tasks[taskIndex];
      if (task.userId === userid || team.creatorId === userid) {
        setTeams(prevTeams =>
          prevTeams.map((team, index) =>
            index === teamIndex
              ? {
                  ...team,
                  tasks: team.tasks.map((task, tIndex) =>
                    tIndex === taskIndex ? { ...task, isUrgent: !task.isUrgent } : task
                  )
                }
              : team
          )
        );
      }
    }
  };

  // Add new tasks to either personal or team tasks
  const handleAddTask = (newTask, teamIndex = null) => {
    if (teamIndex !== null) {
      setTeams(prevTeams =>
        prevTeams.map((team, index) =>
          index === teamIndex
            ? {
                ...team,
                tasks: [...team.tasks, { ...newTask, createdBy: username, userId: userid }]
              }
            : team
        )
      );
    } else {
      setPersonalTasks(prevTasks => [...prevTasks, { ...newTask, createdBy: username, userId: userid }]);
    }
  };

  // Update task in either personal or team tasks
  const handleUpdateTask = (updatedTask, teamIndex = null, taskIndex, isPersonal = false) => {
    if (isPersonal) {
      setPersonalTasks(prevTasks =>
        prevTasks.map((task, index) =>
          index === taskIndex ? { ...task, ...updatedTask } : task
        )
      );
    } else {
      const team = teams[teamIndex];
      const task = team.tasks[taskIndex];
      if (task.userId === userid || team.creatorId === userid) {
        setTeams(prevTeams =>
          prevTeams.map((team, index) =>
            index === teamIndex
              ? {
                  ...team,
                  tasks: team.tasks.map((task, tIndex) =>
                    tIndex === taskIndex ? { ...task, ...updatedTask } : task
                  )
                }
              : team
          )
        );
      }
    }
  };

  // Create a new team
  const handleCreateTeam = (teamName, users) => {
    const newTeam = {
      teamName,
      creatorId: userid,
      tasks: users.flatMap(user =>
        user.tasks.map(task => ({
          task,
          status: 'Not-yet',
          isUrgent: false,
          isChecked: false,
          createdBy: user.userName,
          userId: user.userId
        }))
      ),
    };
    setTeams(prevTeams => [...prevTeams, newTeam]);
    setIsCreatingTeam(false);
  };

   // Delete a team
   const handleDeleteTeam = (teamIndex) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this team?");
  if (isConfirmed) {
    setTeams(prevTeams => prevTeams.filter((_, index) => index !== teamIndex));
  }
  };

  return (
    <div className="container mt-5 user-page">
      <div className="text-center mb-4">
        <h1>Welcome, {username}!</h1>
        <p>Your User ID: <strong>{userid}</strong></p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card personal-section">
            <div className="card-header">Personal Tasks</div>
            <div className="card-body">
              <PersonalSection
                personalTasks={personalTasks}
                onCheckboxChange={(taskIndex) => handleCheckboxChange(null, taskIndex, true)}
                onStatusChange={(taskIndex, newStatus) => handleStatusChange(null, taskIndex, newStatus, true)}
                onUrgencyToggle={(taskIndex) => handleUrgencyToggle(null, taskIndex, true)}
                onAddTask={handleAddTask}
              />
            </div>
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
                />
              </div>
            )}
            <div className="card-body">
              {teams.map((team, teamIndex) => (
                <TeamSection
                  key={teamIndex}
                  team={team}
                  teamIndex={teamIndex}
                  onCheckboxChange={handleCheckboxChange}
                  onStatusChange={handleStatusChange}
                  onUrgencyToggle={handleUrgencyToggle}
                  onAddTask={handleAddTask}
                  onDeleteTeam={handleDeleteTeam}
                  userid={userid}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
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
