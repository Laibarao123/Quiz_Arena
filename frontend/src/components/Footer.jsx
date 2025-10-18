import React from "react";
import { Facebook, Twitter, Instagram, Mail, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f0c29] text-gray-300 border-t border-white/10">
      {/* Gradient Strip */}
      <div className="h-1 bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#7C3AED]"></div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899] mb-4">
            QuizArena
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            QuizArena is your ultimate quiz platform to test your knowledge,
            challenge your friends, and have fun while learning. Built with
            passion and designed for everyone who loves competition.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-pink-400">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Home", "About", "Features", "Leaderboard", "Contact"].map(
              (link, i) => (
                <li
                  key={i}
                  className="hover:text-pink-400 transition-colors duration-300 cursor-pointer"
                >
                  {link}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-400">
            Connect With Us
          </h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-[#7C3AED] transition-all"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-[#EC4899] transition-all"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-[#9333EA] transition-all"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-[#10B981] transition-all"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:info@quizarena.com"
              className="p-2 bg-white/10 rounded-full hover:bg-[#F472B6] transition-all"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="text-pink-400">QuizArena</span>. 
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
