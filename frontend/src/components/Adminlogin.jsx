// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Hardcoded credentials
//     if (username === "kashif" && password === "kashif123") {
//       navigate("/admindashbord");
//     } else {
//       setError("Invalid username or password!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0b33] via-[#120d3d] to-[#1c0938]">
//       <div className="bg-[#1b113a] p-8 rounded-2xl shadow-[0_0_25px_rgba(255,0,255,0.2)] w-[370px] text-center">
//         <h1 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
//           Welcome Admin
//         </h1>
//         <p className="text-gray-400 mb-6 text-sm">
//           Login to manage quizzes and monitor platform activity.
//         </p>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-3 bg-[#241a4b] text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 bg-[#241a4b] text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-500"
//             required
//           />
//           {error && <p className="text-red-400 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold py-2.5 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.4)] transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-gray-500 text-xs mt-6">© 2025 QuizArena | Admin Portal</p>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "kashif" && password === "kashif123") {
      navigate("/admindashbord");
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3E8FF] via-[#EDE4FF] to-[#E0D7FF] p-6">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg max-w-5xl w-full flex overflow-hidden border border-purple-200">
        {/* Left Image */}
        <div className="hidden md:block w-1/2 bg-purple-100">

        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-purple-700">Welcome Admin</h1>
          <p className="text-gray-500 mb-8 text-sm">
            Login to manage quizzes and monitor platform activity.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-purple-50 text-purple-900 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 outline-none placeholder-purple-300 transition text-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-purple-50 text-purple-900 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 outline-none placeholder-purple-300 transition text-lg"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:opacity-95 text-white font-semibold py-4 rounded-xl shadow-md text-lg transition"
            >
              Login
            </button>
          </form>

          <p className="text-gray-400 text-xs mt-10 text-center">
            © 2025 QuizArena | Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
