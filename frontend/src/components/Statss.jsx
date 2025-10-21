import React from "react";
import { Users, Star, CheckCircle2, Zap } from "lucide-react";

const Stats = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-purple-400" />, label: "Active Users", value: "12,340" },
    { icon: <Star className="w-8 h-8 text-yellow-400" />, label: "Top Ratings", value: "4.9/5" },
    { icon: <CheckCircle2 className="w-8 h-8 text-green-400" />, label: "Quizzes Completed", value: "8,560" },
    { icon: <Zap className="w-8 h-8 text-blue-400" />, label: "Fast Responses", value: "99.8%" },
  ];

  return (
    <section className="bg-[#f3ecff] text-gray-800 py-20 px-6 md:px-16" id="stats">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-purple-700">📈 Stats & Analytics</h2>
        <p className="text-gray-600 mb-12">Key metrics showing our platform’s impact and performance.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-2xl font-bold text-purple-700">{stat.value}</h3>
              <p className="text-gray-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
