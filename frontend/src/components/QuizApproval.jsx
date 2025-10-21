import React, { useState, useEffect } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Filter,
  FileText,
  ClipboardCheck,
} from "lucide-react";

// Local Storage key
const LOCAL_KEY = "quiz_arena_quiz_approval_data";

const QuizApproval = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Pending");
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // 🟣 Load quizzes from LocalStorage or create demo
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setQuizzes(JSON.parse(stored));
    } else {
      const demo = [
        {
          id: 1,
          title: "World History Quiz",
          category: "History",
          creator: "Ali Khan",
          questions: 10,
          status: "Pending",
          submittedDate: "2025-10-18",
        },
        {
          id: 2,
          title: "JavaScript Basics",
          category: "Programming",
          creator: "Sara Ahmed",
          questions: 15,
          status: "Approved",
          submittedDate: "2025-10-16",
        },
        {
          id: 3,
          title: "Human Anatomy",
          category: "Biology",
          creator: "Zain Fatima",
          questions: 12,
          status: "Rejected",
          submittedDate: "2025-10-15",
        },
        {
          id: 4,
          title: "Physics Fundamentals",
          category: "Science",
          creator: "Laiba Rao",
          questions: 8,
          status: "Pending",
          submittedDate: "2025-10-19",
        },
      ];
      setQuizzes(demo);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(demo));
    }
  }, []);

  // 🟢 Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(quizzes));
  }, [quizzes]);

  // 🔹 Filter and Search
  const filtered = quizzes.filter(
    (q) =>
      (filterStatus === "All" || q.status === filterStatus) &&
      q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Approve Quiz
  const handleApprove = (id) => {
    const updated = quizzes.map((q) =>
      q.id === id ? { ...q, status: "Approved" } : q
    );
    setQuizzes(updated);
  };

  // ❌ Reject Quiz
  const handleReject = (id) => {
    const updated = quizzes.map((q) =>
      q.id === id ? { ...q, status: "Rejected" } : q
    );
    setQuizzes(updated);
  };

  // 🗑 Delete Quiz
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const updated = quizzes.filter((q) => q.id !== id);
      setQuizzes(updated);
    }
  };

  // 👁 View Details
  const handleView = (quiz) => {
    setSelectedQuiz(quiz);
  };

  // 🔙 Close Modal
  const closeModal = () => setSelectedQuiz(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8f4ff 0%, #efe5fa 50%, #e8dafa 100%)",
        padding: "2rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1
        style={{
          color: "#6a1b9a",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "700",
          marginBottom: "2rem",
        }}
      >
        📝 Quiz Approval Dashboard
      </h1>

      {/* 🔍 Search & Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Search */}
        <div className="flex items-center bg-white shadow px-3 py-2 rounded-xl w-full md:w-1/3">
          <Search size={18} className="text-purple-600 mr-2" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-gray-600"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center bg-white shadow px-3 py-2 rounded-xl">
          <Filter size={18} className="text-purple-600 mr-2" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="outline-none text-gray-700 bg-transparent"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* 🔢 Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatsCard
          label="Total Quizzes"
          value={quizzes.length}
          color="#7b1fa2"
          icon={<FileText size={24} />}
        />
        <StatsCard
          label="Pending"
          value={quizzes.filter((q) => q.status === "Pending").length}
          color="#f59e0b"
          icon={<ClipboardCheck size={24} />}
        />
        <StatsCard
          label="Approved"
          value={quizzes.filter((q) => q.status === "Approved").length}
          color="#22c55e"
          icon={<CheckCircle size={24} />}
        />
        <StatsCard
          label="Rejected"
          value={quizzes.filter((q) => q.status === "Rejected").length}
          color="#ef4444"
          icon={<XCircle size={24} />}
        />
      </div>

      {/* 🧾 Quiz Table */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "1rem 1.5rem",
          boxShadow: "0 6px 20px rgba(150, 100, 200, 0.1)",
          overflowX: "auto",
        }}
      >
        <table className="w-full">
          <thead>
            <tr className="text-left text-purple-700 border-b">
              <th className="py-3">#</th>
              <th className="py-3">Title</th>
              <th className="py-3">Category</th>
              <th className="py-3">Creator</th>
              <th className="py-3">Questions</th>
              <th className="py-3">Status</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((quiz, idx) => (
              <tr
                key={quiz.id}
                className="border-b hover:bg-purple-50 transition"
              >
                <td className="py-3">{idx + 1}</td>
                <td className="py-3 font-semibold text-gray-800">
                  {quiz.title}
                </td>
                <td className="py-3">{quiz.category}</td>
                <td className="py-3">{quiz.creator}</td>
                <td className="py-3">{quiz.questions}</td>
                <td className="py-3">
                  <StatusBadge status={quiz.status} />
                </td>
                <td className="py-3 text-right flex justify-end gap-3">
                  <button
                    onClick={() => handleView(quiz)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={18} />
                  </button>
                  {quiz.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(quiz.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => handleReject(quiz.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XCircle size={18} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="text-gray-600 hover:text-black"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No quizzes match your filter or search.
          </p>
        )}
      </div>

      {/* 📋 Modal for Viewing Quiz Details */}
      {selectedQuiz && <QuizDetailsModal quiz={selectedQuiz} onClose={closeModal} />}
    </div>
  );
};

// 🔹 Reusable Stats Card
const StatsCard = ({ label, value, color, icon }) => (
  <div
    style={{
      background: "white",
      borderRadius: "16px",
      padding: "1.2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 6px 15px rgba(120, 80, 180, 0.1)",
      borderTop: `4px solid ${color}`,
    }}
  >
    <div>
      <h3 style={{ color, fontWeight: "600", fontSize: "1.1rem" }}>{label}</h3>
      <p style={{ fontSize: "1.6rem", color: "#4a148c", fontWeight: "700" }}>
        {value}
      </p>
    </div>
    <div style={{ color }}>{icon}</div>
  </div>
);

// 🔹 Status Badge
const StatusBadge = ({ status }) => {
  const colors = {
    Approved: "#22c55e",
    Pending: "#f59e0b",
    Rejected: "#ef4444",
  };
  return (
    <span
      style={{
        backgroundColor: colors[status],
        color: "white",
        padding: "0.3rem 0.6rem",
        borderRadius: "8px",
        fontSize: "0.85rem",
        fontWeight: "600",
      }}
    >
      {status}
    </span>
  );
};

// 🔹 Quiz Details Modal
const QuizDetailsModal = ({ quiz, onClose }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        width: "95%",
        maxWidth: "500px",
        padding: "2rem",
        boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          color: "#6a1b9a",
          fontWeight: "700",
          fontSize: "1.4rem",
          marginBottom: "1rem",
        }}
      >
        {quiz.title}
      </h2>
      <p>
        <b>Category:</b> {quiz.category}
      </p>
      <p>
        <b>Created by:</b> {quiz.creator}
      </p>
      <p>
        <b>Total Questions:</b> {quiz.questions}
      </p>
      <p>
        <b>Status:</b> {quiz.status}
      </p>
      <p>
        <b>Submitted:</b> {quiz.submittedDate}
      </p>
      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default QuizApproval;
