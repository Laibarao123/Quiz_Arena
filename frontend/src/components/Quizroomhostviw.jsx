

// import React, { useState, useEffect } from "react";

// const QuizRoomHostView = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [timer, setTimer] = useState(30);

//   const [participants, setParticipants] = useState([
//     { name: "Alice", score: 0 },
//     { name: "Bob", score: 0 },
//   ]);

//   useEffect(() => {
//     const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
//     setQuizzes(storedQuizzes);
//   }, []);

//   useEffect(() => {
//     if (selectedQuizIndex === null) return;
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [selectedQuizIndex]);

//   const startQuiz = (index) => {
//     setSelectedQuizIndex(index);
//     setCurrentQuestionIndex(0);
//     setTimer(30);
//   };

//   const nextQuestion = () => {
//     const quiz = quizzes[selectedQuizIndex];
//     if (quiz && currentQuestionIndex + 1 < quiz.questions.length) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//       setTimer(30);
//     } else {
//       alert("This is the last question!");
//     }
//   };

//   const endQuiz = () => {
//     setSelectedQuizIndex(null);
//     setCurrentQuestionIndex(0);
//     setTimer(30);
//     alert("Quiz Ended!");
//   };

//   if (selectedQuizIndex === null) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-[#0d0b1f] via-[#15132b] to-[#1b1739] p-10 text-gray-100 font-sans">
//         <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10">
//           Select a Quiz to Host
//         </h1>
//         {quizzes.length === 0 ? (
//           <p className="text-center text-gray-400 text-lg">
//             No quizzes found in localStorage.
//           </p>
//         ) : (
//           <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {quizzes.map((q, i) => (
//               <div
//                 key={i}
//                 onClick={() => startQuiz(i)}
//                 className="p-6 rounded-3xl border border-[#2a2548] bg-gradient-to-br from-[#1b1739] to-[#0d0b1f] shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition transform cursor-pointer"
//               >
//                 <h2 className="text-2xl font-bold text-purple-400 mb-2">
//                   {q.quiz.title}
//                 </h2>
//                 <p className="text-gray-400 mb-4">{q.quiz.description}</p>
//                 <p className="text-gray-300 font-semibold">
//                   {q.questions.length}{" "}
//                   {q.questions.length === 1 ? "Question" : "Questions"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   const quiz = quizzes[selectedQuizIndex];
//   const currentQuestion = quiz.questions[currentQuestionIndex];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0d0b1f] via-[#15132b] to-[#1b1739] p-10 text-gray-100 font-sans">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-10">
//         <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
//           {quiz.quiz.title}
//         </h1>
//         <div className="text-sm bg-[#1f1b3d] px-4 py-2 rounded-xl shadow-inner border border-[#2e2760]">
//           Timer: <span className="font-bold text-green-400">{timer}s</span>
//         </div>
//       </div>

//       {/* Question */}
//       <div className="bg-[#1b1739] border border-[#2a2548] rounded-3xl shadow-lg p-8 mb-10">
//         <h2 className="text-2xl font-semibold mb-4 text-purple-300">
//           Question {currentQuestionIndex + 1}
//         </h2>
//         <p className="text-gray-200 text-lg mb-6">{currentQuestion.text}</p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {currentQuestion.options.map((opt, i) => (
//             <div
//               key={i}
//               className="bg-[#2a2548] hover:bg-[#3a3470] p-4 rounded-2xl text-center text-gray-100 font-medium transition cursor-pointer"
//             >
//               {opt}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Participants */}
//       <div className="bg-[#1b1739] border border-[#2a2548] rounded-3xl shadow-lg p-8 mb-10">
//         <h2 className="text-2xl font-semibold mb-4 text-purple-300">
//           Participants
//         </h2>
//         <ul className="space-y-3">
//           {participants.map((p, i) => (
//             <li
//               key={i}
//               className="flex justify-between bg-[#2a2548] hover:bg-[#342c66] p-3 rounded-2xl transition"
//             >
//               <span>{p.name}</span>
//               <span className="font-bold text-green-400">{p.score} pts</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Buttons */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <button
//           onClick={nextQuestion}
//           className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 rounded-2xl font-semibold transition"
//         >
//           Next Question
//         </button>
//         <button
//           onClick={endQuiz}
//           className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 rounded-2xl font-semibold transition"
//         >
//           End Quiz
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuizRoomHostView;


















import React, { useState, useEffect } from "react";

