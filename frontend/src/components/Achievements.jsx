// // import React, { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Trophy, Lock, Sparkles } from "lucide-react";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   PieChart,
// //   Pie,
// //   Cell,
// // } from "recharts";

// // const mockAchievements = [
// //   { id: 1, title: "Speed Demon", description: "Answer 10 questions in under 2 seconds each.", category: "Speed", xp_reward: 50, status: "unlocked", progress: 10, target: 10, date_earned: "2025-10-21" },
// //   { id: 2, title: "Daily Streak", description: "Play quizzes for 7 consecutive days.", category: "Consistency", xp_reward: 100, status: "locked", progress: 4, target: 7 },
// //   { id: 3, title: "Quiz Master", description: "Score 100% in 5 different quizzes.", category: "Performance", xp_reward: 150, status: "locked", progress: 3, target: 5 },
// //   { id: 4, title: "Science Genius", description: "Complete 5 quizzes in Science category.", category: "Knowledge", xp_reward: 75, status: "unlocked", progress: 5, target: 5, date_earned: "2025-09-15" },
// //   { id: 5, title: "Challenge Accepted", description: "Win 5 friend duels in Challenge Mode.", category: "Community", xp_reward: 120, status: "locked", progress: 1, target: 5 },
// // ];

// // const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a569bd", "#f39c12"];

// // export default function Achievements() {
// //   const [achievements, setAchievements] = useState(mockAchievements);
// //   const [filter, setFilter] = useState("All");
// //   const [sort, setSort] = useState("Default");
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [level, setLevel] = useState(8);
// //   const [xp, setXp] = useState(1200);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setShowPopup(true), 2500);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   const filteredAchievements = filter === "All" ? achievements : achievements.filter(a => a.category === filter);

// //   const sortedAchievements = [...filteredAchievements].sort((a, b) => {
// //     if (sort === "XP") return b.xp_reward - a.xp_reward;
// //     if (sort === "Category") return a.category.localeCompare(b.category);
// //     return a.id - b.id;
// //   });

// //   const categoryData = achievements.reduce((acc, ach) => {
// //     const exist = acc.find(c => c.category === ach.category);
// //     const progressPercent = Math.min((ach.progress / ach.target) * 100, 100);
// //     if (exist) {
// //       exist.progress += progressPercent;
// //       exist.count += 1;
// //     } else {
// //       acc.push({ category: ach.category, progress: progressPercent, count: 1 });
// //     }
// //     return acc;
// //   }, []).map(d => ({ ...d, avg: Math.round(d.progress / d.count) }));

// //   return (
// //     <div className="min-h-screen p-6 bg-gradient-to-br from-[#F3F0FF] via-[#F9F5FF] to-[#FFF8F5] relative overflow-hidden">
// //       {/* Background glows */}
// //       <div className="absolute w-[650px] h-[650px] bg-purple-300 blur-[180px] opacity-20 top-[-100px] left-[-150px]" />
// //       <div className="absolute w-[600px] h-[600px] bg-pink-300 blur-[180px] opacity-20 bottom-[-120px] right-[-150px]" />

// //       {/* Header */}
// //       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
// //         <h1 className="text-3xl font-bold flex items-center gap-2 text-purple-800">
// //           <Trophy className="text-yellow-400" /> Achievements
// //         </h1>
// //         <div className="text-sm text-purple-700 mt-2 md:mt-0">
// //           Level <span className="font-semibold">{level}</span> • <span className="text-indigo-600 font-semibold">{xp}</span> XP
// //         </div>
// //       </div>

