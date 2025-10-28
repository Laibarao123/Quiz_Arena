// import React, { useState, useEffect } from "react";
// import {
//   PlusCircle,
//   Edit,
//   Trash2,
//   Eye,
//   Save,
//   Zap,
//   BookOpen,
//   Target,
//   Clock,
// } from "lucide-react";

// const QuizTemplateManager = () => {
//   const [templates, setTemplates] = useState([]);
//   const [formVisible, setFormVisible] = useState(false);
//   const [editingTemplate, setEditingTemplate] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     difficulty: "Easy",
//     questionCount: "",
//     timeLimit: "",
//     description: "",
//   });

//   // Load templates from localStorage on mount
//   useEffect(() => {
//     const storedTemplates =
//       JSON.parse(localStorage.getItem("quizTemplates")) || [];
//     setTemplates(storedTemplates);
//   }, []);

//   // Save updated templates to localStorage
//   const saveTemplates = (updated) => {
//     setTemplates(updated);
//     localStorage.setItem("quizTemplates", JSON.stringify(updated));
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save or update a template
//   const handleSave = () => {
//     if (!formData.title || !formData.category || !formData.questionCount) {
//       alert("Please fill out all required fields before saving.");
//       return;
//     }

//     let updatedTemplates;
//     if (editingTemplate) {
//       updatedTemplates = templates.map((t) =>
//         t.id === editingTemplate.id
//           ? { ...formData, id: t.id, createdAt: t.createdAt }
//           : t
//       );
//     } else {
//       updatedTemplates = [
//         ...templates,
//         {
//           ...formData,
//           id: Date.now(),
//           createdAt: new Date().toISOString(),
//           usageCount: 0,
//         },
//       ];
//     }

//     saveTemplates(updatedTemplates);
//     setFormVisible(false);
//     setEditingTemplate(null);
//     setFormData({
//       title: "",
//       category: "",
//       difficulty: "Easy",
//       questionCount: "",
//       timeLimit: "",
//       description: "",
//     });
//   };

//   // Edit template
//   const handleEdit = (template) => {
//     setEditingTemplate(template);
//     setFormData(template);
//     setFormVisible(true);
//   };

//   // Delete template
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this template?")) {
//       const updated = templates.filter((t) => t.id !== id);
//       saveTemplates(updated);
//     }
//   };

//   const getDifficultyBadge = (difficulty) => {
//     switch (difficulty) {
//       case "Easy":
//         return "bg-green-500/20 text-green-300 border-green-400/30";
//       case "Medium":
//         return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
//       case "Hard":
//         return "bg-red-500/20 text-red-300 border-red-400/30";
//       default:
//         return "bg-purple-500/20 text-purple-300 border-purple-400/30";
//     }
//   };

//   return (
//     <div className="relative p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden backdrop-blur-sm">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"></div>
//       <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
//       <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>

//       {/* Floating Icons */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(8)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute text-white/10"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               fontSize: `${24 + Math.random() * 24}px`,
//             }}
//           >
//             <BookOpen />
//           </div>
//         ))}
//       </div>

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
//           <div className="mb-6 lg:mb-0">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
//                 <Zap className="w-8 h-8 text-yellow-400" />
//               </div>
//               <h2 className="text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//                 Quiz Template Manager
//               </h2>
//             </div>
//             <p className="text-purple-200/80 text-lg">
//               Create and manage your quiz templates with ease
//             </p>
//           </div>

//           <button
//             onClick={() => {
//               setFormVisible(!formVisible);
//               setEditingTemplate(null);
//               setFormData({
//                 title: "",
//                 category: "",
//                 difficulty: "Easy",
//                 questionCount: "",
//                 timeLimit: "",
//                 description: "",
//               });
//             }}
//             className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
//           >
//             <div className="flex items-center gap-3">
//               <PlusCircle
//                 size={22}
//                 className="group-hover:scale-110 transition-transform"
//               />
//               <span>{formVisible ? "Close Form" : "New Template"}</span>
//             </div>
//           </button>
//         </div>

//         {/* Template Form */}
//         {formVisible && (
//           <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-10 hover:bg-white/15 transition-all duration-500">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-white/10 rounded-xl">
//                 <Save className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white">
//                 {editingTemplate ? "Edit Template" : "Create New Template"}
//               </h3>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6 mb-6">
//               {/* Title */}
//               <div className="space-y-2">
//                 <label className="text-white/80 font-medium text-sm">
//                   Quiz Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter quiz title..."
//                   className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:bg-white/10 focus:border-purple-400 transition-all duration-300 outline-none"
//                 />
//               </div>

