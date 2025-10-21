import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Share2 } from "lucide-react";

const CreateQuizRoom = () => {
  const navigate = useNavigate();

  // ✅ Predefined Quizzes
  const quizList = [
    { id: 1, title: "General Knowledge" },
    { id: 2, title: "Science & Nature" },
    { id: 3, title: "World History" },
    { id: 4, title: "Computer Basics" },
    { id: 5, title: "Sports Trivia" },
    { id: 6, title: "Mathematics Quiz" },
    { id: 7, title: "Geography Challenge" },
    { id: 8, title: "Pop Culture & Movies" },
    { id: 9, title: "Technology & Innovation" },
    { id: 10, title: "Space Exploration" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [duration, setDuration] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [roomCode, setRoomCode] = useState("");
  const [created, setCreated] = useState(false);

  // ✅ Create Room
  const handleCreateRoom = () => {
    if (!selectedQuiz || !roomName || !maxPlayers || !duration) {
      alert("Please fill in all fields before creating a room.");
      return;
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setCreated(true);
  };

  // ✅ Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied to clipboard!");
  };

  // ✅ Share room link
  const handleShareRoom = () => {
    const shareText = `🎯 Join my quiz room "${roomName}" for "${selectedQuiz}" using this code: ${roomCode}\n\nPlay here: http://localhost:3000/join-room?code=${roomCode}`;
    const shareUrl = `http://localhost:3000/join-room?code=${roomCode}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Join My Quiz Room!",
          text: shareText,
          url: shareUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f0ff] to-white py-16 px-6 md:px-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12 relative">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 cursor-pointer text-purple-600 hover:text-purple-700 transition"
        >
          <div className="p-3 rounded-full bg-white shadow-sm border border-purple-200">
            <ArrowLeft size={35} />
          </div>
          <span className="font-stretch-100% text-lg">Back</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899]">
            Create Quiz Room
          </h1>
        </div>
      </div>

      {/* CREATE ROOM FORM */}
      {!created ? (
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-12 shadow-xl border border-purple-100">
          {/* QUIZ SELECTION */}
          <div className="mb-8">
            <label className="block text-purple-700 font-semibold text-lg mb-3">
              Select Quiz
            </label>
            <select
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              className="w-full p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none"
            >
              <option value="">Select a quiz...</option>
              {quizList.map((quiz) => (
                <option key={quiz.id} value={quiz.title}>
                  {quiz.title}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM DETAILS */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-purple-700 font-semibold text-lg mb-3">
                Room Name
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                className="w-full p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-purple-700 font-semibold text-lg mb-3">
                Max Players
              </label>
              <input
                type="number"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(e.target.value)}
                placeholder="e.g. 10"
                className="w-full p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-purple-700 font-semibold text-lg mb-3">
              Quiz Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 20"
              className="w-full p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div className="mt-8 flex items-center gap-6">
            <label className="text-purple-700 font-semibold text-lg">
              Visibility:
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* CREATE BUTTON */}
          <div className="mt-14 flex justify-center">
            <button
              onClick={handleCreateRoom}
              className="px-16 py-5 rounded-2xl text-white font-semibold text-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] hover:opacity-90 transition"
            >
              Create Room
            </button>
          </div>
        </div>
      ) : (
        /* ROOM CREATED CARD */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 shadow-xl border border-purple-100 text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Room Created Successfully!
          </h2>

          <p className="text-gray-600 mb-8 text-lg">
            Share this code with players to join your quiz room.
          </p>

          <div className="flex items-center justify-center gap-4 bg-purple-50 border border-purple-200 rounded-2xl py-5 px-8 mb-10">
            <span className="text-4xl font-bold text-purple-700 tracking-widest">
              {roomCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-3 bg-white rounded-full border border-purple-200 hover:bg-purple-100 transition"
            >
              <Copy size={22} className="text-purple-600" />
            </button>
            <button
              onClick={handleShareRoom}
              className="p-3 bg-white rounded-full border border-purple-200 hover:bg-purple-100 transition"
            >
              <Share2 size={22} className="text-purple-600" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-5">
            <button
              onClick={() =>
                navigate("/LobbyRoom", { state: { roomCode, selectedQuiz } })
              }
              className="px-10 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] hover:opacity-90 transition"
            >
              Go to Room Lobby
            </button>
            <button
              onClick={() => {
                setCreated(false);
                setRoomCode("");
              }}
              className="px-10 py-4 rounded-2xl font-semibold text-lg border border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
            >
              Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizRoom;
