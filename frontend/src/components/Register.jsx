

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [message, setMessage] = useState({ type: "", text: "" });

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle registration
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setMessage({ type: "", text: "" });

//     const { name, email, password, confirmPassword } = formData;

//     // Basic validation
//     if (!name || !email || !password || !confirmPassword) {
//       setMessage({ type: "error", text: "All fields are required!" });
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setMessage({ type: "error", text: "Please enter a valid email address!" });
//       return;
//     }

//     if (password.length < 6) {
//       setMessage({
//         type: "error",
//         text: "Password must be at least 6 characters long!",
//       });
//       return;
//     }

//     if (password !== confirmPassword) {
//       setMessage({ type: "error", text: "Passwords do not match!" });
//       return;
//     }

//     // Get existing users from localStorage
//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     // Check if email already exists
//     const userExists = users.some(
//       (user) => user.email.toLowerCase() === email.trim().toLowerCase()
//     );

//     if (userExists) {
//       setMessage({ type: "error", text: "A user with this email already exists!" });
//       return;
//     }

//     // Create new user
//     const newUser = {
//       name: name.trim(),
//       email: email.trim().toLowerCase(),
//       password,
//     };

//     // Save to localStorage
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));

//     // Success message
//     setMessage({ type: "success", text: "Registration successful! Redirecting..." });
//     setFormData({ name: "", email: "", password: "", confirmPassword: "" });

//     // Redirect after delay
//     setTimeout(() => navigate("/login"), 2000);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">
//       <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-300 border w-[90%] sm:w-[400px] text-center">
//         <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
//           Create Your Account
//         </h2>
//         <p className="text-gray-500 mb-6 text-sm">
//           Join QuizArena and start competing!
//         </p>

//         {/* Error or Success message */}
//         {message.text && (
//           <p
//             className={`p-2 rounded mb-3 ${
//               message.type === "error"
//                 ? "bg-red-100 text-red-700"
//                 : "bg-green-100 text-green-700"
//             }`}
//           >
//             {message.text}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
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
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />

//           <button
//             type="submit"
//             className="w-full py-3 mt-2 font-semibold text-lg rounded-xl bg-purple-600 text-white hover:opacity-90 transition-all shadow-md"
//           >
//             Register
//           </button>
//         </form>

//         <div className="my-5 text-gray-400 text-sm">or</div>

//         <button
//           onClick={() => navigate("/login")}
//           className="w-full py-3 font-semibold rounded-xl bg-transparent border border-gray-300 hover:bg-gray-100 transition-all"
//         >
//           Already have an account? Login
//         </button>

//         <p className="mt-6 text-xs text-gray-500">
//           © {new Date().getFullYear()} QuizArena | All Rights Reserved
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const { name, email, password, confirmPassword } = formData;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address!" });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters long!",
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    // Get existing users from localStorage safely
    let users = [];
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      if (Array.isArray(storedUsers)) {
        users = storedUsers;
      } else {
        // Clear invalid data
        localStorage.removeItem("users");
      }
    } catch (error) {
      localStorage.removeItem("users");
      users = [];
    }

    // Check if email already exists
    const userExists = users.some(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (userExists) {
      setMessage({ type: "error", text: "A user with this email already exists!" });
      return;
    }

    // Create new user
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Success message
    setMessage({ type: "success", text: "Registration successful! Redirecting..." });
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });

    // Redirect after delay
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">
      <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-300 border w-[90%] sm:w-[400px] text-center">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
          Create Your Account
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Join QuizArena and start competing!
        </p>

        {/* Error or Success message */}
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
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full py-3 mt-2 font-semibold text-lg rounded-xl bg-purple-600 text-white hover:opacity-90 transition-all shadow-md"
          >
            Register
          </button>
        </form>

        <div className="my-5 text-gray-400 text-sm">or</div>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 font-semibold rounded-xl bg-transparent border border-gray-300 hover:bg-gray-100 transition-all"
        >
          Already have an account? Login
        </button>

        <p className="mt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} QuizArena | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Register;
