// import React from 'react'

// const Forgetpass = () => {
//   return (
//     <div>
//       forget pas
//     </div>
//   )
// }

// export default Forgetpass





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Enter email, 2: Set new password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Step 1: Verify email
  const handleVerifyEmail = (e) => {
    e.preventDefault();
    setError("");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);
    if (user) {
      setStep(2);
    } else {
      setError("Email not found. Please check and try again.");
    }
  };

  // Step 2: Set new password
  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setSuccess("Password updated successfully! You can now login.");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0B2A] to-[#1A0034] text-white">
      <div className="bg-[#1B1B3A]/90 p-8 rounded-3xl shadow-lg shadow-purple-500/30 border border-purple-700/40 w-[90%] sm:w-[400px] text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          {step === 1 ? "Forgot Password" : "Set New Password"}
        </h1>
        <p className="text-gray-400 mb-6 text-sm">
          {step === 1
            ? "Enter your registered email to reset your password."
            : "Enter your new password to update your account."}
        </p>

        {error && <p className="bg-red-500/80 p-2 rounded mb-4">{error}</p>}
        {success && <p className="bg-green-500/80 p-2 rounded mb-4">{success}</p>}

        {step === 1 ? (
          <form onSubmit={handleVerifyEmail} className="space-y-5">
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
            <button
              type="submit"
              className="w-full py-3 mt-2 font-semibold text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all shadow-md shadow-pink-500/30"
            >
              Verify Email
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="text-left">
              <label className="block text-gray-300 mb-1 text-sm">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#2B2B4C] text-white border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div className="text-left">
              <label className="block text-gray-300 mb-1 text-sm">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#2B2B4C] text-white border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 font-semibold text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all shadow-md shadow-pink-500/30"
            >
              Reset Password
            </button>
          </form>
        )}

        <p
          className="mt-5 text-sm text-pink-400 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgetPass;