const QuizRoomHostView = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizEnded, setIsQuizEnded] = useState(false);

  const [roomCode, setRoomCode] = useState(null);
  const [participants, setParticipants] = useState([]);

  const [newPlayerName, setNewPlayerName] = useState("");

  // Load quizzes from localStorage
  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(storedQuizzes);
  }, []);

  // Timer for active question
  useEffect(() => {
    if (!isQuizStarted || selectedQuizIndex === null || isQuizEnded) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedQuizIndex, isQuizStarted, isQuizEnded]);

  // Generate random room code
  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
  };

  const startQuizSetup = (index) => {
    setSelectedQuizIndex(index);
    generateRoomCode();
    setParticipants([]);
    setIsQuizStarted(false);
    setIsQuizEnded(false);
  };

  const addParticipant = () => {
    if (!newPlayerName.trim()) return;
    setParticipants((prev) => [...prev, { name: newPlayerName, score: 0 }]);
    setNewPlayerName("");
  };

  const startQuiz = () => {
    if (participants.length === 0) {
      alert("Add at least one participant to start the quiz!");
      return;
    }
    setIsQuizStarted(true);
    setTimer(30);
  };

  const nextQuestion = () => {
    const quiz = quizzes[selectedQuizIndex];
    if (quiz && currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setIsQuizEnded(true);
    setIsQuizStarted(false);
    alert("Quiz Ended!");
  };

  const resetQuiz = () => {
    setSelectedQuizIndex(null);
    setCurrentQuestionIndex(0);
    setTimer(30);
    setIsQuizEnded(false);
    setIsQuizStarted(false);
    setRoomCode(null);
    setParticipants([]);
  };

  // INITIAL SCREEN (Select quiz)
  if (selectedQuizIndex === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d0b1f] via-[#15132b] to-[#1b1739] p-10 text-gray-100 font-sans">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10">
          Select a Quiz to Host
        </h1>
        {quizzes.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No quizzes found in localStorage.
          </p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((q, i) => (
              <div
                key={i}
                onClick={() => startQuizSetup(i)}
                className="p-6 rounded-3xl border border-[#2a2548] bg-gradient-to-br from-[#1b1739] to-[#0d0b1f] shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition transform cursor-pointer"
              >
                <h2 className="text-2xl font-bold text-purple-400 mb-2">
                  {q.quiz.title}
                </h2>
                <p className="text-gray-400 mb-4">{q.quiz.description}</p>
                <p className="text-gray-300 font-semibold">
                  {q.questions.length}{" "}
                  {q.questions.length === 1 ? "Question" : "Questions"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const quiz = quizzes[selectedQuizIndex];
  const currentQuestion = quiz.questions[currentQuestionIndex];

  // ROOM SETUP BEFORE QUIZ STARTS
  if (!isQuizStarted && !isQuizEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d0b1f] via-[#15132b] to-[#1b1739] p-10 text-gray-100 font-sans">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
          Host Quiz Room
        </h1>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-300">
            Room Code:{" "}
            <span className="font-bold text-green-400 text-xl">{roomCode}</span>
          </p>
          <p className="text-gray-400">
            Share this code with players to join the quiz.
          </p>
        </div>

        {/* Add Participants */}
        <div className="max-w-md mx-auto bg-[#1b1739] p-6 rounded-3xl border border-[#2a2548] shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">
            Add Participants
          </h2>
          <div className="flex gap-3 mb-4">
            <input
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter player name"
              className="flex-1 bg-[#2a2548] text-gray-100 p-2 rounded-xl outline-none border border-[#3a3470]"
            />
            <button
              onClick={addParticipant}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:opacity-90"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {participants.map((p, i) => (
              <li
                key={i}
                className="flex justify-between bg-[#2a2548] p-2 rounded-lg"
              >
                <span>{p.name}</span>
                <span className="text-green-400 font-semibold">{p.score} pts</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <button
            onClick={startQuiz}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 rounded-2xl font-semibold transition"
          >
            Start Quiz
          </button>
          <button
            onClick={resetQuiz}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 rounded-2xl font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // QUIZ RUNNING VIEW
  if (isQuizStarted && !isQuizEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d0b1f] via-[#15132b] to-[#1b1739] p-10 text-gray-100 font-sans">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {quiz.quiz.title}
          </h1>
          <div className="text-sm bg-[#1f1b3d] px-4 py-2 rounded-xl border border-[#2e2760]">
            Timer: <span className="font-bold text-green-400">{timer}s</span>
          </div>
        </div>

        <div className="bg-[#1b1739] border border-[#2a2548] rounded-3xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="text-gray-200 text-lg mb-6">{currentQuestion.text}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((opt, i) => (
              <div
                key={i}
                className="bg-[#2a2548] hover:bg-[#3a3470] p-4 rounded-2xl text-center text-gray-100 font-medium transition cursor-pointer"
              >
                {opt}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={nextQuestion}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 rounded-2xl font-semibold transition"
          >
            Next Question
          </button>
          <button
            onClick={endQuiz}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 rounded-2xl font-semibold transition"
          >
            End Quiz
          </button>
        </div>
      </div>
    );
  }

  // QUIZ ENDED — SHOW RESULTS
  if (isQuizEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d0b1f] via-[#15132b] to-[#1b1739] p-10 text-gray-100 font-sans text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          Quiz Results
        </h1>
        <p className="text-gray-400 mb-8">
          Room Code: <span className="text-purple-400">{roomCode}</span>
        </p>
        <div className="max-w-lg mx-auto bg-[#1b1739] p-6 rounded-3xl border border-[#2a2548] shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">
            Participants & Scores
          </h2>
          <ul className="space-y-3">
            {participants.map((p, i) => (
              <li
                key={i}
                className="flex justify-between bg-[#2a2548] p-3 rounded-2xl"
              >
                <span>{p.name}</span>
                <span className="font-bold text-green-400">{p.score} pts</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={resetQuiz}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 rounded-2xl font-semibold transition"
        >
          Back to Quiz List
        </button>
      </div>
    );
  }
};

export default QuizRoomHostView;















