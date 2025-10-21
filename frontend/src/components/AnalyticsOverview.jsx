

// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const LOCAL_KEY = "quiz_arena_analytics_data";

// const AnalyticsOverview = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Mock Data (saved in localStorage)
//   const mockData = {
//     totalQuizzes: 152,
//     activeQuizzes: 27,
//     completedQuizzes: 125,
//     totalPlayers: 934,
//     totalHosts: 42,
//     totalAdmins: 3,
//     avgCompletionRate: 78,
//     dailyActiveUsers: [120, 180, 260, 210, 300, 350, 420],
//     popularCategories: [
//       { name: "Science", value: 30 },
//       { name: "History", value: 20 },
//       { name: "Sports", value: 25 },
//       { name: "Tech", value: 15 },
//       { name: "General", value: 10 },
//     ],
//   };

//   useEffect(() => {
//     const saved = localStorage.getItem(LOCAL_KEY);
//     if (saved) {
//       setAnalytics(JSON.parse(saved));
//       setLoading(false);
//     } else {
//       setTimeout(() => {
//         localStorage.setItem(LOCAL_KEY, JSON.stringify(mockData));
//         setAnalytics(mockData);
//         setLoading(false);
//       }, 800);
//     }
//   }, []);

//   const resetAnalytics = () => {
//     localStorage.removeItem(LOCAL_KEY);
//     setAnalytics(null);
//     setLoading(true);
//     setTimeout(() => {
//       localStorage.setItem(LOCAL_KEY, JSON.stringify(mockData));
//       setAnalytics(mockData);
//       setLoading(false);
//     }, 800);
//   };

//   if (loading || !analytics) {
//     return (
//       <div className="flex justify-center items-center h-64 text-purple-400 text-lg font-semibold">
//         Loading Analytics...
//       </div>
//     );
//   }

//   const COLORS = ["#7C3AED", "#A78BFA", "#C084FC", "#E879F9", "#DDD6FE"];

//   return (
//     <div className="p-8 space-y-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center bg-gradient-to-r from-indigo-900 to-purple-800 text-white p-5 rounded-2xl shadow-md">
//         <h2 className="text-2xl font-bold tracking-tight">📈 Platform Analytics</h2>
//         <button
//           onClick={resetAnalytics}
//           className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 px-5 py-2 rounded-xl text-sm font-semibold shadow-md transition"
//         >
//           Reset Data
//         </button>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
//         <SummaryCard title="Total Quizzes" value={analytics.totalQuizzes} color="from-indigo-600 to-purple-600" />
//         <SummaryCard title="Active Quizzes" value={analytics.activeQuizzes} color="from-purple-500 to-indigo-600" />
//         <SummaryCard title="Completed" value={analytics.completedQuizzes} color="from-fuchsia-500 to-pink-500" />
//         <SummaryCard title="Players" value={analytics.totalPlayers} color="from-amber-500 to-orange-500" />
//         <SummaryCard title="Hosts" value={analytics.totalHosts} color="from-teal-500 to-emerald-600" />
//         <SummaryCard title="Admins" value={analytics.totalAdmins} color="from-gray-700 to-gray-900" />
//       </div>

//       {/* Average Completion */}
//       <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100">
//         <h3 className="text-xl font-semibold text-purple-900 mb-3">
//           Average Quiz Completion Rate
//         </h3>
//         <div className="flex items-center justify-between">
//           <p className="text-4xl font-bold text-purple-700">
//             {analytics.avgCompletionRate}%
//           </p>
//           <div className="w-3/4 bg-purple-100 rounded-full h-3 ml-5">
//             <div
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full"
//               style={{ width: `${analytics.avgCompletionRate}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Daily Active Users */}
//         <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100">
//           <h3 className="text-lg font-semibold text-purple-900 mb-4">
//             Daily Active Users
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart
//               data={analytics.dailyActiveUsers.map((v, i) => ({
//                 day: `Day ${i + 1}`,
//                 users: v,
//               }))}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#E9D5FF" />
//               <XAxis dataKey="day" stroke="#6B21A8" />
//               <YAxis stroke="#6B21A8" />
//               <Tooltip contentStyle={{ backgroundColor: "#FAF5FF", borderRadius: "8px" }} />
//               <Legend />
//               <Bar dataKey="users" fill="#7C3AED" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Popular Categories */}
//         <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100">
//           <h3 className="text-lg font-semibold text-purple-900 mb-4">
//             Most Popular Quiz Categories
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={analytics.popularCategories}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 label
//               >
//                 {analytics.popularCategories.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip contentStyle={{ backgroundColor: "#FAF5FF", borderRadius: "8px" }} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Metric Card
// const SummaryCard = ({ title, value, color }) => (
//   <div
//     className={`p-5 rounded-2xl text-white shadow-md bg-gradient-to-br ${color} transform hover:scale-105 transition-all duration-200`}
//   >
//     <h4 className="text-sm font-medium opacity-90">{title}</h4>
//     <p className="text-2xl font-bold mt-1">{value}</p>
//   </div>
// );

