import React from 'react'
import'../pages/signup.css'
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
      confirmPassword
    };

    try {
      const response = await axios.post('http://localhost:4848/auth/newuser', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('Signed up successfully!');
        // Redirect to login page or handle successful signup
        navigate('/dashboard') // Assuming '/dashboard' is the route for the dashboard
      } else {
        setErrorMessage('Error signing up. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
    <form onSubmit={handleSubmit} className="signup-form">
      <h1>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <button type="submit" className="submit-btn">Sign Up</button>
      <p className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </form>
  </div>
);
  
}
