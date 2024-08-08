import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UserPage from '../../Components/UserPage/UserPage'; // Adjust the path as necessary
import Toolbox from '../../Components/toolbox/toolbox'; // Adjust the path as necessary

import './UserDashboard.css'; // Ensure this path is correct

const UserDashboard = ({ username, userid }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="user-dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <UserPage username={username} userid={userid} />
            </div>
            <div className="col-md-2">
              <Toolbox />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default UserDashboard;
