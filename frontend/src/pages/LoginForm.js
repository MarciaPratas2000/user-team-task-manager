// LoginForm.js
import React from 'react';

export default function LoginForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="mb-3">
        <label htmlFor="login-username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="login-username"
          name="username"
          value={props.loginData.username}
          onChange={props.onInputChange}
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
          value={props.loginData.userid}
          onChange={props.onInputChange}
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
          value={props.loginData.password}
          onChange={props.onInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-75 mb-3">Login</button>
      <button type="button" className="btn btn-secondary w-75 mb-3" onClick={props.goBack}>Go Back to Initial page</button>

    </form>
  );
}