// //       {/* Filters */}
// //       <div className="flex flex-wrap gap-3 mb-8 items-center">
// //         {["All", "Speed", "Consistency", "Performance", "Knowledge", "Community"].map(cat => (
// //           <button
// //             key={cat}
// //             onClick={() => setFilter(cat)}
// //             className={`px-4 py-1 rounded-xl text-sm font-medium transition ${
// //               filter === cat ? "bg-purple-600 text-white shadow-md" : "bg-purple-100/50 text-purple-700 hover:bg-purple-100/70"
// //             }`}
// //           >
// //             {cat}
// //           </button>
// //         ))}
// //         <select
// //           value={sort}
// //           onChange={e => setSort(e.target.value)}
// //           className="ml-auto bg-purple-100/50 text-purple-700 rounded-xl p-2 text-sm shadow-sm"
// //         >
// //           <option value="Default">Sort: Default</option>
// //           <option value="XP">Sort by XP</option>
// //           <option value="Category">Sort by Category</option>
// //         </select>
// //       </div>

// //       {/* Achievements Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
// //         {sortedAchievements.map(a => (
// //           <div
// //             key={a.id}
// //             className={`relative p-5 rounded-2xl transition-all duration-200 backdrop-blur-md ${
// //               a.status === "unlocked"
// //                 ? "bg-purple-50/80 border border-purple-300 shadow-lg"
// //                 : "bg-purple-50/40 border border-purple-200"
// //             }`}
// //           >
// //             <div className="flex justify-between items-center mb-2">
// //               <h2 className="text-lg font-semibold text-purple-800">{a.title}</h2>
// //               {a.status === "unlocked" ? <Trophy className="text-yellow-400" /> : <Lock className="text-purple-400" />}
// //             </div>
// //             <p className="text-purple-700/80 text-sm mb-3">{a.description}</p>

// //             {/* Progress Bar */}
// //             <div className="w-full bg-purple-200/30 rounded-full h-2 mb-2">
// //               <div
// //                 className="bg-purple-500 h-2 rounded-full transition-all"
// //                 style={{ width: `${(a.progress / a.target) * 100}%` }}
// //               ></div>
// //             </div>
// //             <span className="text-xs text-purple-700/60">{a.progress}/{a.target}</span>

// //             <div className="flex justify-between items-center mt-3">
// //               <span className="text-xs text-yellow-500 font-semibold">+{a.xp_reward} XP</span>
// //               <span className="text-xs text-purple-700/70">{a.category}</span>
// //             </div>

// //             {a.status === "unlocked" && (
// //               <span className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] px-2 py-1 rounded-full font-semibold">
// //                 Earned
// //               </span>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Graphs */}
// //       <div className="bg-purple-50/80 backdrop-blur-md p-6 rounded-3xl shadow-md">
// //         <h2 className="text-xl font-bold text-purple-800 mb-4">Category Progress Overview</h2>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="category" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Bar dataKey="avg" fill="#8b5cf6" name="Average Progress (%)" />
// //           </BarChart>
// //         </ResponsiveContainer>

// //         <h2 className="text-xl font-bold text-purple-800 mt-10 mb-4">Category XP Distribution</h2>
// //         <ResponsiveContainer width="100%" height={250}>
// //           <PieChart>
// //             <Pie
// //               data={categoryData}
// //               dataKey="avg"
// //               nameKey="category"
// //               cx="50%"
// //               cy="50%"
// //               outerRadius={80}
// //               label
// //             >
// //               {categoryData.map((entry, index) => (
// //                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //               ))}
// //             </Pie>
// //           </PieChart>
// //         </ResponsiveContainer>
// //       </div>

