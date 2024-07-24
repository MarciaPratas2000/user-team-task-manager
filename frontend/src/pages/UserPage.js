import React, { useState } from 'react';
import './UserPage.css'; // Import custom CSS for additional styling
import AddTaskForm from './AddTaskForm'; // Import the new form component
import TeamCreationForm from './TeamCreationForm';

// Sample data for multiple teams with task creators and statuses
const teamsData = [
  {
    teamName: 'Team Alpha',
    tasks: [
      { task: 'Prepare for sprint planning', createdBy: 'Alice', userId: '0002', status: 'Doing', isChecked: false, isUrgent: false },
      { task: 'Complete feature X', createdBy: 'Bob', userId: '0003', status: 'Complete', isChecked: false, isUrgent: false },
      { task: 'Review design mockups', createdBy: 'Charlie', userId: '0004', status: 'Help', isChecked: false, isUrgent: false }
    ]
  },
  {
    teamName: 'Team Beta',
    tasks: [
      { task: 'Update API documentation', createdBy: 'Alice', userId: '0002', status: 'Doing', isChecked: false, isUrgent: false },
      { task: 'Fix bugs in module Y', createdBy: 'David', userId: '0005', status: 'Complete', isChecked: false, isUrgent: false },
      { task: 'Plan Q3 roadmap', createdBy: 'Eve', userId: '0006', status: 'Help', isChecked: false, isUrgent: false }
    ]
  },
  {
    teamName: 'Team Gamma',
    tasks: [
      { task: 'Conduct code review', createdBy: 'Frank', userId: '0007', status: 'Doing', isChecked: false, isUrgent: false },
      { task: 'Deploy release candidate', createdBy: 'Grace', userId: '0008', status: 'Complete', isChecked: false, isUrgent: false },
      { task: 'Organize team-building event', createdBy: 'Hannah', userId: '0009', status: 'Help', isChecked: false, isUrgent: false }
    ]
  }
];

const personalTasksData = [
  { task: 'Complete React project', createdBy: 'Alice', userId: '0002', status: 'Doing', isChecked: false, isUrgent: false },
  { task: 'Write unit tests', createdBy: 'Alice', userId: '0002', status: 'Help', isChecked: false, isUrgent: false },
  { task: 'Read documentation', createdBy: 'Alice', userId: '0002', status: 'Complete', isChecked: false, isUrgent: false },
  { task: 'Update portfolio website', createdBy: 'Alice', userId: '0002', status: 'Doing', isChecked: false, isUrgent: false },
  { task: 'Attend workshop on TypeScript', createdBy: 'Alice', userId: '0002', status: 'Help', isChecked: false, isUrgent: false },
  { task: 'Learn new JavaScript framework', createdBy: 'Alice', userId: '0002', status: 'Complete', isChecked: false, isUrgent: false }
];


