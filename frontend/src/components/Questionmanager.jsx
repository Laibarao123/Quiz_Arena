
// import React, { useEffect, useState } from "react";
// import { Trash2, Edit2, Check, XCircle, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const QuestionManager = () => {
//   const navigate = useNavigate();
//   const [quizzes, setQuizzes] = useState([]);
//   const [editQuestion, setEditQuestion] = useState(null);
//   const [editData, setEditData] = useState({
//     text: "",
//     options: ["", "", "", ""],
//     correctIndex: null,
//   });

//   useEffect(() => {
//     const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
//     setQuizzes(storedQuizzes);
//   }, []);

//   const deleteQuestion = (quizIndex, questionIndex) => {
//     const updatedQuizzes = [...quizzes];
//     updatedQuizzes[quizIndex].questions.splice(questionIndex, 1);
//     setQuizzes(updatedQuizzes);
//     localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
//   };

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
//     setEditData({
//       text: q.text,
//       options: [...q.options],
//       correctIndex: q.correctIndex,
//     });
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
//     <div className="min-h-screen bg-gradient-to-br from-[#faf5ff] via-[#f3ecff] to-[#fff] text-gray-800 p-6 md:p-10">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-10">
//         <div
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-3 cursor-pointer text-purple-600 hover:text-purple-700 transition"
//         >
//           <div className="p-2 rounded-full bg-white shadow-sm border border-purple-200">
//             <ArrowLeft size={18} />
//           </div>
//           <span className="font-medium">Back</span>
//         </div>

//         <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-center w-full">
//           Question Manager
//         </h1>

//         <div></div>
//       </div>