// //       {/* Popup */}
// //       <AnimatePresence>
// //         {showPopup && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -50 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -50 }}
// //             className="fixed top-8 right-8 bg-purple-600 text-white rounded-2xl shadow-lg p-4 flex items-center gap-3 z-50"
// //           >
// //             <Sparkles className="animate-spin text-yellow-400" />
// //             <div>
// //               <h3 className="font-semibold text-lg">New Achievement Unlocked!</h3>
// //               <p className="text-sm text-white/80">🏆 “Quiz Master” — +150 XP</p>
// //             </div>
// //             <button onClick={() => setShowPopup(false)} className="ml-2 text-white text-lg font-bold">
// //               ✕
// //             </button>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Trophy, Lock, Sparkles } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const mockAchievements = [
//   { id: 1, title: "Speed Demon", description: "Answer 10 questions in under 2 seconds each.", category: "Speed", xp_reward: 50, status: "unlocked", progress: 10, target: 10, date_earned: "2025-10-21" },
//   { id: 2, title: "Daily Streak", description: "Play quizzes for 7 consecutive days.", category: "Consistency", xp_reward: 100, status: "locked", progress: 4, target: 7 },
//   { id: 3, title: "Quiz Master", description: "Score 100% in 5 different quizzes.", category: "Performance", xp_reward: 150, status: "locked", progress: 3, target: 5 },
//   { id: 4, title: "Science Genius", description: "Complete 5 quizzes in Science category.", category: "Knowledge", xp_reward: 75, status: "unlocked", progress: 5, target: 5, date_earned: "2025-09-15" },
//   { id: 5, title: "Challenge Accepted", description: "Win 5 friend duels in Challenge Mode.", category: "Community", xp_reward: 120, status: "locked", progress: 1, target: 5 },
// ];

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a569bd", "#f39c12"];

// export default function Achievements() {
//   const [achievements, setAchievements] = useState(mockAchievements);
//   const [filter, setFilter] = useState("All");
//   const [sort, setSort] = useState("Default");
//   const [showPopup, setShowPopup] = useState(false);
//   const [level, setLevel] = useState(8);
//   const [xp, setXp] = useState(1200);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowPopup(true), 2500);
//     return () => clearTimeout(timer);
//   }, []);

//   const filteredAchievements = filter === "All" ? achievements : achievements.filter(a => a.category === filter);

//   const sortedAchievements = [...filteredAchievements].sort((a, b) => {
//     if (sort === "XP") return b.xp_reward - a.xp_reward;
//     if (sort === "Category") return a.category.localeCompare(b.category);
//     return a.id - b.id;
//   });

//   const categoryData = achievements.reduce((acc, ach) => {
//     const exist = acc.find(c => c.category === ach.category);
//     const progressPercent = Math.min((ach.progress / ach.target) * 100, 100);
//     if (exist) {
//       exist.progress += progressPercent;
//       exist.count += 1;
//     } else {
//       acc.push({ category: ach.category, progress: progressPercent, count: 1 });
//     }
//     return acc;
//   }, []).map(d => ({ ...d, avg: Math.round(d.progress / d.count) }));

//   return (
//     <div className="min-h-screen p-6 bg-white relative overflow-hidden">
//       {/* Background subtle glows */}
//       <div className="absolute w-[500px] h-[500px] bg-purple-100 blur-[180px] opacity-20 top-[-100px] left-[-150px]" />
//       <div className="absolute w-[500px] h-[500px] bg-pink-100 blur-[180px] opacity-20 bottom-[-120px] right-[-150px]" />

//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h1 className="text-3xl font-bold flex items-center gap-2 text-purple-800">
//           <Trophy className="text-yellow-400" /> Achievements
//         </h1>
//         <div className="text-sm text-purple-700 mt-2 md:mt-0">
//           Level <span className="font-semibold">{level}</span> • <span className="text-indigo-600 font-semibold">{xp}</span> XP
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-8 items-center">
//         {["All", "Speed", "Consistency", "Performance", "Knowledge", "Community"].map(cat => (
//           <button
//             key={cat}
//             onClick={() => setFilter(cat)}
//             className={`px-4 py-1 rounded-xl text-sm font-medium transition ${
//               filter === cat ? "bg-purple-600 text-white shadow-md" : "bg-purple-50 text-purple-700 hover:bg-purple-100"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//         <select
//           value={sort}
//           onChange={e => setSort(e.target.value)}
//           className="ml-auto bg-purple-50 text-purple-700 rounded-xl p-2 text-sm shadow-sm"
//         >
//           <option value="Default">Sort: Default</option>
//           <option value="XP">Sort by XP</option>
//           <option value="Category">Sort by Category</option>
//         </select>
//       </div>

