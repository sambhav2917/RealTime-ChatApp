import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css'; // Import CSS file for styling

export default function Home() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1>ChatApp</h1>
        <ul className="navbar-links">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/login')}>Login</li>
          <li onClick={() => navigate('/register')}>Register</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="text-content">
          <h2>Welcome to ChatApp</h2>
          <p>Discover new possibilities with us. Start your journey today!</p>
          <button className="get-started-button" onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 ChatApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
