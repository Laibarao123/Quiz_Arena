import React, { useEffect, useMemo, useState } from "react";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { Trash2, Download, Eye, Share2, Repeat } from "lucide-react";

/* ----------------------------- Mock Data ---------------------------------- */
const mockAttempts = Array.from({ length: 27 }).map((_, i) => {
  const id = `attempt-${i + 1}`;
  const quizId = `quiz-${(i % 6) + 1}`;
  const categories = ["General", "Science", "Math", "History", "Geography", "Tech"];
  const mode = i % 4 === 0 ? "practice" : i % 3 === 0 ? "challenge" : "live";
  const total = 10 + (i % 3) * 5;
  const correct = Math.max(1, Math.round((Math.sin(i + 1) + 1) * (total / 2)) % total);
  const score = Math.round((correct / total) * 100);
  const date = new Date();
  date.setDate(date.getDate() - i);
  const timeTaken = 60 + (i % 10) * 12;
  const badges = [];
  if (score === 100) badges.push("Quiz Master");
  if (i % 7 === 0) badges.push("Speed Demon");
  const questions = Array.from({ length: total }).map((__, qix) => {
    const correctChoice = ((qix + i) % 4) + 1;
    const userChoice = qix % 5 === 0 ? (correctChoice % 4) + 1 : correctChoice; // some wrongs
    return {
      question_id: `${id}-q-${qix + 1}`,
      text: `Sample question ${qix + 1} of ${quizId}`,
      options: ["A", "B", "C", "D"].map((opt, idx) => `${opt}. Option ${idx + 1}`),
      correct_choice: correctChoice,
      user_choice: userChoice,
      explanation: "Short explanation about the correct answer and why.",
      time_spent_sec: 4 + (qix % 7),
      category: categories[qix % categories.length],
      difficulty: ["Easy", "Medium", "Hard"][qix % 3],
    };
  });

  return {
    attempt_id: id,
    quiz_id: quizId,
    quiz_title: `${categories[i % categories.length]} Quiz #${(i % 12) + 1}`,
    date: date.toISOString(),
    score,
    total_questions: total,
    correct,
    time_taken_sec: timeTaken,
    mode,
    rank: Math.max(1, (i % 20) + 1),
    players_total: 20 + (i % 40),
    earned_xp: Math.round(score / 10) * 10,
    badges,
    questions,
  };
});

