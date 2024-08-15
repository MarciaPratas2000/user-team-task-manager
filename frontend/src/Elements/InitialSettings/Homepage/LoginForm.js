import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ onSubmit, goBack }) {
  const [loginData, setLoginData] = useState({ username: '', userid: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e); // Pass the event to the onSubmit prop function
    navigate('/user-dashboard', { state: { username: loginData.username, userid: loginData.userid } });
  };
  return (
    <div className="d-flex justify-content-center align-items-center container shadow-none  ">
      <div className="w-75">
        <h1 className="text-center mb-4">Login here!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="login-username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="login-username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login-userid" className="form-label">User ID</label>
            <input
              type="text"
              className="form-control"
              id="login-userid"
              name="userid"
              value={loginData.userid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="login-password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" row justify-content-center">
            <button type="submit" className="btn btn-login m-3 col-md-4">Login</button>
            <div></div>
            <button type="button" className="btn btn-back  mb-3 col-md-4" onClick={goBack}>Go Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}