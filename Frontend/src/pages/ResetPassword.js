import React, { useState } from 'react';
import API from '../utils/api';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/reset-password/${token}`, { password });
      alert("Password updated! You can now log in");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleReset}>
        <input type="password" placeholder="New Password" className="border p-2 w-full mb-2"
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
