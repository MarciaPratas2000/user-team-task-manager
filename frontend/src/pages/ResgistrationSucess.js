import React, { useState } from 'react';
import UserPage from './UserPage';
import './ResgistrationSucess.css'; // Ensure this CSS file exists for styling
import './UserPage.css'; // Ensure this CSS file exists for styling

const RegistrationSuccess = (props) => {
  const [startNowClicked, setStartNowClicked] = useState(false); // State to control navigation

  const handleStartNow = () => {
    setStartNowClicked(true); // Set the state to true when the button is clicked
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
            <UserPage username={props.username} userid="0001" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
