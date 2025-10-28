// import React, { useState } from "react";
// import {
//   PlusCircle,
//   Trash2,
//   CheckCircle,
//   ArrowLeft,
//   Eye,
//   Save,
//   XCircle,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const CreateQuiz = () => {
//   const navigate = useNavigate();

//   const [quiz, setQuiz] = useState({
//     title: "",
//     description: "",
//     category: "",
//     difficulty: "Medium",
//     timeLimit: 30,
//   });

//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState({
//     text: "",
//     options: ["", "", "", ""],
//     correctIndex: null,
//   });

//   const [previewMode, setPreviewMode] = useState(false);
//   const [error, setError] = useState("");

//   const handleQuizChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "timeLimit") {
//       setQuiz({ ...quiz, [name]: Number(value) });
//     } else {
//       setQuiz({ ...quiz, [name]: value });
//     }
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...newQuestion.options];
//     updatedOptions[index] = value;
//     setNewQuestion({ ...newQuestion, options: updatedOptions });
//   };

//   const addQuestion = () => {
//     if (
//       !newQuestion.text.trim() ||
//       newQuestion.options.some((opt) => !opt.trim()) ||
//       newQuestion.correctIndex === null
//     ) {
//       setError("Please fill all fields and select the correct answer.");
//       return;
//     }

//     setQuestions([...questions, newQuestion]);
//     setNewQuestion({
//       text: "",
//       options: ["", "", "", ""],
//       correctIndex: null,
//     });
//     setError("");
//   };

//   const deleteQuestion = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const handleSaveQuiz = () => {
//     if (!quiz.title.trim() || questions.length === 0) {
//       setError("Please add a quiz title and at least one question.");
//       return;
//     }

//     const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
//     storedQuizzes.push({ quiz, questions, createdAt: new Date().toISOString() });
//     localStorage.setItem("quizzes", JSON.stringify(storedQuizzes));

//     alert("Quiz created successfully!");
//     navigate("/host");
//   };

//   return (
//     <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-[#faf5ff] via-[#f3ecff] to-[#fff] text-gray-800">
//       <div className="max-w-[1200px] mx-auto">
//         {/* HEADER */}
//         <div className="flex flex-col items-center mb-10 relative">
//           <div
//             onClick={() => navigate(-1)}
//             className="absolute left-0 top-0 flex items-center gap-3 cursor-pointer text-purple-600 hover:text-purple-700 transition"
//           >
//             <div className="p-2 rounded-full bg-white shadow-sm border border-purple-200">
//               <ArrowLeft size={18} />
//             </div>
//             <span className="font-medium">Back</span>
//           </div>

//           <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-center">
//             Create New Quiz
//           </h1>
//         </div>

//         {/* CARDS GRID */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* QUIZ DETAILS CARD */}
//           <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(124,_58,_237,_0.08)] border border-purple-100">
//             <h2 className="text-2xl font-semibold mb-4 text-[#6b21a8]">Quiz Details</h2>

//             <div className="space-y-5">
//               <div>
//                 <label className="block text-gray-600 mb-2">Quiz Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={quiz.title}
//                   onChange={handleQuizChange}
//                   placeholder="Enter quiz title"
//                   className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 mb-2">Quiz Description</label>
//                 <textarea
//                   name="description"
//                   value={quiz.description}
//                   onChange={handleQuizChange}
//                   placeholder="Enter short description"
//                   className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 mb-2">Category</label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={quiz.category}
//                   onChange={handleQuizChange}
//                   placeholder="e.g., Science, History"
//                   className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-gray-600 mb-2">Difficulty</label>
//                   <select
//                     name="difficulty"
//                     value={quiz.difficulty}
//                     onChange={handleQuizChange}
//                     className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                   >
//                     <option>Easy</option>
//                     <option>Medium</option>
//                     <option>Hard</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-gray-600 mb-2">Time Limit (mins)</label>
//                   <input
//                     type="number"
//                     name="timeLimit"
//                     value={quiz.timeLimit}
//                     onChange={handleQuizChange}
//                     className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* QUESTIONS CARD */}
//           <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(124,_58,_237,_0.08)] border border-purple-100">
//             <h2 className="text-2xl font-semibold mb-4  text-[#6b21a8] ">Add Questions</h2>

//             <div className="space-y-5">
//               <div>
//                 <label className="block text-gray-600 mb-2">Question</label>
//                 <input
//                   type="text"
//                   value={newQuestion.text}
//                   onChange={(e) =>
//                     setNewQuestion({ ...newQuestion, text: e.target.value })
//                   }
//                   placeholder="Enter your question"
//                   className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200"
//                 />
//               </div>

