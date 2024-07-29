import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationSuccess.css'; // Ensure the CSS path is correct

const RegistrationSuccess = (props) => {
  const { username, userid } = props;
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStartNow = () => {
    navigate('/user-dashboard', { state: { username, userid } });
  };

  return (
    <div className="registration-success">
      <div className="container mt-5">
        <h1 className="text-center mb-4">Registration Successful!</h1>
        <p className="text-center mb-4">Welcome, {username}!</p>
        <p className="text-center mb-4">Your User ID: <strong>{userid}</strong></p>

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleStartNow}>Start Now</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;

