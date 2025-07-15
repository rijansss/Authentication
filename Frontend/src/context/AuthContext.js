import { createContext, useState, useEffect } from 'react';
import decodeToken from '../utils/decodeToken';
export const AuthContext=createContext();

const AuthProvider=({children})=>{

  const[token,setToken]=useState(localStorage.getItem('token'));

  //Auto-Logout on expiry
 useEffect(() => {
    if (!token) return;

    const { exp } = decodeToken(token) || {};
    const now = Date.now() / 1000;

    if (exp && exp < now) {
      logout();
      alert("⚠️ Session expired. Please login again.");
    }
  }, [token]);

    const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  return(
    <AuthContext.Provider value={{token,login,logout}}>{children} </AuthContext.Provider>
  )
}
export default AuthProvider;