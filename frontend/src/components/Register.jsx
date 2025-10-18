import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password, confirmPassword } = formData;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      setError("User with this email already exists!");
      return;
    }

    // Save user locally
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 2000);

    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0f052e] to-[#1a103d] text-white">
      <div className="bg-[#1c1242] bg-opacity-90 p-8 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.5)] w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Create Your Account
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Join QuizArena and start competing!
        </p>

        {error && (
          <p className="text-red-400 text-center mb-3 font-medium">{error}</p>
        )}
        {success && (
          <p className="text-green-400 text-center mb-3 font-medium">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#2a1e55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#2a1e55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#2a1e55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#2a1e55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-5 text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-pink-400 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;