import React, { useState } from 'react';
import UserDashboard from '../UserDashboard/UserDashboard'; // Path to UserDashboard component
import './ResgistrationSucess.css'; // CSS file for RegistrationSuccess

const RegistrationSuccess = (props) => {
  const [startNowClicked, setStartNowClicked] = useState(false);

  const handleStartNow = () => {
    setStartNowClicked(true);
  };

  return (
    <div className="registration-success">
      <div className="container mt-5">
        <h1 className="text-center mb-4">Registration Successful!</h1>
        <p className="text-center mb-4">Welcome, {props.username}!</p>
        <p className="text-center mb-4">Your User ID: <strong>0001</strong></p>

        <div className="text-center mt-4">
          {!startNowClicked ? (
            <button className="btn btn-primary" onClick={handleStartNow}>Start Now</button>
          ) : (
            <UserDashboard username={props.username} userid="0001" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
