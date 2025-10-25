

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const QuizRoomPlayerView = () => {
  const [stage, setStage] = useState("lobby"); // lobby | question | feedback | summary
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(12);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [rank, setRank] = useState(5);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate(); 

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: 2,
      category: "Geography",
      explanation: "Paris is the capital city of France.",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: 1,
      category: "Astronomy",
      explanation: "Mars is called the Red Planet due to its reddish appearance.",
    },
    {
      question: "Who developed the theory of relativity?",
      options: ["Newton", "Einstein", "Tesla", "Bohr"],
      answer: 1,
      category: "Physics",
      explanation: "Albert Einstein proposed the theory of relativity in 1905.",
    },
  ];

  const participants = ["You", "Ali", "Sara", "Hassan", "Fatima", "John"];

  // 🎬 Lobby auto-move to question
  useEffect(() => {
    if (stage === "lobby") {
      const timer = setTimeout(() => setStage("question"), 4000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // ⏳ Timer countdown
  useEffect(() => {
    if (stage === "question" && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      handleLockAnswer();
    }
  }, [timeLeft, stage]);

  // ✅ Handle lock answer
  const handleLockAnswer = () => {
    const correct = selected === questions[questionIndex].answer;
    if (correct) {
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
      setRank((r) => Math.max(1, r - 1));
      setFeedback("correct");
      confetti({ spread: 70, origin: { y: 0.7 } });
    } else {
      setStreak(0);
      setFeedback("wrong");
    }
    setStage("feedback");
    setTimeout(() => {
      if (questionIndex + 1 < questions.length) {
        setQuestionIndex((i) => i + 1);
        setSelected(null);
        setTimeLeft(12);
        setStage("question");
      } else setStage("summary");
    }, 2000);
  };

  const handleSelect = (index) => {
    if (selected === null && stage === "question") setSelected(index);
  };

  // 🌈 --- UI Rendering ---
  return (
    <AnimatePresence mode="wait">
      {/* ----------- LOBBY ----------- */}
      {stage === "lobby" && (
        <motion.div
          key="lobby"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-indigo-100 text-center relative overflow-hidden"
        >
          <motion.div
            className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-10 w-[90%] md:w-[650px] border border-purple-200"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h1 className="text-4xl font-bold text-purple-700">Quiz Lobby</h1>
            <p className="mt-2 text-gray-600 text-sm">
              Waiting for host to start... ⏳
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {participants.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-sm shadow-md"
                >
                  {p}
                </motion.div>
              ))}
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="mt-10 mx-auto w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full"
            />
          </motion.div>
        </motion.div>
      )}

      {/* ----------- QUESTION ----------- */}
      {stage === "question" && (
        <motion.div
          key="question"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-100 p-6"
        >
          <div className="max-w-4xl w-full bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-600">
                Q{questionIndex + 1}: {questions[questionIndex].category}
              </h2>
              <div className="text-sm text-gray-600">
                ⏱ <span className="font-semibold">{timeLeft}s</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {questions[questionIndex].question}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[questionIndex].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(i)}
                  className={`p-4 rounded-xl border-2 text-left font-semibold transition-all duration-300 ${
                    selected === i
                      ? "border-yellow-400 bg-yellow-100 text-black"
                      : "border-transparent bg-white/50 hover:bg-white"
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </motion.button>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                🎯 Score: <span className="font-bold">{score}</span> | 🔥 Streak:{" "}
                <span className="font-bold">{streak}</span> | 🏅 Rank: #
                {rank}
              </div>
              <button
                onClick={handleLockAnswer}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow hover:scale-105 transition-transform"
              >
                Lock Answer
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ----------- FEEDBACK ----------- */}
      {stage === "feedback" && (
        <motion.div
          key="feedback"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className={`min-h-screen flex flex-col items-center justify-center ${
            feedback === "correct"
              ? "bg-gradient-to-br from-green-100 to-teal-100"
              : "bg-gradient-to-br from-red-100 to-pink-100"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-lg text-center max-w-lg border border-white/50">
            <h2
              className={`text-4xl font-extrabold mb-2 ${
                feedback === "correct" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
            </h2>
            <p className="text-gray-700 mb-4">
              {questions[questionIndex].explanation}
            </p>
          </div>
        </motion.div>
      )}

      {/* ----------- SUMMARY ----------- */}
      {stage === "summary" && (
        <motion.div
          key="summary"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100"
        >
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-xl text-center w-[90%] md:w-[600px] border border-white/40">
            <h1 className="text-4xl font-bold text-purple-700 mb-3">
              🏁 Quiz Complete!
            </h1>
            <p className="text-gray-700 mb-2">Score: {score}</p>
            <p className="text-gray-700 mb-2">Rank: #{rank}</p>
            <p className="text-gray-700 mb-4">
              Accuracy:{" "}
              {Math.round((score / (questions.length * 10)) * 100)}%
            </p>

            {score === questions.length * 10 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="bg-yellow-200 px-4 py-2 rounded-full font-bold text-black inline-block mb-4"
              >
                🏅 Achievement: Quiz Master
              </motion.div>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white rounded-full font-semibold text-purple-700 shadow hover:bg-gray-100"
              >
                Play Again
              </button>
              <button
      onClick={() => navigate("/Leaderboard")} // ← this does the navigation
      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow hover:from-purple-700 hover:to-indigo-700 transition"
    >
      Leaderboard
    </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizRoomPlayerView;
