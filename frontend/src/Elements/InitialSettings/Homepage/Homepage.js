import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'; // Ensure the path is correct
import RegisterForm from './RegisterForm'; // Ensure the path is correct
import './Homepage.css'; // Ensure the CSS path is correct

export default function Homepage() {
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [showFormRegister, setShowFormRegister] = useState(false);

  const [loginData, setLoginData] = useState({ username: '', userid: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });

  const navigate = useNavigate(); // Initialize useNavigate

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
    // Navigate to user page with login data
    navigate('/user-dashboard', { state: { username: loginData.username, userid: loginData.userid } });
  };

  const handleRegisterSubmit = async (data) => {
    console.log('Register Data:', data);
    // Navigate to registration success page with username
    navigate('/registration-success', { state: { username: data.username } });
  };

  const handleGoBack = () => {
    setShowFormLogin(false);
    setShowFormRegister(false);
  };

  return (
    <div className="Homepage">
      <div className="container mt-5">
        <h1 className="text-center mb-4">TaskMingle App</h1>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card mb-3">
              <div className="card-body">
                {!showFormLogin && !showFormRegister ? (
                  <>
                    <div>
                      <ul className="list-group app-description text-muted mb-4">
                        <li className="list-group-item">
                          <span className="icon">✔️</span> Welcome to the best interactive task manager app!
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
