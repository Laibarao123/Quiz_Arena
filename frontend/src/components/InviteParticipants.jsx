import React, { useState } from "react";

const InviteParticipants = () => {
  const [email, setEmail] = useState("");
  const [participants, setParticipants] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("inviteParticipants")) || [];
    } catch {
      return [];
    }
  });
  const [copied, setCopied] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddParticipant = () => {
    const value = email.trim();
    if (!value) return;
    if (!value.includes("@") || !value.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsAdding(true);
    setTimeout(() => {
      const updated = [...participants, value];
      setParticipants(updated);
      localStorage.setItem("inviteParticipants", JSON.stringify(updated));
      setEmail("");
      setIsAdding(false);
    }, 300);
  };

  const handleRemoveParticipant = (index) => {
    const updated = participants.filter((_, i) => i !== index);
    setParticipants(updated);
    localStorage.setItem("inviteParticipants", JSON.stringify(updated));
  };

  const handleCopyLink = async () => {
    const link = "https://quizarena.com/join/123ABC";
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Unable to copy link.");
    }
  };

  const handleBulkPaste = (text) => {
    const items = text
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const validated = items.filter((i) => i.includes("@"));
    const updated = [...participants, ...validated];
    setParticipants(updated);
    localStorage.setItem("inviteParticipants", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-10 bg-gradient-to-br from-purple-50 via-lavender-100 to-indigo-50">
      <div className="bg-white/80 backdrop-blur-md border border-purple-100 rounded-3xl shadow-lg p-8 w-full max-w-4xl transition-all duration-500 hover:shadow-purple-300/40">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-xl shadow-inner">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-purple-900">
                Invite Participants
              </h2>
            </div>
            <p className="text-gray-500">
              Send invites, share unique links, or add multiple participants effortlessly.
            </p>
          </div>
          <button
            onClick={handleCopyLink}
            className={`px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 ${
              copied
                ? "bg-gradient-to-r from-emerald-400 to-green-500 shadow-green-400/30"
                : "bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 shadow-purple-300/30 hover:shadow-purple-400/50"
            }`}
          >
            <div className="flex items-center gap-2">
              {copied ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy Invite Link</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Invite link */}
        <div className="mb-6 bg-purple-50 border border-purple-100 rounded-2xl p-4 flex justify-between items-center hover:bg-purple-100/60 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg
                className="w-4 h-4 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <span className="text-gray-800 font-medium text-sm truncate">
              https://quizarena.com/join/123ABC
            </span>
          </div>
          <span className="text-xs text-gray-400">Unique join link</span>
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="email"
            placeholder="Enter participant email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddParticipant()}
            className="flex-1 p-4 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 bg-white placeholder-gray-400 text-gray-800 outline-none transition-all"
          />
          <button
            onClick={handleAddParticipant}
            disabled={isAdding}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-md hover:shadow-purple-300/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
          >
            {isAdding ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add</span>
              </>
            )}
          </button>
        </div>

        {/* Bulk paste */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
              />
            </svg>
            Bulk Import Emails
          </label>
          <textarea
            placeholder="email1@example.com, email2@example.com
email3@example.com"
            className="w-full p-4 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-400 bg-white placeholder-gray-400 resize-none transition-all"
            rows={3}
            onBlur={(e) => {
              const text = e.target.value.trim();
              if (text) {
                handleBulkPaste(text);
                e.target.value = "";
              }
            }}
          />
          <p className="text-xs text-gray-500 mt-2">
            Paste comma or newline separated emails, then click outside to add.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-purple-100 shadow-sm bg-white">
          {participants.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-50 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 italic">No participants yet.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-purple-100 text-purple-700 text-left">
                  <th className="py-4 px-6 font-semibold rounded-tl-2xl">#</th>
                  <th className="py-4 px-6 font-semibold">Email</th>
                  <th className="py-4 px-6 text-right font-semibold rounded-tr-2xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-purple-50 hover:bg-purple-50 transition duration-150"
                  >
                    <td className="py-4 px-6 w-12 text-gray-700">{i + 1}</td>
                    <td className="py-4 px-6 text-gray-800">{p}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleRemoveParticipant(i)}
                        className="text-gray-500 hover:text-red-500 hover:scale-110 transition-all duration-300 flex items-center gap-1 mx-auto"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6"
                          />
                        </svg>
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
          <p>All participants will receive invitation emails.</p>
          <p>
            <span className="font-bold text-purple-600">
              {participants.length}
            </span>{" "}
            participant{participants.length !== 1 ? "s" : ""} invited
          </p>
        </div>
      </div>
    </div>
  );
};

export default InviteParticipants;
