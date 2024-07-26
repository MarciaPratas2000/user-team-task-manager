import React from 'react';
import UserPage from '../../Components/UserPage/UserPage'; // Correct path
import './UserDashboard.css'; // Ensure this path is correct

const UserDashboard = ({ username, userid }) => {
  return (
    <div className="user-dashboard">
      <div className="container">
        <UserPage username={username} userid={userid} />
      </div>
    </div>
  );
};

export default UserDashboard;
