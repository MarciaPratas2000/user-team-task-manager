import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Login page component
import UserPage from './pages/UserPage'; // User tasks page component
import TeamPage from './pages/TeamPage'; // Team tasks page component
import PrivateRoute from './components/PrivateRoute'; // Private route component

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/tasks" element={<UserPage />} />
            <Route path="/team-tasks" element={<TeamPage />} />
          </Route>
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
