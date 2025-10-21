// 📁 src/components/FeedbackCenter.jsx
import React, { useState, useEffect } from "react";
import { Trash2, Edit, MessageCircle } from "lucide-react";

const LOCAL_KEY = "feedback_data";

const FeedbackCenter = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);

  // Load feedbacks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setFeedbacks(JSON.parse(saved));
    } else {
      // Initialize with demo feedback
      const demoFeedback = [
        { user: "Alice", message: "Great platform!", reply: "" },
        { user: "Bob", message: "I faced an issue with quiz submission.", reply: "" },
      ];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(demoFeedback));
      setFeedbacks(demoFeedback);
    }
    setLoading(false);
  }, []);

  // Save feedbacks to localStorage
  const saveFeedbacks = (updated) => {
    setFeedbacks(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  // Delete feedback
  const handleDelete = (index) => {
    const updated = feedbacks.filter((_, i) => i !== index);
    saveFeedbacks(updated);
  };

  // Start reply
  const handleReply = (index) => {
    setReplyIndex(index);
    setReplyText(feedbacks[index].reply || "");
  };

  // Save reply
  const handleSaveReply = () => {
    if (!replyText.trim()) return;
    const updated = [...feedbacks];
    updated[replyIndex].reply = replyText;
    saveFeedbacks(updated);
    setReplyIndex(null);
    setReplyText("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-purple-500 text-lg font-semibold">
        Loading Feedback...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Feedback Center</h2>

      <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-200">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Message</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Reply</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-purple-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {feedbacks.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                  No feedbacks yet
                </td>
              </tr>
            )}
            {feedbacks.map((fb, index) => (
              <tr key={index} className="hover:bg-purple-50 transition">
                <td className="px-6 py-4">{fb.user}</td>
                <td className="px-6 py-4">{fb.message}</td>
                <td className="px-6 py-4">
                  {replyIndex === index ? (
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="border border-purple-300 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                    />
                  ) : fb.reply ? (
                    fb.reply
                  ) : (
                    <span className="text-gray-400">No reply yet</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  {replyIndex === index ? (
                    <button
                      onClick={handleSaveReply}
                      className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReply(index)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600 transition flex items-center gap-1"
                    >
                      <MessageCircle size={14} /> Reply
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
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

export default FeedbackCenter;
