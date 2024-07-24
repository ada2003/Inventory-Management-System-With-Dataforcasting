import React from 'react';
import '../pages/Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="landing-page">
      <nav className="navbar">
      <div>
          <div className="website-name">Inventory Tracker</div>
        </div>
        <div className="navbar-buttons">
          <Link to="/signup" className="btn">Sign Up</Link>
          <Link to="/login" className="btn">Sign In</Link>
        </div>
      </nav>
      <div className="content">
        <h1>Inventory Management System</h1>
        <p>Welcome to our Inventory Management System. Manage your inventory with ease.</p>
      </div>
    </div>
  )
}