//               {/* Category */}
//               <div className="space-y-2">
//                 <label className="text-white/80 font-medium text-sm">
//                   Category *
//                 </label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   placeholder="e.g., Science, History, Math"
//                   className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:bg-white/10 focus:border-purple-400 transition-all duration-300 outline-none"
//                 />
//               </div>

//               {/* Difficulty */}
//               <div className="space-y-2">
//                 <label className="text-white/80 font-medium text-sm">
//                   Difficulty
//                 </label>
//                 <select
//                   name="difficulty"
//                   value={formData.difficulty}
//                   onChange={handleChange}
//                   className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:bg-white/10 focus:border-purple-400 transition-all duration-300 outline-none"
//                 >
//                   <option value="Easy" className="bg-gray-800">
//                     Easy
//                   </option>
//                   <option value="Medium" className="bg-gray-800">
//                     Medium
//                   </option>
//                   <option value="Hard" className="bg-gray-800">
//                     Hard
//                   </option>
//                 </select>
//               </div>

//               {/* Questions */}
//               <div className="space-y-2">
//                 <label className="text-white/80 font-medium text-sm">
//                   Questions *
//                 </label>
//                 <input
//                   type="number"
//                   name="questionCount"
//                   value={formData.questionCount}
//                   onChange={handleChange}
//                   placeholder="Number of questions"
//                   className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:bg-white/10 focus:border-purple-400 transition-all duration-300 outline-none"
//                 />
//               </div>

//               {/* Time Limit */}
//               <div className="space-y-2">
//                 <label className="text-white/80 font-medium text-sm">
//                   Time Limit (minutes)
//                 </label>
//                 <input
//                   type="number"
//                   name="timeLimit"
//                   value={formData.timeLimit}
//                   onChange={handleChange}
//                   placeholder="Optional time limit"
//                   className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:bg-white/10 focus:border-purple-400 transition-all duration-300 outline-none"
//                 />
//               </div>

//               {/* Description */}
//               <div className="space-y-2 md:col-span-2">
//                 <label className="text-white/80 font-medium text-sm">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Brief description of the quiz..."
//                   rows={3}
//                   className="w-full p-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-purple-200/60 focus:bg-white/10 focus:border-purple-400 transition-all duration-300 outline-none resize-none"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <button
//                 onClick={handleSave}
//                 className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
//               >
//                 <Save size={20} />
//                 {editingTemplate ? "Update Template" : "Save Template"}
//               </button>

//               <button
//                 onClick={() => setFormVisible(false)}
//                 className="flex items-center gap-3 bg-white/10 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Templates Grid */}
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {templates.length > 0 ? (
//             templates.map((template) => (
//               <div
//                 key={template.id}
//                 className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
//               >
//                 {/* Difficulty Badge */}
//                 <div
//                   className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyBadge(
//                     template.difficulty
//                   )} backdrop-blur-sm`}
//                 >
//                   {template.difficulty}
//                 </div>

//                 <div className="mb-4">
//                   <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
//                     {template.title}
//                   </h3>
//                   <p className="text-purple-200/80 text-sm mb-3 line-clamp-2">
//                     {template.description || "No description provided"}
//                   </p>
//                 </div>

//                 <div className="space-y-3 mb-6">
//                   <div className="flex items-center gap-3 text-white/70 text-sm">
//                     <BookOpen size={16} />
//                     <span>{template.category}</span>
//                   </div>
//                   <div className="flex items-center gap-3 text-white/70 text-sm">
//                     <Target size={16} />
//                     <span>{template.questionCount} Questions</span>
//                   </div>
//                   {template.timeLimit && (
//                     <div className="flex items-center gap-3 text-white/70 text-sm">
//                       <Clock size={16} />
//                       <span>{template.timeLimit} min</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-between items-center pt-4 border-t border-white/10">
//                   <button
//                     onClick={() =>
//                       alert(`Previewing "${template.title}"`)
//                     }
//                     className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 group"
//                   >
//                     <Eye size={16} />
//                     <span className="text-sm">Preview</span>
//                   </button>

//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => handleEdit(template)}
//                       className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110 group"
//                     >
//                       <Edit size={16} />
//                       <span className="text-sm">Edit</span>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(template.id)}
//                       className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110 group"
//                     >
//                       <Trash2 size={16} />
//                       <span className="text-sm">Delete</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-16">
//               <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-white/10 flex items-center justify-center border border-white/20">
//                 <BookOpen className="w-12 h-12 text-white/40" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">
//                 No Templates Yet
//               </h3>
//               <p className="text-purple-200/60 text-lg max-w-md mx-auto">
//                 Create your first quiz template to get started with amazing
//                 quizzes!
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Stats Footer */}
//         {templates.length > 0 && (
//           <div className="mt-8 pt-6 border-t border-white/10">
//             <div className="flex flex-wrap gap-6 justify-center text-white/60 text-sm">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                 <span>
//                   {templates.length} Template
//                   {templates.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                 <span>Auto-saved to browser</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizTemplateManager;






import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Save,
  Zap,
  BookOpen,
  Target,
  Clock,
} from "lucide-react";

