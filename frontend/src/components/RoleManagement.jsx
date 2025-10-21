// 📁 src/components/RoleManagement.jsx
import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus } from "lucide-react";

const LOCAL_KEY = "role_management_data";

// Predefined permission options
const PERMISSIONS = [
  "All Access",
  "Manage Quizzes",
  "Take Quizzes",
  "View Reports",
  "Manage Users",
];

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRole, setNewRole] = useState("");
  const [newRolePermissions, setNewRolePermissions] = useState([]);
  const [editRoleIndex, setEditRoleIndex] = useState(null);
  const [editRoleName, setEditRoleName] = useState("");

  // Load roles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setRoles(JSON.parse(saved));
    } else {
      const initialRoles = [
        { name: "Admin", permissions: ["All Access"] },
        { name: "Host", permissions: ["Manage Quizzes"] },
        { name: "Player", permissions: ["Take Quizzes"] },
      ];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(initialRoles));
      setRoles(initialRoles);
    }
    setLoading(false);
  }, []);

  // Save roles to localStorage
  const saveRoles = (updatedRoles) => {
    setRoles(updatedRoles);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedRoles));
  };

  // Add new role
  const handleAddRole = () => {
    const trimmedName = newRole.trim();
    if (!trimmedName) return alert("Role name cannot be empty.");
    if (roles.find((r) => r.name.toLowerCase() === trimmedName.toLowerCase()))
      return alert("Role already exists.");

    saveRoles([...roles, { name: trimmedName, permissions: newRolePermissions }]);
    setNewRole("");
    setNewRolePermissions([]);
  };

  // Delete role
  const handleDeleteRole = (index) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      const updated = roles.filter((_, i) => i !== index);
      saveRoles(updated);
    }
  };

  // Edit role
  const handleEditRole = (index) => {
    setEditRoleIndex(index);
    setEditRoleName(roles[index].name);
  };

  const handleSaveEdit = () => {
    const trimmedName = editRoleName.trim();
    if (!trimmedName) return alert("Role name cannot be empty.");
    const updated = [...roles];
    updated[editRoleIndex].name = trimmedName;
    saveRoles(updated);
    setEditRoleIndex(null);
    setEditRoleName("");
  };

  // Handle permission selection for new role
  const togglePermission = (perm) => {
    setNewRolePermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-purple-500 text-lg font-semibold">
        Loading Roles...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl">
      {/* Header + Add Role */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-purple-700">Role Management</h2>
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          <input
            type="text"
            placeholder="New Role Name"
            className="border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          {/* Permissions Selector */}
          <div className="flex flex-wrap gap-2">
            {PERMISSIONS.map((perm) => (
              <button
                key={perm}
                onClick={() => togglePermission(perm)}
                className={`px-3 py-1 rounded-xl border ${
                  newRolePermissions.includes(perm)
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-purple-700 border-purple-300"
                } hover:bg-purple-500 hover:text-white transition`}
              >
                {perm}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddRole}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-purple-700 transition"
          >
            <Plus size={16} /> Add Role
          </button>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-2xl shadow-md border border-purple-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-200">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">
                Permissions
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-purple-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {roles.map((role, index) => (
              <tr key={index} className="hover:bg-purple-50 transition">
                <td className="px-6 py-4">
                  {editRoleIndex === index ? (
                    <input
                      type="text"
                      value={editRoleName}
                      onChange={(e) => setEditRoleName(e.target.value)}
                      className="border border-purple-300 rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                    />
                  ) : (
                    role.name
                  )}
                </td>
                <td className="px-6 py-4">{role.permissions.join(", ") || "None"}</td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  {editRoleIndex === index ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditRole(index)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded-xl hover:bg-yellow-500 transition flex items-center gap-1"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRole(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;
