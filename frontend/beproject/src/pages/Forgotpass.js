
import React, { useState } from 'react';
import axios from 'axios';
import './forgotpass.css';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import ResetPassword from './ResetPassword';
export default function Forgotpass() {
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [redirectToReset, setRedirectToReset] = useState(false); // State to handle redirection
  const navigate = useNavigate(); // Initialize useNavigate hook 

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:4848/auth/forgotpassword', { email });
      setMessage(response.data.message);
      setResetToken(response.data.resetToken);
      setRedirectToReset(true); // Set redirection flag to true
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };


  if (redirectToReset) {
    return <ResetPassword resetToken={resetToken} />; // Make sure resetToken is passed to ResetPasswordForm
  }
  return (
    <div>
    <div className="forgot-password-container">
    <h2>Forgot Password</h2>
    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <button onClick={handleForgotPassword}>Submit</button>
    <p className="message">{message}</p>
  </div>
  </div>
  )
}
