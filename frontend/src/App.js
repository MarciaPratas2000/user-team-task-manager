import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Elements/InitialSettings/Homepage/Homepage'; // Ensure this matches the actual file name and path
import RegistrationSuccess from './Elements/InitialSettings/RegistrationSuccess/RegistrationSuccess'; // Ensure this matches the actual file name and path
import UserDashboard from './Elements/InitialSettings/UserDashboard/UserDashboard'; // Ensure this matches the actual file name and path
import LoginForm from './Elements/InitialSettings/Homepage//LoginForm'; // Import the LoginForm component

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} /> {/* Add this route */}
        <Route path="/register" element={<Homepage isRegistering />} />
        <Route path="/registration-success" element={<RegistrationSuccess username="JohnDoe" />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
