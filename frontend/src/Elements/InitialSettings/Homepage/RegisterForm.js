import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm({ onSubmit, goBack }) {
  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(registerData); // Ensure onSubmit can handle async operations if needed
      // Navigate to the registration success page
      navigate('/registration-success', { state: { username: registerData.username } });
    } catch (error) {
      console.error('Registration failed:', error);
      // Optionally handle errors here, e.g., display an error message
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="register-username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="register-username"
          name="username"
          value={registerData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="register-password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="register-password"
          name="password"
          value={registerData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-75 mb-3">Register</button>
      <button type="button" className="btn btn-secondary w-75 mb-3" onClick={goBack}>Go Back</button>
    </form>
  );
}