const UserPage = ({ username, userid }) => {
  const [tasks, setTasks] = useState(teamsData);
  const [personalTasks, setPersonalTasks] = useState(
personalTasksData  );
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);


  const handleCheckboxChange = (teamIndex, taskIndex, isPersonal = false) => {
    if (isPersonal) {
      const updatedPersonalTasks = [...personalTasks];
      updatedPersonalTasks[taskIndex].isChecked = !updatedPersonalTasks[taskIndex].isChecked;
      setPersonalTasks(updatedPersonalTasks);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks[teamIndex].tasks[taskIndex].isChecked = !updatedTasks[teamIndex].tasks[taskIndex].isChecked;
      setTasks(updatedTasks);
    }
  };

  const handleStatusChange = (teamIndex, taskIndex, newStatus, isPersonal = false) => {
    if (newStatus === 'Eliminate') {
      if (isPersonal) {
        const updatedPersonalTasks = [...personalTasks];
        updatedPersonalTasks[taskIndex].isEliminating = true;
        setPersonalTasks(updatedPersonalTasks);

        setTimeout(() => {
          updatedPersonalTasks.splice(taskIndex, 1);
          setPersonalTasks(updatedPersonalTasks);
        }, 500);
      } else {
        const updatedTasks = [...tasks];
        updatedTasks[teamIndex].tasks[taskIndex].isEliminating = true;
        setTasks(updatedTasks);

        setTimeout(() => {
          updatedTasks[teamIndex].tasks.splice(taskIndex, 1);
          setTasks(updatedTasks);
        }, 500);
      }
    } else {
      if (isPersonal) {
        const updatedPersonalTasks = [...personalTasks];
        updatedPersonalTasks[taskIndex].status = newStatus;
        setPersonalTasks(updatedPersonalTasks);
      } else {
        const updatedTasks = [...tasks];
        updatedTasks[teamIndex].tasks[taskIndex].status = newStatus;
        setTasks(updatedTasks);
      }
    }
  };

  const handleUrgencyToggle = (teamIndex, taskIndex, isPersonal = false) => {
    if (isPersonal) {
      const updatedPersonalTasks = [...personalTasks];
      updatedPersonalTasks[taskIndex].isUrgent = !updatedPersonalTasks[taskIndex].isUrgent;
      setPersonalTasks(updatedPersonalTasks);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks[teamIndex].tasks[taskIndex].isUrgent = !updatedTasks[teamIndex].tasks[taskIndex].isUrgent;
      setTasks(updatedTasks);
    }
  };

  const handleAddTask = (newTask) => {
    if (selectedTeam !== null) {
      // Add the new task to the selected team
      const updatedTasks = [...tasks];
      updatedTasks[selectedTeam].tasks.push({
        ...newTask,
        createdBy: username,
        userId: userid,
        isChecked: false
      });
      setTasks(updatedTasks);
      setShowTeamForm(false);
    } else {
      // Add to personal tasks
      const updatedPersonalTasks = [...personalTasks];
      updatedPersonalTasks.push({
        ...newTask,
        isChecked: false
      });
      setPersonalTasks(updatedPersonalTasks);
      setShowPersonalForm(false);
    }
  };

  const getTaskClassName = (task) => {
    if (task.isUrgent) {
      return 'urgent-task';
    } else if (task.status === 'Help') {
      return 'help-task';
    }
    return '';
  };

  const handleCreateTeam = (teamName, userIds) => {
    const newTeam = {
      teamName,
      tasks: [], // Initialize with an empty task list or any default tasks
    };
    setTasks([...tasks, newTeam]);
    setIsCreatingTeam(false); // Close the form after creating the team
  };


  return (
    <div className="container mt-5 user-page">
      <h1 className="text-center mb-4">Welcome, {username}!</h1>
      <p className="text-center mb-4">Your User ID: <strong>{userid}</strong></p>
        {/* Button to open the team creation form */}
        <div className="text-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setIsCreatingTeam(true)}
        >
          Create New Team
        </button>
      </div>

      {/* Conditionally render the team creation form */}
      {isCreatingTeam && (
        <TeamCreationForm
          onCreateTeam={handleCreateTeam}
          onCancel={() => setIsCreatingTeam(false)}
        />
      )}


      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-3">Personal Tasks</h2>
          <ul className="list-group mb-4">
            {personalTasks.map((task, index) => (
              <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${getTaskClassName(task)} ${task.isEliminating ? 'eliminating-task' : ''}`}>
                <div className="d-flex flex-grow-1 align-items-center">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    id={`personalCheckbox${index}`}
                    checked={task.isChecked}
                    onChange={() => handleCheckboxChange(null, index, true)}
                  />
                  <label className="form-check-label" htmlFor={`personalCheckbox${index}`}>
                    {task.task}
                  </label>
                </div>
                <div>
                  <button
                    className={`btn ${task.isUrgent ? 'btn-danger' : 'btn-outline-danger'} ms-2`}
                    onClick={() => handleUrgencyToggle(null, index, true)}
                    aria-label="Mark as urgent"
                  >
                    Urgent
                  </button>
                </div>
                <div>
                  <select
                    className="form-select ms-2"
                    value={task.status}
                    onChange={(e) => handleStatusChange(null, index, e.target.value, true)}
                  >
                    <option value="Doing">Doing</option>
                    <option value="Help">Help</option>
                    <option value="Complete">Complete</option>
                    <option value="Eliminate">Eliminate</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={() => setShowPersonalForm(!showPersonalForm)}
            >
              {showPersonalForm ? 'Cancel' : 'Add Personal Task'}
            </button>
          </div>
          {showPersonalForm && (
            <AddTaskForm onAddTask={handleAddTask} onCancel={() => setShowPersonalForm(false)} />
          )}
        </div>

        <div className="col-12">
          <h2 className="text-center mb-3">Team Tasks</h2>
          {tasks.map((team, teamIndex) => (
            <div key={teamIndex} className="mb-4">
              <h3 className="text-center mb-3">{team.teamName}</h3>
              <ul className="list-group mb-4">
                {team.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className={`list-group-item d-flex justify-content-between align-items-center ${getTaskClassName(task)} ${task.isEliminating ? 'eliminating-task' : ''}`}>
                    <div className="d-flex flex-grow-1 align-items-center">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        id={`team${teamIndex}Checkbox${taskIndex}`}
                        checked={task.isChecked}
                        onChange={() => handleCheckboxChange(teamIndex, taskIndex)}
                      />
                      <label className="form-check-label" htmlFor={`team${teamIndex}Checkbox${taskIndex}`}>
                        {task.task}
                      </label>
                      <span className="text-muted ms-2">
                        by {task.createdBy}, ID: {task.userId}
                      </span>
                    </div>
                    <div>
                      <button
                        className={`btn ${task.isUrgent ? 'btn-danger' : 'btn-outline-danger'} ms-2`}
                        onClick={() => handleUrgencyToggle(teamIndex, taskIndex)}
                        aria-label="Mark as urgent"
                      >
                        Urgent
                      </button>
                    </div>
                    <div>
                      <select
                        className="form-select ms-2"
                        value={task.status}
                        onChange={(e) => handleStatusChange(teamIndex, taskIndex, e.target.value)}
                      >
                        <option value="Doing">Doing</option>
                        <option value="Help">Help</option>
                        <option value="Complete">Complete</option>
                        <option value="Eliminate">Eliminate</option>
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-center mb-3">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedTeam(teamIndex);
                    setShowTeamForm(!showTeamForm);
                  }}
                >
                  {showTeamForm && selectedTeam === teamIndex ? 'Cancel' : 'Add Team Task'}
                </button>
              </div>
              {showTeamForm && selectedTeam === teamIndex && (
                <AddTaskForm onAddTask={handleAddTask} onCancel={() => setShowTeamForm(false)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;