//       {/* Achievements Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
//         {sortedAchievements.map(a => (
//           <div
//             key={a.id}
//             className={`relative p-5 rounded-2xl transition-all duration-200 backdrop-blur-md ${
//               a.status === "unlocked"
//                 ? "bg-purple-50/80 border border-purple-300 shadow-md"
//                 : "bg-purple-50/40 border border-purple-200"
//             }`}
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold text-purple-800">{a.title}</h2>
//               {a.status === "unlocked" ? <Trophy className="text-yellow-400" /> : <Lock className="text-purple-400" />}
//             </div>
//             <p className="text-purple-700/80 text-sm mb-3">{a.description}</p>

//             {/* Progress Bar */}
//             <div className="w-full bg-purple-200/30 rounded-full h-2 mb-2">
//               <div
//                 className="bg-purple-500 h-2 rounded-full transition-all"
//                 style={{ width: `${(a.progress / a.target) * 100}%` }}
//               ></div>
//             </div>
//             <span className="text-xs text-purple-700/60">{a.progress}/{a.target}</span>

//             <div className="flex justify-between items-center mt-3">
//               <span className="text-xs text-yellow-500 font-semibold">+{a.xp_reward} XP</span>
//               <span className="text-xs text-purple-700/70">{a.category}</span>
//             </div>

//             {a.status === "unlocked" && (
//               <span className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] px-2 py-1 rounded-full font-semibold">
//                 Earned
//               </span>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Graphs */}
//       <div className="bg-purple-50/80 backdrop-blur-md p-6 rounded-3xl shadow-md">
//         <h2 className="text-xl font-bold text-purple-800 mb-4">Category Progress Overview</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="category" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="avg" fill="#8b5cf6" name="Average Progress (%)" />
//           </BarChart>
//         </ResponsiveContainer>

//         <h2 className="text-xl font-bold text-purple-800 mt-10 mb-4">Category XP Distribution</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <PieChart>
//             <Pie
//               data={categoryData}
//               dataKey="avg"
//               nameKey="category"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//             >
//               {categoryData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Popup */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             className="fixed top-8 right-8 bg-purple-600 text-white rounded-2xl shadow-lg p-4 flex items-center gap-3 z-50"
//           >
//             <Sparkles className="animate-spin text-yellow-400" />
//             <div>
//               <h3 className="font-semibold text-lg">New Achievement Unlocked!</h3>
//               <p className="text-sm text-white/80">🏆 “Quiz Master” — +150 XP</p>
//             </div>
//             <button onClick={() => setShowPopup(false)} className="ml-2 text-white text-lg font-bold">
//               ✕
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }










// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Trophy, Lock, Sparkles } from "lucide-react";

// const mockAchievements = [
//   {
//     id: 1,
//     title: "Speed Demon",
//     description: "Answer 10 questions in under 2 seconds each.",
//     category: "Speed",
//     xp_reward: 50,
//     status: "unlocked",
//     progress: 10,
//     target: 10,
//     date_earned: "2025-10-21",
//   },
//   {
//     id: 2,
//     title: "Daily Streak",
//     description: "Play quizzes for 7 consecutive days.",
//     category: "Consistency",
//     xp_reward: 100,
//     status: "locked",
//     progress: 4,
//     target: 7,
//   },
//   {
//     id: 3,
//     title: "Quiz Master",
//     description: "Score 100% in 5 different quizzes.",
//     category: "Performance",
//     xp_reward: 150,
//     status: "locked",
//     progress: 3,
//     target: 5,
//   },
//   {
//     id: 4,
//     title: "Science Genius",
//     description: "Complete 5 quizzes in Science category.",
//     category: "Knowledge",
//     xp_reward: 75,
//     status: "unlocked",
//     progress: 5,
//     target: 5,
//     date_earned: "2025-09-15",
//   },
//   {
//     id: 5,
//     title: "Challenge Accepted",
//     description: "Win 5 friend duels in Challenge Mode.",
//     category: "Community",
//     xp_reward: 120,
//     status: "locked",
//     progress: 1,
//     target: 5,
//   },
// ];

