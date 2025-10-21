import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Clock, Trophy, ArrowLeft, RefreshCw } from "lucide-react";

const StartQuizRoom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedQuiz, roomCode, players: initialPlayers } = state || {};

  // --- Demo Quiz Questions ---
  const quizQuestions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",
    },
    {
      id: 3,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Shakespeare", "Charles Dickens", "Tolkien", "Hemingway"],
      correctAnswer: "Shakespeare",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState(
    initialPlayers?.map((p) => ({ name: p.name, score: 0 })) || []
  );
  const [quizEnded, setQuizEnded] = useState(false);
  const [autoAnswerTimer, setAutoAnswerTimer] = useState(null);

  // Timer countdown
  useEffect(() => {
    if (quizEnded || showAnswer) return;
    if (timeLeft === 0) {
      handleLockAnswer();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showAnswer]);

  // Simulate auto answers for demo players
  useEffect(() => {
    if (!initialPlayers) return;
    if (autoAnswerTimer) clearTimeout(autoAnswerTimer);
    const timer = setTimeout(() => {
      // Fake players randomly answer
      const newScores = [...scores];
      const correct = quizQuestions[currentQuestion].correctAnswer;
      for (let i = 1; i < newScores.length; i++) {
        if (Math.random() > 0.5) newScores[i].score += correct ? 10 : 0;
      }
      setScores(newScores);
    }, 5000);
    setAutoAnswerTimer(timer);
  }, [currentQuestion]);

  // Lock and reveal answer
  const handleLockAnswer = () => {
    setShowAnswer(true);
    const correct = quizQuestions[currentQuestion].correctAnswer;
    if (selectedOption === correct) {
      setScores((prev) =>
        prev.map((s) =>
          s.name === scores[0].name ? { ...s, score: s.score + 10 } : s
        )
      );
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowAnswer(false);
        setTimeLeft(20);
      } else {
        setQuizEnded(true);
      }
    }, 3000);
  };

  const handleSelectOption = (option) => {
    if (showAnswer) return;
    setSelectedOption(option);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setTimeLeft(20);
    setQuizEnded(false);
    setScores(scores.map((s) => ({ ...s, score: 0 })));
  };

  // Sort scores for leaderboard
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  if (quizEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f6f0ff] to-white py-12 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] mb-10">
          Quiz Finished! 🏆
        </h1>

        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-3xl p-8 border border-purple-100">
          <h2 className="text-3xl font-semibold text-purple-700 mb-6">
            Final Leaderboard
          </h2>

          {sortedScores.map((player, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-4 rounded-2xl mb-3 ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-200 to-yellow-100"
                  : "bg-purple-50"
              }`}
            >
              <p className="text-lg font-medium text-purple-800">
                {index + 1}. {player.name}
              </p>
              <p className="font-bold text-purple-700">{player.score} pts</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={handleRestart}
            className="px-10 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] hover:opacity-90 transition flex items-center gap-2"
          >
            <RefreshCw size={22} />
            Play Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-10 py-4 rounded-2xl border border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition"
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f0ff] to-white py-10 px-6 md:px-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 cursor-pointer text-purple-600 hover:text-purple-700 transition"
        >
          <div className="p-3 rounded-full bg-white shadow-sm border border-purple-200">
            <ArrowLeft size={26} />
          </div>
          <span className="font-medium">Back</span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Room Code:</p>
          <p className="font-semibold text-purple-700">{roomCode}</p>
        </div>
      </div>

      {/* QUIZ HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-700 mb-3">
          {selectedQuiz || "General Knowledge Quiz"}
        </h2>
        <p className="text-gray-600">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
      </div>

      {/* TIMER */}
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-3 mb-8">
        <Clock size={22} className="text-purple-600" />
        <div className="w-64 bg-purple-100 rounded-full h-4 relative">
          <div
            className="absolute top-0 left-0 h-4 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-full transition-all"
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          ></div>
        </div>
        <span className="text-purple-700 font-semibold">{timeLeft}s</span>
      </div>

      {/* QUESTION BOX */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-lg border border-purple-100 mb-10">
        <h3 className="text-2xl font-semibold text-purple-800 mb-8">
          {currentQ.question}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {currentQ.options.map((opt, index) => {
            const isCorrect = showAnswer && opt === currentQ.correctAnswer;
            const isWrong = showAnswer && opt === selectedOption && opt !== currentQ.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(opt)}
                disabled={showAnswer}
                className={`p-5 rounded-2xl border-2 font-medium transition-all text-lg ${
                  selectedOption === opt
                    ? "border-purple-500 bg-purple-50"
                    : "border-purple-100 bg-purple-50 hover:bg-purple-100"
                } ${isCorrect ? "border-green-500 bg-green-100" : ""} ${
                  isWrong ? "border-red-500 bg-red-100" : ""
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {!showAnswer && (
          <div className="flex justify-center mt-8">

          </div>
        )}
      </div>

      {/* SCOREBOARD */}
{/* SCOREBOARD */}
<div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-lg border border-purple-100">
  <h3 className="text-2xl font-semibold text-purple-700 mb-6 flex items-center gap-2 justify-center">
    <Trophy size={22} /> Player Scoreboard
  </h3>

  {scores
    .filter((_, index) => index !== 0) // remove host (first entry)
    .map((player, i) => (
      <div
        key={i}
        className="flex justify-between items-center p-3 rounded-2xl mb-3 bg-purple-50 border border-purple-100"
      >
        <p className="text-lg font-medium text-purple-800">{player.name}</p>
        <p className="font-semibold text-purple-700">{player.score} pts</p>
      </div>
    ))}
</div>

    </div>
  );
};

export default StartQuizRoom;
