// import React, { useState } from "react";
// import {
//   User,
//   Edit3,
//   Lock,
//   Sun,
//   Moon,
//   Globe,
//   Shield,
//   Award,
//   LogOut,
//   Bell,
//   Activity,
//   Mail,
//   Phone,
//   Save,
//   Key,
//   CheckCircle,
// } from "lucide-react";

// const HostProfile = () => {
//   const [activeTab, setActiveTab] = useState("Profile");
//   const [editMode, setEditMode] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "Alex Carter",
//     username: "alex_host",
//     email: "alex.carter@example.com",
//     phone: "+92 300 1234567",
//     role: "Quiz Host",
//     joined: "March 2024",
//     verified: true,
//   });
//   const [password, setPassword] = useState({
//     old: "",
//     new: "",
//     confirm: "",
//   });
//   const [preferences, setPreferences] = useState({
//     notifications: true,
//     emailAlerts: false,
//     language: "English",
//     theme: "Light",
//   });

//   const activities = [
//     {
//       id: 1,
//       icon: <Activity className="w-4 h-4 text-purple-600" />,
//       action: "Created a new quiz 'AI Basics'",
//       time: "2 hours ago",
//     },
//     {
//       id: 2,
//       icon: <CheckCircle className="w-4 h-4 text-green-600" />,
//       action: "Updated leaderboard for 'Data Science Challenge'",
//       time: "Yesterday",
//     },
//     {
//       id: 3,
//       icon: <Shield className="w-4 h-4 text-blue-600" />,
//       action: "Changed account password",
//       time: "2 days ago",
//     },
//   ];

//   const handleSaveProfile = () => {
//     setEditMode(false);
//     alert("Profile updated successfully (frontend only).");
//   };

//   const handleSavePassword = () => {
//     if (password.new !== password.confirm) {
//       alert("New password and confirm password must match!");
//       return;
//     }
//     alert("Password updated successfully (frontend only).");
//     setPassword({ old: "", new: "", confirm: "" });
//   };

//   return (
//     <div
//       className={`min-h-screen p-8 transition-all ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold">Host Profile</h1>
//           <div className="flex gap-3">
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
//               {darkMode ? "Light Mode" : "Dark Mode"}
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-4 mb-6">
//           {["Profile", "Settings", "Security", "Activity"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-5 py-2 rounded-xl font-medium ${
//                 activeTab === tab
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-200 hover:bg-gray-300 text-gray-700"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md transition">
//           {activeTab === "Profile" && (
//             <div>
//               {/* Profile Info */}
//               <div className="flex items-center gap-6">
//                 <div className="relative">
//                   <img
//                     src="https://i.pravatar.cc/120"
//                     alt="Profile"
//                     className="w-28 h-28 rounded-full border-4 border-purple-500 object-cover"
//                   />
//                   {profile.verified && (
//                     <span className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-1">
//                       <CheckCircle className="w-4 h-4" />
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-semibold flex items-center gap-2">
//                     {profile.name}
//                     {profile.verified && (
//                       <span className="text-green-500 text-sm">(Verified)</span>
//                     )}
//                   </h2>
//                   <p className="text-gray-500">@{profile.username}</p>
//                   <p className="text-sm mt-1">Role: {profile.role}</p>
//                   <p className="text-sm">Joined: {profile.joined}</p>
//                 </div>
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-purple-700"
//                 >
//                   <Edit3 className="w-4 h-4" /> Edit Profile
//                 </button>
//               </div>

//               {/* Edit Profile Modal */}
//               {editMode && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                   <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md relative">
//                     <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
//                     <input
//                       type="text"
//                       value={profile.name}
//                       onChange={(e) =>
//                         setProfile({ ...profile, name: e.target.value })
//                       }
//                       placeholder="Full Name"
//                       className="w-full mb-3 px-3 py-2 border rounded-xl dark:bg-gray-800"
//                     />
//                     <input
//                       type="email"
//                       value={profile.email}
//                       onChange={(e) =>
//                         setProfile({ ...profile, email: e.target.value })
//                       }
//                       placeholder="Email"
//                       className="w-full mb-3 px-3 py-2 border rounded-xl dark:bg-gray-800"
//                     />
//                     <input
//                       type="text"
//                       value={profile.phone}
//                       onChange={(e) =>
//                         setProfile({ ...profile, phone: e.target.value })
//                       }
//                       placeholder="Phone"
//                       className="w-full mb-4 px-3 py-2 border rounded-xl dark:bg-gray-800"
//                     />
//                     <div className="flex justify-end gap-3">
//                       <button
//                         onClick={() => setEditMode(false)}
//                         className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleSaveProfile}
//                         className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
//                       >
//                         <Save className="w-4 h-4 inline mr-2" /> Save
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Settings Tab */}
//           {activeTab === "Settings" && (
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Preferences</h3>
//               <div className="space-y-4">
//                 <label className="flex items-center justify-between">
//                   <span className="flex items-center gap-2">
//                     <Bell className="w-5 h-5 text-purple-600" /> Notifications
//                   </span>
//                   <input
//                     type="checkbox"
//                     checked={preferences.notifications}
//                     onChange={() =>
//                       setPreferences({
//                         ...preferences,
//                         notifications: !preferences.notifications,
//                       })
//                     }
//                     className="w-5 h-5 accent-purple-600"
//                   />
//                 </label>