// export default function Achievements() {
//   const [achievements, setAchievements] = useState(mockAchievements);
//   const [filter, setFilter] = useState("All");
//   const [sort, setSort] = useState("Default");
//   const [showPopup, setShowPopup] = useState(false);
//   const [level, setLevel] = useState(8);
//   const [xp, setXp] = useState(1200);

//   // Simulate popup
//   useEffect(() => {
//     const timer = setTimeout(() => setShowPopup(true), 2500);
//     return () => clearTimeout(timer);
//   }, []);

//   const filteredAchievements =
//     filter === "All"
//       ? achievements
//       : achievements.filter((a) => a.category === filter);

//   const sortedAchievements = [...filteredAchievements].sort((a, b) => {
//     if (sort === "XP") return b.xp_reward - a.xp_reward;
//     if (sort === "Category") return a.category.localeCompare(b.category);
//     return a.id - b.id;
//   });

//   return (
//     <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h1 className="text-3xl font-extrabold flex items-center gap-3 text-purple-700">
//           <Trophy className="text-purple-600" /> Achievements
//         </h1>
//         <div className="text-sm text-gray-600 mt-3 md:mt-0">
//           Level{" "}
//           <span className="text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded">
//             {level}
//           </span>{" "}
//           •{" "}
//           <span className="text-purple-700 font-semibold">{xp}</span> XP
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-8 items-center">
//         {["All", "Speed", "Consistency", "Performance", "Knowledge", "Community"].map(
//           (cat) => (
//             <button
//               key={cat}
//               onClick={() => setFilter(cat)}
//               className={`px-4 py-1 rounded-full text-sm font-medium border ${
//                 filter === cat
//                   ? "bg-purple-600 text-white border-transparent shadow-sm"
//                   : "bg-white text-purple-700 border-purple-100 hover:bg-purple-50"
//               }`}
//             >
//               {cat}
//             </button>
//           )
//         )}
//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="ml-auto bg-white text-gray-700 border border-purple-100 rounded-md p-2 text-sm"
//         >
//           <option value="Default">Sort: Default</option>
//           <option value="XP">Sort by XP</option>
//           <option value="Category">Sort by Category</option>
//         </select>
//       </div>

//       {/* Achievements Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sortedAchievements.map((a) => (
//           <div
//             key={a.id}
//             className={`relative p-5 rounded-2xl transition-all duration-200 bg-white border ${
//               a.status === "unlocked"
//                 ? "border-purple-100 shadow-[0_6px_20px_rgba(124,58,237,0.08)]"
//                 : "border-gray-100"
//             }`}
//           >
//             <div className="flex justify-between items-start mb-3">
//               <h2 className="text-lg font-semibold text-gray-800">{a.title}</h2>
//               {a.status === "unlocked" ? (
//                 <Trophy className="text-yellow-500" />
//               ) : (
//                 <Lock className="text-gray-300" />
//               )}
//             </div>

//             <p className="text-sm text-gray-500 mb-4">{a.description}</p>

//             {/* Progress Bar */}
//             <div className="w-full bg-purple-50 rounded-full h-2 mb-2 overflow-hidden">
//               <div
//                 className="h-2 rounded-full"
//                 style={{
//                   width: `${(a.progress / a.target) * 100}%`,
//                   background:
//                     "linear-gradient(90deg,#7c3aed,#a78bfa)",
//                 }}
//               ></div>
//             </div>
//             <span className="text-xs text-gray-400">
//               {a.progress}/{a.target}
//             </span>

//             {/* XP & Category */}
//             <div className="flex justify-between items-center mt-4">
//               <span className="text-xs text-yellow-600 font-semibold">
//                 +{a.xp_reward} XP
//               </span>
//               <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
//                 {a.category}
//               </span>
//             </div>

