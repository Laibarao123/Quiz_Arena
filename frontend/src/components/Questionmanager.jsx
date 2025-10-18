
// import React, { useEffect, useState } from "react";
// import { Trash2, Edit2, Check, XCircle, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const QuestionManager = () => {
//   const navigate = useNavigate();
//   const [quizzes, setQuizzes] = useState([]);
//   const [editQuestion, setEditQuestion] = useState(null); // { quizIndex, questionIndex }
//   const [editData, setEditData] = useState({ text: "", options: ["", "", "", ""], correctIndex: null });

//   useEffect(() => {
//     const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
//     setQuizzes(storedQuizzes);
//   }, []);

//   // Delete a question from a quiz
//   const deleteQuestion = (quizIndex, questionIndex) => {
//     const updatedQuizzes = [...quizzes];
//     updatedQuizzes[quizIndex].questions.splice(questionIndex, 1);
//     setQuizzes(updatedQuizzes);
//     localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
//   };

//   // Delete a quiz (used for empty quizzes)
//   const deleteQuiz = (quizIndex) => {
//     if (window.confirm("Are you sure you want to delete this quiz?")) {
//       const updatedQuizzes = [...quizzes];
//       updatedQuizzes.splice(quizIndex, 1);
//       setQuizzes(updatedQuizzes);
//       localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
//     }
//   };

//   const startEdit = (quizIndex, questionIndex) => {
//     setEditQuestion({ quizIndex, questionIndex });
//     const q = quizzes[quizIndex].questions[questionIndex];
//     setEditData({ text: q.text, options: [...q.options], correctIndex: q.correctIndex });
//   };

//   const cancelEdit = () => {
//     setEditQuestion(null);
//     setEditData({ text: "", options: ["", "", "", ""], correctIndex: null });
//   };

//   const saveEdit = () => {
//     const { quizIndex, questionIndex } = editQuestion;
//     const updatedQuizzes = [...quizzes];
//     updatedQuizzes[quizIndex].questions[questionIndex] = { ...editData };
//     setQuizzes(updatedQuizzes);
//     localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
//     cancelEdit();
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...editData.options];
//     newOptions[index] = value;
//     setEditData({ ...editData, options: newOptions });
//   };

//   return (
//     <div className="min-h-screen bg-[#0e0e10] text-gray-200 p-6 md:p-10">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-10">
//         <div
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-200 transition"
//         >
//           <ArrowLeft size={22} />
//           <span>Back</span>
//         </div>
//         <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//           Question Manager
//         </h1>
//         <div></div>
//       </div>

//       {/* QUIZ LIST */}
//       {quizzes.length === 0 ? (
//         <p className="text-gray-400 text-center mt-20">
//           No quizzes found. Create one first!
//         </p>
//       ) : (
//         quizzes.map((quizItem, quizIndex) => (
//           <div
//             key={quizIndex}
//             className="mb-8 bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700"
//           >
//             {/* Quiz Header */}
//             <div className="flex justify-between items-center mb-2">
//               <div>
//                 <h2 className="text-2xl font-semibold text-blue-400">
//                   {quizItem.quiz.title}
//                 </h2>
//                 <span className="text-gray-400 text-sm">
//                   {quizItem.questions.length} {quizItem.questions.length === 1 ? "question" : "questions"}
//                 </span>
//               </div>
//               {quizItem.questions.length === 0 && (
//                 <button
//                   onClick={() => deleteQuiz(quizIndex)}
//                   className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-gray-200"
//                   title="Delete empty quiz"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               )}
//             </div>
//             <p className="text-gray-400 mb-4">{quizItem.quiz.description}</p>

//             {/* QUESTIONS */}
//             <div className="space-y-3">
//               {quizItem.questions.map((q, questionIndex) => (
//                 <div
//                   key={questionIndex}
//                   className="bg-gray-900 border border-gray-700 rounded-xl p-3"
//                 >
//                   {editQuestion &&
//                   editQuestion.quizIndex === quizIndex &&
//                   editQuestion.questionIndex === questionIndex ? (
//                     // === EDIT MODE ===
//                     <div className="space-y-2">
//                       <input
//                         type="text"
//                         value={editData.text}
//                         onChange={(e) =>
//                           setEditData({ ...editData, text: e.target.value })
//                         }
//                         className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-500 text-sm"
//                         placeholder="Edit question"
//                       />
//                       {editData.options.map((opt, i) => (
//                         <div key={i} className="flex items-center gap-2">
//                           <input
//                             type="text"
//                             value={opt}
//                             onChange={(e) => handleOptionChange(i, e.target.value)}
//                             className="flex-1 bg-gray-800 border border-gray-600 rounded-lg p-1 text-gray-200 text-sm focus:outline-none"
//                             placeholder={`Option ${i + 1}`}
//                           />
//                           <button
//                             onClick={() => setEditData({ ...editData, correctIndex: i })}
//                             className={`p-1 rounded-full transition ${
//                               editData.correctIndex === i
//                                 ? "bg-green-600"
//                                 : "bg-gray-700 hover:bg-gray-600"
//                             }`}
//                           >
//                             <Check size={14} />
//                           </button>
//                         </div>
//                       ))}
//                       <div className="flex gap-2 mt-2 justify-end">
//                         <button
//                           onClick={saveEdit}
//                           className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-1 text-sm"
//                         >
//                           <Check size={14} /> Save
//                         </button>
//                         <button
//                           onClick={cancelEdit}
//                           className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-1 text-sm"
//                         >
//                           <XCircle size={14} /> Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     // === DISPLAY MODE ===
//                     <>
//                       <div className="flex justify-between items-center mb-2">
//                         <h3 className="text-gray-200 font-medium text-sm">
//                           {questionIndex + 1}. {q.text}
//                         </h3>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => startEdit(quizIndex, questionIndex)}
//                             className="p-1 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition text-gray-200"
//                             title="Edit question"
//                           >
//                             <Edit2 size={16} />
//                           </button>
//                           <button
//                             onClick={() => deleteQuestion(quizIndex, questionIndex)}
//                             className="p-1 rounded-lg bg-red-600 hover:bg-red-700 transition text-gray-200"
//                             title="Delete question"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </div>
//                       <ul className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
//                         {q.options.map((opt, i) => (
//                           <li
//                             key={i}
//                             className={`p-1 rounded ${
//                               q.correctIndex === i
//                                 ? "bg-green-700 text-green-100 font-semibold"
//                                 : "hover:bg-gray-800 transition"
//                             }`}
//                           >
//                             {opt}
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default QuestionManager;











