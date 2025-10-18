import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Rocket,
  Layers,
  Star,
  CheckCircle2,
  Trophy,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0c29] text-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899] drop-shadow-lg">
            Welcome to <span className="text-white">QuizArena</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
            Learn. Compete. Grow. Join thousands of players in fun, interactive quizzes that test your skills.
          </p>
          <button className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-8 py-3 rounded-lg text-white font-semibold shadow-[0_0_20px_#7C3AED] hover:shadow-[0_0_30px_#EC4899] transition-transform hover:scale-105">
            Get Started
          </button>
        </motion.div>

        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-[#EC4899]/20 blur-3xl opacity-30"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] opacity-10 blur-3xl"
        ></motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 px-8 bg-[#1b1838]/70 backdrop-blur-md border-t border-white/10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]"
        >
          Why Choose QuizArena?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Sparkles size={36} className="text-pink-400 mx-auto mb-3" />,
              title: "Interactive Learning",
              desc: "Engage with smart quizzes designed to make learning fun and effective.",
            },
            {
              icon: <Users size={36} className="text-purple-400 mx-auto mb-3" />,
              title: "Play with Friends",
              desc: "Create rooms and challenge your friends in real-time matches.",
            },
            {
              icon: <Rocket size={36} className="text-emerald-400 mx-auto mb-3" />,
              title: "Climb the Leaderboard",
              desc: "Earn badges, gain XP, and compete with players worldwide.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/10 rounded-xl p-6 border border-white/10 hover:scale-105 hover:shadow-[0_0_20px_#7C3AED] transition-transform duration-300"
            >
              {card.icon}
              <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
                {card.title}
              </h3>
              <p className="text-gray-300 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>



{/* SLIDING SHOWCASE SECTION */}
<section className="relative overflow-hidden py-20 border-t border-white/10 bg-[#141227]">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7C3AED]/10 to-transparent blur-3xl"></div>

  <h2 className="text-center text-3xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
    Explore Trending Quiz Categories
  </h2>

  {/* Sliding Container */}
  <div className="flex gap-8 animate-marquee whitespace-nowrap px-6">
    {[
      { title: "Science", color: "from-cyan-400 to-blue-500" },
      { title: "Technology", color: "from-purple-500 to-pink-500" },
      { title: "History", color: "from-yellow-400 to-orange-500" },
      { title: "Sports", color: "from-green-400 to-emerald-500" },
      { title: "Movies", color: "from-red-400 to-pink-500" },
      { title: "Mathematics", color: "from-blue-400 to-indigo-500" },
      { title: "Art & Design", color: "from-rose-400 to-fuchsia-500" },
      { title: "Music", color: "from-purple-400 to-indigo-500" },
    ].map((item, i) => (
      <div
        key={i}
        className={`relative group min-w-[260px] h-[160px] flex items-center justify-center rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.05)] bg-gradient-to-br ${item.color} p-[3px]`}
      >
        {/* Inner Card */}
        <div className="relative bg-[#0f0c29] w-full h-full rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_25px_#EC4899]">
          {/* Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
          <h3 className="text-xl font-bold text-white drop-shadow-lg">{item.title}</h3>
          <p className="text-sm text-gray-300 mt-2">Take the {item.title} Quiz!</p>
        </div>
      </div>
    ))}
  </div>

  
</section>























      {/* HOW IT WORKS */}
      <section className="py-20 bg-[#1c1b29]/50 text-center px-8 border-t border-white/10">
        <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
          How It Works
        </h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8">
          {[
            {
              icon: <CheckCircle2 className="text-pink-400 mx-auto mb-3" size={38} />,
              title: "1. Sign Up",
              desc: "Create your profile and explore quizzes instantly.",
            },
            {
              icon: <Trophy className="text-yellow-400 mx-auto mb-3" size={38} />,
              title: "2. Join or Host",
              desc: "Play solo or invite friends to a hosted quiz room.",
            },
            {
              icon: <Star className="text-emerald-400 mx-auto mb-3" size={38} />,
              title: "3. Win Rewards",
              desc: "Collect badges and climb the leaderboard weekly!",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 rounded-xl p-6 border border-white/10 hover:shadow-[0_0_25px_#7C3AED] transition-all"
            >
              {step.icon}
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>




{/* LATEST NEWS & BLOG */}
<section className="py-24 bg-[#141227] border-t border-white/10 text-center relative overflow-hidden">
  <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
    Latest from QuizArena Blog
  </h2>

  <div className="flex overflow-x-auto gap-8 px-8 pb-4 snap-x snap-mandatory scrollbar-hide">
    {[
      {
        title: "10 Tips to Boost Your Quiz Score",
        desc: "Learn how top players improve their accuracy and reaction time.",
        img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Why Competitive Quizzing is the Future of Learning",
        desc: "Discover how gamified quizzes are changing the education landscape.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJvEOummrFMJgqfxLMGIxDbXYQ4E2144pK8Q&s",
      },
      {
        title: "Inside the Tech Behind QuizArena",
        desc: "We break down the futuristic tech stack powering real-time multiplayer.",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      },
    ].map((post, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        className="min-w-[320px] sm:min-w-[360px] bg-white/10 rounded-2xl border border-white/10 overflow-hidden shadow-lg snap-center"
      >
        <img src={post.img} alt={post.title} className="w-full h-40 object-cover" />
        <div className="p-6 text-left">
          <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
          <p className="text-gray-300 text-sm mb-4">{post.desc}</p>
          <button className="text-sm font-semibold text-pink-400 hover:text-purple-400 transition">
            Read More →
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</section>




{/* MEET THE CREATORS */}
<section className="py-24 bg-[#141227] border-t border-white/10 text-center">
  <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
    Meet the Creators
  </h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
    {[
      {
        name: "Laiba Rao",
        role: "Lead Designer",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Ali Raza",
        role: "Frontend Developer",
        img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Sara Ahmed",
        role: "Backend Engineer",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRIMbgETySSvBeoxFy1ZIW3znvcZNzTKysiQ&s",
      },
      {
        name: "Hamza Malik",
        role: "Project Manager",
        img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80",
      },
    ].map((member, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        className="bg-white/10 rounded-2xl border border-white/10 overflow-hidden hover:shadow-[0_0_25px_#7C3AED] transition-all"
      >
        <img src={member.img} alt={member.name} className="w-full h-56 object-cover" />
        <div className="p-5">
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-pink-400 text-sm">{member.role}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>
















{/* FAQ SECTION */}
<section className="py-24 bg-[#1c1b29]/60 border-t border-white/10 text-center">
  <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
    Frequently Asked Questions
  </h2>

  <div className="max-w-3xl mx-auto space-y-4 text-left">
    {[
      {
        q: "Is QuizArena free to play?",
        a: "Yes! QuizArena offers free access to thousands of quizzes. Premium events are optional.",
      },
      {
        q: "Can I host my own quiz?",
        a: "Absolutely. You can create and customize your quiz rooms for private or public events.",
      },
      {
        q: "Do I need to register to play?",
        a: "You can play as a guest, but registering unlocks leaderboards, achievements, and rewards.",
      },
      {
        q: "How can I earn rewards?",
        a: "By winning matches, completing daily challenges, and participating in tournaments!",
      },
    ].map((faq, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.02 }}
        className="bg-white/10 p-6 rounded-xl border border-white/10 hover:shadow-[0_0_20px_#7C3AED] transition"
      >
        <h3 className="font-semibold text-lg mb-2 text-white">{faq.q}</h3>
        <p className="text-gray-300 text-sm">{faq.a}</p>
      </motion.div>
    ))}
  </div>
</section>


























































































      

      {/* STATS SECTION */}
      <section className="py-16 bg-[#141227] text-center border-t border-white/10">
        <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
          QuizArena by the Numbers
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {[
            { number: "50K+", label: "Active Users" },
            { number: "2M+", label: "Questions Answered" },
            { number: "5K+", label: "Quiz Rooms" },
            { number: "98%", label: "User Satisfaction" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/10 p-6 rounded-2xl border border-white/10 w-40 hover:shadow-[0_0_20px_#7C3AED] transition"
            >
              <h3 className="text-3xl font-bold text-pink-400">{stat.number}</h3>
              <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-20 bg-[#1b1838]/60 text-center border-t border-white/10">
        <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
          What Players Say
        </h2>
        <div className="flex overflow-x-auto gap-8 px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
          {[
            {
              name: "Ayesha Khan",
              quote:
                "QuizArena makes learning addictive! I love the competition and energy.",
            },
            {
              name: "Ali Raza",
              quote: "The UI is so smooth and elegant — feels futuristic!",
            },
            {
              name: "Sara Ahmed",
              quote: "It’s not just a quiz app, it’s a fun learning experience.",
            },
          ].map((review, i) => (
            <motion.div
              key={i}
              className="bg-white/10 min-w-[300px] sm:min-w-[350px] p-6 rounded-2xl border border-white/10 shadow-lg snap-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="italic text-gray-300 mb-4">“{review.quote}”</p>
              <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
                — {review.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative py-24 text-center border-t border-white/10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-[#EC4899]/20 blur-3xl opacity-30"
        ></motion.div>

        <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
          Ready to Join the Arena?
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Compete, learn, and grow — start your journey today!
        </p>
        <button className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-10 py-3 rounded-lg text-white font-semibold shadow-[0_0_25px_#7C3AED] hover:shadow-[0_0_35px_#EC4899] flex items-center justify-center gap-2 mx-auto transition hover:scale-105">
          Join Now <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
