// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Edit2, Trash2, RotateCcw, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const LeaderboardManagement = () => {
//   const navigate = useNavigate();

//   // Mock leaderboard data
//   const [leaderboard, setLeaderboard] = useState([
//     { id: 1, name: "Laiba", score: 95, time: "1m 22s" },
//     { id: 2, name: "Ali", score: 87, time: "1m 45s" },
//     { id: 3, name: "Sara", score: 83, time: "1m 59s" },
//     { id: 4, name: "Hassan", score: 76, time: "2m 15s" },
//     { id: 5, name: "Fatima", score: 70, time: "2m 38s" },
//   ]);

//   const [editIndex, setEditIndex] = useState(null);
//   const [editData, setEditData] = useState({ name: "", score: "", time: "" });

//   // Delete player from leaderboard
//   const handleDelete = (id) => {
//     setLeaderboard(leaderboard.filter((item) => item.id !== id));
//   };

//   // Enable edit mode
//   const handleEdit = (item) => {
//     setEditIndex(item.id);
//     setEditData({ name: item.name, score: item.score, time: item.time });
//   };

//   // Save edited data
//   const handleSave = (id) => {
//     setLeaderboard(
//       leaderboard.map((item) =>
//         item.id === id ? { ...item, ...editData } : item
//       )
//     );
//     setEditIndex(null);
//   };

//   // Reset leaderboard
//   const handleReset = () => {
//     if (window.confirm("Are you sure you want to reset the leaderboard?")) {
//       setLeaderboard([]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#ECEAFF] via-[#F3E8FF] to-[#F0E7FF] flex flex-col items-center py-12 px-4 relative">
//       {/* Background glow */}
//       <div className="absolute w-[600px] h-[600px] bg-purple-300 blur-[180px] opacity-30 top-[-100px] left-[-150px]" />
//       <div className="absolute w-[600px] h-[600px] bg-pink-200 blur-[180px] opacity-30 bottom-[-120px] right-[-150px]" />

//       {/* Header */}
//       <motion.div
//         initial={{ y: -40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="flex justify-between items-center w-full max-w-4xl mb-10"
//       >
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition"
//         >
//           <ArrowLeft className="w-5 h-5" /> Back
//         </button>
//         <h1 className="text-3xl font-extrabold text-purple-800 tracking-tight">
//           Leaderboard Management
//         </h1>
//         <button
//           onClick={handleReset}
//           className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition"
//         >
//           <RotateCcw className="w-5 h-5" /> Reset
//         </button>
//       </motion.div>

//       {/* Table */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-4xl overflow-hidden"
//       >
//         <table className="w-full text-left text-gray-800">
//           <thead className="bg-purple-700 text-white">
//             <tr>
//               <th className="py-3 px-4">Rank</th>
//               <th className="py-3 px-4">Name</th>
//               <th className="py-3 px-4">Score</th>
//               <th className="py-3 px-4">Time</th>
//               <th className="py-3 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaderboard.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center py-6 text-gray-500 italic"
//                 >
//                   Leaderboard is empty.
//                 </td>
//               </tr>
//             ) : (
//               leaderboard.map((item, index) => (
//                 <tr
//                   key={item.id}
//                   className={`border-b ${
//                     index % 2 === 0 ? "bg-white/50" : "bg-purple-50/70"
//                   }`}
//                 >
//                   <td className="py-3 px-4 font-bold text-purple-700">
//                     #{index + 1}
//                   </td>

//                   {/* Editable fields */}
//                   <td className="py-3 px-4">
//                     {editIndex === item.id ? (
//                       <input
//                         type="text"
//                         className="border rounded-md px-2 py-1 w-full"
//                         value={editData.name}
//                         onChange={(e) =>
//                           setEditData({ ...editData, name: e.target.value })
//                         }
//                       />
//                     ) : (
//                       item.name
//                     )}
//                   </td>

//                   <td className="py-3 px-4">
//                     {editIndex === item.id ? (
//                       <input
//                         type="number"
//                         className="border rounded-md px-2 py-1 w-full"
//                         value={editData.score}
//                         onChange={(e) =>
//                           setEditData({ ...editData, score: e.target.value })
//                         }
//                       />
//                     ) : (
//                       item.score
//                     )}
//                   </td>

//                   <td className="py-3 px-4">
//                     {editIndex === item.id ? (
//                       <input
//                         type="text"
//                         className="border rounded-md px-2 py-1 w-full"
//                         value={editData.time}
//                         onChange={(e) =>
//                           setEditData({ ...editData, time: e.target.value })
//                         }
//                       />
//                     ) : (
//                       item.time
//                     )}
//                   </td>

