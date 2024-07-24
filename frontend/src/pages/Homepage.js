import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Homepage.css';
import UserPage from './UserPage';
import RegistrationSuccess from './ResgistrationSucess'; // Adjusted based on actual filename

export default function Homepage() {
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [showFormRegister, setShowFormRegister] = useState(false);
  const [showUserPage, setShowUserPage] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  const [loginData, setLoginData] = useState({ username: '', userid: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });

  const handleLoginClick = () => {
    setShowFormLogin(true);
    setShowFormRegister(false);
  };

  const handleRegisterClick = () => {
    setShowFormRegister(true);
    setShowFormLogin(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (showFormRegister) {
      setRegisterData(prevData => ({ ...prevData, [name]: value }));
    } else if (showFormLogin) {
      setLoginData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log('Login Data:', loginData);
    setShowUserPage(true); // Show the user page after login
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    console.log('Register Data:', registerData);
    setShowRegistrationSuccess(true); // Show the registration success page after registration
  };

  const handleGoBack = () => {
    setShowFormLogin(false);
    setShowFormRegister(false);
  };

  if (showUserPage) {
    return <UserPage username={loginData.username} userid={loginData.userid} />;
  }

  if (showRegistrationSuccess) {
    return <RegistrationSuccess username={registerData.username} />;
  }

  return (
    <div className="Homepage">
      <div className="container mt-5">
        <h1 className="text-center mb-4">Task Manager App</h1>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card mb-3">
              <div className="card-body">
                {!showFormLogin && !showFormRegister ? (
                  <>
                    <div>
                      <ul className="list-group app-description text-muted mb-4">
                        <li className="list-group-item">
                          <span className="icon">✔️</span> Welcome to the Task Manager App!
                        </li>
                        <li className="list-group-item">
                          <span className="icon">🔧</span> Built with Node.js and React, it streamlines task management for both individuals and teams.
                        </li>
                        <li className="list-group-item">
                          <span className="icon">🗂️</span> Each user has a personalized space to add, view, and delete tasks, while teams share a workspace to collaborate on goals.
                        </li>
                        <li className="list-group-item">
                          <span className="icon">🌟</span> Our vision is a seamless experience with easy authentication and an intuitive interface.
                        </li>
                        <li className="list-group-item">
                          <span className="icon">🚀</span> <strong>Join us now</strong> and transform how you manage tasks and collaborate with your team!
                        </li>
                      </ul>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <button className="btn btn-primary w-75 mb-3" onClick={handleLoginClick}>
                        Login
                      </button>
                      <button className="btn btn-secondary w-75 mb-3" onClick={handleRegisterClick}>
                        Register
                      </button>
                    </div>
                  </>
                ) : showFormRegister ? (
                  <RegisterForm
                    registerData={registerData}
                    onInputChange={handleInputChange}
                    onSubmit={handleRegisterSubmit}
                    goBack={handleGoBack}
                  />
                ) : (
                  <LoginForm
                    loginData={loginData}
                    onInputChange={handleInputChange}
                    onSubmit={handleLoginSubmit}
                    goBack={handleGoBack}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
