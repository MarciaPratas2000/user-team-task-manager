import React, { useState } from 'react';
import './UserPage.css';
import AddTaskForm from '../AddTaskForm/AddTaskForm'; // Correct path
import TeamCreationForm from '../TeamCreationForm/TeamCreationForm'; // Correct path
import TeamSection from '../TeamSection/TeamSection'; // Correct path
import PersonalSection from '../PersonalSection/PersonalSection'; // Correct path

const initialTeams = [
  {
    teamName: "Development",
    creatorId: "0002",
    tasks: [
      { task: "Implement feature X", status: "Doing", isUrgent: false, isChecked: false, createdBy: "Alice", userId: "0002" },
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
  { task: "Read React documentation", status: "Doing", isUrgent: false, isChecked: false, createdBy: "Alice", userId: "0002" },
  { task: "Write blog post", status: "Help", isUrgent: true, isChecked: false, createdBy: "Alice", userId: "0002" }
];

const UserPage = ({ username, userid }) => {
  const [teams, setTeams] = useState(initialTeams);
  const [personalTasks, setPersonalTasks] = useState(initialPersonalTasks);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

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

  const handleStatusChange = (teamIndex, taskIndex, newStatus, isPersonal = false) => {
    if (isPersonal) {
      setPersonalTasks(prevTasks =>
        prevTasks.map((task, index) =>
          index === taskIndex ? { ...task, status: newStatus } : task
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
                    tIndex === taskIndex ? { ...task, status: newStatus } : task
                  )
                }
              : team
          )
        );
      }
    }
  };

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

  const handleCreateTeam = (teamName, users) => {
    const newTeam = {
      teamName,
      creatorId: userid,
      tasks: users.flatMap(user =>
        user.tasks.map(task => ({
          task,
          status: 'Doing',
          isUrgent: false,
          isChecked: false,
          createdBy: username,
          userId: user.userId
        }))
      ),
    };
    setTeams(prevTeams => [...prevTeams, newTeam]);
    setIsCreatingTeam(false);
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
            <div className="card-header ">Personal Tasks</div>
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