//               {/* OPTIONS */}
//               <div>
//                 <label className="block text-gray-600 mb-2">Options</label>
//                 {newQuestion.options.map((opt, i) => (
//                   <div
//                     key={i}
//                     className={`flex items-center gap-3 mb-3 p-3 rounded-lg border ${
//                       newQuestion.correctIndex === i
//                         ? "border-green-300 bg-green-50"
//                         : "border-purple-100 bg-white"
//                     }`}
//                   >
//                     <input
//                       type="text"
//                       value={opt}
//                       onChange={(e) => handleOptionChange(i, e.target.value)}
//                       placeholder={`Option ${i + 1}`}
//                       className="flex-1 bg-transparent text-gray-800 outline-none"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setNewQuestion({ ...newQuestion, correctIndex: i })
//                       }
//                       className={`p-2 rounded-full transition ${
//                         newQuestion.correctIndex === i
//                           ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
//                           : "bg-purple-50 border border-purple-100 hover:bg-purple-100 text-purple-600"
//                       }`}
//                       title={
//                         newQuestion.correctIndex === i ? "Selected" : "Mark correct"
//                       }
//                     >
//                       <CheckCircle size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={addQuestion}
//                 className="w-full py-3 rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-white flex items-center justify-center gap-3 font-medium shadow-md hover:opacity-95 transition"
//               >
//                 <PlusCircle size={18} />
//                 Add Question
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ERROR DISPLAY */}
//         {error && (
//           <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex items-center gap-3">
//             <XCircle size={20} />
//             <span>{error}</span>
//           </div>
//         )}

//         {/* PREVIEW SECTION */}
//         {questions.length > 0 && (
//           <div className="mt-10 bg-white rounded-2xl p-6 border border-purple-100 shadow-[0_8px_30px_rgba(124,_58,_237,_0.06)]">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-semibold text-[#7c3aed]">
//                 Added Questions ({questions.length})
//               </h2>
//               <button
//                 onClick={() => setPreviewMode(!previewMode)}
//                 className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-2"
//               >
//                 <Eye size={16} />
//                 {previewMode ? "Hide Preview" : "Preview"}
//               </button>
//             </div>

//             {previewMode && (
//               <div className="space-y-6 mt-4">
//                 {questions.map((q, i) => (
//                   <div
//                     key={i}
//                     className="bg-white border border-purple-50 rounded-xl p-5 shadow-sm"
//                   >
//                     <div className="flex justify-between items-center mb-3">
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         {i + 1}. {q.text}
//                       </h3>
//                       <button
//                         onClick={() => deleteQuestion(i)}
//                         className="text-red-500 hover:text-red-400 transition"
//                         title="Delete question"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                     <ul className="space-y-2">
//                       {q.options.map((opt, j) => (
//                         <li
//                           key={j}
//                           className={`p-2 rounded border ${
//                             q.correctIndex === j
//                               ? "border-green-400 text-green-700 bg-green-50"
//                               : "border-purple-100 text-gray-700 bg-white"
//                           }`}
//                         >
//                           {opt}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ACTION BUTTONS */}
//         <div className="flex justify-end gap-4 mt-8">
//           <button
//             onClick={() => navigate("/HostDashbord")}
//             className="px-6 py-3 rounded-lg bg-white border border-purple-100 text-purple-700 hover:shadow-md flex items-center gap-2 transition"
//           >
//             <ArrowLeft size={16} />
//             Cancel
//           </button>
//           <button
//             onClick={handleSaveQuiz}
//             className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-white flex items-center gap-2 shadow-md hover:opacity-95 transition"
//           >
//             <Save size={16} />
//             Save Quiz
//           </button>
//         </div>

