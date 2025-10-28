// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ArrowLeft, Copy, Users, Send, Trash2, PlayCircle } from "lucide-react";

// const LobbyRoom = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const { roomCode, selectedQuiz } = state || {};

//   const [players, setPlayers] = useState([
//     { id: 1, name: "Laiba (Host)", ready: true, isHost: true },
//     { id: 2, name: "Muneeba", ready: false },
//     { id: 3, name: "Shafia", ready: true },
//   ]);
//   const [messages, setMessages] = useState([
//     { user: "System", text: "Welcome to the quiz lobby!" },
//   ]);
//   const [chatInput, setChatInput] = useState("");

//   const maxPlayers = 10;
//   const isHost = true; // assume current user is host for now

//   // ✅ Simulate new players joining every few seconds (for demo)
//   useEffect(() => {
//     const fakeJoin = setInterval(() => {
//       if (players.length < maxPlayers) {
//         const newPlayer = {
//           id: players.length + 1,
//           name: `Player ${players.length + 1}`,
//           ready: Math.random() > 0.5,
//         };
//         setPlayers((prev) => [...prev, newPlayer]);
//       }
//     }, 6000);

//     return () => clearInterval(fakeJoin);
//   }, [players]);

//   // ✅ Copy room code
//   const handleCopy = () => {
//     navigator.clipboard.writeText(roomCode);
//     alert("Room code copied!");
//   };

//   // ✅ Send chat message
//   const handleSendMessage = () => {
//     if (chatInput.trim() === "") return;
//     setMessages([...messages, { user: "You", text: chatInput }]);
//     setChatInput("");
//   };

//   // ✅ Remove player (host only)
//   const handleRemove = (id) => {
//     setPlayers(players.filter((p) => p.id !== id));
//   };

//   // ✅ Start quiz
//   const handleStartQuiz = () => {
//     if (players.length < 2) {
//       alert("At least 2 players are needed to start the quiz.");
//       return;
//     }
//     navigate("/StartQuizRoom", { state: { roomCode, selectedQuiz, players } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#f6f0ff] to-white py-10 px-6 md:px-24">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-12 relative">
//         <div
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-3 cursor-pointer text-purple-600 hover:text-purple-700 transition"
//         >
//           <div className="p-3 rounded-full bg-white shadow-sm border border-purple-200">
//             <ArrowLeft size={30} />
//           </div>
//           <span className="font-medium">Back</span>
//         </div>

//         <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899]">
//             Quiz Lobby
//           </h1>
//         </div>
//       </div>

//       {/* ROOM INFO */}
//       <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-lg border border-purple-100 mb-10">
//         <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
//           <div>
//             <h2 className="text-2xl font-bold text-purple-700">
//               Quiz: {selectedQuiz || "Unknown"}
//             </h2>
//             <p className="text-gray-600 mt-1">
//               Room Code:{" "}
//               <span className="font-semibold text-purple-700">{roomCode}</span>
//               <button
//                 onClick={handleCopy}
//                 className="ml-3 p-2 rounded-full border border-purple-200 bg-purple-50 hover:bg-purple-100"
//               >
//                 <Copy size={18} className="text-purple-600" />
//               </button>
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0 flex items-center gap-2 text-purple-600">
//             <Users size={22} />
//             <span className="font-medium">
//               {players.length}/{maxPlayers} Players
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* PLAYERS LIST */}
//       <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-lg border border-purple-100 mb-10">
//         <h3 className="text-2xl font-semibold text-purple-700 mb-6">
//           Players in Room
//         </h3>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {players.map((player) => (
//             <div
//               key={player.id}
//               className="p-5 rounded-2xl border border-purple-100 bg-purple-50 flex items-center justify-between"
//             >
//               <div>
//                 <p className="text-lg font-medium text-purple-800">
//                   {player.name}
//                 </p>
//                 <p
//                   className={`text-sm font-semibold ${
//                     player.ready ? "text-green-600" : "text-yellow-600"
//                   }`}
//                 >
//                   {player.ready ? "Ready" : "Not Ready"}
//                 </p>
//               </div>
//               {isHost && !player.isHost && (
//                 <button
//                   onClick={() => handleRemove(player.id)}
//                   className="p-2 rounded-full bg-white border border-purple-200 hover:bg-purple-100"
//                 >
//                   <Trash2 size={18} className="text-purple-600" />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CHAT BOX */}
//       <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-lg border border-purple-100 mb-12">
//         <h3 className="text-2xl font-semibold text-purple-700 mb-4">
//           Room Chat
//         </h3>
//         <div className="h-56 overflow-y-auto border border-purple-100 rounded-2xl p-4 mb-4 bg-purple-50">
//           {messages.map((msg, idx) => (
//             <p key={idx} className="mb-2 text-gray-700">
//               <span className="font-semibold text-purple-700">{msg.user}: </span>
//               {msg.text}
//             </p>
//           ))}
//         </div>

