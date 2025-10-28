

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const { email, password } = formData;

//     // Validation
//     if (!email || !password) {
//       setError("All fields are required!");
//       return;
//     }

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const user = users.find(
//       (u) => u.email.toLowerCase() === email.trim().toLowerCase()
//     );

//     if (!user) {
//       setError("No user found with this email!");
//       return;
//     }

//     if (user.password !== password) {
//       setError("Incorrect password!");
//       return;
//     }

//     // Save logged-in user in localStorage (optional)
//     localStorage.setItem("currentUser", JSON.stringify(user));

//     setSuccess("Login successful! Redirecting...");
//     setTimeout(() => navigate("/"), 1500); // redirect to dashboard or home
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">
//       <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-300 border w-[90%] sm:w-[400px] text-center">
//         <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
//           Login to QuizArena
//         </h2>
//         <p className="text-gray-500 mb-6 text-sm">
//           Enter your credentials to continue
//         </p>

//         {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</p>}
//         {success && <p className="bg-green-100 text-green-700 p-2 rounded mb-3">{success}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />

//           <button
//             type="submit"
//             className="w-full py-3 mt-2 font-semibold text-lg rounded-xl bg-purple-600 text-white hover:opacity-90 transition-all shadow-md"
//           >
//             Login
//           </button>
//         </form>

//         <div className="my-5 text-gray-400 text-sm">or</div>

//         <button
//           onClick={() => navigate("/register")}
//           className="w-full py-3 font-semibold rounded-xl bg-transparent border border-gray-300 hover:bg-gray-100 transition-all"
//         >
//           Don't have an account? Register
//         </button>

//         <p className="mt-6 text-xs text-gray-500">
//           © {new Date().getFullYear()} QuizArena | All Rights Reserved
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import Axios

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const { email, password } = formData;

    // ✅ Basic validation
    if (!email || !password) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    try {
      // ✅ Send login request to backend
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        setMessage({ type: "success", text: "Login successful! Redirecting..." });

        // ✅ Save token + user info (optional)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));

        // ✅ Redirect after short delay
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage({ type: "error", text: response.data.message });
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg =
        error.response?.data?.message || "Server error. Please try again.";
      setMessage({ type: "error", text: errorMsg });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">
      <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-300 border w-[90%] sm:w-[400px] text-center">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
          Login to QuizArena
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Enter your credentials to continue
        </p>

        {/* ✅ Message (error/success) */}
        {message.text && (
          <p
            className={`p-2 rounded mb-3 ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full py-3 mt-2 font-semibold text-lg rounded-xl bg-purple-600 text-white hover:opacity-90 transition-all shadow-md"
          >
            Login
          </button>
        </form>

        <div className="my-5 text-gray-400 text-sm">or</div>

        <button
          onClick={() => navigate("/register")}
          className="w-full py-3 font-semibold rounded-xl bg-transparent border border-gray-300 hover:bg-gray-100 transition-all"
        >
          Don't have an account? Register
        </button>

        <p className="mt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} QuizArena | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
