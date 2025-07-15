import React, { useState } from 'react';
import API from '../utils/api';


const Register = () => {
  const [form,setForm]= useState({name:'',email:'',password:''})
  const handleRegister= async (e)=>{
    e.preventDefault();
    try {
      const res= await API.post('/register',form)
       alert("Registered !You can now login")
       console.log(res.data)
    } catch (err  ) {
       alert(err.response?.data?.message || "Registration failed");
    }
  }
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
};

export default Register;
