import React from "react";
import { Users, FileText, Settings, Home, LogOut } from "lucide-react";

       import { Link } from "react-router-dom";
import SystemMonitor from "./SystemMonitor";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-purple-800 text-white flex flex-col">
        <div className="p-6 text-center font-bold text-xl border-b border-purple-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full">
            <Home size={20} /> Dashboard
          </button>


<Link to="/AnnouncementManager" className="w-full">
  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full text-white transition">
    <FileText size={20} /> Announcemnet Manager
  </button>
</Link>

<Link to="/ContentModeration" className="w-full">
  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full text-white transition">
    <FileText size={20} /> Content Moderation
  </button>
</Link>


<Link to="/RoleManagement" className="w-full">
  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full text-white transition">
    <FileText size={20} /> Role Management
  </button>
</Link>


<Link to="/NotificationManager" className="w-full">
  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full text-white transition">
    <FileText size={20} /> Notification Manager
  </button>
</Link>


<Link to="/FeedbackCenter" className="w-full">
  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full text-white transition">
    <FileText size={20} /> FeedBack Center
  </button>
</Link>

<Link to="/ActivityLogs" className="w-full">
  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full text-white transition">
    <FileText size={20} /> Activity Logs
  </button>
</Link>
<Link to="/UserManagement" className="w-full">
  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full text-white transition">
    <FileText size={20} /> User Management
  </button>
</Link>



          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full">
            <Settings size={20} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-purple-700">
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-700 w-full">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

        {/* 🔹 Integrate Analytics component here */}
        
        
<SystemMonitor/>

        {/* Stats cards */}
        <div  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-6">
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Total Quizzes</h2>
            <p className="text-3xl font-bold text-purple-700 mt-2">12</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Total Players</h2>
            <p className="text-3xl font-bold text-purple-700 mt-2">45</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Active Quizzes</h2>
            <p className="text-3xl font-bold text-purple-700 mt-2">3</p>
          </div>
        </div>




        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Player John joined Quiz A</li>
            <li>Quiz B created by Admin</li>
            <li>Player Alice completed Quiz C</li>
            <li>Quiz D results published</li>
          </ul>
        </div>
      </div>
    </div>
    
  );
};

export default AdminDashboard;
