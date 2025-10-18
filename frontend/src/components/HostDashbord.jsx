import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, List, PlayCircle } from "lucide-react";

const HostDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Create Quiz",
      description: "Build and customize a new quiz with your own questions.",
      icon: <PlusCircle size={40} className="text-blue-400" />,
      path: "/Createquiz",
      hover: "hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] hover:border-blue-400",
    },
    {
      title: "Manage Questions",
      description: "Add, edit, or delete quiz questions easily.",
      icon: <List size={40} className="text-green-400" />,
      path: "/Questionmanager",
      hover: "hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:border-green-400",
    },
    {
      title: "Start Quiz Room",
      description: "Host a live quiz session and invite participants.",
      icon: <PlayCircle size={40} className="text-purple-400" />,
      path: "/Quizroomhostviw",
      hover: "hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:border-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e10] flex flex-col items-center justify-center px-6 py-10 text-gray-200">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Host Dashboard
        </h1>
        <p className="text-gray-400 text-base">
          Manage your quizzes, questions, and live sessions — all in one place.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`group cursor-pointer bg-gray-800/70 border border-gray-700 rounded-2xl p-8 transition-all duration-300 
              hover:-translate-y-1 ${card.hover} backdrop-blur-md`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-gray-700/40 rounded-full group-hover:scale-105 transition-transform">
                {card.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-100">{card.title}</h2>
              <p className="text-gray-400 text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostDashboard;
