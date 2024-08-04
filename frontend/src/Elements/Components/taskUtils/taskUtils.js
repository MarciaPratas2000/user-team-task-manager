// utils/taskUtils.js

import { v4 as uuidv4 } from 'uuid';

export const createUniqueId = () => uuidv4();

export const moveTaskWithinArray = (array, fromIndex, toIndex) => {
  const updatedArray = [...array];
  const [movedTask] = updatedArray.splice(fromIndex, 1);
  updatedArray.splice(toIndex, 0, movedTask);
  return updatedArray;
};

export const findTeamIndexById = (teams, teamId) => {
  return teams.findIndex((team) => team.id === teamId);
};
