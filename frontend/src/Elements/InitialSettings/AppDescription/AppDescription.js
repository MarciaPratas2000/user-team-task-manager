import React from 'react';

export default function AppDescription() {
  return (
    <div className="container shadow-none  mt-5">
      <h1 className="text-center mb-4">TaskTiles App</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 ">
          <div className=" mb-3">
            <div >
              <ul className="list-group app-description text-muted mb-4 w-90">
                <li className="list-group-item">
                  <span className="icon " role="img" aria-label="checkmark">✔️</span> 
                  Welcome to the best interactive task manager app!
                </li>
                <li className="list-group-item">
                  <span className="icon" role="img" aria-label="wrench">🔧</span> 
                  Built with Node.js and React, it streamlines task management for both individuals and teams.
                </li>
                <li className="list-group-item">
                  <span className="icon" role="img" aria-label="file folder">🗂️</span> 
                  Each user has a personalized space to add, view, and delete tasks, while teams share a workspace to collaborate on goals.
                </li>
                <li className="list-group-item">
                  <span className="icon" role="img" aria-label="star">🌟</span> 
                  Our vision is a seamless experience with easy authentication and an intuitive interface.
                </li>
                <li className="list-group-item">
                  <span className="icon" role="img" aria-label="rocket">🚀</span> 
                  <strong>Join us now</strong> and transform how you manage tasks and collaborate with your team!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
