

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Loader2, CheckCircle2, XCircle } from "lucide-react";

const JoinQuiz = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-fill from URL if "?code=" present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) setRoomCode(code);
  }, []);

  const handleJoinQuiz = async () => {
    if (!roomCode || roomCode.length < 4) {
      setError("Please enter a valid quiz code!");
      return;
    }

    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:4000/api/rooms/${roomCode}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setLoading(false);

        // Navigate to QuizRoomPlayerView with :quizId in URL
        setTimeout(() => {
          navigate(`/QuizRoomPlayerView/${data.room.quiz._id}`, {
            state: { room: data.room }, // pass room if needed
          });
        }, 800);
      } else {
        setError(data.message || "Invalid or expired quiz code!");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 overflow-hidden">
      <div
        className="absolute -left-32 -top-28 w-96 h-96 rounded-full bg-purple-300 opacity-30 filter blur-3xl transform rotate-45"
        aria-hidden
      />
      <div
        className="absolute -right-28 -bottom-24 w-80 h-80 rounded-full bg-pink-300 opacity-25 filter blur-2xl"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-md"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-3xl p-10 md:p-14 rounded-2xl bg-white/90 shadow-2xl border border-purple-100"
      >
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <label className="block text-sm font-medium text-gray-600 mb-3">
                Quiz Code
              </label>
              <input
                type="text"
                placeholder="e.g. ABC123"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="w-full rounded-xl border border-purple-200 bg-white/80 px-6 py-5 text-2xl tracking-widest text-center outline-none focus:ring-4 focus:ring-purple-200 transition placeholder:uppercase placeholder:tracking-widest"
                autoComplete="off"
              />

              <div className="mt-4 min-h-[1.25rem]">
                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <XCircle className="w-4 h-4" /> <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle2 className="w-4 h-4" />{" "}
                    <span>Joined successfully! Redirecting...</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleJoinQuiz}
                disabled={loading}
                className={`mt-6 w-full rounded-xl py-4 flex items-center justify-center gap-3 text-lg font-semibold text-white transition ${
                  loading
                    ? "bg-purple-400 cursor-not-allowed opacity-80"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                } shadow-lg`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />{" "}
                    <span>Joining...</span>
                  </>
                ) : (
                  "Join Quiz"
                )}
              </button>

              <div className="mt-5 text-xs text-gray-500 text-center">
                Share the code with your friends — they can join from any device.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinQuiz;