//       {/* QUIZ LIST */}
//       {quizzes.length === 0 ? (
//         <p className="text-gray-500 text-center mt-20">
//           No quizzes found. Create one first!
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-8">
//           {quizzes.map((quizItem, quizIndex) => (
//             <div
//               key={quizIndex}
//               className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(124,_58,_237,_0.08)] border border-purple-100"
//             >
//               {/* Quiz Header */}
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-[#7c3aed]">
//                     {quizItem.quiz.title}
//                   </h2>
//                   <span className="text-gray-500 text-sm">
//                     {quizItem.questions.length}{" "}
//                     {quizItem.questions.length === 1 ? "question" : "questions"}
//                   </span>
//                 </div>
//                 {quizItem.questions.length === 0 && (
//                   <button
//                     onClick={() => deleteQuiz(quizIndex)}
//                     className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow-sm transition"
//                     title="Delete empty quiz"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 )}
//               </div>

//               <p className="text-gray-600 mb-5">{quizItem.quiz.description}</p>

//               {/* QUESTIONS */}
//               <div className="space-y-4">
//                 {quizItem.questions.map((q, questionIndex) => (
//                   <div
//                     key={questionIndex}
//                     className="bg-white border border-purple-100 rounded-xl p-4 shadow-[0_4px_20px_rgba(124,_58,_237,_0.05)]"
//                   >
//                     {editQuestion &&
//                     editQuestion.quizIndex === quizIndex &&
//                     editQuestion.questionIndex === questionIndex ? (
//                       // === EDIT MODE ===
//                       <div className="space-y-3">
//                         <input
//                           type="text"
//                           value={editData.text}
//                           onChange={(e) =>
//                             setEditData({ ...editData, text: e.target.value })
//                           }
//                           className="w-full bg-white border border-purple-200 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
//                           placeholder="Edit question"
//                         />
//                         {editData.options.map((opt, i) => (
//                           <div key={i} className="flex items-center gap-2">
//                             <input
//                               type="text"
//                               value={opt}
//                               onChange={(e) => handleOptionChange(i, e.target.value)}
//                               className="flex-1 bg-white border border-purple-200 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
//                               placeholder={`Option ${i + 1}`}
//                             />
//                             <button
//                               onClick={() =>
//                                 setEditData({ ...editData, correctIndex: i })
//                               }
//                               className={`p-2 rounded-full transition ${
//                                 editData.correctIndex === i
//                                   ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
//                                   : "bg-purple-50 border border-purple-100 hover:bg-purple-100 text-purple-600"
//                               }`}
//                             >
//                               <Check size={14} />
//                             </button>
//                           </div>
//                         ))}
//                         <div className="flex gap-2 mt-3 justify-end">
//                           <button
//                             onClick={saveEdit}
//                             className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg flex items-center gap-1 text-sm shadow hover:opacity-95"
//                           >
//                             <Check size={14} /> Save
//                           </button>
//                           <button
//                             onClick={cancelEdit}
//                             className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg flex items-center gap-1 text-sm shadow hover:opacity-95"
//                           >
//                             <XCircle size={14} /> Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       // === DISPLAY MODE ===
//                       <>
//                         <div className="flex justify-between items-start mb-3">
//                           <h3 className="text-gray-800 font-medium text-base">
//                             {questionIndex + 1}. {q.text}
//                           </h3>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => startEdit(quizIndex, questionIndex)}
//                               className="p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white shadow transition"
//                               title="Edit question"
//                             >
//                               <Edit2 size={16} />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 deleteQuestion(quizIndex, questionIndex)
//                               }
//                               className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow transition"
//                               title="Delete question"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         </div>
//                         <ul className="space-y-1 text-gray-700 text-sm">
//                           {q.options.map((opt, i) => (
//                             <li
//                               key={i}
//                               className={`p-2 rounded border ${
//                                 q.correctIndex === i
//                                   ? "border-green-400 bg-green-50 text-green-700 font-medium"
//                                   : "border-purple-100 bg-white hover:bg-purple-50"
//                               }`}
//                             >
//                               {opt}
//                             </li>
//                           ))}
//                         </ul>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionManager;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit2, Check, XCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuestionManager = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [editQuestion, setEditQuestion] = useState(null);
  const [editData, setEditData] = useState({
    text: "",
    options: ["", "", "", ""],
    correctIndex: null,
  });

  // ✅ Fetch quizzes from backend (instead of localStorage)
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/quiz/");
        if (res.data.success) {
          setQuizzes(res.data.quizzes);
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };
    fetchQuizzes();
  }, []);

  // ✅ Delete entire quiz
  const deleteQuiz = async (quizIndex) => {
    const quizId = quizzes[quizIndex]._id;
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        const res = await axios.delete(`http://localhost:4000/api/quiz/${quizId}`);
        if (res.data.success) {
          setQuizzes(quizzes.filter((q) => q._id !== quizId));
        }
      } catch (err) {
        console.error("Error deleting quiz:", err);
      }
    }
  };

  // ✅ Delete specific question
  const deleteQuestion = async (quizIndex, questionIndex) => {
    const quizId = quizzes[quizIndex]._id;
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/quiz/${quizId}/questions/${questionIndex}`
      );
      if (res.data.success) {
        const updatedQuiz = res.data.quiz;
        setQuizzes((prev) =>
          prev.map((q) => (q._id === quizId ? updatedQuiz : q))
        );
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  // ✅ Start edit
  const startEdit = (quizIndex, questionIndex) => {
    setEditQuestion({ quizIndex, questionIndex });
    const q = quizzes[quizIndex].questions[questionIndex];
    const correctIndex = q.options.findIndex((opt) => opt.isCorrect);
    setEditData({
      text: q.text,
      options: q.options.map((opt) => opt.text),
      correctIndex,
    });
  };

  // ✅ Cancel edit
  const cancelEdit = () => {
    setEditQuestion(null);
    setEditData({ text: "", options: ["", "", "", ""], correctIndex: null });
  };

  // ✅ Save updated question to backend
  const saveEdit = async () => {
    const { quizIndex, questionIndex } = editQuestion;
    const quizId = quizzes[quizIndex]._id;

    const body = {
      text: editData.text,
      options: editData.options.map((opt, i) => ({
        text: opt,
        isCorrect: i === editData.correctIndex,
      })),
    };

    try {
      const res = await axios.put(
        `http://localhost:4000/api/quiz/${quizId}/questions/${questionIndex}`,
        body
      );
      if (res.data.success) {
        const updatedQuiz = res.data.quiz;
        setQuizzes((prev) =>
          prev.map((q) => (q._id === quizId ? updatedQuiz : q))
        );
        cancelEdit();
      }
    } catch (err) {
      console.error("Error saving question:", err);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editData.options];
    newOptions[index] = value;
    setEditData({ ...editData, options: newOptions });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf5ff] via-[#f3ecff] to-[#fff] text-gray-800 p-6 md:p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 cursor-pointer text-purple-600 hover:text-purple-700 transition"
        >
          <div className="p-2 rounded-full bg-white shadow-sm border border-purple-200">
            <ArrowLeft size={18} />
          </div>
          <span className="font-medium">Back</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-center w-full">
          Question Manager
        </h1>

        <div></div>
      </div>

      {/* QUIZ LIST */}
      {quizzes.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No quizzes found. Create one first!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {quizzes.map((quizItem, quizIndex) => (
            <div
              key={quizItem._id}
              className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(124,_58,_237,_0.08)] border border-purple-100"
            >
              {/* Quiz Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#7c3aed]">
                    {quizItem.title}
                  </h2>
                  <span className="text-gray-500 text-sm">
                    {quizItem.questions.length}{" "}
                    {quizItem.questions.length === 1
                      ? "question"
                      : "questions"}
                  </span>
                </div>
                {quizItem.questions.length === 0 && (
                  <button
                    onClick={() => deleteQuiz(quizIndex)}
                    className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow-sm transition"
                    title="Delete empty quiz"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <p className="text-gray-600 mb-5">{quizItem.description}</p>

              {/* QUESTIONS */}
              <div className="space-y-4">
                {quizItem.questions.map((q, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="bg-white border border-purple-100 rounded-xl p-4 shadow-[0_4px_20px_rgba(124,_58,_237,_0.05)]"
                  >
                    {editQuestion &&
                    editQuestion.quizIndex === quizIndex &&
                    editQuestion.questionIndex === questionIndex ? (
                      // === EDIT MODE ===
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editData.text}
                          onChange={(e) =>
                            setEditData({ ...editData, text: e.target.value })
                          }
                          className="w-full bg-white border border-purple-200 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                          placeholder="Edit question"
                        />
                        {editData.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) =>
                                handleOptionChange(i, e.target.value)
                              }
                              className="flex-1 bg-white border border-purple-200 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                              placeholder={`Option ${i + 1}`}
                            />
                            <button
                              onClick={() =>
                                setEditData({ ...editData, correctIndex: i })
                              }
                              className={`p-2 rounded-full transition ${
                                editData.correctIndex === i
                                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                                  : "bg-purple-50 border border-purple-100 hover:bg-purple-100 text-purple-600"
                              }`}
                            >
                              <Check size={14} />
                            </button>
                          </div>
                        ))}
                        <div className="flex gap-2 mt-3 justify-end">
                          <button
                            onClick={saveEdit}
                            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg flex items-center gap-1 text-sm shadow hover:opacity-95"
                          >
                            <Check size={14} /> Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg flex items-center gap-1 text-sm shadow hover:opacity-95"
                          >
                            <XCircle size={14} /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // === DISPLAY MODE ===
                      <>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-gray-800 font-medium text-base">
                            {questionIndex + 1}. {q.text}
                          </h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(quizIndex, questionIndex)}
                              className="p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white shadow transition"
                              title="Edit question"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() =>
                                deleteQuestion(quizIndex, questionIndex)
                              }
                              className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow transition"
                              title="Delete question"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <ul className="space-y-1 text-gray-700 text-sm">
                          {q.options.map((opt, i) => (
                            <li
                              key={i}
                              className={`p-2 rounded border ${
                                opt.isCorrect
                                  ? "border-green-400 bg-green-50 text-green-700 font-medium"
                                  : "border-purple-100 bg-white hover:bg-purple-50"
                              }`}
                            >
                              {opt.text}
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