//                   <td className="py-3 px-4 flex justify-center gap-3">
//                     {editIndex === item.id ? (
//                       <button
//                         onClick={() => handleSave(item.id)}
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition"
//                       >
//                         Save
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => handleEdit(item)}
//                           className="text-blue-600 hover:text-blue-800 transition"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="text-red-600 hover:text-red-800 transition"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </motion.div>
//     </div>
//   );
// };

// export default LeaderboardManagement;


import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit3,
  Trash2,
  RotateCcw,
  ArrowLeft,
  Save,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LeaderboardManagement = () => {
  const navigate = useNavigate();

  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: "Laiba", score: 95, time: "1m 22s" },
    { id: 2, name: "Ali", score: 87, time: "1m 45s" },
    { id: 3, name: "Sara", score: 83, time: "1m 59s" },
    { id: 4, name: "Hassan", score: 76, time: "2m 15s" },
    { id: 5, name: "Fatima", score: 70, time: "2m 38s" },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", score: "", time: "" });

  const handleDelete = (id) => {
    setLeaderboard(leaderboard.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditIndex(item.id);
    setEditData({ name: item.name, score: item.score, time: item.time });
  };

  const handleSave = (id) => {
    setLeaderboard(
      leaderboard.map((item) =>
        item.id === id ? { ...item, ...editData } : item
      )
    );
    setEditIndex(null);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the leaderboard?")) {
      setLeaderboard([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECEAFF] via-[#EAD9FF] to-[#F8E7FF] flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Subtle gradient glows */}
      <div className="absolute w-[650px] h-[650px] bg-purple-300 blur-[180px] opacity-30 top-[-100px] left-[-150px]" />
      <div className="absolute w-[600px] h-[600px] bg-pink-300 blur-[180px] opacity-30 bottom-[-120px] right-[-150px]" />

      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center w-full max-w-5xl mb-12 bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-lg"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <h1 className="text-3xl font-extrabold text-purple-800 flex items-center gap-2 tracking-tight">
          <UserCheck className="w-7 h-7 text-indigo-600" /> Leaderboard
          Management
        </h1>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2.5 rounded-xl shadow-md transition"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-5xl overflow-hidden border border-purple-200"
      >
        <table className="w-full text-left text-gray-800">
          <thead className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-lg">
            <tr>
              <th className="py-4 px-6">Rank</th>
              <th className="py-4 px-6">Player Name</th>
              <th className="py-4 px-6">Score</th>
              <th className="py-4 px-6">Time</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500 italic"
                >
                  No players yet! 👀
                </td>
              </tr>
            ) : (
              leaderboard.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b ${
                    index % 2 === 0
                      ? "bg-purple-50/50 hover:bg-purple-100/70"
                      : "bg-white/70 hover:bg-purple-100/60"
                  } transition`}
                >
                  <td className="py-4 px-6 font-bold text-purple-700 text-lg">
                    #{index + 1}
                  </td>

                  {/* Editable Name */}
                  <td className="py-4 px-6">
                    {editIndex === item.id ? (
                      <input
                        type="text"
                        className="border border-purple-300 rounded-xl px-3 py-2 w-full text-base focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                      />
                    ) : (
                      <span className="font-semibold">{item.name}</span>
                    )}
                  </td>

                  {/* Editable Score */}
                  <td className="py-4 px-6">
                    {editIndex === item.id ? (
                      <input
                        type="number"
                        className="border border-purple-300 rounded-xl px-3 py-2 w-full text-base focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        value={editData.score}
                        onChange={(e) =>
                          setEditData({ ...editData, score: e.target.value })
                        }
                      />
                    ) : (
                      <span className="font-semibold">{item.score}</span>
                    )}
                  </td>

                  {/* Editable Time */}
                  <td className="py-4 px-6">
                    {editIndex === item.id ? (
                      <input
                        type="text"
                        className="border border-purple-300 rounded-xl px-3 py-2 w-full text-base focus:ring-2 focus:ring-purple-400 focus:outline-none"
                        value={editData.time}
                        onChange={(e) =>
                          setEditData({ ...editData, time: e.target.value })
                        }
                      />
                    ) : (
                      <span>{item.time}</span>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6 flex justify-center gap-4">
                    {editIndex === item.id ? (
                      <button
                        onClick={() => handleSave(item.id)}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                      >
                        <Save size={18} /> Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(item)}
                          title="Edit Player"
                          className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
                        >
                          <Edit3 size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Remove Player"
                          className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default LeaderboardManagement;
