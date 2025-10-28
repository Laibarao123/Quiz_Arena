import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  Trophy,
  Clock,
  Star,
  Brain,
  Download,
  Filter,
  ChevronDown,
} from "lucide-react";

const QuizResult = () => {
  // Mock data
  const summaryStats = [
    { title: "Total Participants", value: 25, icon: <Users className="text-purple-500 w-6 h-6" /> },
    { title: "Average Score", value: "82%", icon: <Star className="text-yellow-400 w-6 h-6" /> },
    { title: "Fastest Time", value: "31s", icon: <Clock className="text-purple-500 w-6 h-6" /> },
    { title: "Top Performer", value: "Sarah Khan", icon: <Trophy className="text-yellow-500 w-6 h-6" /> },
  ];

  const questionsData = [
    { id: 1, question: "What is AI?", correctRate: 90, avgTime: "12s", mostChosen: "Artificial Intelligence", difficulty: "Easy" },
    { id: 2, question: "Which of these is a JS framework?", correctRate: 78, avgTime: "18s", mostChosen: "React", difficulty: "Medium" },
    { id: 3, question: "What is 5 + 7 * 2?", correctRate: 65, avgTime: "21s", mostChosen: "24", difficulty: "Hard" },
    { id: 4, question: "Who developed C++?", correctRate: 80, avgTime: "15s", mostChosen: "Bjarne Stroustrup", difficulty: "Medium" },
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah Khan", score: 980, accuracy: "95%", time: "4.2s" },
    { rank: 2, name: "Ahmed Ali", score: 920, accuracy: "91%", time: "5.0s" },
    { rank: 3, name: "Fatima Noor", score: 880, accuracy: "89%", time: "5.5s" },
    { rank: 4, name: "Usman Iqbal", score: 850, accuracy: "86%", time: "6.0s" },
  ];

  const scoreDistribution = [
    { range: "0-50", count: 2 },
    { range: "51-70", count: 5 },
    { range: "71-85", count: 10 },
    { range: "86-100", count: 8 },
  ];

  const performanceTrend = [
    { question: "Q1", avgScore: 88 },
    { question: "Q2", avgScore: 79 },
    { question: "Q3", avgScore: 67 },
    { question: "Q4", avgScore: 81 },
  ];

  const pieData = [
    { name: "Correct", value: 72 },
    { name: "Incorrect", value: 20 },
    { name: "Skipped", value: 8 },
  ];

  const COLORS = ["#a855f7", "#e879f9", "#f5d0fe"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 p-8 transition-all duration-500">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-purple-700">Quiz Results</h1>
          <p className="text-gray-500 mt-1">Detailed performance overview of your quiz session</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-xl shadow hover:bg-purple-700 transition">
          <Download size={18} /> Export Report
        </button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaryStats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            className="p-6 bg-white border border-purple-100 rounded-2xl shadow hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">{item.title}</h3>
              {item.icon}
            </div>
            <p className="text-2xl font-bold text-purple-700">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Score Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white border border-purple-100 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Score Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scoreDistribution}>
              <XAxis dataKey="range" stroke="#7C3AED" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Correct/Incorrect Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white border border-purple-100 rounded-2xl shadow"
        >
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Answer Accuracy</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={50}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Performance Trend */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white border border-purple-100 rounded-2xl shadow mb-10"
      >
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Average Score per Question</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={performanceTrend}>
            <XAxis dataKey="question" stroke="#7C3AED" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="avgScore" stroke="#a855f7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Question-Level Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white border border-purple-100 rounded-2xl shadow mb-10"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-purple-700">Question Analysis</h2>
          <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition text-sm">
            <Filter size={16} /> Sort <ChevronDown size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-purple-100 rounded-xl overflow-hidden">
            <thead className="bg-purple-100 text-purple-700 text-sm">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Question</th>
                <th className="p-3">Correct Rate</th>
                <th className="p-3">Avg. Time</th>
                <th className="p-3">Most Chosen</th>
                <th className="p-3">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {questionsData.map((q) => (
                <tr key={q.id} className="border-b hover:bg-purple-50 transition">
                  <td className="p-3">{q.id}</td>
                  <td className="p-3">{q.question}</td>
                  <td className="p-3 text-center text-purple-700 font-semibold">{q.correctRate}%</td>
                  <td className="p-3 text-center">{q.avgTime}</td>
                  <td className="p-3 text-center">{q.mostChosen}</td>
                  <td className="p-3 text-center">{q.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white border border-purple-100 rounded-2xl shadow"
      >
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-purple-100 rounded-xl overflow-hidden">
            <thead className="bg-purple-100 text-purple-700 text-sm">
              <tr>
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3">Score</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((p) => (
                <tr key={p.rank} className="border-b hover:bg-purple-50 transition">
                  <td className="p-3 font-bold text-purple-700">#{p.rank}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 text-center font-semibold">{p.score}</td>
                  <td className="p-3 text-center">{p.accuracy}</td>
                  <td className="p-3 text-center">{p.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="text-center text-gray-400 text-sm mt-10">
        📊 Mock data visualization — real data integration coming soon!
      </p>
    </div>
  );
};

export default QuizResult;