//             {a.status === "unlocked" && (
//               <span className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] px-3 py-1 rounded-full font-semibold shadow-sm">
//                 Earned
//               </span>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Popup Animation */}
//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -30 }}
//             className="fixed top-6 right-6 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-xl shadow-2xl p-4 flex items-center gap-3 max-w-xs"
//           >
//             <div className="p-2 rounded-full bg-white/10">
//               <Sparkles className="animate-pulse" />
//             </div>
//             <div className="flex-1">
//               <h3 className="font-semibold text-sm">New Achievement Unlocked!</h3>
//               <p className="text-xs opacity-90">🏆 “Quiz Master” — +150 XP</p>
//             </div>
//             <button
//               onClick={() => setShowPopup(false)}
//               className="ml-2 text-white text-lg font-bold"
//               aria-label="Close"
//             >
//               ✕
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }








import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Lock, Sparkles } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

/* -------------------------------------------------------------------------- */
/* ----------------------------- mock data (unchanged) ---------------------- */
/* -------------------------------------------------------------------------- */
const mockAchievements = [
  {
    id: 1,
    title: "Speed Demon",
    description: "Answer 10 questions in under 2 seconds each.",
    category: "Speed",
    xp_reward: 50,
    status: "unlocked",
    progress: 10,
    target: 10,
    date_earned: "2025-10-21",
  },
  {
    id: 2,
    title: "Daily Streak",
    description: "Play quizzes for 7 consecutive days.",
    category: "Consistency",
    xp_reward: 100,
    status: "locked",
    progress: 4,
    target: 7,
  },
  {
    id: 3,
    title: "Quiz Master",
    description: "Score 100% in 5 different quizzes.",
    category: "Performance",
    xp_reward: 150,
    status: "locked",
    progress: 3,
    target: 5,
  },
  {
    id: 4,
    title: "Science Genius",
    description: "Complete 5 quizzes in Science category.",
    category: "Knowledge",
    xp_reward: 75,
    status: "unlocked",
    progress: 5,
    target: 5,
    date_earned: "2025-09-15",
  },
  {
    id: 5,
    title: "Challenge Accepted",
    description: "Win 5 friend duels in Challenge Mode.",
    category: "Community",
    xp_reward: 120,
    status: "locked",
    progress: 1,
    target: 5,
  },
];

/* -------------------------------------------------------------------------- */
/* --------------------------- helper: make timeseries ----------------------- */
/* -------------------------------------------------------------------------- */
function genTrend(seed, points = 8, max = 10) {
  // deterministic-ish pseudo-random trend from seed
  const arr = [];
  let v = (seed % 5) + 3;
  for (let i = 0; i < points; i++) {
    v = Math.max(0, Math.min(max, v + ((i % 3) - 1) + ((seed + i) % 2 ? 0.5 : -0.4)));
    arr.push({ label: `D${i + 1}`, value: Math.round((v / max) * 100) });
  }
  return arr;
}

