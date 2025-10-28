
import React, { useState } from "react";
import {
  Bell,
  Send,
  Trash2,
  Check,
  Settings,
  Filter,
  PlusCircle,
  X,
} from "lucide-react";

const NotificationManager = () => {
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Quiz 'AI Basics' Started",
      message: "Your scheduled quiz has started successfully.",
      type: "system",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "New Participant Joined",
      message: "John Doe has joined 'Data Structures Challenge'.",
      type: "participant",
      time: "5 mins ago",
      read: true,
    },
    {
      id: 3,
      title: "Leaderboard Updated",
      message: "Leaderboard for 'Python Quiz' has been refreshed.",
      type: "system",
      time: "12 mins ago",
      read: false,
    },
  ]);

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "custom",
  });

  const [preferences, setPreferences] = useState({
    reminders: true,
    participantJoins: true,
    leaderboardUpdates: true,
    emailAlerts: false,
  });

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) return;
    const newNote = {
      id: Date.now(),
      ...newNotification,
      time: "Just now",
      read: false,
    };
    setNotifications([newNote, ...notifications]);
    setNewNotification({ title: "", message: "", type: "custom" });
    setShowModal(false);
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : filter === "Unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.type === filter.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Notification Manager
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200"
          >
            <Settings className="w-4 h-4" /> Preferences
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
          >
            <PlusCircle className="w-4 h-4" /> Create Notification
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-white rounded-xl shadow text-center">
          <h3 className="text-sm text-gray-500">Total Notifications</h3>
          <p className="text-2xl font-bold text-purple-600">
            {notifications.length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow text-center">
          <h3 className="text-sm text-gray-500">Unread</h3>
          <p className="text-2xl font-bold text-purple-600">
            {notifications.filter((n) => !n.read).length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow text-center">
          <h3 className="text-sm text-gray-500">System Alerts</h3>
          <p className="text-2xl font-bold text-purple-600">
            {notifications.filter((n) => n.type === "system").length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow text-center">
          <h3 className="text-sm text-gray-500">Custom Sent</h3>
          <p className="text-2xl font-bold text-purple-600">
            {notifications.filter((n) => n.type === "custom").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3 flex-wrap">
          {["All", "Unread", "System", "Participant", "Custom"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                filter === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border-l-4 ${
                n.read ? "border-gray-300" : "border-purple-600"
              }`}
            >
              <Bell
                className={`w-6 h-6 mt-1 ${
                  n.read ? "text-gray-400" : "text-purple-600"
                }`}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{n.title}</h4>
                <p className="text-sm text-gray-600">{n.message}</p>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
              <div className="flex gap-2">
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No notifications found.
          </p>
        )}
      </div>

      {/* Preferences Panel */}
      {showSettings && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">
            Notification Preferences
          </h3>
          <div className="space-y-3">
            {Object.keys(preferences).map((key) => (
              <label key={key} className="flex items-center justify-between">
                <span className="capitalize text-gray-700">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <input
                  type="checkbox"
                  checked={preferences[key]}
                  onChange={() =>
                    setPreferences({
                      ...preferences,
                      [key]: !preferences[key],
                    })
                  }
                  className="w-5 h-5 text-purple-600 accent-purple-600"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Create Notification Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Create Notification
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={newNotification.title}
              onChange={(e) =>
                setNewNotification({ ...newNotification, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 border rounded-xl"
            />
            <textarea
              placeholder="Message"
              value={newNotification.message}
              onChange={(e) =>
                setNewNotification({
                  ...newNotification,
                  message: e.target.value,
                })
              }
              className="w-full mb-3 px-3 py-2 border rounded-xl"
              rows="4"
            />
            <select
              value={newNotification.type}
              onChange={(e) =>
                setNewNotification({ ...newNotification, type: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 border rounded-xl"
            >
              <option value="custom">Custom</option>
              <option value="system">System</option>
              <option value="participant">Participant</option>
            </select>
            <button
              onClick={handleCreateNotification}
              className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700"
            >
              <Send className="inline w-4 h-4 mr-2" /> Send Notification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;

