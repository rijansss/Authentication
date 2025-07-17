import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const{logout,userRole}= useContext(AuthContext)

 return (
    <div style={{ padding: '2rem' }}>
      <h2> Welcome to your dashboard, Rijans!</h2>
      <button onClick={logout}>🚪 Logout</button>
      {userRole==='admin'?(
        <Link to="/admin">Go to Admin Panel</Link>
      ):(
        <p>You are a regular user.</p>
      )}
    </div>
  );  
};

export default Dashboard;
