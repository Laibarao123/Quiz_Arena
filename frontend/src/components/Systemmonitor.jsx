import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import {
  Cpu,
  Activity,
  HardDrive,
  Network,
  Database,
  Cloud,
  Server,
  Users,
  Wifi,
  Zap,
  ShieldAlert,
  Clock,
  Bell,
  Terminal,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

// Local Storage Key
const LOCAL_KEY = "quiz_arena_system_monitor";

// COLORS
const COLORS = ["#b185db", "#a076f9", "#c6a7f7", "#d8b4fe", "#b794f4", "#9370db"];

// 🌸 Reusable Stat Card
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center items-center`}
  >
    <div className="text-4xl mb-2 opacity-90">{icon}</div>
    <h3 className="text-md font-semibold opacity-90">{title}</h3>
    <p className="text-lg font-bold mt-1">{value}</p>
  </div>
);

// 🌸 Chart Container
const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
    <h2 className="text-xl font-semibold text-purple-700 text-center mb-4">
      {title}
    </h2>
    {children}
  </div>
);

// 🌸 Progress Bar
const ProgressBar = ({ label, value, color }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1 text-sm font-medium text-purple-800">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full bg-purple-100 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

// 🌸 Gauge Component
const Gauge = ({ label, value }) => {
  const degree = (value / 100) * 180;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20 overflow-hidden">
        <div className="absolute w-full h-full rounded-t-full bg-purple-100"></div>
        <div
          className="absolute bottom-0 left-1/2 w-1 h-20 origin-bottom bg-purple-600 rounded"
          style={{ transform: `rotate(${degree - 90}deg)` }}
        ></div>
      </div>
      <p className="mt-2 text-purple-700 font-semibold">{label}</p>
      <p className="text-lg font-bold text-purple-900">{value}%</p>
    </div>
  );
};

// 🌸 Alert Panel
const AlertPanel = ({ alerts }) => (
  <div className="bg-white rounded-2xl shadow-lg p-5">
    <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
      <AlertTriangle className="text-yellow-500" /> System Alerts
    </h3>
    {alerts.length > 0 ? (
      <ul className="space-y-2">
        {alerts.map((alert, idx) => (
          <li
            key={idx}
            className="bg-yellow-100 border-l-4 border-yellow-500 p-2 rounded"
          >
            <p className="text-sm text-gray-700">{alert}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-500 text-center italic">
        No active alerts.
      </p>
    )}
  </div>
);

// 🌸 Logs Panel
const LogsPanel = ({ logs }) => (
  <div className="bg-white rounded-2xl shadow-lg p-5">
    <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
      <Terminal className="text-green-500" /> System Logs
    </h3>
    <div className="max-h-64 overflow-y-auto space-y-1 text-sm font-mono text-gray-700 bg-purple-50 rounded-lg p-3">
      {logs.map((log, idx) => (
        <p key={idx}>[{log.time}] {log.message}</p>
      ))}
    </div>
  </div>
);

// 🌸 Notification Feed
const NotificationFeed = ({ notifications }) => (
  <div className="bg-white rounded-2xl shadow-lg p-5">
    <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
      <Bell className="text-purple-500" /> Notifications
    </h3>
    <ul className="space-y-3">
      {notifications.map((note, idx) => (
        <li
          key={idx}
          className="flex items-center justify-between bg-purple-50 p-2 rounded-lg"
        >
          <span className="text-sm text-gray-700">{note.message}</span>
          <span className="text-xs text-gray-500">{note.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

// 🌸 Main Component
const SystemMonitor = () => {
  const [stats, setStats] = useState({
    uptime: "99.97%",
    responseTime: 180,
    cpuLoad: 35,
    memoryUsage: 62,
    storageUsed: 78,
    errorRate: 1.4,
    activeUsers: 120,
    networkTraffic: 420,
    diskIO: 55,
    apiHealth: 97,
    performanceTrend: [],
    resourceBreakdown: [],
  });

  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // 🌸 Initialization
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setStats(JSON.parse(stored));
    } else {
      const demo = {
        uptime: "99.97%",
        responseTime: 180,
        cpuLoad: 35,
        memoryUsage: 62,
        storageUsed: 78,
        errorRate: 1.4,
        activeUsers: 120,
        networkTraffic: 420,
        diskIO: 55,
        apiHealth: 97,
        performanceTrend: [
          { time: "Mon", latency: 220 },
          { time: "Tue", latency: 180 },
          { time: "Wed", latency: 200 },
          { time: "Thu", latency: 170 },
          { time: "Fri", latency: 160 },
          { time: "Sat", latency: 210 },
          { time: "Sun", latency: 190 },
        ],
        resourceBreakdown: [
          { name: "CPU", value: 35 },
          { name: "Memory", value: 62 },
          { name: "Storage", value: 78 },
          { name: "Network", value: 55 },
          { name: "Disk I/O", value: 40 },
        ],
      };
      setStats(demo);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(demo));
    }
  }, []);

  // 🌸 Simulate Realtime Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const updated = {
          ...prev,
          cpuLoad: Math.min(100, Math.max(10, prev.cpuLoad + (Math.random() * 10 - 5))),
          memoryUsage: Math.min(100, Math.max(30, prev.memoryUsage + (Math.random() * 5 - 2))),
          networkTraffic: Math.max(100, prev.networkTraffic + (Math.random() * 50 - 25)),
          diskIO: Math.min(100, Math.max(10, prev.diskIO + (Math.random() * 5 - 2))),
          responseTime: Math.max(100, prev.responseTime + (Math.random() * 40 - 20)),
          performanceTrend: [
            ...prev.performanceTrend.slice(-6),
            {
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              latency: prev.responseTime + Math.floor(Math.random() * 50 - 25),
            },
          ],
        };

        // Alerts Logic
        const newAlerts = [];
        if (updated.cpuLoad > 85) newAlerts.push("⚠️ High CPU Load detected!");
        if (updated.memoryUsage > 80) newAlerts.push("⚠️ Memory usage critical!");
        if (updated.responseTime > 250) newAlerts.push("⚠️ Response time degraded!");

        setAlerts(newAlerts);

        // Logs
        setLogs((prevLogs) => [
          ...prevLogs.slice(-10),
          {
            time: new Date().toLocaleTimeString(),
            message: `System Update: CPU ${Math.round(updated.cpuLoad)}%, MEM ${Math.round(updated.memoryUsage)}%`,
          },
        ]);

        // Notifications
        if (newAlerts.length > 0) {
          setNotifications((prev) => [
            ...prev.slice(-5),
            {
              message: newAlerts[0],
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }

        localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 🌸 Render
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f0ff] via-[#f3e8ff] to-[#ece0fa] p-6 font-poppins">
  
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Server Uptime" value={stats.uptime} icon={<Clock />} color="from-purple-500 to-purple-700" />
        <StatCard title="Response Time" value={`${stats.responseTime} ms`} icon={<Zap />} color="from-pink-400 to-purple-600" />
        <StatCard title="CPU Load" value={`${Math.round(stats.cpuLoad)}%`} icon={<Cpu />} color="from-indigo-400 to-purple-600" />
        <StatCard title="Memory Usage" value={`${Math.round(stats.memoryUsage)}%`} icon={<Database />} color="from-violet-400 to-purple-700" />
        <StatCard title="Storage Used" value={`${stats.storageUsed}%`} icon={<HardDrive />} color="from-fuchsia-400 to-purple-600" />
        <StatCard title="Active Users" value={stats.activeUsers} icon={<Users />} color="from-green-400 to-purple-600" />
        <StatCard title="Network Load" value={`${Math.round(stats.networkTraffic)} MB/s`} icon={<Network />} color="from-cyan-400 to-purple-600" />
        <StatCard title="Error Rate" value={`${stats.errorRate}%`} icon={<ShieldAlert />} color="from-red-400 to-purple-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="📈 API Response Time Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="latency" stroke="#9b5de5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="🧩 Resource Usage Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.resourceBreakdown}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {stats.resourceBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Gauges */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Gauge label="CPU Load" value={Math.round(stats.cpuLoad)} />
        <Gauge label="Memory Usage" value={Math.round(stats.memoryUsage)} />
        <Gauge label="Disk I/O" value={Math.round(stats.diskIO)} />
        <Gauge label="Network Load" value={Math.round(stats.networkTraffic / 10)} />
      </div>

      {/* Health and Logs */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AlertPanel alerts={alerts} />
        <LogsPanel logs={logs} />
        <NotificationFeed notifications={notifications} />
      </div>

      {/* Uptime History */}
      <div className="mt-10">
        <ChartCard title="🕐 Uptime History">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={[
                { day: "Mon", uptime: 99.9 },
                { day: "Tue", uptime: 99.7 },
                { day: "Wed", uptime: 100 },
                { day: "Thu", uptime: 99.8 },
                { day: "Fri", uptime: 99.9 },
                { day: "Sat", uptime: 99.95 },
                { day: "Sun", uptime: 99.97 },
              ]}
            >
              <defs>
                <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a076f9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a076f9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" />
              <YAxis domain={[99.5, 100]} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uptime"
                stroke="#a076f9"
                fillOpacity={1}
                fill="url(#colorUptime)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-purple-800 opacity-75">
        <p className="text-sm">
          © 2025 <strong>QuizArena System Monitor</strong> — Intelligent Analytics Dashboard
        </p>
      </div>
    </div>
  );
};

export default SystemMonitor;
