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

  // === QUIZ STATE ===
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Medium",
    timeLimit: 30,
  });

  // === QUESTIONS STATE ===
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctIndex: null,
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState("");

  // === HANDLERS ===
  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
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

  // === SAVE QUIZ TO LOCALSTORAGE ===
  const handleSaveQuiz = () => {
    if (!quiz.title.trim() || questions.length === 0) {
      setError("Please add a quiz title and at least one question.");
      return;
    }

    // Get existing quizzes from localStorage
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

    // Add new quiz
    storedQuizzes.push({ quiz, questions, createdAt: new Date().toISOString() });

    // Save back to localStorage
    localStorage.setItem("quizzes", JSON.stringify(storedQuizzes));

    alert("Quiz created successfully!");
    navigate("/host");
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
          Create New Quiz
        </h1>
        <div></div>
      </div>

      {/* MAIN FORM SECTION */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* QUIZ DETAILS */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6 backdrop-blur-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            Quiz Details
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-gray-400 mb-2">Quiz Title</label>
              <input
                type="text"
                name="title"
                value={quiz.title}
                onChange={handleQuizChange}
                placeholder="Enter quiz title"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Quiz Description</label>
              <textarea
                name="description"
                value={quiz.description}
                onChange={handleQuizChange}
                placeholder="Enter short description"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={quiz.category}
                onChange={handleQuizChange}
                placeholder="e.g., Science, History"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-400 mb-2">Difficulty</label>
                <select
                  name="difficulty"
                  value={quiz.difficulty}
                  onChange={handleQuizChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-blue-500"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Time Limit (mins)</label>
                <input
                  type="number"
                  name="timeLimit"
                  value={quiz.timeLimit}
                  onChange={handleQuizChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ADD QUESTIONS */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6 backdrop-blur-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Add Questions</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-gray-400 mb-2">Question</label>
              <input
                type="text"
                value={newQuestion.text}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, text: e.target.value })
                }
                placeholder="Enter your question"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* OPTIONS */}
            <div>
              <label className="block text-gray-400 mb-2">Options</label>
              {newQuestion.options.map((opt, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 mb-2 bg-gray-900 p-3 rounded-lg border ${
                    newQuestion.correctIndex === i ? "border-green-500" : "border-gray-700"
                  }`}
                >
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1 bg-transparent text-gray-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setNewQuestion({ ...newQuestion, correctIndex: i })
                    }
                    className={`p-2 rounded-full transition ${
                      newQuestion.correctIndex === i
                        ? "bg-green-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <CheckCircle size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* ADD QUESTION BUTTON */}
            <button
              onClick={addQuestion}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            >
              <PlusCircle size={20} />
              Add Question
            </button>
          </div>
        </div>
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="mt-6 bg-red-500/10 border border-red-600 text-red-400 rounded-lg p-4 flex items-center gap-2">
          <XCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* PREVIEW SECTION */}
      {questions.length > 0 && (
        <div className="mt-12 bg-gray-800/70 border border-gray-700 rounded-2xl p-6 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-purple-400">
              Added Questions ({questions.length})
            </h2>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-2"
            >
              <Eye size={18} />
              {previewMode ? "Hide Preview" : "Preview"}
            </button>
          </div>

          {previewMode && (
            <div className="space-y-6 mt-4">
              {questions.map((q, i) => (
                <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-100">
                      {i + 1}. {q.text}
                    </h3>
                    <button
                      onClick={() => deleteQuestion(i)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {q.options.map((opt, j) => (
                      <li
                        key={j}
                        className={`p-2 rounded border ${
                          q.correctIndex === j
                            ? "border-green-500 text-green-400"
                            : "border-gray-700 text-gray-300"
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
      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={() => navigate("/HostDashbord")}
          className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-gray-200 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Cancel
        </button>
        <button
          onClick={handleSaveQuiz}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white flex items-center gap-2"
        >
          <Save size={18} />
          Save Quiz
        </button>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-16 text-gray-500 text-sm">
        <hr className="border-gray-700 mb-4" />
        <p>© {new Date().getFullYear()} Quizee — Host Panel</p>
      </div>
    </div>
  );
};

export default CreateQuiz;