/* -------------------------------------------------------------------------- */
/* ------------------------------ Component --------------------------------- */
/* -------------------------------------------------------------------------- */
export default function Achievements() {
  const [achievements, setAchievements] = useState(mockAchievements);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Default");
  const [showPopup, setShowPopup] = useState(false);
  const [level, setLevel] = useState(8);
  const [xp, setXp] = useState(1200);
  const [selectedMetric, setSelectedMetric] = useState("Speed"); // view selector for charts

  // Simulate popup
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Derived datasets for graphs — these are synthetic but based on achievements
  const speedData = useMemo(() => genTrend(1, 8, 10), []);
  const consistencyData = useMemo(() => genTrend(2, 8, 7), []);
  const performanceData = useMemo(() => genTrend(3, 8, 5), []);

  // Aggregate summaries (simple calculations from mock data)
  const stats = useMemo(() => {
    const byCat = { Speed: [], Consistency: [], Performance: [] };
    achievements.forEach((a) => {
      if (byCat[a.category]) byCat[a.category].push(a);
    });
    const metricVal = (arr) =>
      arr.length ? Math.round((arr.reduce((s, x) => s + x.progress / x.target, 0) / arr.length) * 100) : 0;

    const earnedXP = achievements.reduce((s, a) => (a.status === "unlocked" ? s + a.xp_reward : s), 0);

    return {
      speedPct: metricVal(byCat.Speed),
      consistencyPct: metricVal(byCat.Consistency),
      performancePct: metricVal(byCat.Performance),
      totalAch: achievements.length,
      earnedXP,
    };
  }, [achievements]);

  const filteredAchievements =
    filter === "All" ? achievements : achievements.filter((a) => a.category === filter);

  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (sort === "XP") return b.xp_reward - a.xp_reward;
    if (sort === "Category") return a.category.localeCompare(b.category);
    return a.id - b.id;
  });

  // pick the dataset to show based on selectedMetric
  const currentChartData =
    selectedMetric === "Speed"
      ? speedData
      : selectedMetric === "Consistency"
      ? consistencyData
      : performanceData;

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3 text-purple-700">
            <Trophy className="text-purple-600" /> Achievements
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track progress, claim rewards, and review analytics across key metrics.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Level{" "}
            <span className="text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded">
              {level}
            </span>{" "}
            •{" "}
            <span className="text-purple-700 font-semibold">{xp}</span> XP
          </div>
          <div className="hidden md:flex gap-2">
            <button
              className="px-3 py-1 rounded-full bg-white text-purple-700 border border-purple-100"
              onClick={() =>
                setAchievements((prev) =>
                  prev.map((a) => (a.id === 2 ? { ...a, progress: Math.min(a.target, a.progress + 1) } : a))
                )
              }
            >
              + Progress (demo)
            </button>
          </div>
        </div>
      </div>

      {/* Top area: Analytics (left) + Filters (right on large screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Analytics Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Summary cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-purple-50 shadow-[0_6px_20px_rgba(124,58,237,0.04)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500">Speed</div>
                  <div className="text-lg font-semibold text-gray-800">{stats.speedPct}%</div>
                </div>
                <div className="text-sm text-purple-700 font-medium">Fast</div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-purple-50 rounded-full h-2 overflow-hidden">
                  <div
                    style={{
                      width: `${stats.speedPct}%`,
                      background: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                      height: 8,
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-400">Completion &lt; target speed</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500">Consistency</div>
                  <div className="text-lg font-semibold text-gray-800">{stats.consistencyPct}%</div>
                </div>
                <div className="text-sm text-purple-700 font-medium">Streaks</div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-purple-50 rounded-full h-2 overflow-hidden">
                  <div
                    style={{
                      width: `${stats.consistencyPct}%`,
                      background: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                      height: 8,
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-400">7-day target progress</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500">Performance</div>
                  <div className="text-lg font-semibold text-gray-800">{stats.performancePct}%</div>
                </div>
                <div className="text-sm text-purple-700 font-medium">Accuracy</div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-purple-50 rounded-full h-2 overflow-hidden">
                  <div
                    style={{
                      width: `${stats.performancePct}%`,
                      background: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                      height: 8,
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-400">Avg quiz accuracy</div>
              </div>
            </div>
          </div>

          {/* Growth/Trend chart + selector */}
          <div className="bg-white p-4 rounded-2xl border border-purple-50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-gray-500">Metric trends</div>
                <div className="text-lg font-semibold text-gray-800">Recent performance</div>
              </div>

              <div className="flex items-center gap-2">
                {["Speed", "Consistency", "Performance"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMetric(m)}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      selectedMetric === m
                        ? "bg-purple-600 text-white border-transparent shadow-sm"
                        : "bg-white text-purple-700 border-purple-100 hover:bg-purple-50"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                {/* Use an AreaChart for the selected metric */}
                <AreaChart data={currentChartData}>
                  <defs>
                    <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3efff" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#7c3aed"
                    fillOpacity={1}
                    fill="url(#gradPurple)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <div>Showing last {currentChartData.length} days</div>
              <div className="text-right">
                <div>{selectedMetric} index</div>
                <div className="text-sm text-gray-700 font-semibold">
                  {selectedMetric === "Speed"
                    ? `${stats.speedPct}%`
                    : selectedMetric === "Consistency"
                    ? `${stats.consistencyPct}%`
                    : `${stats.performancePct}%`}
                </div>
              </div>
            </div>
          </div>

          {/* Comparative bars: small overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-purple-50">
              <div className="text-sm text-gray-500 mb-2">Speed vs Target</div>
              <div style={{ width: "100%", height: 100 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={speedData.map((d, i) => ({ name: d.label, v: d.value }))}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Bar dataKey="v" radius={[6, 6, 6, 6]} barSize={8} fill="#7c3aed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-50">
              <div className="text-sm text-gray-500 mb-2">Consistency (7-day)</div>
              <div style={{ width: "100%", height: 100 }}>
                <ResponsiveContainer>
                  <LineChart data={consistencyData}>
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Line type="monotone" dataKey="value" stroke="#9f7aea" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-50">
              <div className="text-sm text-gray-500 mb-2">Performance Distribution</div>
              <div style={{ width: "100%", height: 100 }}>
                <ResponsiveContainer>
                  <BarChart data={performanceData.map((d, i) => ({ name: d.label, v: d.value }))}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Bar dataKey="v" radius={[6, 6, 6, 6]} barSize={8} fill="#a78bfa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Filters & Achievements controls */}
        <div className="lg:col-span-5">
          <div className="flex flex-wrap gap-3 mb-6">
            {["All", "Speed", "Consistency", "Performance", "Knowledge", "Community"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1 rounded-full text-sm font-medium border ${
                  filter === cat
                    ? "bg-purple-600 text-white border-transparent shadow-sm"
                    : "bg-white text-purple-700 border-purple-100 hover:bg-purple-50"
                }`}
              >
                {cat}
              </button>
            ))}

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="ml-auto bg-white text-gray-700 border border-purple-100 rounded-md p-2 text-sm"
            >
              <option value="Default">Sort: Default</option>
              <option value="XP">Sort by XP</option>
              <option value="Category">Sort by Category</option>
            </select>
          </div>

          {/* Achievements Grid (compact) */}
          <div className="grid grid-cols-1 gap-4">
            {sortedAchievements.map((a) => (
              <div
                key={a.id}
                className={`relative p-4 rounded-xl transition-all duration-200 bg-white border ${
                  a.status === "unlocked"
                    ? "border-purple-100 shadow-[0_6px_20px_rgba(124,58,237,0.06)]"
                    : "border-gray-100"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-md font-semibold text-gray-800">{a.title}</h2>
                  {a.status === "unlocked" ? <Trophy className="text-yellow-500" /> : <Lock className="text-gray-300" />}
                </div>

                <p className="text-sm text-gray-500 mb-3">{a.description}</p>

                <div className="w-full bg-purple-50 rounded-full h-2 mb-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(a.progress / a.target) * 100}%`,
                      background: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                    }}
                  />
                </div>
                <div className="flex justify-between items-center mt-3 text-xs">
                  <span className="text-yellow-600 font-semibold">+{a.xp_reward} XP</span>
                  <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded-full text-xs">{a.category}</span>
                </div>

                {a.status === "unlocked" && (
                  <span className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] px-3 py-1 rounded-full font-semibold shadow-sm">
                    Earned
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Footer stats */}
          <div className="mt-6 p-4 rounded-2xl bg-white border border-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Achievements</div>
                <div className="text-lg font-semibold text-gray-800">{stats.totalAch}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Earned XP</div>
                <div className="text-lg font-semibold text-gray-800">{stats.earnedXP}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Overall Progress</div>
                <div className="text-lg font-semibold text-gray-800">
                  {Math.round((stats.speedPct + stats.consistencyPct + stats.performancePct) / 3)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Animation */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-6 right-6 bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-xl shadow-2xl p-4 flex items-center gap-3 max-w-xs"
          >
            <div className="p-2 rounded-full bg-white/10">
              <Sparkles className="animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">New Achievement Unlocked!</h3>
              <p className="text-xs opacity-90">🏆 “Quiz Master” — +150 XP</p>
            </div>
            <button onClick={() => setShowPopup(false)} className="ml-2 text-white text-lg font-bold" aria-label="Close">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