//         <div className="flex gap-3">
//           <input
//             type="text"
//             value={chatInput}
//             onChange={(e) => setChatInput(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 p-4 rounded-2xl border border-purple-200 focus:ring-2 focus:ring-purple-400 outline-none"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="p-4 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-white font-semibold hover:opacity-90 transition"
//           >
//             <Send size={20} />
//           </button>
//         </div>
//       </div>

//       {/* HOST CONTROLS */}
//       {isHost && (
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center gap-5">
//           <button
//             onClick={handleStartQuiz}
//             className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] hover:opacity-90 transition"
//           >
//             <PlayCircle size={22} />
//             Start Quiz
//           </button>

//           <button
//             onClick={() => navigate(-1)}
//             className="px-10 py-4 rounded-2xl font-semibold text-lg border border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
//           >
//             Leave Room
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LobbyRoom;











import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Copy, Users, Send, Trash2, PlayCircle } from "lucide-react";

const LobbyRoom = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { roomCode, selectedQuiz, hostId, userId } = state || {};

  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([
    { user: "System", text: "Welcome to the quiz lobby!" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  const maxPlayers = 10;
  const isHost = hostId === userId;

  // ✅ Poll room status every 5s to check if started
  useEffect(() => {
    const fetchRoomStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/rooms/${roomCode}`);
        if (res.data?.room?.isStarted) {
          setIsStarted(true);
          navigate(`/quizRoomPlayerView/${roomCode}`, { state: { roomCode, selectedQuiz } });
        }
      } catch (err) {
        console.error("Error checking room status:", err);
      }
    };

    const interval = setInterval(fetchRoomStatus, 5000);
    return () => clearInterval(interval);
  }, [roomCode, navigate, selectedQuiz]);

  // ✅ Copy room code
  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied!");
  };

  // ✅ Send chat message
  const handleSendMessage = () => {
    if (chatInput.trim() === "") return;
    setMessages([...messages, { user: "You", text: chatInput }]);
    setChatInput("");
  };

  // ✅ Host starts quiz (no restriction on player count)
  const handleStartQuiz = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/rooms/start/${roomCode}`);
      if (res.data.success) {
        alert("Quiz started!");
        setIsStarted(true);
        navigate(`/quizRoomPlayerView/${roomCode}`, { state: { roomCode, selectedQuiz } });
      } else {
        alert(res.data.message || "Failed to start quiz");
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Failed to start quiz.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f0ff] to-white py-10 px-6 md:px-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12 relative">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 cursor-pointer text-purple-600 hover:text-purple-700 transition"
        >
          <div className="p-3 rounded-full bg-white shadow-sm border border-purple-200">
            <ArrowLeft size={30} />
          </div>
          <span className="font-medium">Back</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899]">
            Quiz Lobby
          </h1>
        </div>
      </div>

      {/* ROOM INFO */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-lg border border-purple-100 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-purple-700">
              Quiz: {selectedQuiz || "Unknown"}
            </h2>
            <p className="text-gray-600 mt-1">
              Room Code:{" "}
              <span className="font-semibold text-purple-700">{roomCode}</span>
              <button
                onClick={handleCopy}
                className="ml-3 p-2 rounded-full border border-purple-200 bg-purple-50 hover:bg-purple-100"
              >
                <Copy size={18} className="text-purple-600" />
              </button>
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-purple-600">
            <Users size={22} />
            <span className="font-medium">
              {players.length}/{maxPlayers} Players
            </span>
          </div>
        </div>
      </div>

      {/* CHAT BOX */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-lg border border-purple-100 mb-12">
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">
          Room Chat
        </h3>
        <div className="h-56 overflow-y-auto border border-purple-100 rounded-2xl p-4 mb-4 bg-purple-50">
          {messages.map((msg, idx) => (
            <p key={idx} className="mb-2 text-gray-700">
              <span className="font-semibold text-purple-700">{msg.user}: </span>
              {msg.text}
            </p>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-4 rounded-2xl border border-purple-200 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="p-4 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-white font-semibold hover:opacity-90 transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* HOST CONTROLS */}
      {isHost && (
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center gap-5">
          <button
            onClick={handleStartQuiz}
            className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] hover:opacity-90 transition"
          >
            <PlayCircle size={22} />
            Start Quiz
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-10 py-4 rounded-2xl font-semibold text-lg border border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
          >
            Leave Room
          </button>
        </div>
      )}
    </div>
  );
};

export default LobbyRoom;

