import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  Shield,
  Edit3,
  Trash2,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  Mail,
  X,
} from "lucide-react";

// Local Storage Key
const LOCAL_KEY = "quiz_arena_user_management_data";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Load users from Local Storage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      const demoUsers = [
        { id: 1, name: "Laiba Rao", role: "Admin", email: "laiba@arena.com", active: true },
        { id: 2, name: "Ali Khan", role: "Host", email: "ali@arena.com", active: true },
        { id: 3, name: "Sara Ahmed", role: "Player", email: "sara@arena.com", active: true },
        { id: 4, name: "Hamza Tariq", role: "Player", email: "hamza@arena.com", active: false },
        { id: 5, name: "Zain Fatima", role: "Host", email: "zain@arena.com", active: true },
      ];
      setUsers(demoUsers);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(demoUsers));
    }
  }, []);

  // Save users to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
  }, [users]);

  // Filter Logic
  const filteredUsers = users.filter(
    (u) =>
      (filterRole === "All" || u.role === filterRole) &&
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
    }
  };

  const toggleActive = (id) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, active: !u.active } : u
    );
    setUsers(updated);
  };

  const handleAddUser = (userData) => {
    if (editUser) {
      // Update existing user
      const updated = users.map((u) =>
        u.id === editUser.id ? { ...userData, id: u.id } : u
      );
      setUsers(updated);
      setEditUser(null);
    } else {
      // Add new user
      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        ...userData,
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f9f5ff 0%, #efe5fa 50%, #e8dafa 100%)",
        padding: "2rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            color: "#6a1b9a",
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
          }}
        >
          👥 User Management
        </h1>

        <button
          onClick={() => {
            setEditUser(null);
            setIsModalOpen(true);
          }}
          style={{
            backgroundColor: "#8b5cf6",
            color: "white",
            fontWeight: "600",
            borderRadius: "12px",
            padding: "0.7rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 6px 15px rgba(139, 92, 246, 0.3)",
          }}
        >
          <Plus size={18} /> Add User
        </button>
      </header>

      {/* Search and Filter */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div className="flex items-center bg-white shadow px-3 py-2 rounded-xl w-full md:w-1/3">
          <Search size={18} className="text-purple-600 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-gray-600"
          />
        </div>

        <div className="flex items-center bg-white shadow px-3 py-2 rounded-xl">
          <Filter size={18} className="text-purple-600 mr-2" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="outline-none text-gray-700 bg-transparent"
          >
            <option>All</option>
            <option>Admin</option>
            <option>Host</option>
            <option>Player</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <StatsCard label="Total Users" value={users.length} color="#7b1fa2" />
        <StatsCard
          label="Active Users"
          value={users.filter((u) => u.active).length}
          color="#8e24aa"
        />
        <StatsCard
          label="Admins"
          value={users.filter((u) => u.role === "Admin").length}
          color="#ab47bc"
        />
        <StatsCard
          label="Hosts"
          value={users.filter((u) => u.role === "Host").length}
          color="#ba68c8"
        />
        <StatsCard
          label="Players"
          value={users.filter((u) => u.role === "Player").length}
          color="#ce93d8"
        />
      </div>

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        toggleActive={toggleActive}
        handleDelete={handleDelete}
        openEditModal={openEditModal}
      />

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <UserFormModal
          onClose={() => {
            setIsModalOpen(false);
            setEditUser(null);
          }}
          onSubmit={handleAddUser}
          user={editUser}
        />
      )}
    </div>
  );
};

// 🔹 Stats Card Component
const StatsCard = ({ label, value, color }) => (
  <div
    style={{
      background: "white",
      borderRadius: "16px",
      padding: "1.2rem",
      textAlign: "center",
      boxShadow: "0 6px 15px rgba(120, 80, 180, 0.1)",
      borderTop: `4px solid ${color}`,
      transition: "transform 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    <h3 style={{ color, fontWeight: "600", fontSize: "1.1rem" }}>{label}</h3>
    <p style={{ fontSize: "1.6rem", color: "#4a148c", fontWeight: "700" }}>
      {value}
    </p>
  </div>
);

// 🔹 Role Badge
const RoleBadge = ({ role }) => {
  const colors = {
    Admin: "#6a1b9a",
    Host: "#8e24aa",
    Player: "#ba68c8",
  };
  return (
    <span
      style={{
        backgroundColor: colors[role],
        color: "white",
        padding: "0.3rem 0.6rem",
        borderRadius: "8px",
        fontSize: "0.85rem",
        fontWeight: "600",
      }}
    >
      {role}
    </span>
  );
};

// 🔹 Status Tag
const StatusTag = ({ active }) => (
  <span
    style={{
      color: active ? "#4caf50" : "#f44336",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    }}
  >
    {active ? <CheckCircle size={16} /> : <XCircle size={16} />}
    {active ? "Active" : "Inactive"}
  </span>
);

// 🔹 User Table
const UserTable = ({ users, toggleActive, handleDelete, openEditModal }) => (
  <div
    style={{
      background: "white",
      borderRadius: "20px",
      padding: "1rem 1.5rem",
      boxShadow: "0 6px 20px rgba(150, 100, 200, 0.1)",
      overflowX: "auto",
    }}
  >
    <table className="w-full">
      <thead>
        <tr className="text-left text-purple-700 border-b">
          <th className="py-3">#</th>
          <th className="py-3">Name</th>
          <th className="py-3">Email</th>
          <th className="py-3">Role</th>
          <th className="py-3">Status</th>
          <th className="py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr key={user.id} className="border-b hover:bg-purple-50 transition">
            <td className="py-3">{idx + 1}</td>
            <td className="py-3 flex items-center gap-2">
              <User size={18} className="text-purple-500" /> {user.name}
            </td>
            <td className="py-3 text-gray-600">{user.email}</td>
            <td className="py-3">
              <RoleBadge role={user.role} />
            </td>
            <td className="py-3">
              <StatusTag active={user.active} />
            </td>
            <td className="py-3 text-right flex justify-end gap-3">
              <button
                onClick={() => openEditModal(user)}
                className="text-purple-600 hover:text-purple-800"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => toggleActive(user.id)}
                className="text-green-600 hover:text-green-800"
              >
                {user.active ? (
                  <XCircle size={18} />
                ) : (
                  <CheckCircle size={18} />
                )}
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {users.length === 0 && (
      <p className="text-center text-gray-500 py-6">
        No users found matching your criteria.
      </p>
    )}
  </div>
);

// 🔹 Modal for Add/Edit User
const UserFormModal = ({ onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState(
    user || { name: "", email: "", role: "Player", active: true }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill all fields!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          width: "95%",
          maxWidth: "400px",
          padding: "2rem",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ color: "#6a1b9a", fontWeight: "700", fontSize: "1.3rem" }}>
            {user ? "Edit User" : "Add New User"}
          </h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user name"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-purple-300 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-purple-300 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-purple-300 outline-none"
            >
              <option>Admin</option>
              <option>Host</option>
              <option>Player</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              {user ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagement;
