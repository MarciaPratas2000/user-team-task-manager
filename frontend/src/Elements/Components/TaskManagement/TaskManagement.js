import { useState } from 'react';
import { createUniqueId } from '../taskUtils/taskUtils';

const useTaskManagement = (initialTeams, initialPersonalTasks, userid, username) => {
  const [teams, setTeams] = useState(initialTeams);
  const [personalTasks, setPersonalTasks] = useState(initialPersonalTasks);

  const handleCheckboxChange = (teamIndex, taskIndex, isPersonal = false) => {
    if (isPersonal) {
      setPersonalTasks((prevTasks) =>
        prevTasks.map((task, index) =>
          index === taskIndex ? { ...task, isChecked: !task.isChecked } : task
        )
      );
    } else {
      setTeams((prevTeams) =>
        prevTeams.map((team, index) =>
          index === teamIndex
            ? {
                ...team,
                tasks: team.tasks.map((task, tIndex) =>
                  tIndex === taskIndex ? { ...task, isChecked: !task.isChecked } : task
                ),
              }
            : team
        )
      );
    }
  };

  const handleStatusChange = (teamIndex, taskIndex, newStatus, isPersonal = false) => {
    if (newStatus === 'Eliminate') {
      const isConfirmed = window.confirm('Are you sure you want to delete this task?');
      if (!isConfirmed) return;
    }

    const updateTaskStatus = (tasks) =>
      newStatus === 'Eliminate'
        ? tasks.filter((_, index) => index !== taskIndex)
        : tasks.map((task, index) =>
            index === taskIndex ? { ...task, status: newStatus } : task
          );

    if (isPersonal) {
      setPersonalTasks(updateTaskStatus);
    } else {
      setTeams((prevTeams) =>
        prevTeams.map((team, index) =>
          index === teamIndex
            ? { ...team, tasks: updateTaskStatus(team.tasks) }
            : team
        )
      );
    }
  };

  const handleUrgencyToggle = (teamIndex, taskIndex, isPersonal = false) => {
    const toggleUrgency = (tasks) =>
      tasks.map((task, index) =>
        index === taskIndex ? { ...task, isUrgent: !task.isUrgent } : task
      );

    if (isPersonal) {
      setPersonalTasks(toggleUrgency);
    } else {
      setTeams((prevTeams) =>
        prevTeams.map((team, index) =>
          index === teamIndex ? { ...team, tasks: toggleUrgency(team.tasks) } : team
        )
      );
    }
  };

  const handleAddTask = (newTask, teamIndex = null) => {
    const taskWithId = { ...newTask, id: createUniqueId(), userName: username, userId: userid };
    if (teamIndex !== null) {
      setTeams((prevTeams) =>
        prevTeams.map((team, index) =>
          index === teamIndex ? { ...team, tasks: [...team.tasks, taskWithId] } : team
        )
      );
    } else {
      setPersonalTasks((prevTasks) => [...prevTasks, taskWithId]);
    }
  };

  const handleUpdateTask = (taskIndex, teamIndex, updatedTask, isPersonal) => {
    const updateTasks = (tasks) =>
      tasks.map((task, index) => (index === taskIndex ? { ...task, ...updatedTask } : task));

    if (isPersonal) {
      setPersonalTasks(updateTasks);
    } else {
      setTeams((prevTeams) =>
        prevTeams.map((team, index) =>
          index === teamIndex ? { ...team, tasks: updateTasks(team.tasks) } : team
        )
      );
    }
  };

  const handleAddComment = (teamIndex, taskIndex, comment, isPersonal) => {
    const addComment = (tasks) =>
      tasks.map((task, index) =>
        index === taskIndex ? { ...task, comments: [...(task.comments || []), comment] } : task
      );

    if (isPersonal) {
      setPersonalTasks(addComment);
    } else {
      setTeams((prevTeams) =>
        prevTeams.map((team, index) =>
          index === teamIndex ? { ...team, tasks: addComment(team.tasks) } : team
        )
      );
    }
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    console.log('Drag result:', result);
    console.log('Source droppableId:', source?.droppableId);
    console.log('Destination droppableId:', destination?.droppableId);
    console.log('DraggableId:', result.draggableId);
    console.log('Source index:', source?.index);
    console.log('Destination index:', destination?.index);
  
    // If no destination, exit the function
    if (!destination) {
      console.log('Drag ended with no valid destination');
      return;
    }
  
    // Determine if the source and destination are team tasks
    const isSourceTeam = source.droppableId.startsWith('teamTasks-');
    const isDestinationTeam = destination.droppableId.startsWith('teamTasks-');
  
    console.log('Is source team:', isSourceTeam);
    console.log('Is destination team:', isDestinationTeam);
  
    // Extract team indices
    const sourceTeamIndex = isSourceTeam
      ? parseInt(source.droppableId.split('-')[1], 10)
      : null;
    const destinationTeamIndex = isDestinationTeam
      ? parseInt(destination.droppableId.split('-')[1], 10)
      : null;
  
    console.log('Source Team Index:', sourceTeamIndex);
    console.log('Destination Team Index:', destinationTeamIndex);
  
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'personalTasks') {
        // Moving within personal tasks
        const startIndex = source.index;
        const endIndex = destination.index;
  
        const updatedPersonalTasks = [...personalTasks];
        const [movedTask] = updatedPersonalTasks.splice(startIndex, 1);
        updatedPersonalTasks.splice(endIndex, 0, movedTask);
  
        console.log('Updated personalTasks:', updatedPersonalTasks);
        setPersonalTasks(updatedPersonalTasks);
      } else if (isSourceTeam) {
        // Moving within team tasks
        const startIndex = source.index;
        const endIndex = destination.index;
  
        const updatedTeams = [...teams];
        const [movedTask] = updatedTeams[sourceTeamIndex].tasks.splice(startIndex, 1);
        updatedTeams[sourceTeamIndex].tasks.splice(endIndex, 0, movedTask);
  
        console.log('Updated team tasks:', updatedTeams[sourceTeamIndex].tasks);
        setTeams(updatedTeams);
      }
    } else {
      if (isSourceTeam && destination.droppableId === 'personalTasks') {
        // From team to personal
        const taskIndex = source.index;
  
        const taskToMove = teams[sourceTeamIndex]?.tasks[taskIndex];
        if (!taskToMove) {
          console.error('Task to move is undefined');
          return;
        }
  
        // Check if the user is allowed to move the task
        if (taskToMove.userId === userid || teams[sourceTeamIndex].creatorId === userid) {
          const duplicatedTask = { ...taskToMove, id: `task-${createUniqueId}` };
  
          const updatedTeams = [...teams];
          updatedTeams[sourceTeamIndex].tasks = updatedTeams[sourceTeamIndex].tasks.filter((_, index) => index !== taskIndex);
  
          console.log('Updated team tasks:', updatedTeams[sourceTeamIndex].tasks);
          console.log('Duplicated task:', duplicatedTask);
  
          setTeams(updatedTeams);
          setPersonalTasks(prevTasks => [...prevTasks, duplicatedTask]);
        } else {
          console.error('You do not have permission to move this task');
        }
      } else if (source.droppableId === 'personalTasks' && isDestinationTeam) {
        // From personal to team
        const taskIndex = source.index;
  
        if (taskIndex >= personalTasks.length) {
          console.error('Invalid personal task index:', taskIndex);
          return;
        }
  
        const taskToMove = personalTasks[taskIndex];
        if (!taskToMove) {
          console.error('Task to move is undefined');
          return;
        }
  
        // Check if the user is allowed to add the task to the team
        if (teams[destinationTeamIndex]?.creatorId === userid) {
          const duplicatedTask = { ...taskToMove, id: `task-${createUniqueId}` };
  
          const updatedPersonalTasks = [...personalTasks];
          updatedPersonalTasks.splice(taskIndex, 1);
  
          console.log('Updated personal tasks:', updatedPersonalTasks);
          console.log('Duplicated task:', duplicatedTask);
  
          setPersonalTasks(updatedPersonalTasks);
          setTeams(prevTeams => {
            const newTeams = [...prevTeams];
            newTeams[destinationTeamIndex].tasks.push(duplicatedTask);
            console.log('Updated team tasks:', newTeams[destinationTeamIndex].tasks);
            return newTeams;
          });
        } else {
          console.error('You do not have permission to add tasks to this team');
        }
      }
    }
  };
  
  
  const handleAddTeam = (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const handleDeleteTeam = (teamIndex) => {
    setTeams((prevTeams) => prevTeams.filter((_, index) => index !== teamIndex));
  };

  return {
    teams,
    personalTasks,
    handleCheckboxChange,
    handleStatusChange,
    handleUrgencyToggle,
    handleAddTask,
    handleUpdateTask,
    handleAddComment,
    handleDragEnd,
    handleAddTeam,
    handleDeleteTeam,
  };
};

export default useTaskManagement;
