import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Calendar,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

// Local Storage Key
const LOCAL_KEY = "quiz_arena_activity_logs";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // 🔹 Initialize logs from localStorage or generate demo
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setLogs(JSON.parse(stored));
    } else {
      const generated = generateDemoLogs();
      setLogs(generated);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(generated));
    }
  }, []);

  // 🔹 Filter logic
  const filteredLogs = useMemo(() => {
    return logs
      .filter((log) => {
        const matchSearch =
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase());

        const logDate = new Date(log.date);
        const start = dateRange.start ? new Date(dateRange.start) : null;
        const end = dateRange.end ? new Date(dateRange.end) : null;

        const matchDate =
          (!start || logDate >= start) && (!end || logDate <= end);

        return matchSearch && matchDate;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [logs, searchTerm, dateRange]);

  // 🔹 Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setDateRange({ start: "", end: "" });
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background:
          "linear-gradient(180deg, #f9f5ff 0%, #f0e6ff 50%, #e8ddff 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* 🟣 Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-3">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
          <Activity className="text-purple-500" /> Activity Logs
        </h1>
        <p className="text-gray-600 text-sm">
          Track all system and user activities across QuizArena.
        </p>
      </header>

      {/* 🟣 Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search Box */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            placeholder="Search by user or action..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 w-full rounded-xl border border-purple-200 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2 bg-white shadow px-3 py-2 rounded-xl">
          <Calendar className="text-purple-600" />
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, start: e.target.value }))
            }
            className="border border-purple-100 rounded-lg px-2 py-1 focus:outline-none"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, end: e.target.value }))
            }
            className="border border-purple-100 rounded-lg px-2 py-1 focus:outline-none"
          />
        </div>

        <button
          onClick={clearFilters}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4 py-2 font-medium transition"
        >
          Clear Filters
        </button>
      </div>

      {/* 🟣 Logs Table */}
      <div className="bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-purple-700 border-b">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-purple-50 transition"
                >
                  <td className="p-3 text-gray-600">{index + 1}</td>
                  <td className="p-3 text-gray-600">{log.date}</td>
                  <td className="p-3 text-gray-700 font-semibold">
                    {log.user}
                  </td>
                  <td className="p-3 text-gray-600">{log.action}</td>
                  <td className="p-3">
                    <StatusBadge status={log.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-8 italic"
                >
                  No logs found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🟣 Summary Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Logs"
          value={logs.length}
          color="#8b5cf6"
          icon={<Activity size={22} />}
        />
        <SummaryCard
          title="Successful Actions"
          value={logs.filter((l) => l.status === "success").length}
          color="#10b981"
          icon={<CheckCircle size={22} />}
        />
        <SummaryCard
          title="Warnings & Errors"
          value={logs.filter((l) => l.status !== "success").length}
          color="#f59e0b"
          icon={<AlertTriangle size={22} />}
        />
      </div>
    </div>
  );
};

// 🟣 Status Badge Component
const StatusBadge = ({ status }) => {
  const variants = {
    success: {
      bg: "bg-green-100 text-green-700",
      icon: <CheckCircle size={15} />,
      label: "Success",
    },
    warning: {
      bg: "bg-yellow-100 text-yellow-700",
      icon: <AlertTriangle size={15} />,
      label: "Warning",
    },
    error: {
      bg: "bg-red-100 text-red-700",
      icon: <XCircle size={15} />,
      label: "Error",
    },
  };

  const type = variants[status] || variants.success;

  return (
    <span
      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${type.bg}`}
    >
      {type.icon} {type.label}
    </span>
  );
};

// 🟣 Summary Card Component
const SummaryCard = ({ title, value, color, icon }) => (
  <div
    className="rounded-2xl shadow-md p-5 text-center bg-white hover:shadow-xl transition-transform transform hover:-translate-y-1"
    style={{
      borderTop: `4px solid ${color}`,
    }}
  >
    <div className="flex justify-center text-gray-500 mb-2">{icon}</div>
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-1" style={{ color }}>
      {value}
    </p>
  </div>
);

// 🟣 Generate Demo Logs
const generateDemoLogs = () => {
  const users = ["Laiba Rao", "Ali Khan", "Sara Ahmed", "Hamza Tariq", "Zain Fatima"];
  const actions = [
    "Created a quiz",
    "Deleted quiz question",
    "Attempted a quiz",
    "Updated profile",
    "Approved submission",
    "Rejected quiz edit",
    "Logged in",
    "Logged out",
  ];
  const statuses = ["success", "warning", "error"];

  const randomDate = (start, end) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split("T")[0];
  };

  const start = new Date(2024, 0, 1);
  const end = new Date();

  const logs = Array.from({ length: 30 }).map(() => ({
    date: randomDate(start, end),
    user: users[Math.floor(Math.random() * users.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));

  return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export default ActivityLogs;