const QuizTemplateManager = () => {
  const [templates, setTemplates] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "Easy",
    questionCount: "",
    timeLimit: "",
    description: "",
  });

  // Load from localStorage
  useEffect(() => {
    const storedTemplates =
      JSON.parse(localStorage.getItem("quizTemplates")) || [];
    setTemplates(storedTemplates);
  }, []);

  const saveTemplates = (updated) => {
    setTemplates(updated);
    localStorage.setItem("quizTemplates", JSON.stringify(updated));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.category || !formData.questionCount) {
      alert("Please fill all required fields!");
      return;
    }

    let updatedTemplates;
    if (editingTemplate) {
      updatedTemplates = templates.map((t) =>
        t.id === editingTemplate.id
          ? { ...formData, id: t.id, createdAt: t.createdAt }
          : t
      );
    } else {
      updatedTemplates = [
        ...templates,
        {
          ...formData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ];
    }

    saveTemplates(updatedTemplates);
    setFormVisible(false);
    setEditingTemplate(null);
    setFormData({
      title: "",
      category: "",
      difficulty: "Easy",
      questionCount: "",
      timeLimit: "",
      description: "",
    });
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setFormData(template);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this template?")) {
      const updated = templates.filter((t) => t.id !== id);
      saveTemplates(updated);
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-purple-100 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-100 rounded-2xl border border-purple-200">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-4xl font-extrabold text-purple-700">
              Quiz Template Manager
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Create and manage quiz templates easily
          </p>
        </div>

        <button
          onClick={() => {
            setFormVisible(!formVisible);
            setEditingTemplate(null);
            setFormData({
              title: "",
              category: "",
              difficulty: "Easy",
              questionCount: "",
              timeLimit: "",
              description: "",
            });
          }}
          className="group bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            <span>{formVisible ? "Close Form" : "New Template"}</span>
          </div>
        </button>
      </div>

      {/* Form */}
      {formVisible && (
        <div className="bg-white rounded-2xl border border-purple-100 shadow-md p-8 mb-10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <Save className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-semibold text-purple-700">
              {editingTemplate ? "Edit Template" : "Create New Template"}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Quiz Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter quiz title..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Science, History, Math"
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Questions *
              </label>
              <input
                type="number"
                name="questionCount"
                value={formData.questionCount}
                onChange={handleChange}
                placeholder="Number of questions"
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleChange}
                placeholder="Optional time limit"
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description..."
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Save size={18} />
              {editingTemplate ? "Update Template" : "Save Template"}
            </button>
            <button
              onClick={() => setFormVisible(false)}
              className="px-6 py-3 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.length > 0 ? (
          templates.map((template) => (
            <div
              key={template.id}
              className="bg-white border border-purple-100 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                  template.difficulty
                )}`}
              >
                {template.difficulty}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-1">
                {template.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {template.description || "No description provided"}
              </p>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-purple-600" />
                  <span>{template.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-purple-600" />
                  <span>{template.questionCount} Questions</span>
                </div>
                {template.timeLimit && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-purple-600" />
                    <span>{template.timeLimit} min</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-3 border-t border-gray-100">
                <button
                  onClick={() => alert(`Previewing "${template.title}"`)}
                  className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-all"
                >
                  <Eye size={16} /> Preview
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(template)}
                    className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-purple-50 flex items-center justify-center border border-purple-100">
              <BookOpen className="w-12 h-12 text-purple-300" />
            </div>
            <h3 className="text-2xl font-semibold text-purple-700 mb-2">
              No Templates Yet
            </h3>
            <p className="text-gray-500">
              Create your first quiz template to get started!
            </p>
          </div>
        )}
      </div>

      {templates.length > 0 && (
        <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-200 pt-4">
          <p>
            {templates.length} Template
            {templates.length !== 1 ? "s" : ""} — Auto-saved to your browser
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizTemplateManager;
