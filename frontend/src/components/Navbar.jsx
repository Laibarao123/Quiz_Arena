

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (storedUser && isAuthenticated) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    setUser(null);
    navigate("/login");
  };

  const getInitials = (name = "User") =>
    name
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("")
      .slice(0, 2);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-xl bg-gradient-to-r from-[#0A0A1F] via-[#1E003E] to-[#0A0A1F] border-b border-[#8B5CF6]/30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 text-white">

        {/* 🔹 Logo */}
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold font-[Orbitron] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#60A5FA] drop-shadow-[0_0_10px_#7C3AED]">
            QuizArea ⚡
          </h2>
        </div>

        {/* 🔹 Navigation Links */}
        <ul className="hidden md:flex space-x-10 text-[1.05rem] font-bold font-[Poppins]">
          {[
            { name: "Home", path: "/" },
            { name: "Join Quiz", path: "/player" },
            { name: "Leaderboard", path: "/leaderbord" },
            ...(user ? [] : [{ name: "Login", path: "/login" }]),
          ].map((item, i) => (
            <li key={i} className="relative group">
              <Link
                to={item.path}
                className="text-gray-100 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#F472B6] transition-all duration-300"
              >
                {item.name}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-[#7C3AED] to-[#F472B6] group-hover:w-full transition-all duration-500 rounded"></span>
            </li>
          ))}
        </ul>

        {/* 🔹 Right-side Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate("/host")}
            className="px-5 py-2 rounded-lg font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#9333EA] hover:to-[#F472B6] transition duration-300 shadow-lg hover:shadow-xl"
          >
            Host Mode
          </button>

          <button
            onClick={() => navigate("/adminlogin")}
            className="px-5 py-2 rounded-lg font-bold bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] hover:from-[#3B82F6] hover:to-[#9333EA] transition duration-300 shadow-lg hover:shadow-xl"
          >
            Admin
          </button>

          {user && (
            <div className="flex items-center space-x-3 ml-4">
              {/* Avatar */}
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold cursor-pointer hover:scale-110 transition-transform"
                onClick={() => navigate("/profile")}
                title="Go to Profile"
              >
                {getInitials(user.name || user.email)}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-md text-sm font-bold bg-gradient-to-r from-[#EC4899] to-[#7C3AED] hover:from-[#F472B6] hover:to-[#9333EA] transition duration-300 shadow-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* 🔹 Mobile Menu */}
        <div className="md:hidden">
          <button className="text-3xl focus:outline-none text-[#A78BFA] hover:text-[#F472B6] transition duration-300">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