import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Check, XCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuestionManager = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [editQuestion, setEditQuestion] = useState(null); 
  const [editData, setEditData] = useState({ text: "", options: ["", "", "", ""], correctIndex: null });

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(storedQuizzes);
  }, []);

  const deleteQuestion = (quizIndex, questionIndex) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].questions.splice(questionIndex, 1);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
  };

  const deleteQuiz = (quizIndex) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const updatedQuizzes = [...quizzes];
      updatedQuizzes.splice(quizIndex, 1);
      setQuizzes(updatedQuizzes);
      localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
    }
  };

  const startEdit = (quizIndex, questionIndex) => {
    setEditQuestion({ quizIndex, questionIndex });
    const q = quizzes[quizIndex].questions[questionIndex];
    setEditData({ text: q.text, options: [...q.options], correctIndex: q.correctIndex });
  };

  const cancelEdit = () => {
    setEditQuestion(null);
    setEditData({ text: "", options: ["", "", "", ""], correctIndex: null });
  };

  const saveEdit = () => {
    const { quizIndex, questionIndex } = editQuestion;
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].questions[questionIndex] = { ...editData };
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
    cancelEdit();
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editData.options];
    newOptions[index] = value;
    setEditData({ ...editData, options: newOptions });
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-gray-200 p-6 md:p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-200 transition"
        >
          <ArrowLeft size={22} />
          <span>Back</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Question Manager
        </h1>
        <div></div>
      </div>

      {/* QUIZ LIST */}
      {quizzes.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">
          No quizzes found. Create one first!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((quizItem, quizIndex) => (
            <div
              key={quizIndex}
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-xl p-6 border border-gray-700"
            >
              {/* Quiz Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-blue-400">
                    {quizItem.quiz.title}
                  </h2>
                  <span className="text-gray-400 text-sm">
                    {quizItem.questions.length}{" "}
                    {quizItem.questions.length === 1 ? "question" : "questions"}
                  </span>
                </div>
                {quizItem.questions.length === 0 && (
                  <button
                    onClick={() => deleteQuiz(quizIndex)}
                    className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-gray-200"
                    title="Delete empty quiz"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <p className="text-gray-300 mb-5">{quizItem.quiz.description}</p>

              {/* QUESTIONS */}
              <div className="space-y-4">
                {quizItem.questions.map((q, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="bg-gray-800 border border-gray-700 rounded-2xl p-4 shadow-md"
                  >
                    {editQuestion &&
                    editQuestion.quizIndex === quizIndex &&
                    editQuestion.questionIndex === questionIndex ? (
                      // === EDIT MODE ===
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editData.text}
                          onChange={(e) =>
                            setEditData({ ...editData, text: e.target.value })
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-500 text-sm"
                          placeholder="Edit question"
                        />
                        {editData.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => handleOptionChange(i, e.target.value)}
                              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg p-1 text-gray-200 text-sm focus:outline-none"
                              placeholder={`Option ${i + 1}`}
                            />
                            <button
                              onClick={() =>
                                setEditData({ ...editData, correctIndex: i })
                              }
                              className={`p-1 rounded-full transition ${
                                editData.correctIndex === i
                                  ? "bg-green-600"
                                  : "bg-gray-600 hover:bg-gray-500"
                              }`}
                            >
                              <Check size={14} />
                            </button>
                          </div>
                        ))}
                        <div className="flex gap-2 mt-2 justify-end">
                          <button
                            onClick={saveEdit}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-1 text-sm"
                          >
                            <Check size={14} /> Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-1 text-sm"
                          >
                            <XCircle size={14} /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // === DISPLAY MODE ===
                      <>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-gray-200 font-medium text-sm">
                            {questionIndex + 1}. {q.text}
                          </h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(quizIndex, questionIndex)}
                              className="p-1 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition text-gray-200"
                              title="Edit question"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteQuestion(quizIndex, questionIndex)}
                              className="p-1 rounded-lg bg-red-600 hover:bg-red-700 transition text-gray-200"
                              title="Delete question"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <ul className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
                          {q.options.map((opt, i) => (
                            <li
                              key={i}
                              className={`p-1 rounded ${
                                q.correctIndex === i
                                  ? "bg-green-700 text-green-100 font-semibold"
                                  : "hover:bg-gray-700 transition"
                              }`}
                            >
                              {opt}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionManager;





















