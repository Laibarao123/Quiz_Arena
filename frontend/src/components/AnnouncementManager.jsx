// 📁 src/components/AnnouncementManager.jsx
import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus } from "lucide-react";

const LOCAL_KEY = "announcement_data";

const AnnouncementManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMessage, setEditMessage] = useState("");

  // Load announcements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setAnnouncements(JSON.parse(saved));
    setLoading(false);
  }, []);

  // Save announcements to localStorage
  const saveAnnouncements = (updated) => {
    setAnnouncements(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  // Add new announcement
  const handleAdd = () => {
    if (!newTitle.trim() || !newMessage.trim()) return;
    const newAnn = {
      title: newTitle,
      message: newMessage,
      date: new Date().toLocaleString(),
    };
    const updated = [newAnn, ...announcements];
    saveAnnouncements(updated);
    setNewTitle("");
    setNewMessage("");
  };

  // Edit announcement
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(announcements[index].title);
    setEditMessage(announcements[index].message);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim() || !editMessage.trim()) return;
    const updated = [...announcements];
    updated[editIndex].title = editTitle;
    updated[editIndex].message = editMessage;
    saveAnnouncements(updated);
    setEditIndex(null);
    setEditTitle("");
    setEditMessage("");
  };

  // Delete announcement
  const handleDelete = (index) => {
    const updated = announcements.filter((_, i) => i !== index);
    saveAnnouncements(updated);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-purple-500 text-lg font-semibold">
        Loading Announcements...
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">Announcement Manager</h2>

      {/* Add New Announcement */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-purple-100 flex flex-col md:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 border border-purple-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-2 border border-purple-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleAdd}
          className="bg-purple-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-purple-700 transition"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-200">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Message</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Date</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-purple-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {announcements.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                  No announcements yet
                </td>
              </tr>
            )}
            {announcements.map((ann, index) => (
              <tr key={index} className="hover:bg-purple-50 transition">
                <td className="px-6 py-4">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border border-purple-300 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                    />
                  ) : (
                    ann.title
                  )}
                </td>
                <td className="px-6 py-4">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="border border-purple-300 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                    />
                  ) : (
                    ann.message
                  )}
                </td>
                <td className="px-6 py-4">{ann.date}</td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  {editIndex === index ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded-xl hover:bg-yellow-500 transition flex items-center gap-1"
                    >
                      <Edit size={14} /> Edit
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

export default AnnouncementManager;
