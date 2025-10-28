
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Users,
  BarChart3,
  Activity,
  TrendingUp,
  Target,
  Crown,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveQuizAnalytics() {
  const navigate = useNavigate();

  const [participants, setParticipants] = useState([
    { name: "Alice", score: 85, id: 1 },
    { name: "Bob", score: 70, id: 2 },
    { name: "Charlie", score: 92, id: 3 },
    { name: "Diana", score: 66, id: 4 },
    { name: "Ethan", score: 78, id: 5 },
    { name: "Fiona", score: 95, id: 6 },
    { name: "George", score: 82, id: 7 },
  ]);

  const [accuracyData, setAccuracyData] = useState([
    { name: "Q1", accuracy: 80 },
    { name: "Q2", accuracy: 60 },
    { name: "Q3", accuracy: 90 },
    { name: "Q4", accuracy: 75 },
    { name: "Q5", accuracy: 88 },
    { name: "Q6", accuracy: 72 },
    { name: "Q7", accuracy: 85 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants((prev) =>
        prev.map((p) => ({
          ...p,
          score: Math.min(100, Math.max(0, p.score + (Math.random() * 6 - 3))),
        }))
      );

      setAccuracyData((prev) =>
        prev.map((d) => ({
          ...d,
          accuracy: Math.min(
            100,
            Math.max(50, d.accuracy + (Math.random() * 4 - 2))
          ),
        }))
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const totalParticipants = participants.length;
  const avgScore = (
    participants.reduce((sum, p) => sum + p.score, 0) / totalParticipants
  ).toFixed(1);
  const highestScore = Math.max(...participants.map((p) => p.score));
  const lowestScore = Math.min(...participants.map((p) => p.score));

  const scoreDistribution = participants.map((p) => ({
    name: p.name,
    score: p.score,
  }));

  const COLORS = [
    "#a855f7",
    "#c084fc",
    "#8b5cf6",
    "#d946ef",
    "#9333ea",
    "#a855f7",
    "#c026d3",
  ];

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-500";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-600";
      default:
        return "bg-gradient-to-r from-purple-400 to-purple-500";
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-4 h-4 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-4 h-4 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-4 h-4 text-amber-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/host")}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Host
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold shadow-sm"
        >
          <Activity className="w-5 h-5" />
          LIVE ANALYTICS
        </motion.div>
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-2">
          Live Quiz Analytics
        </h1>
        <p className="text-gray-600 text-lg">
          Real-time insights into quiz performance and participants
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: <Users className="w-8 h-8 text-purple-600" />,
            label: "Total Participants",
            value: totalParticipants,
          },
          {
            icon: <Target className="w-8 h-8 text-purple-600" />,
            label: "Average Score",
            value: `${avgScore}%`,
          },
          {
            icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
            label: "Score Range",
            value: `${lowestScore} - ${highestScore}`,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white border border-purple-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-100 rounded-xl">{stat.icon}</div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <h2 className="text-2xl font-bold text-purple-700">
                  {stat.value}
                </h2>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-purple-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" /> Score Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
              <XAxis dataKey="name" stroke="#6b21a8" />
              <YAxis stroke="#6b21a8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e9d5ff",
                  borderRadius: "10px",
                  color: "#6b21a8",
                }}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-purple-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" /> Question Accuracy
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
              <XAxis dataKey="name" stroke="#6b21a8" />
              <YAxis stroke="#6b21a8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e9d5ff",
                  borderRadius: "10px",
                  color: "#6b21a8",
                }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ r: 5, stroke: "#a855f7", fill: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-purple-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Live Leaderboard
          </h3>
          <span className="text-sm text-gray-500">Updates every 2.5s</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-purple-100">
                <th className="py-3 px-4 text-left font-medium">Rank</th>
                <th className="py-3 px-4 text-left font-medium">Participant</th>
                <th className="py-3 px-4 text-right font-medium">Score</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {participants
                  .sort((a, b) => b.score - a.score)
                  .map((p, index) => (
                    <motion.tr
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-purple-50 hover:bg-purple-50/50 transition-all"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full ${getRankColor(
                              index + 1
                            )} flex items-center justify-center text-white text-sm font-bold`}
                          >
                            {index + 1}
                          </div>
                          {getRankIcon(index + 1)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700 font-medium">
                        {p.name}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-purple-700 font-semibold">
                            {p.score.toFixed(1)}%
                          </span>
                          <div className="w-20 bg-purple-100 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 transition-all duration-500"
                              style={{ width: `${p.score}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
