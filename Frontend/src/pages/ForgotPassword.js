import React, { useState } from "react";
import API from "../utils/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/forgot-password", { email });
      alert("Reset link sent! Check your inbox.");
       console.log(res.data.resetUrl); // For testing
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send reset link");
    }
  };
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleForgot}>
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
