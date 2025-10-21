import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Statss from "../components/Statss";
import {
  FileText,
  Bell,
  PlusCircle,
  Edit2,
  Trash2,
  PieChart,
  Search,
  ArrowRight,
  Contact,
} from "lucide-react";

const Topbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-[#3a0072]">Dashboard Overview</h2>
        <p className="text-xs text-gray-500 mt-1">
          Welcome back! Here’s what’s happening today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search quizzes, users..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#b57edc]/40"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <Search size={16} />
          </span>
        </div>

        <button className="p-2 rounded-lg bg-white border border-gray-100 shadow-sm hover:bg-gray-50">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold">Admin</div>
            <div className="text-xs text-gray-500">laiba@example.com</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#6A0DAD] to-[#B57EDC] rounded-full flex items-center justify-center text-white font-bold">
            L
          </div>
        </div>
      </div>
    </header>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl p-5 border border-[#efe8ff] shadow-sm hover:shadow-md transition">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="mt-3 text-2xl font-extrabold text-[#3a0072]">{value}</div>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <div className="py-3 border-b last:border-b-0 border-gray-100">
    <div className="text-sm text-gray-700">{text}</div>
    <div className="text-xs text-gray-400 mt-1">{time}</div>
  </div>
);

const QuizRow = ({ quiz }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-4 py-3 text-sm">{quiz.id}</td>
    <td className="px-4 py-3 text-sm font-semibold">{quiz.title}</td>
    <td className="px-4 py-3 text-sm">{quiz.category}</td>
    <td className="px-4 py-3 text-sm">{quiz.questions} Qs</td>
    <td className="px-4 py-3 text-sm">{quiz.players}</td>
    <td className="px-4 py-3 text-sm">{quiz.status}</td>
    <td className="px-4 py-3">
      <div className="flex gap-2">
        <button className="p-2 rounded-md bg-white border border-gray-100 hover:bg-gray-50">
          <Edit2 size={14} />
        </button>
        <button className="p-2 rounded-md bg-white border border-gray-100 text-red-500 hover:bg-gray-50">
          <Trash2 size={14} />
        </button>
      </div>
    </td>
  </tr>
);

const Home = () => {
  const stats = [
    { label: "Total Quizzes", value: "12" },
    { label: "Total Players", value: "45" },
    { label: "Active Quizzes", value: "3" },
    { label: "Pending Reviews", value: "5" },
  ];

  const activities = [
    { text: "Player John joined Quiz A", time: "2 hrs ago" },
    { text: "Quiz B created by Admin", time: "5 hrs ago" },
    { text: "Player Alice completed Quiz C", time: "1 day ago" },
    { text: "Quiz D results published", time: "2 days ago" },
  ];

  const quizzes = [
    {
      id: "#Q-001",
      title: "General Knowledge",
      category: "General",
      questions: 20,
      players: 102,
      status: "Active",
    },
    {
      id: "#Q-002",
      title: "World History",
      category: "History",
      questions: 15,
      players: 58,
      status: "Inactive",
    },
    {
      id: "#Q-003",
      title: "Science Basics",
      category: "Science",
      questions: 25,
      players: 200,
      status: "Active",
    },
    {
      id: "#Q-004",
      title: "Tech Trends",
      category: "Technology",
      questions: 18,
      players: 34,
      status: "Draft",
    },
  ];

  const team = [
    {
      name: "Laiba Rao",
      role: "Lead Designer",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Ali Raza",
      role: "Frontend Dev",
      avatar:
        "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sara Ahmed",
      role: "Backend Eng",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Hamza Malik",
      role: "Project Manager",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6fb]">
      <Navbar />
      <Topbar />

      <main className="flex-1 p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <StatCard label={s.label} value={s.value} />
            </motion.div>
          ))}
        </div>

        {/* Activities and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#3a0072]">Recent Activities</h3>
              <button className="text-sm px-3 py-2 rounded-md bg-[#6A0DAD] text-white flex items-center gap-2">
                <PlusCircle size={16} /> New
              </button>
            </div>

            <div className="mt-4">
              {activities.map((a, idx) => (
                <ActivityItem key={idx} text={a.text} time={a.time} />
              ))}
            </div>
          </div>

          {/* Engagement Chart */}
          <div className="bg-gradient-to-br from-[#f8f5ff] to-[#efe6ff] rounded-2xl shadow-lg border border-[#d9caff] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#3a0072]">Engagement Overview</h3>
              <span className="text-sm text-gray-500">Last 7 days</span>
            </div>

            <div className="relative bg-white/80 rounded-xl p-4 border border-[#e0d5f9]">
              <svg viewBox="0 0 300 120" className="w-full h-32">
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7b3ff2" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#cbb4ff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,80 Q50,20 100,60 T200,70 T300,50 L300,120 L0,120 Z"
                  fill="url(#purpleGradient)"
                />
                <path
                  d="M0,80 Q50,20 100,60 T200,70 T300,50"
                  fill="none"
                  stroke="#7b3ff2"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="40" r="4" fill="#7b3ff2" />
                <circle cx="150" cy="65" r="4" fill="#7b3ff2" />
                <circle cx="250" cy="55" r="4" fill="#7b3ff2" />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/70 backdrop-blur-sm border border-[#e0d5f9] rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-bold text-[#5a00a3]">78%</p>
                <p className="text-xs text-green-600 mt-1">+5% this week</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-[#e0d5f9] rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-2xl font-bold text-[#5a00a3]">65%</p>
                <p className="text-xs text-red-500 mt-1">-3% this week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes Table */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#3a0072]">Quizzes</h3>
            <div className="flex items-center gap-3">
              <button className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm flex items-center gap-2">
                <FileText size={14} /> Export
              </button>
              <button className="px-3 py-2 rounded-md bg-gradient-to-r from-[#6A0DAD] to-[#B57EDC] text-white text-sm flex items-center gap-2">
                <PlusCircle size={14} /> New Quiz
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-xs uppercase text-gray-400 border-b border-gray-100">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Questions</th>
                  <th className="px-4 py-3">Players</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quizzes.map((q, idx) => (
                  <QuizRow quiz={q} key={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#3a0072]">Meet the Creators</h3>
              <div className="text-sm text-gray-400">Core Team</div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {team.map((m, i) => (
                <div
                  key={i}
                  className="bg-white/95 rounded-lg p-4 border border-gray-50 text-center shadow-sm"
                >
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="mx-auto w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                  <div className="mt-3 text-sm font-medium text-[#4a007a]">
                    {m.name}
                  </div>
                  <div className="text-xs text-gray-500">{m.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#3a0072]">What Players Say</h3>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-700 italic">
                “QuizArena makes learning addictive!” — Ayesha
              </p>
              <p className="text-sm text-gray-700 italic">
                “The UI is smooth and elegant.” — Ali
              </p>
              <p className="text-sm text-gray-700 italic">
                “Fun learning experience.” — Sara
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#faf5ff] to-[#f3ecff] p-6 rounded-xl border border-[#efe8ff] flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#3a0072]">
              Ready to create your next quiz?
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Invite players, schedule events, and publish results effortlessly.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-md border border-gray-200 bg-white">
              Maybe later
            </button>
            <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#6A0DAD] to-[#B57EDC] text-white flex items-center gap-2">
              Create Quiz <ArrowRight size={16} />
            </button>
          </div>
        </div>



<Statss/>

<Features/>

{/* 🌟 ABOUT SECTION */}
<section className="bg-gradient-to-b from-[#faf5ff] to-[#f3ecff] rounded-xl border border-[#efe8ff] p-8 shadow-sm">
  <div className="text-center max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold text-[#3a0072] mb-3">About QuizArena</h2>
    <p className="text-gray-600 text-sm leading-relaxed">
      QuizArena is your modern hub for interactive learning. Whether you're a student,
      teacher, or enthusiast — create, play, and analyze quizzes that make learning fun
      and rewarding. We blend innovation with education through engaging design and
      real-time analytics.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-center">
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-[#6A0DAD] font-semibold mb-2">💡 Smart Learning</h3>
      <p className="text-sm text-gray-600">
        Experience personalized quizzes that adapt to your performance.
      </p>
    </div>
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-[#6A0DAD] font-semibold mb-2">⚙️ Powerful Tools</h3>
      <p className="text-sm text-gray-600">
        Create, manage, and review quizzes with ease using our intuitive interface.
      </p>
    </div>
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-[#6A0DAD] font-semibold mb-2">🌍 Global Access</h3>
      <p className="text-sm text-gray-600">
        Join learners worldwide and compete in public or private quiz challenges.
      </p>
    </div>
  </div>
</section>






































        <Footer />
      </main>
    </div>
  );
};

export default Home;









