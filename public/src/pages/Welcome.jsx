import React from 'react';
import "./Welcome.css";

export default function Welcome({ user }) {
  return (
    <div className="welcome-container">
      <img
        src="https://media.giphy.com/media/VgVeEPkHdY16fDZlsC/giphy.gif"
        alt="Robot Animation"
        width="480"
        height="322"
      />
      {user ? (
        <div className="welcome-message">
          <h1>
            Welcome, <span className="username">{user.username}</span>
          </h1>
        </div>
      ) : null}
      <h3>Please select a chat to start messaging</h3>
    </div>
  );
}
