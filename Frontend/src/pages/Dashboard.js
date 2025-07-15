import React from 'react'

const DashBoard = () => {
  const handleLogout =()=>{
    localStorage.removeItem('token ');
    window.location.href='/login';   //redirecting to login page 

  }
 return (
    <div style={{ padding: '2rem' }}>
      <h2> Welcome to your dashboard, Rijans!</h2>
      <button onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
};

export default Dashboard;
