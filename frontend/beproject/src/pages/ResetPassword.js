import React, { useState } from 'react';
import axios from 'axios';

export default function ResetPassword({ resetToken }) {
    const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:4848/auth/resetpassword', {
        resetToken,
        newPassword
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

    return (
        <div>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
        {message && <p>{message}</p>}
      </div>
  );
}
