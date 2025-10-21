// 📁 src/components/NotificationManager.jsx
import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus } from "lucide-react";

const LOCAL_KEY = "notifications_data";

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNotification, setNewNotification] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Load notifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      localStorage.setItem(LOCAL_KEY, JSON.stringify([]));
    }
    setLoading(false);
  }, []);

  // Save notifications to localStorage
  const saveNotifications = (updated) => {
    setNotifications(updated);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  // Add new notification
  const handleAddNotification = () => {
    if (!newNotification.trim()) return;
    saveNotifications([...notifications, { message: newNotification }]);
    setNewNotification("");
  };

  // Delete notification
  const handleDelete = (index) => {
    const updated = notifications.filter((_, i) => i !== index);
    saveNotifications(updated);
  };

  // Edit notification
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(notifications[index].message);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    const updated = [...notifications];
    updated[editIndex].message = editText;
    saveNotifications(updated);
    setEditIndex(null);
    setEditText("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-purple-500 text-lg font-semibold">
        Loading Notifications...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Notification Manager</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New Notification"
            className="border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-64"
            value={newNotification}
            onChange={(e) => setNewNotification(e.target.value)}
          />
          <button
            onClick={handleAddNotification}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-purple-700 transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-200">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">
                Notification
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-purple-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {notifications.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-gray-400">
                  No notifications yet
                </td>
              </tr>
            )}
            {notifications.map((notif, index) => (
              <tr key={index} className="hover:bg-purple-50 transition">
                <td className="px-6 py-4">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="border border-purple-300 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                    />
                  ) : (
                    notif.message
                  )}
                </td>
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

export default NotificationManager;
