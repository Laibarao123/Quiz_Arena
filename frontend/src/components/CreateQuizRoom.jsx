

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Share2 } from "lucide-react";

const CreateQuizRoom = () => {
  const navigate = useNavigate();

  // states
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [duration, setDuration] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [roomCode, setRoomCode] = useState("");
  const [created, setCreated] = useState(false);

  // backend base url
  const BASE = "http://localhost:4000";

  // helper: try axios then fallback to fetch
  const fetchQuizzesFromBackend = async () => {
    setLoading(true);
    setFetchError(null);

    try {
      console.log("[CreateQuizRoom] Attempting axios GET /api/quiz");
      const res = await axios.get(`${BASE}/api/quiz`, { timeout: 5000 });
      console.log("[CreateQuizRoom] axios response:", res);
      // Many controllers return array directly — handle both array and { quizzes: [...] }
      const data = Array.isArray(res.data) ? res.data : res.data.quizzes || res.data;
      if (!Array.isArray(data)) {
        throw new Error("Unexpected response shape from backend: " + JSON.stringify(res.data));
      }
      setQuizList(data);
      setLoading(false);
      return;
    } catch (axErr) {
      console.error("[CreateQuizRoom] axios failed:", axErr?.message || axErr);
      console.log("[CreateQuizRoom] Falling back to native fetch...");

      // Fallback to fetch
      try {
        const resp = await fetch(`${BASE}/api/quiz`);
        console.log("[CreateQuizRoom] fetch raw response:", resp);
        if (!resp.ok) {
          const txt = await resp.text();
          throw new Error(`Fetch failed: ${resp.status} ${resp.statusText} — body: ${txt}`);
        }
        const json = await resp.json();
        console.log("[CreateQuizRoom] fetch json:", json);
        const data = Array.isArray(json) ? json : json.quizzes || json;
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response shape from backend (fetch): " + JSON.stringify(json));
        }
        setQuizList(data);
        setLoading(false);
        return;
      } catch (fetchErr) {
        console.error("[CreateQuizRoom] fetch failed:", fetchErr);
        setFetchError(fetchErr.message || "Unknown fetch error");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchQuizzesFromBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


const handleCreateRoom = async () => {
  if (!selectedQuiz || !roomName || !maxPlayers || !duration) {
    alert("Please fill in all fields before creating a room.");
    return;
  }

  try {
    const payload = {
      name: roomName,
      quizId: selectedQuiz,
      maxPlayers: parseInt(maxPlayers),
      duration: parseInt(duration),
      visibility,
    };

    console.log("[CreateQuizRoom] Sending room create request:", payload);

    const res = await axios.post(`${BASE}/api/rooms`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("[CreateQuizRoom] Room created response:", res.data);

    if (res.data.success) {
      setRoomCode(res.data.room.roomCode);
      setCreated(true);
    } else {
      alert("Failed to create room: " + (res.data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("[CreateQuizRoom] Room creation failed:", err);
    alert("Error creating room: " + (err.response?.data?.message || err.message));
  }
};


  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied to clipboard!");
  };

  const handleShareRoom = () => {
    const shareText = `🎯 Join my quiz room "${roomName}" for "${selectedQuiz}" using this code: ${roomCode}\n\nPlay here: http://localhost:3000/join-room?code=${roomCode}`;
    const shareUrl = `http://localhost:3000/join-room?code=${roomCode}`;
    if (navigator.share) {
      navigator.share({ title: "Join My Quiz Room!", text: shareText, url: shareUrl }).catch((e) => console.error(e));
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-purple-600">
        Loading quizzes from backend...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f0ff] to-white py-16 px-6 md:px-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12 relative">
        <div onClick={() => navigate(-1)} className="flex items-center gap-3 cursor-pointer text-purple-600 hover:text-purple-700 transition">
          <div className="p-3 rounded-full bg-white shadow-sm border border-purple-200"><ArrowLeft size={35} /></div>
          <span className="font-stretch-100% text-lg">Back</span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899]">Create Quiz Room</h1>
        </div>
      </div>

      {/* show fetch error if any */}
      {fetchError && (
        <div className="max-w-5xl mx-auto mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          <strong>Failed to load quizzes:</strong> {fetchError}
          <div className="mt-2 text-sm text-gray-600">
            Check console and follow the checklist below (server running, correct route, CORS, URL).
          </div>
        </div>
      )}

      {/* MAIN FORM */}
      {!created ? (
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-12 shadow-xl border border-purple-100">
          {/* QUIZ SELECTION */}
          <div className="mb-8">
            <label className="block text-purple-700 font-semibold text-lg mb-3">Select Quiz</label>

            <select
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              className="w-full p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none"
            >
              <option value="">Select a quiz...</option>

              {quizList.length > 0 ? (
                // value uses quiz._id for reliability; dropdown shows title
                quizList.map((quiz) => (
                  <option key={quiz._id} value={quiz._id}>
                    {quiz.title} {quiz.category ? `— (${quiz.category})` : ""}
                  </option>
                ))
              ) : (
                <option disabled>No quizzes available</option>
              )}
            </select>
          </div>

          {/* ROOM DETAILS */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-purple-700 font-semibold text-lg mb-3">Room Name</label>
              <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Enter room name" className="w-full p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none" />
            </div>

            <div>
              <label className="block text-purple-700 font-semibold text-lg mb-3">Max Players</label>
              <input type="number" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} placeholder="e.g. 10" className="w-full p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none" />
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-purple-700 font-semibold text-lg mb-3">Quiz Duration (minutes)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 20" className="w-full p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none" />
          </div>

          <div className="mt-8 flex items-center gap-6">
            <label className="text-purple-700 font-semibold text-lg">Visibility:</label>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="p-4 text-lg border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 outline-none">
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* CREATE BUTTON */}
          <div className="mt-14 flex justify-center">
            <button onClick={handleCreateRoom} className="px-16 py-5 rounded-2xl text-white font-semibold text-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] hover:opacity-90 transition">Create Room</button>
          </div>

          {/* DEBUG: show raw quizList (collapsible style) */}
          <div className="mt-6 text-sm text-gray-500">
            <details>
              <summary className="cursor-pointer">Debug: Raw quizzes (click to open)</summary>
              <pre className="bg-gray-50 p-4 rounded mt-2 text-xs overflow-auto">{JSON.stringify(quizList, null, 2)}</pre>
            </details>
          </div>
        </div>
      ) : (
        /* ROOM CREATED CARD */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 shadow-xl border border-purple-100 text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">Room Created Successfully!</h2>
          <p className="text-gray-600 mb-8 text-lg">Share this code with players to join your quiz room.</p>

          <div className="flex items-center justify-center gap-4 bg-purple-50 border border-purple-200 rounded-2xl py-5 px-8 mb-10">
            <span className="text-4xl font-bold text-purple-700 tracking-widest">{roomCode}</span>
            <button onClick={handleCopyCode} className="p-3 bg-white rounded-full border border-purple-200 hover:bg-purple-100 transition"><Copy size={22} className="text-purple-600" /></button>
            <button onClick={handleShareRoom} className="p-3 bg-white rounded-full border border-purple-200 hover:bg-purple-100 transition"><Share2 size={22} className="text-purple-600" /></button>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-5">
            <button onClick={() => navigate("/LobbyRoom", { state: { roomCode, selectedQuiz } })} className="px-10 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] hover:opacity-90 transition">Go to Room Lobby</button>
            <button onClick={() => { setCreated(false); setRoomCode(""); }} className="px-10 py-4 rounded-2xl font-semibold text-lg border border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100 transition">Create Another</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizRoom;



























