import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeamList = ({ teams }) => {
  return (
    <ul className="list-group">
      {teams.map(team => (
        <li className="list-group-item" key={team.id}>
          <input className="form-check-input me-1" type="checkbox" aria-label={team.name} />
          {team.name}
        </li>
      ))}
    </ul>
  );
};

export default TeamList;
