import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = ({ users }) => {
  return (
    <ul className="list-group">
      {users.map(user => (
        <li className="list-group-item" key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