/* ----------------------------- Utility fn -------------------------------- */
function downloadCSV(filename, rows) {
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const headers = Object.keys(rows[0] || {});
  const csv = [headers.join(",")]
    .concat(rows.map((r) => headers.map((h) => esc(r[h] ?? "")).join(",")))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ------------------------- Small Sparkline component ---------------------- */
function TinySparkline({ data = [] }) {
  // data: array of numbers
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ width: 90, height: 28 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="v" stroke="#7c3aed" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* -------------------- Main QuizHistoryPlayer Component -------------------- */
export default function QuizHistoryPlayer() {
  // app state
  const [attempts, setAttempts] = useState(mockAttempts);
  const [query, setQuery] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // all, live, practice, challenge
  const [filterCategory, setFilterCategory] = useState("All");
  const [dateRange, setDateRange] = useState("30"); // days: 7,30,90,all
  const [sortBy, setSortBy] = useState("date_desc"); // date_desc, date_asc, score_desc, score_asc
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);

  // modal / detail view
  const [openAttempt, setOpenAttempt] = useState(null);
  const [notes, setNotes] = useState({}); // attempt_id -> note text

  // compare mode
  const [compareIds, setCompareIds] = useState([]); // up to 2 ids

  // derived lists
  const categories = useMemo(() => {
    const set = new Set(attempts.map((a) => a.quiz_title.split(" ")[0]));
    return ["All", ...Array.from(set)];
  }, [attempts]);

  const filtered = useMemo(() => {
    const now = Date.now();
    const cutoff =
      dateRange === "all" ? -Infinity : now - parseInt(dateRange, 10) * 24 * 3600 * 1000;

    return attempts
      .filter((a) => {
        if (filterMode !== "all" && a.mode !== filterMode) return false;
        if (filterCategory !== "All" && !a.quiz_title.startsWith(filterCategory)) return false;
        if (query && !a.quiz_title.toLowerCase().includes(query.toLowerCase())) return false;
        if (dateRange !== "all") {
          const d = new Date(a.date).getTime();
          if (d < cutoff) return false;
        }
        return true;
      })
      .sort((p, q) => {
        if (sortBy === "date_desc") return new Date(q.date) - new Date(p.date);
        if (sortBy === "date_asc") return new Date(p.date) - new Date(q.date);
        if (sortBy === "score_desc") return q.score - p.score;
        if (sortBy === "score_asc") return p.score - q.score;
        return 0;
      });
  }, [attempts, query, filterMode, filterCategory, dateRange, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  // KPIs
  const stats = useMemo(() => {
    const hits = filtered;
    const total = hits.length;
    const avgScore = total ? Math.round(hits.reduce((s, a) => s + a.score, 0) / total) : 0;
    const best = hits.reduce((b, a) => (a.score > b ? a.score : b), 0);
    const totalXP = hits.reduce((s, a) => s + a.earned_xp, 0);
    return { total, avgScore, best, totalXP };
  }, [filtered]);

  /* -------------------- Handlers --------------------------------------- */
  function handleExportAttempt(a) {
    // create a small CSV row
    const rows = [
      {
        attempt_id: a.attempt_id,
        quiz_title: a.quiz_title,
        date: a.date,
        score: a.score,
        total_questions: a.total_questions,
        correct: a.correct,
        time_taken_sec: a.time_taken_sec,
        mode: a.mode,
      },
    ];
    downloadCSV(`${a.attempt_id}.csv`, rows);
  }

  function handleExportAll() {
    const rows = filtered.map((a) => ({
      attempt_id: a.attempt_id,
      quiz_title: a.quiz_title,
      date: a.date,
      score: a.score,
      total_questions: a.total_questions,
      correct: a.correct,
      time_taken_sec: a.time_taken_sec,
      mode: a.mode,
      earned_xp: a.earned_xp,
    }));
    downloadCSV(`quiz-history-export.csv`, rows);
  }

  function toggleCompare(id) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id]; // keep last two
      return [...prev, id];
    });
  }

  function deleteAttempt(attempt_id) {
    if (!confirm("Delete this attempt? This cannot be undone.")) return;
    setAttempts((prev) => prev.filter((a) => a.attempt_id !== attempt_id));
    setOpenAttempt((o) => (o && o.attempt_id === attempt_id ? null : o));
  }

  function practiceWrongQuestions(attempt) {
    // Demo: show alert and open modal with only wrong questions
    const wrongQs = attempt.questions.filter((q) => q.user_choice !== q.correct_choice);
    if (!wrongQs.length) {
      alert("No wrong questions to practice — great job!");
      return;
    }
    alert(`Opening practice for ${wrongQs.length} wrong questions (demo).`);
    // In a real app, navigate to PracticeMode and pass this question set
  }

  function saveNoteForAttempt(id, text) {
    setNotes((prev) => ({ ...prev, [id]: text }));
  }

  /* ----------------------------- UI ------------------------------------ */
  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-700">Quiz History</h1>
          <p className="text-sm text-gray-500">Your past attempts, reviews, and performance insights.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportAll}
            className="flex items-center gap-2 bg-white border border-purple-100 px-3 py-1 rounded-full text-sm hover:shadow"
            title="Export filtered history as CSV"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-purple-50">
          <div className="text-sm text-gray-500">Total Quizzes</div>
          <div className="text-xl font-semibold">{stats.total}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-purple-50">
          <div className="text-sm text-gray-500">Average Score</div>
          <div className="text-xl font-semibold">{stats.avgScore}%</div>
          <div className="text-xs text-gray-400">across filtered range</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-purple-50">
          <div className="text-sm text-gray-500">Best Score</div>
          <div className="text-xl font-semibold">{stats.best}%</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-purple-50">
          <div className="text-sm text-gray-500">XP Earned</div>
          <div className="text-xl font-semibold">{stats.totalXP}</div>
        </div>
      </div>

      {/* Controls: filters + search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="bg-white border border-purple-100 rounded-md px-3 py-1 text-sm"
            aria-label="Filter by mode"
          >
            <option value="all">All modes</option>
            <option value="live">Live</option>
            <option value="practice">Practice</option>
            <option value="challenge">Challenge</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-white border border-purple-100 rounded-md px-3 py-1 text-sm"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white border border-purple-100 rounded-md px-3 py-1 text-sm"
            aria-label="Date range"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="all">All time</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-purple-100 rounded-md px-3 py-1 text-sm"
            aria-label="Sort by"
          >
            <option value="date_desc">Newest</option>
            <option value="date_asc">Oldest</option>
            <option value="score_desc">Best score</option>
            <option value="score_asc">Lowest score</option>
          </select>
        </div>

        <div className="ml-auto flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by quiz title..."
            className="px-3 py-1 border border-purple-100 rounded-md bg-white text-sm w-64"
          />
        </div>
      </div>

      {/* Main grid: table/list + sidebar analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Attempts list (main) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Table header (compact) */}
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-purple-50">
            <div className="text-sm text-gray-600">Attempts ({filtered.length})</div>
            <div className="text-xs text-gray-400">Showing page {page} / {totalPages}</div>
          </div>

          {/* Attempts rows */}
          <div className="space-y-3">
            {pageItems.map((a) => (
              <div key={a.attempt_id} className="bg-white rounded-xl p-3 border border-purple-50 flex gap-3 items-center">
                <div className="w-56">
                  <div className="text-sm font-semibold text-gray-800">{a.quiz_title}</div>
                  <div className="text-xs text-gray-400">{new Date(a.date).toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">{a.mode} • Rank {a.rank}/{a.players_total}</div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold text-gray-800">{a.score}%</div>
                      <div className="text-xs text-gray-400">{a.correct}/{a.total_questions} correct</div>
                      <TinySparkline data={a.questions.map((q) => (q.user_choice === q.correct_choice ? 1 : 0))} />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setOpenAttempt(a)}
                        title="View details"
                        className="px-2 py-1 bg-white border rounded-md text-sm hover:shadow"
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        onClick={() => handleExportAttempt(a)}
                        title="Export attempt CSV"
                        className="px-2 py-1 bg-white border rounded-md text-sm hover:shadow"
                      >
                        <Download size={14} />
                      </button>

                      <button
                        onClick={() => toggleCompare(a.attempt_id)}
                        title={compareIds.includes(a.attempt_id) ? "Remove compare" : "Compare"}
                        className={`px-2 py-1 border rounded-md text-sm ${compareIds.includes(a.attempt_id) ? "bg-purple-600 text-white" : "bg-white"}`}
                      >
                        Compare
                      </button>

                      <button
                        onClick={() => deleteAttempt(a.attempt_id)}
                        title="Delete attempt"
                        className="px-2 py-1 bg-white border rounded-md text-sm hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <div className="text-yellow-600 font-semibold">+{a.earned_xp} XP</div>
                    <div className="text-gray-400">•</div>
                    <div className="text-gray-500">{a.badges.join(", ") || "—"}</div>
                    <div className="ml-auto text-gray-400">Time: {Math.round(a.time_taken_sec)}s</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2 justify-center mt-3">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-white border rounded-md">Prev</button>
            {Array.from({length: totalPages}).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded-md ${page === idx + 1 ? "bg-purple-600 text-white" : "bg-white border"}`}
              >
                {idx + 1}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 bg-white border rounded-md">Next</button>
          </div>
        </div>

        {/* Sidebar analytics and compare */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-purple-50">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Category Breakdown</div>
              <div className="text-xs text-gray-400">Top categories</div>
            </div>

            {/* small bar chart mock */}
            <div style={{ width: "100%", height: 140 }}>
              <ResponsiveContainer>
                <BarChart
                  data={Array.from({ length: 5 }).map((_, i) => ({ name: `Cat ${i + 1}`, v: Math.round(Math.random() * 80) + 10 }))}
                >
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="v" fill="#7c3aed" radius={[6, 6, 6, 6]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-purple-50">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Quick Insights</div>
              <div className="text-xs text-gray-400">Auto</div>
            </div>

            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Average score in selected range: <strong>{stats.avgScore}%</strong></li>
              <li>• Best score: <strong>{stats.best}%</strong></li>
              <li>• XP earned: <strong>{stats.totalXP}</strong></li>
              <li>• Attempts: <strong>{stats.total}</strong></li>
            </ul>
          </div>

          {/* Compare box */}
          <div className="bg-white p-4 rounded-2xl border border-purple-50">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Compare Attempts</div>
              <div className="text-xs text-gray-400">Select up to 2</div>
            </div>

            {compareIds.length === 0 && <div className="text-xs text-gray-400">Select attempts to compare from the list.</div>}
            {compareIds.length > 0 && (
              <div className="space-y-2">
                {compareIds.map((id) => {
                  const a = attempts.find((x) => x.attempt_id === id);
                  if (!a) return null;
                  return (
                    <div key={id} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-medium">{a.quiz_title}</div>
                        <div className="text-xs text-gray-400">{a.score}% • {new Date(a.date).toLocaleDateString()}</div>
                      </div>
                      <div>{a.score}%</div>
                    </div>
                  );
                })}
                {compareIds.length === 2 && (
                  <div className="mt-3 space-y-2">
                    {/* side-by-side mini comparison */}
                    <div className="grid grid-cols-2 gap-3">
                      {compareIds.map((id) => {
                        const a = attempts.find((x) => x.attempt_id === id);
                        return (
                          <div key={id} className="p-3 bg-gray-50 rounded-md">
                            <div className="text-xs text-gray-500">{a.quiz_title}</div>
                            <div className="text-lg font-semibold">{a.score}%</div>
                            <div className="text-xs text-gray-400">Correct: {a.correct}/{a.total_questions}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1 bg-white border rounded-md flex items-center gap-2" onClick={() => alert("Open detailed compare (demo)")}>
                        <Eye size={14} /> View compare
                      </button>
                      <button className="px-3 py-1 bg-white border rounded-md flex items-center gap-2" onClick={() => setCompareIds([])}>
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Attempt detail modal */}
      <div aria-hidden={!openAttempt} className={`${openAttempt ? "" : "pointer-events-none"}`}>
        {openAttempt && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpenAttempt(null)}
            />
            <div className="relative w-full max-w-4xl bg-white rounded-2xl p-6 z-60 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-gray-800">{openAttempt.quiz_title}</div>
                  <div className="text-xs text-gray-400">{new Date(openAttempt.date).toLocaleString()}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExportAttempt(openAttempt)}
                    className="px-3 py-1 bg-white border rounded-md flex items-center gap-2"
                  >
                    <Download size={14} /> Export
                  </button>
                  <button
                    onClick={() => practiceWrongQuestions(openAttempt)}
                    className="px-3 py-1 bg-white border rounded-md flex items-center gap-2"
                  >
                    <Repeat size={14} /> Practice wrong
                  </button>
                  <button
                    onClick={() => setOpenAttempt(null)}
                    className="px-3 py-1 bg-white border rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="mb-3 text-sm text-gray-600">Question Review</div>
                  <div className="space-y-3 max-h-72 overflow-auto pr-2">
                    {openAttempt.questions.map((q, idx) => (
                      <div key={q.question_id} className={`p-3 rounded-lg border ${q.user_choice === q.correct_choice ? "border-green-100 bg-green-50/40" : "border-red-100 bg-red-50/40"}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm font-medium">Q{idx + 1}. {q.text}</div>
                            <div className="text-xs text-gray-500">{q.category} • {q.difficulty}</div>
                          </div>
                          <div className="text-xs text-gray-600">{q.time_spent_sec}s</div>
                        </div>

                        <div className="mt-2 text-sm space-y-1">
                          {q.options.map((opt, oi) => {
                            const isCorrect = oi + 1 === q.correct_choice;
                            const isUser = oi + 1 === q.user_choice;
                            return (
                              <div key={oi} className={`px-2 py-1 rounded ${isCorrect ? "bg-green-100 text-green-900" : isUser ? "bg-yellow-100 text-yellow-900" : "text-gray-700 bg-white"}`}>
                                <span className="font-medium mr-2">{opt}</span>
                                {isCorrect && <span className="text-xs font-semibold"> (Correct)</span>}
                                {isUser && !isCorrect && <span className="text-xs font-semibold"> (Your answer)</span>}
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-2 text-xs text-gray-600">Explanation: {q.explanation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Summary</div>
                    <div className="mt-2 text-sm font-semibold">{openAttempt.score}%</div>
                    <div className="text-xs text-gray-500">{openAttempt.correct}/{openAttempt.total_questions} correct</div>
                    <div className="text-xs text-gray-500 mt-1">Time: {openAttempt.time_taken_sec}s</div>
                    <div className="text-xs text-gray-500">Mode: {openAttempt.mode}</div>
                    <div className="text-xs text-gray-500">XP: +{openAttempt.earned_xp}</div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Notes</div>
                    <textarea
                      value={notes[openAttempt.attempt_id] ?? ""}
                      onChange={(e) => saveNoteForAttempt(openAttempt.attempt_id, e.target.value)}
                      placeholder="Add personal notes about this attempt..."
                      className="w-full mt-2 p-2 rounded-md border border-purple-100 text-sm"
                      rows={4}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => alert("Note saved (local demo)")} className="px-3 py-1 bg-white border rounded-md text-sm">Save</button>
                      <button onClick={() => { saveNoteForAttempt(openAttempt.attempt_id, ""); }} className="px-3 py-1 bg-white border rounded-md text-sm">Clear</button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500">Actions</div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => alert("Share link copied (demo)")} className="px-2 py-1 bg-white border rounded-md flex items-center gap-2 text-sm"><Share2 size={14} /> Share</button>
                      <button onClick={() => deleteAttempt(openAttempt.attempt_id)} className="px-2 py-1 bg-white border rounded-md text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
