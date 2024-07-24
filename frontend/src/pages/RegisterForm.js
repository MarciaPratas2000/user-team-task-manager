// RegisterForm.js
import React from 'react';

export default function RegisterForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="mb-3">
        <label htmlFor="register-username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="register-username"
          name="username"
          value={props.registerData.username}
          onChange={props.onInputChange}
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
          value={props.registerData.password}
          onChange={props.onInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-75 mb-3">Register</button>
      <button type="button" className="btn btn-secondary w-75 mb-3" onClick={props.goBack}>Go Back to Initial page</button>

    </form>
  );
}
