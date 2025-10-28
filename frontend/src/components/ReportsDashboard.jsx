// src/components/host/ReportsDashboard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  Download,
  Filter,
  Users,
  Clock,
  BarChart3,
  Award,
} from "lucide-react";

const ReportsDashboard = () => {
  // ---------------- Mock Data ----------------
  const quizSummary = [
    { title: "Total Quizzes", value: 32, icon: <BarChart3 size={22} /> },
    { title: "Total Participants", value: 580, icon: <Users size={22} /> },
    { title: "Avg Score", value: "78%", icon: <Award size={22} /> },
    { title: "Avg Duration", value: "15 mins", icon: <Clock size={22} /> },
  ];

  const scoreTrendData = [
    { month: "Jan", avgScore: 72 },
    { month: "Feb", avgScore: 75 },
    { month: "Mar", avgScore: 81 },
    { month: "Apr", avgScore: 79 },
    { month: "May", avgScore: 83 },
    { month: "Jun", avgScore: 85 },
  ];

  const topQuizzes = [
    { name: "Data Structures", avg: 88 },
    { name: "Algorithms", avg: 84 },
    { name: "Networking", avg: 80 },
    { name: "Operating Systems", avg: 76 },
    { name: "Databases", avg: 79 },
  ];

  const categoryData = [
    { name: "Science", value: 25 },
    { name: "Tech", value: 30 },
    { name: "Math", value: 20 },
    { name: "History", value: 15 },
    { name: "Others", value: 10 },
  ];

  const participantData = [
    { id: 1, name: "Ali Khan", quizzes: 10, avgScore: 85, rank: 1 },
    { id: 2, name: "Sara Ahmed", quizzes: 9, avgScore: 82, rank: 2 },
    { id: 3, name: "Bilal Iqbal", quizzes: 8, avgScore: 79, rank: 3 },
    { id: 4, name: "Ayesha Noor", quizzes: 8, avgScore: 77, rank: 4 },
  ];

  const questionAccuracy = [
    { type: "MCQ", accuracy: 83 },
    { type: "True/False", accuracy: 91 },
    { type: "Fill in Blank", accuracy: 72 },
    { type: "Coding", accuracy: 64 },
  ];

  const COLORS = ["#7C3AED", "#A78BFA", "#C4B5FD", "#E9D5FF", "#DDD6FE"];

  const [filters, setFilters] = useState({
    category: "All",
    duration: "This Month",
  });

  // ---------------- UI ----------------
  return (
    <motion.div
      className="p-6 min-h-screen bg-gradient-to-br from-white to-purple-50 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">
          Reports Dashboard
        </h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-purple-300 text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-lg font-medium transition">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quizSummary.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md border border-purple-100 rounded-2xl p-4 hover:shadow-lg transition-all flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-bold text-purple-700 mt-1">
                {item.value}
              </h2>
            </div>
            <div className="text-purple-600 bg-purple-100 p-3 rounded-xl">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Line Chart: Score Trends */}
        <div className="p-4 bg-white border border-purple-100 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-3">
            Average Score Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={scoreTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgScore"
                stroke="#7C3AED"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Top Quizzes */}
        <div className="p-4 bg-white border border-purple-100 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-3">
            Top Performing Quizzes
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topQuizzes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avg" fill="#A78BFA" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart + Question Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Pie Chart */}
        <div className="p-4 bg-white border border-purple-100 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-3">
            Category Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Question Accuracy */}
        <div className="p-4 bg-white border border-purple-100 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">
            Question Type Accuracy
          </h2>
          <div className="space-y-3">
            {questionAccuracy.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1 text-sm text-gray-600">
                  <span>{item.type}</span>
                  <span>{item.accuracy}%</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${item.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Participant Insights */}
      <div className="p-4 bg-white border border-purple-100 rounded-2xl shadow-md mb-10">
        <h2 className="text-lg font-semibold text-purple-700 mb-4">
          Participant Insights
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-purple-100 text-purple-700">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Quizzes Taken</th>
                <th className="py-2 px-4 text-left">Avg Score</th>
                <th className="py-2 px-4 text-left">Rank</th>
              </tr>
            </thead>
            <tbody>
              {participantData.map((p) => (
                <tr key={p.id} className="border-b hover:bg-purple-50">
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4">{p.quizzes}</td>
                  <td className="py-2 px-4">{p.avgScore}%</td>
                  <td className="py-2 px-4 font-semibold text-purple-700">
                    #{p.rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights (Mock) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          "Your quiz completion rate improved by 12% this month.",
          "Tech quizzes received the highest participation.",
          "Average participant accuracy increased by 8%.",
        ].map((msg, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-purple-100 to-white border border-purple-200 p-4 rounded-xl shadow-sm text-gray-700"
          >
            💡 {msg}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ReportsDashboard;




