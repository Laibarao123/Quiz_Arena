import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Search, ArrowUpDown, Medal } from "lucide-react";

const mockPlayers = [
  { id: 1, name: "Laiba Rao", score: 980, accuracy: 92 },
  { id: 2, name: "Ali Ahmed", score: 940, accuracy: 89 },
  { id: 3, name: "Sara Khan", score: 880, accuracy: 85 },
  { id: 4, name: "Ayesha Noor", score: 850, accuracy: 82 },
  { id: 5, name: "Hamza Malik", score: 800, accuracy: 80 },
  { id: 6, name: "Bilal Iqbal", score: 760, accuracy: 76 },
  { id: 7, name: "Hassan Raza", score: 720, accuracy: 73 },
  { id: 8, name: "Fatima Zafar", score: 700, accuracy: 70 },
];

const Leaderboard = () => {
  const [players, setPlayers] = useState(mockPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    const filtered = mockPlayers
      .filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => (sortBy === "score" ? b.score - a.score : b.accuracy - a.accuracy));

    setPlayers(filtered);
  }, [searchTerm, sortBy]);

  const getMedalColor = (rank) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-purple-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-10 h-10 text-purple-600" />
          <h1 className="text-4xl font-extrabold text-purple-700 tracking-wide">
            Leaderboard
          </h1>
        </div>
        <p className="text-gray-500">See who’s dominating the quiz world 🌟</p>
      </motion.div>

      {/* Search + Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search player..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border border-purple-200 shadow-sm focus:ring-2 focus:ring-purple-300 outline-none bg-white/70"
          />
        </div>

        <button
          onClick={() =>
            setSortBy(sortBy === "score" ? "accuracy" : "score")
          }
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-md hover:from-purple-700 hover:to-indigo-700 transition"
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort by {sortBy === "score" ? "Accuracy" : "Score"}
        </button>
      </div>

      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-purple-100"
      >
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6">Rank</th>
              <th className="py-3 px-6">Player</th>
              <th className="py-3 px-6 text-center">Score</th>
              <th className="py-3 px-6 text-center">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <motion.tr
                key={player.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-purple-100 hover:bg-purple-50/40 transition"
              >
                <td className="py-4 px-6 font-semibold text-center">
                  <span className={getMedalColor(index + 1)}>
                    {index + 1 <= 3 ? (
                      <Medal className="inline w-6 h-6" />
                    ) : (
                      `#${index + 1}`
                    )}
                  </span>
                </td>
                <td className="py-4 px-6 font-medium text-gray-800">
                  {player.name}
                </td>
                <td className="py-4 px-6 text-center font-bold text-purple-700">
                  {player.score}
                </td>
                <td className="py-4 px-6 text-center text-gray-700">
                  {player.accuracy}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-500">
        Rankings refresh automatically after every quiz session 🔄
      </p>
    </div>
  );
};

export default Leaderboard;