//         {/* FOOTER */}
//         <div className="text-center mt-12 text-gray-500 text-sm">
//           <hr className="border-purple-50 mb-4" />
//           <p>© {new Date().getFullYear()} Quizee — Host Panel</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;
import React, { useState } from "react";
import {
  PlusCircle,
  Trash2,
  CheckCircle,
  ArrowLeft,
  Eye,
  Save,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Medium",
    timeLimit: 30,
  });

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctIndex: null,
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState("");

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    if (name === "timeLimit") {
      setQuiz({ ...quiz, [name]: Number(value) });
    } else {
      setQuiz({ ...quiz, [name]: value });
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const addQuestion = () => {
    if (
      !newQuestion.text.trim() ||
      newQuestion.options.some((opt) => !opt.trim()) ||
      newQuestion.correctIndex === null
    ) {
      setError("Please fill all fields and select the correct answer.");
      return;
    }

    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      text: "",
      options: ["", "", "", ""],
      correctIndex: null,
    });
    setError("");
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSaveQuiz = async () => {
    if (!quiz.title.trim() || questions.length === 0) {
      setError("Please add a quiz title and at least one question.");
      return;
    }

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create a quiz.");
        return;
      }

      const response = await fetch("http://localhost:4000/api/quiz/createquiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // pass JWT token
        },
        body: JSON.stringify({
          ...quiz,
          questions: questions.map((q) => ({
            text: q.text,
            options: q.options,
            correctIndex: q.correctIndex,
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Quiz created successfully!");
        navigate("/host");
      } else {
        setError(data.message || "Failed to create quiz");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, try again later.");
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-[#faf5ff] via-[#f3ecff] to-[#fff] text-gray-800">
      <div className="max-w-[1200px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col items-center mb-10 relative">
          <div
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 flex items-center gap-3 cursor-pointer text-purple-600 hover:text-purple-700 transition"
          >
            <div className="p-2 rounded-full bg-white shadow-sm border border-purple-200">
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-center">
            Create New Quiz
          </h1>
        </div>

        {/* CARDS GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* QUIZ DETAILS CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(124,_58,_237,_0.08)] border border-purple-100">
            <h2 className="text-2xl font-semibold mb-4 text-[#6b21a8]">Quiz Details</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-600 mb-2">Quiz Title</label>
                <input
                  type="text"
                  name="title"
                  value={quiz.title}
                  onChange={handleQuizChange}
                  placeholder="Enter quiz title"
                  className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Quiz Description</label>
                <textarea
                  name="description"
                  value={quiz.description}
                  onChange={handleQuizChange}
                  placeholder="Enter short description"
                  className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={quiz.category}
                  onChange={handleQuizChange}
                  placeholder="e.g., Science, History"
                  className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-600 mb-2">Difficulty</label>
                  <select
                    name="difficulty"
                    value={quiz.difficulty}
                    onChange={handleQuizChange}
                    className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">Time Limit (mins)</label>
                  <input
                    type="number"
                    name="timeLimit"
                    value={quiz.timeLimit}
                    onChange={handleQuizChange}
                    className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* QUESTIONS CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(124,_58,_237,_0.08)] border border-purple-100">
            <h2 className="text-2xl font-semibold mb-4  text-[#6b21a8] ">Add Questions</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-600 mb-2">Question</label>
                <input
                  type="text"
                  value={newQuestion.text}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, text: e.target.value })
                  }
                  placeholder="Enter your question"
                  className="w-full bg-white border border-purple-200 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

              {/* OPTIONS */}
              <div>
                <label className="block text-gray-600 mb-2">Options</label>
                {newQuestion.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 mb-3 p-3 rounded-lg border ${
                      newQuestion.correctIndex === i
                        ? "border-green-300 bg-green-50"
                        : "border-purple-100 bg-white"
                    }`}
                  >
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className="flex-1 bg-transparent text-gray-800 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setNewQuestion({ ...newQuestion, correctIndex: i })
                      }
                      className={`p-2 rounded-full transition ${
                        newQuestion.correctIndex === i
                          ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                          : "bg-purple-50 border border-purple-100 hover:bg-purple-100 text-purple-600"
                      }`}
                      title={
                        newQuestion.correctIndex === i ? "Selected" : "Mark correct"
                      }
                    >
                      <CheckCircle size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addQuestion}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-white flex items-center justify-center gap-3 font-medium shadow-md hover:opacity-95 transition"
              >
                <PlusCircle size={18} />
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex items-center gap-3">
            <XCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* PREVIEW SECTION */}
        {questions.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl p-6 border border-purple-100 shadow-[0_8px_30px_rgba(124,_58,_237,_0.06)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-[#7c3aed]">
                Added Questions ({questions.length})
              </h2>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-2"
              >
                <Eye size={16} />
                {previewMode ? "Hide Preview" : "Preview"}
              </button>
            </div>

            {previewMode && (
              <div className="space-y-6 mt-4">
                {questions.map((q, i) => (
                  <div
                    key={i}
                    className="bg-white border border-purple-50 rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {i + 1}. {q.text}
                      </h3>
                      <button
                        onClick={() => deleteQuestion(i)}
                        className="text-red-500 hover:text-red-400 transition"
                        title="Delete question"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {q.options.map((opt, j) => (
                        <li
                          key={j}
                          className={`p-2 rounded border ${
                            q.correctIndex === j
                              ? "border-green-400 text-green-700 bg-green-50"
                              : "border-purple-100 text-gray-700 bg-white"
                          }`}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate("/HostDashbord")}
            className="px-6 py-3 rounded-lg bg-white border border-purple-100 text-purple-700 hover:shadow-md flex items-center gap-2 transition"
          >
            <ArrowLeft size={16} />
            Cancel
          </button>
          <button
            onClick={handleSaveQuiz}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] text-white flex items-center gap-2 shadow-md hover:opacity-95 transition"
          >
            <Save size={16} />
            Save Quiz
          </button>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <hr className="border-purple-50 mb-4" />
          <p>© {new Date().getFullYear()} Quizee — Host Panel</p>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