// export default AnalyticsOverview;
// 📁 src/components/AnalyticsOverview.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const LOCAL_KEY = "quiz_arena_analytics_data";
const COLORS = ["#7C3AED", "#A78BFA", "#C084FC", "#E879F9", "#DDD6FE"];

const mockData = {
  totalQuizzes: 152,
  activeQuizzes: 27,
  completedQuizzes: 125,
  totalPlayers: 934,
  totalHosts: 42,
  totalAdmins: 3,
  avgCompletionRate: 78,
  dailyActiveUsers: [120, 180, 260, 210, 300, 350, 420],
  popularCategories: [
    { name: "Science", value: 30 },
    { name: "History", value: 20 },
    { name: "Sports", value: 25 },
    { name: "Tech", value: 15 },
    { name: "General", value: 10 },
  ],
};

const AnalyticsOverview = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage or mock data
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setAnalytics(JSON.parse(saved));
      setLoading(false);
    } else {
      setTimeout(() => {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(mockData));
        setAnalytics(mockData);
        setLoading(false);
      }, 800);
    }
  }, []);

  const resetAnalytics = () => {
    localStorage.removeItem(LOCAL_KEY);
    setAnalytics(null);
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(mockData));
      setAnalytics(mockData);
      setLoading(false);
    }, 800);
  };

  if (loading || !analytics) {
    return (
      <div className="flex justify-center items-center h-64 text-purple-400 text-lg font-semibold">
        Loading Analytics...
      </div>
    );
  }

  const dailyData =
    analytics.dailyActiveUsers?.map((v, i) => ({ day: `Day ${i + 1}`, users: v })) || [];
  const categories = analytics.popularCategories || [];

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-900 to-purple-800 text-white p-5 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold tracking-tight">📈 Platform Analytics</h2>
        <button
          onClick={resetAnalytics}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 px-5 py-2 rounded-xl text-sm font-semibold shadow-md transition"
        >
          Reset Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <SummaryCard title="Total Quizzes" value={analytics.totalQuizzes} color="from-indigo-600 to-purple-600" />
        <SummaryCard title="Active Quizzes" value={analytics.activeQuizzes} color="from-purple-500 to-indigo-600" />
        <SummaryCard title="Completed" value={analytics.completedQuizzes} color="from-fuchsia-500 to-pink-500" />
        <SummaryCard title="Players" value={analytics.totalPlayers} color="from-amber-500 to-orange-500" />
        <SummaryCard title="Hosts" value={analytics.totalHosts} color="from-teal-500 to-emerald-600" />
        <SummaryCard title="Admins" value={analytics.totalAdmins} color="from-gray-700 to-gray-900" />
      </div>

      {/* Average Completion */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100">
        <h3 className="text-xl font-semibold text-purple-900 mb-3">
          Average Quiz Completion Rate
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold text-purple-700">
            {analytics.avgCompletionRate}%
          </p>
          <div className="w-3/4 bg-purple-100 rounded-full h-3 ml-5">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full"
              style={{ width: `${analytics.avgCompletionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Active Users */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Daily Active Users</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9D5FF" />
              <XAxis dataKey="day" stroke="#6B21A8" />
              <YAxis stroke="#6B21A8" />
              <Tooltip contentStyle={{ backgroundColor: "#FAF5FF", borderRadius: "8px" }} />
              <Legend verticalAlign="top" />
              <Bar dataKey="users" fill="#7C3AED" radius={[6,6,0,0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Categories */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Most Popular Quiz Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} (${(percent*100).toFixed(0)}%)`}
              >
                {categories.map((entry,index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#FAF5FF", borderRadius: "8px" }} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ title, value, color }) => (
  <div className={`p-5 rounded-2xl text-white shadow-md bg-gradient-to-br ${color} transform hover:scale-105 transition-all duration-200`}>
    <h4 className="text-sm font-medium opacity-90">{title}</h4>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

export default AnalyticsOverview;
