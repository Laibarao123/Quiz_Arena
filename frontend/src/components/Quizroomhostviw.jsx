// import React, { useState, useEffect } from "react";

// const QuizRoomHostView = () => {
//   const [quizzes, setQuizzes] = useState([]); // All quizzes from localStorage
//   const [selectedQuizIndex, setSelectedQuizIndex] = useState(null); // Currently selected quiz
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [timer, setTimer] = useState(30);

//   // Example participants (you can integrate live updates later)
//   const [participants, setParticipants] = useState([
//     { name: "Alice", score: 0 },
//     { name: "Bob", score: 0 },
//   ]);

//   // Load quizzes from localStorage
//   useEffect(() => {
//     const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
//     setQuizzes(storedQuizzes);
//   }, []);

//   // Timer countdown
//   useEffect(() => {
//     if (selectedQuizIndex === null) return; // Only run timer if quiz selected

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

//   // If no quiz selected, show quiz selection
//   if (selectedQuizIndex === null) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 md:p-10 text-gray-200">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-6">
//           Select a Quiz to Host
//         </h1>
//         {quizzes.length === 0 ? (
//           <p className="text-gray-400 text-xl">No quizzes found in localStorage.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {quizzes.map((q, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-700 hover:scale-105 transform transition cursor-pointer"
//                 onClick={() => startQuiz(i)}
//               >
//                 <h2 className="text-xl font-bold text-blue-400 mb-2">{q.quiz.title}</h2>
//                 <p className="text-gray-400 mb-4">{q.quiz.description}</p>
//                 <p className="text-gray-300 font-semibold">
//                   {q.questions.length} {q.questions.length === 1 ? "Question" : "Questions"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Quiz is selected
//   const quiz = quizzes[selectedQuizIndex];
//   const currentQuestion = quiz.questions[currentQuestionIndex];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 md:p-10 text-gray-200">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400">
//           {quiz.quiz.title}
//         </h1>
//         <div className="text-gray-400 text-sm">
//           Timer: <span className="font-bold text-green-400">{timer}s</span>
//         </div>
//       </div>

//       {/* Question Card */}
//       <div className="bg-gray-800 rounded-3xl p-6 shadow-xl mb-8 border border-gray-700">
//         <h2 className="text-xl md:text-2xl font-semibold mb-4">
//           Question {currentQuestionIndex + 1}:
//         </h2>
//         <p className="text-gray-200 text-lg mb-4">{currentQuestion.text}</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {currentQuestion.options.map((opt, i) => (
//             <div
//               key={i}
//               className="bg-gray-700 p-3 rounded-xl hover:bg-gray-600 cursor-pointer transition text-gray-100"
//             >
//               {opt}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Participants / Scores */}
//       <div className="bg-gray-800 rounded-3xl p-6 shadow-xl mb-8 border border-gray-700">
//         <h2 className="text-xl font-semibold mb-4">Participants</h2>
//         <ul className="space-y-2">
//           {participants.map((p, i) => (
//             <li
//               key={i}
//               className="flex justify-between bg-gray-700 p-3 rounded-xl items-center"
//             >
//               <span>{p.name}</span>
//               <span className="font-bold text-green-400">{p.score} pts</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Controls */}
//       <div className="flex gap-4">
//         <button
//           onClick={nextQuestion}
//           className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold transition"
//         >
//           Next Question
//         </button>
//         <button
//           onClick={endQuiz}
//           className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-2xl font-semibold transition"
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

  const [participants, setParticipants] = useState([
    { name: "Alice", score: 0 },
    { name: "Bob", score: 0 },
  ]);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(storedQuizzes);
  }, []);

  useEffect(() => {
    if (selectedQuizIndex === null) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedQuizIndex]);

  const startQuiz = (index) => {
    setSelectedQuizIndex(index);
    setCurrentQuestionIndex(0);
    setTimer(30);
  };

  const nextQuestion = () => {
    const quiz = quizzes[selectedQuizIndex];
    if (quiz && currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
    } else {
      alert("This is the last question!");
    }
  };

  const endQuiz = () => {
    setSelectedQuizIndex(null);
    setCurrentQuestionIndex(0);
    setTimer(30);
    alert("Quiz Ended!");
  };

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
                onClick={() => startQuiz(i)}
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0b1f] via-[#15132b] to-[#1b1739] p-10 text-gray-100 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          {quiz.quiz.title}
        </h1>
        <div className="text-sm bg-[#1f1b3d] px-4 py-2 rounded-xl shadow-inner border border-[#2e2760]">
          Timer: <span className="font-bold text-green-400">{timer}s</span>
        </div>
      </div>

      {/* Question */}
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

      {/* Participants */}
      <div className="bg-[#1b1739] border border-[#2a2548] rounded-3xl shadow-lg p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-purple-300">
          Participants
        </h2>
        <ul className="space-y-3">
          {participants.map((p, i) => (
            <li
              key={i}
              className="flex justify-between bg-[#2a2548] hover:bg-[#342c66] p-3 rounded-2xl transition"
            >
              <span>{p.name}</span>
              <span className="font-bold text-green-400">{p.score} pts</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
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
};

export default QuizRoomHostView;