//                 <label className="flex items-center justify-between">
//                   <span className="flex items-center gap-2">
//                     <Mail className="w-5 h-5 text-purple-600" /> Email Alerts
//                   </span>
//                   <input
//                     type="checkbox"
//                     checked={preferences.emailAlerts}
//                     onChange={() =>
//                       setPreferences({
//                         ...preferences,
//                         emailAlerts: !preferences.emailAlerts,
//                       })
//                     }
//                     className="w-5 h-5 accent-purple-600"
//                   />
//                 </label>

//                 <label className="flex items-center justify-between">
//                   <span className="flex items-center gap-2">
//                     <Globe className="w-5 h-5 text-purple-600" /> Language
//                   </span>
//                   <select
//                     value={preferences.language}
//                     onChange={(e) =>
//                       setPreferences({
//                         ...preferences,
//                         language: e.target.value,
//                       })
//                     }
//                     className="px-3 py-2 border rounded-xl dark:bg-gray-700"
//                   >
//                     <option>English</option>
//                     <option>Urdu</option>
//                     <option>French</option>
//                     <option>Spanish</option>
//                   </select>
//                 </label>

//                 <label className="flex items-center justify-between">
//                   <span className="flex items-center gap-2">
//                     <Sun className="w-5 h-5 text-purple-600" /> Theme
//                   </span>
//                   <select
//                     value={preferences.theme}
//                     onChange={(e) =>
//                       setPreferences({
//                         ...preferences,
//                         theme: e.target.value,
//                       })
//                     }
//                     className="px-3 py-2 border rounded-xl dark:bg-gray-700"
//                   >
//                     <option>Light</option>
//                     <option>Dark</option>
//                     <option>System</option>
//                   </select>
//                 </label>
//               </div>
//             </div>
//           )}

//           {/* Security Tab */}
//           {activeTab === "Security" && (
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
//               <div className="space-y-4 max-w-md">
//                 <div>
//                   <label className="block mb-1 font-medium">Old Password</label>
//                   <input
//                     type="password"
//                     value={password.old}
//                     onChange={(e) =>
//                       setPassword({ ...password, old: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border rounded-xl dark:bg-gray-700"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-medium">New Password</label>
//                   <input
//                     type="password"
//                     value={password.new}
//                     onChange={(e) =>
//                       setPassword({ ...password, new: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border rounded-xl dark:bg-gray-700"
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-medium">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     value={password.confirm}
//                     onChange={(e) =>
//                       setPassword({ ...password, confirm: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border rounded-xl dark:bg-gray-700"
//                   />
//                 </div>
//                 <button
//                   onClick={handleSavePassword}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
//                 >
//                   <Key className="w-4 h-4 inline mr-2" /> Update Password
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Activity Tab */}
//           {activeTab === "Activity" && (
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
//               <ul className="space-y-3">
//                 {activities.map((act) => (
//                   <li
//                     key={act.id}
//                     className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl"
//                   >
//                     {act.icon}
//                     <div>
//                       <p>{act.action}</p>
//                       <span className="text-sm text-gray-500">{act.time}</span>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end mt-8">
//           <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700">
//             <LogOut className="w-4 h-4" /> Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HostProfile;





import React, { useState } from "react";
import {
  User,
  Edit3,
  Lock,
  Sun,
  Moon,
  Globe,
  Shield,
  Award,
  LogOut,
  Bell,
  Activity,
  Mail,
  Phone,
  Save,
  Key,
  CheckCircle,
  Camera,
} from "lucide-react";

