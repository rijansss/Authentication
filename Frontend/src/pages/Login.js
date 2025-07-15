import React, { useState,useContext} from "react";
import API from "../utils/api";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


//Login an user
const Login = () => {
  const [form,setForm]=useState({email:"", password:""});
  const{login}= useContext(AuthContext);  
    const navigate = useNavigate();


    const handleSubmit =async(e)=>{
      e.preventDefault();
      try {
          const res = await API.post('/login', form);
          login(res.data.token)
             alert('✅ Logged in');
      navigate('/dashboard');
      } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

 

   return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;