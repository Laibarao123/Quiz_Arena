

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists with matching email and password
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Save current logged-in user to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home"); // Redirect to home page
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0B2A] to-[#1A0034] text-white">
      <div className="bg-[#1B1B3A]/90 p-8 rounded-3xl shadow-lg shadow-purple-500/30 border border-purple-700/40 w-[90%] sm:w-[400px] text-center">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Welcome to QuizArena
        </h1>
        <p className="text-gray-400 mb-6 text-sm">
          Login to join quizzes and compete with players!
        </p>

        {/* Error Message */}
        {error && <p className="bg-red-500/80 p-2 rounded mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="text-left">
            <label className="block text-gray-300 mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#2B2B4C] text-white border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-gray-300 mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#2B2B4C] text-white border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 font-semibold text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all shadow-md shadow-pink-500/30"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 text-gray-400 text-sm">or</div>

        {/* Create Account */}
        <button
          className="w-full py-3 font-semibold rounded-xl bg-transparent border border-purple-700/40 hover:bg-purple-700/20 transition-all"
          onClick={() => navigate("/register")}
        >
          Create New Account
        </button>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} QuizArena | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
