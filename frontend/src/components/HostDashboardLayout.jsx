
import React from "react";

import QuizResults from "./QuizResults";
import { Link, useLocation } from "react-router-dom";
import {
  PlusCircle,
  List,
  PlayCircle,
  Settings,
  Award,
  BarChart2,
  Users,
  Bell,
  FileText,
  Archive,
  User,
} from "lucide-react";


const sidebarItems = [
  { title: "Create Quiz", icon: <PlusCircle />, path: "/CreateQuiz" },
  { title: "Manage Questions", icon: <List />, path: "/QuestionManager" },
  { title: "Create Quiz Room", icon: <PlayCircle />, path: "/CreateQuizRoom" },
  { title: "Leaderboard Management", icon: <Award />, path: "/LeaderboardManagement" },
  { title: "Live Quiz Analytics", icon: <BarChart2 />, path: "/LiveQuizAnalytics" },
  { title: "Quiz Template Manager", icon: <FileText />, path: "/QuizTemplateManager" },
  { title: "Invite Participants", icon: <Users />, path: "/InviteParticipants" },
  { title: "Quiz Results", icon: <BarChart2 />, path: "/QuizResults" },
  { title: "Notification Manager", icon: <Bell />, path: "/HostNotificationManager" },
  { title: "Reports Dashboard", icon: <BarChart2 />, path: "/ReportsDashboard" },
  { title: "Host Profile", icon: <User />, path: "/HostProfile" },
  

];

const HostDashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white flex flex-col shadow-lg">
        {/* Sidebar Header */}
        <div className="text-center py-6 font-bold text-2xl tracking-wide border-b border-white/20 bg-gradient-to-b from-purple-900 to-purple-800">
          Quiz Arena
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto mt-4">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg mx-2 my-1 transition-all duration-300
                  ${isActive 
                    ? "bg-white text-purple-800 shadow-md" 
                    : "text-white hover:bg-white hover:text-purple-800 hover:shadow-md"
                  }`}
              >
                {React.cloneElement(item.icon, { size: 20 })}
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-purple-800">Host Dashboard</h1>
          <p className="text-gray-700 mt-2">
            Manage all your quizzes, questions, and live sessions from one place.
          </p>
        </header>
 <QuizResults />
        {/* Render selected component/page */}
        <div>{children}</div>
      </main>
    </div>
  );
};

export default HostDashboardLayout;
