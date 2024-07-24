import React, { useState } from 'react';
import '../pages/Login.css'; // Import CSS file
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4848/auth/login', {
        email,
        password
      });

      // Check if login was successful
      if (response.data.success) {
        // Handle successful login (e.g., redirect to dashboard)
        console.log('Login successful');
        navigate('/dashboard')
      } else {
        // If login failed, display error message
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error (e.g., display a generic error message)
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  }
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Welcome Back!</h1>
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

        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        <button type="submit" className="submit-btn">Login</button>
        <Link to="/ForgotPass" className="forgot-password">Forgot Passward</Link>
       
      </form>
    </div>
  );
}

export default LoginPage;
