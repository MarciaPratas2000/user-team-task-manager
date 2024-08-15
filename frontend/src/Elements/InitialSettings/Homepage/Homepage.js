import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'; // Ensure the path is correct
import RegisterForm from './RegisterForm'; // Ensure the path is correct
import './Homepage.css'; // Ensure the CSS path is correct
import AppDescription from '../AppDescription/AppDescription'; // Ensure the path is correct

export default function Homepage() {
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [showFormRegister, setShowFormRegister] = useState(false);
  const [showAppDescription, setShowAppDescription] = useState(false); // State to control AppDescription

  const [loginData, setLoginData] = useState({ username: '', userid: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    setShowFormLogin(true);
    setShowFormRegister(false);
    setShowAppDescription(false); // Hide AppDescription when login form is shown
  };

  const handleRegisterClick = () => {
    setShowFormRegister(true);
    setShowFormLogin(false);
    setShowAppDescription(false); // Hide AppDescription when register form is shown
  };

  const handleAppDescription = () => {
    setShowAppDescription(!showAppDescription); // Toggle AppDescription visibility
    setShowFormLogin(false);
    setShowFormRegister(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (showFormRegister) {
      setRegisterData(prevData => ({ ...prevData, [name]: value }));
    } else if (showFormLogin) {
      setLoginData(prevData => ({ ...prevData, [name]: value }));
    }
  };
  const handleHomeClick = () => {
    setShowFormLogin(false);
    setShowFormRegister(false);
    setShowAppDescription(false);
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
    setShowAppDescription(true); // Show AppDescription when forms are hidden
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <button className="navbar-brand" href="#">logotipo</button>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <button className="nav-link" href="./" onClick={handleHomeClick}>Home</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleAppDescription}>About TaskTiles</button>
            </li>
            <li className="nav-item">
              <button className="nav-link"  onClick={handleLoginClick}>Login</button>
            </li>
            <li className="nav-item">
              <button className="nav-link"  onClick={handleRegisterClick}>Register</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="Homepage">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card shadow-none mb-3">
              <div>
                {showAppDescription && (
                  <AppDescription />
                )}
                {!showFormLogin && !showFormRegister && !showAppDescription && (
                  <>
                    <div className="d-flex flex-column align-items-center">
                      <h1>TaskTiles App</h1>
                      <h3 className='text-muted m-2'> 👋 Welcome to your task and team management app</h3>
                      <button className="btn btn-login w-25 mt-3  mb-3" onClick={handleLoginClick}>
                        Login
                      </button>
                      <button className="btn border btn-register w-25  mb-3" onClick={handleRegisterClick}>
                        Register
                      </button>
                    </div>
                  </>
                )}
                {showFormRegister && (
                  <RegisterForm
                    registerData={registerData}
                    onInputChange={handleInputChange}
                    onSubmit={handleRegisterSubmit}
                    goBack={handleGoBack}
                  />
                )}
                {showFormLogin && (
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