const HostProfile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Carter",
    username: "alex_host",
    email: "alex.carter@example.com",
    phone: "+92 300 1234567",
    role: "Quiz Host",
    joined: "March 2024",
    verified: true,
    picture: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // constant default image
  });
  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailAlerts: false,
    language: "English",
    theme: "Light",
  });

  const activities = [
    {
      id: 1,
      icon: <Activity className="w-4 h-4 text-purple-600" />,
      action: "Created a new quiz 'AI Basics'",
      time: "2 hours ago",
    },
    {
      id: 2,
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      action: "Updated leaderboard for 'Data Science Challenge'",
      time: "Yesterday",
    },
    {
      id: 3,
      icon: <Shield className="w-4 h-4 text-blue-600" />,
      action: "Changed account password",
      time: "2 days ago",
    },
  ];

  const handleSaveProfile = () => {
    setEditMode(false);
    alert("Profile updated successfully (frontend only).");
  };

  const handleSavePassword = () => {
    if (password.new !== password.confirm) {
      alert("New password and confirm password must match!");
      return;
    }
    alert("Password updated successfully (frontend only).");
    setPassword({ old: "", new: "", confirm: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, picture: imageUrl });
    }
  };

  return (
    <div
      className={`min-h-screen p-8 transition-all ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-[#E6E6FA] text-gray-800" // Lavender background
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Host Profile</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 bg-white/70 dark:bg-gray-800 px-4 py-2 rounded-xl hover:bg-white/90 dark:hover:bg-gray-700 shadow-sm"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["Profile", "Settings", "Security", "Activity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl font-medium transition-all ${
                activeTab === tab
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white/80 hover:bg-white text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition">
          {activeTab === "Profile" && (
            <div>
              {/* Profile Info */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="relative group">
                  <img
                    src={profile.picture}
                    alt="Profile"
                    className="w-28 h-28 rounded-full border-4 border-purple-500 object-cover transition-all duration-300"
                  />
                  {profile.verified && (
                    <span className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </span>
                  )}
                  <label
                    htmlFor="upload-photo"
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      id="upload-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    {profile.name}
                    {profile.verified && (
                      <span className="text-green-500 text-sm">(Verified)</span>
                    )}
                  </h2>
                  <p className="text-gray-500">@{profile.username}</p>
                  <p className="text-sm mt-1">Role: {profile.role}</p>
                  <p className="text-sm">Joined: {profile.joined}</p>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-purple-700 transition"
                >
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              </div>

              {/* Edit Profile Modal */}
              {editMode && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md relative">
                    <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      placeholder="Full Name"
                      className="w-full mb-3 px-3 py-2 border rounded-xl dark:bg-gray-800"
                    />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      placeholder="Email"
                      className="w-full mb-3 px-3 py-2 border rounded-xl dark:bg-gray-800"
                    />
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      placeholder="Phone"
                      className="w-full mb-4 px-3 py-2 border rounded-xl dark:bg-gray-800"
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
                      >
                        <Save className="w-4 h-4 inline mr-2" /> Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "Settings" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-600" /> Notifications
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={() =>
                      setPreferences({
                        ...preferences,
                        notifications: !preferences.notifications,
                      })
                    }
                    className="w-5 h-5 accent-purple-600"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-purple-600" /> Email Alerts
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences.emailAlerts}
                    onChange={() =>
                      setPreferences({
                        ...preferences,
                        emailAlerts: !preferences.emailAlerts,
                      })
                    }
                    className="w-5 h-5 accent-purple-600"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-600" /> Language
                  </span>
                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        language: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-xl dark:bg-gray-700"
                  >
                    <option>English</option>
                    <option>Urdu</option>
                    <option>French</option>
                    <option>Spanish</option>
                  </select>
                </label>

                <label className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-purple-600" /> Theme
                  </span>
                  <select
                    value={preferences.theme}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        theme: e.target.value,
                      })
                    }
                    className="px-3 py-2 border rounded-xl dark:bg-gray-700"
                  >
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "Security" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block mb-1 font-medium">Old Password</label>
                  <input
                    type="password"
                    value={password.old}
                    onChange={(e) =>
                      setPassword({ ...password, old: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">New Password</label>
                  <input
                    type="password"
                    value={password.new}
                    onChange={(e) =>
                      setPassword({ ...password, new: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={password.confirm}
                    onChange={(e) =>
                      setPassword({ ...password, confirm: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-xl dark:bg-gray-700"
                  />
                </div>
                <button
                  onClick={handleSavePassword}
                  className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
                >
                  <Key className="w-4 h-4 inline mr-2" /> Update Password
                </button>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "Activity" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <ul className="space-y-3">
                {activities.map((act) => (
                  <li
                    key={act.id}
                    className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl"
                  >
                    {act.icon}
                    <div>
                      <p>{act.action}</p>
                      <span className="text-sm text-gray-500">{act.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8">
          <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
