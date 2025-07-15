import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const{logout}= useContext(AuthContext)
 return (
    <div style={{ padding: '2rem' }}>
      <h2> Welcome to your dashboard, Rijans!</h2>
      <button onClick={logout}>🚪 Logout</button>
    </div>
  );
};

export default Dashboard;
