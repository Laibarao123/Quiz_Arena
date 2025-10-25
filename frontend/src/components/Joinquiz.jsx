// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Gamepad2, Loader2, CheckCircle2, XCircle } from "lucide-react";

// const JoinQuiz = () => {
//   const [quizCode, setQuizCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");
//     if (code) setQuizCode(code);
//   }, []);

//   const handleJoinQuiz = () => {
//     if (!quizCode || quizCode.length < 4) {
//       setError("Please enter a valid quiz code!");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     setSuccess(false);

//     setTimeout(() => {
//       // temporary mock validation
//       if (["ABC123", "XYZ789", "QUIZ999"].includes(quizCode)) {
//         setSuccess(true);
//         setLoading(false);
//       } else {
//         setError("Invalid or expired quiz code!");
//         setLoading(false);
//       }
//     }, 1200);
//   };

//   return (
//     <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 overflow-hidden">
//       {/* decorative blurred shapes */}
//       <div
//         className="absolute -left-32 -top-28 w-96 h-96 rounded-full bg-purple-300 opacity-30 filter blur-3xl transform rotate-45"
//         aria-hidden
//       />
//       <div
//         className="absolute -right-28 -bottom-24 w-80 h-80 rounded-full bg-pink-300 opacity-25 filter blur-2xl"
//         aria-hidden
//       />
//       <div
//         className="absolute inset-0 bg-white/30 backdrop-blur-md"
//         aria-hidden
//       />

//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.45 }}
//         className="relative w-full max-w-3xl p-10 md:p-14 rounded-2xl bg-white/90 shadow-2xl border border-purple-100"
//       >
//         <div className="flex flex-col md:flex-row gap-8 items-stretch">
//           {/* Left: Big visual/form column */}
//           <div className="flex-1 flex flex-col items-center text-center px-2 md:px-8">
//             <div className="flex items-center justify-center rounded-full w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-lg mb-4">
//               <Gamepad2 className="w-10 h-10" />
//             </div>

//             <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-2">
//               Join Quiz
//             </h1>
//             <p className="text-sm md:text-base text-gray-600 max-w-xl">
//               Enter your unique quiz code to join. Make sure the code is correct — codes are case-insensitive.
//             </p>
//           </div>

//           {/* Right: Large form */}
//           <div className="flex-1 flex items-center justify-center">
//             <div className="w-full max-w-lg">
//               {/* input group */}
//               <label className="block text-sm font-medium text-gray-600 mb-3">
//                 Quiz Code
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. ABC123"
//                 value={quizCode}
//                 onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
//                 className="w-full rounded-xl border border-purple-200 bg-white/80 px-6 py-5 text-2xl tracking-widest text-center outline-none focus:ring-4 focus:ring-purple-200 transition placeholder:uppercase placeholder:tracking-widest"
//                 autoComplete="off"
//                 inputMode="text"
//               />

//               {/* feedback */}
//               <div className="mt-4 min-h-[1.25rem]">
//                 {error && (
//                   <div className="flex items-center gap-2 text-red-600 text-sm">
//                     <XCircle className="w-4 h-4" /> <span>{error}</span>
//                   </div>
//                 )}
//                 {success && (
//                   <div className="flex items-center gap-2 text-green-700 text-sm">
//                     <CheckCircle2 className="w-4 h-4" /> <span>Joined successfully!</span>
//                   </div>
//                 )}
//               </div>

//               {/* big action button */}
//               <button
              
//                 onClick={handleJoinQuiz}
//                 disabled={loading}
//                 className={`mt-6 w-full rounded-xl py-4 flex items-center justify-center gap-3 text-lg font-semibold text-white transition ${
//                   loading
//                     ? "bg-purple-400 cursor-not-allowed opacity-80"
//                     : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
//                 } shadow-lg`}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" /> <span>Joining...</span>
//                   </>
//                 ) : (
//                   "Join Quiz"
//                 )}
//               </button>

//               {/* subtle footer */}
//               <div className="mt-5 text-xs text-gray-500 text-center">
//                 Share the code with your friends — they can join from any device.
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default JoinQuiz;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Loader2, CheckCircle2, XCircle } from "lucide-react";

const JoinQuiz = () => {
  const navigate = useNavigate();
  const [quizCode, setQuizCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) setQuizCode(code);
  }, []);

  const handleJoinQuiz = () => {
    if (!quizCode || quizCode.length < 4) {
      setError("Please enter a valid quiz code!");
      return;
    }
    setError("");
    setLoading(true);
    setSuccess(false);

    // Simulate a short delay
    setTimeout(() => {
      if (["ABC123", "XYZ789", "QUIZ999"].includes(quizCode)) {
        setSuccess(true);
        setLoading(false);

        // 🟢 Navigate to QuizRoomPlayerView after short delay
        setTimeout(() => {
          navigate("/QuizRoomPlayerView", { state: { quizCode } });
        }, 800);
      } else {
        setError("Invalid or expired quiz code!");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 overflow-hidden">
      {/* decorative blurred shapes */}
      <div
        className="absolute -left-32 -top-28 w-96 h-96 rounded-full bg-purple-300 opacity-30 filter blur-3xl transform rotate-45"
        aria-hidden
      />
      <div
        className="absolute -right-28 -bottom-24 w-80 h-80 rounded-full bg-pink-300 opacity-25 filter blur-2xl"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-md"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-3xl p-10 md:p-14 rounded-2xl bg-white/90 shadow-2xl border border-purple-100"
      >
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left: Big visual/form column */}
          <div className="flex-1 flex flex-col items-center text-center px-2 md:px-8">
            <div className="flex items-center justify-center rounded-full w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-lg mb-4">
              <Gamepad2 className="w-10 h-10" />
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-2">
              Join Quiz
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-xl">
              Enter your unique quiz code to join. Make sure the code is correct
              — codes are case-insensitive.
            </p>
          </div>

          {/* Right: Form */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <label className="block text-sm font-medium text-gray-600 mb-3">
                Quiz Code
              </label>
              <input
                type="text"
                placeholder="e.g. ABC123"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                className="w-full rounded-xl border border-purple-200 bg-white/80 px-6 py-5 text-2xl tracking-widest text-center outline-none focus:ring-4 focus:ring-purple-200 transition placeholder:uppercase placeholder:tracking-widest"
                autoComplete="off"
              />

              {/* Feedback */}
              <div className="mt-4 min-h-[1.25rem]">
                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <XCircle className="w-4 h-4" /> <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle2 className="w-4 h-4" />{" "}
                    <span>Joined successfully! Redirecting...</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleJoinQuiz}
                disabled={loading}
                className={`mt-6 w-full rounded-xl py-4 flex items-center justify-center gap-3 text-lg font-semibold text-white transition ${
                  loading
                    ? "bg-purple-400 cursor-not-allowed opacity-80"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                } shadow-lg`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />{" "}
                    <span>Joining...</span>
                  </>
                ) : (
                  "Join Quiz"
                )}
              </button>

              <div className="mt-5 text-xs text-gray-500 text-center">
                Share the code with your friends — they can join from any device.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinQuiz;
