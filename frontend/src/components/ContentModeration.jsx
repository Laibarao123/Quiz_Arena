// 📁 src/components/ContentModeration.jsx
import React, { useState, useEffect } from "react";
import { Check, X, AlertCircle } from "lucide-react";

const LOCAL_KEY = "moderation_data";

// Sample mock content
const MOCK_CONTENT = [
  { id: 1, text: "What is the capital of France?", author: "Alice", status: "Pending" },
  { id: 2, text: "Explain React hooks.", author: "Bob", status: "Pending" },
  { id: 3, text: "History of Pakistan.", author: "Charlie", status: "Pending" },
];

const STATUS_OPTIONS = ["All", "Pending", "Approved", "Rejected", "Flagged"];

const ContentModeration = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Load content from localStorage or initialize
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setContent(JSON.parse(saved));
    } else {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(MOCK_CONTENT));
      setContent(MOCK_CONTENT);
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(content));
  }, [content]);

  // Moderation actions
  const updateStatus = (id, status) => {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      setContent((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Filtered & searched content
  const filteredContent = content.filter((item) => {
    const statusMatch = filterStatus === "All" || item.status === filterStatus;
    const searchMatch = item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-purple-500 text-lg font-semibold">
        Loading Content...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Content Moderation</h2>
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          <input
            type="text"
            placeholder="Search content or author..."
            className="border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-200">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Content</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Author</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-purple-700">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-purple-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {filteredContent.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No content found
                </td>
              </tr>
            )}
            {filteredContent.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50 transition">
                <td className="px-6 py-4">{item.text}</td>
                <td className="px-6 py-4">{item.author}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      item.status === "Approved" ? "bg-green-500" :
                      item.status === "Rejected" ? "bg-red-500" :
                      item.status === "Flagged" ? "bg-yellow-500" :
                      "bg-purple-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => updateStatus(item.id, "Approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600 transition flex items-center gap-1"
                  >
                    <Check size={14} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(item.id, "Rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition flex items-center gap-1"
                  >
                    <X size={14} /> Reject
                  </button>
                  <button
                    onClick={() => updateStatus(item.id, "Flagged")}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-xl hover:bg-yellow-500 transition flex items-center gap-1"
                  >
                    <AlertCircle size={14} /> Flag
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-gray-700 text-white px-3 py-1 rounded-xl hover:bg-gray-800 transition flex items-center gap-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentModeration;
