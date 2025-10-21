import React from "react";
import { Zap, Shield, Users, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-[#a56eff]" />,
      title: "Lightning Fast",
      desc: "Experience blazing speed with optimized performance and smooth animations.",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#9c7cff]" />,
      title: "Secure by Design",
      desc: "Your data is safe with end-to-end encryption and secure authentication.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#b593ff]" />,
      title: "User-Centric",
      desc: "Beautifully crafted UI with a focus on simplicity and usability.",
    },
    {
      icon: <Star className="w-8 h-8 text-[#c7adff]" />,
      title: "Feature Rich",
      desc: "Packed with smart tools and analytics to empower your workflow.",
    },
  ];

  return (
    <section className="bg-white text-gray-800 py-20 px-6 md:px-16" id="features">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-[#7b4eff]"> Key Features</h2>
        <p className="text-gray-500 mb-12">
          Discover what makes our platform elegant, intuitive, and powerful.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#f8f5ff] border border-[#e3d6ff] rounded-2xl p-6 shadow-md hover:shadow-lg hover:shadow-[#e5d9ff]/50 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#5a36a8] mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
