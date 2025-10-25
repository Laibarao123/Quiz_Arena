import React, { useEffect, useMemo, useState } from "react";
import { Camera, X, Check, Trash2, Plus } from "lucide-react";

/**
 * ProfileCustomization.jsx
 * Frontend-only profile customization UI (no API calls).
 * - Avatar & banner upload (preview + remove)
 * - Display name, username (mock availability check)
 * - Bio with char counter
 * - Theme picker (light / dark / pastel) + accent color (hex)
 * - Privacy toggle (public/private), badge visibility
 * - Social links manager
 * - Badge gallery preview
 * - Live preview pane
 * - Save / Reset using localStorage
 */

/* ---------------------------- mock badges ---------------------------- */
const MOCK_BADGES = [
  { id: "b1", title: "Speed Demon", color: "from-yellow-300 to-yellow-500" },
  { id: "b2", title: "Quiz Master", color: "from-purple-500 to-pink-500" },
  { id: "b3", title: "Science Genius", color: "from-cyan-400 to-blue-500" },
];

/* -------------------------- helpers ---------------------------------- */
const LOCAL_KEY = "profile_customization_v1";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(obj) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(obj));
  } catch (e) {
    console.warn("Failed to save profile to localStorage", e);
  }
}

function isValidUrl(s) {
  try {
    if (!s) return false;
    const url = new URL(s);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

/* -------------------------- AvatarUploader --------------------------- */
function AvatarUploader({ avatar, onChange }) {
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      alert("Image too big. Max 2MB.");
      return;
    }
    const url = URL.createObjectURL(f);
    onChange(url, f);
  };

  return (
    <div>
      <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden border border-gray-200 relative">
        {avatar ? (
          <img src={avatar} alt="avatar preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No avatar</div>
        )}
        <label className="absolute -bottom-2 -right-2 bg-white border border-gray-200 rounded-full p-1 cursor-pointer shadow-sm">
          <Camera size={16} />
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      </div>

      <div className="flex gap-2 mt-2 items-center">
        <button
          onClick={() => {
            const choice = prompt("Paste image URL to use as avatar (or Cancel):");
            if (choice) onChange(choice, null);
          }}
          className="px-3 py-1 text-sm bg-white border rounded-md"
        >
          Paste URL
        </button>
        <button
          onClick={() => onChange(null, null)}
          className="px-3 py-1 text-sm bg-white border rounded-md text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

/* -------------------------- BannerUploader --------------------------- */
function BannerUploader({ banner, onChange }) {
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    if (f.size > 4 * 1024 * 1024) {
      alert("Banner too big. Max 4MB.");
      return;
    }
    const url = URL.createObjectURL(f);
    onChange(url, f);
  };

  return (
    <div>
      <div className="w-full h-28 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 relative">
        {banner ? (
          <img src={banner} alt="banner preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No banner</div>
        )}
        <label className="absolute right-3 bottom-3 bg-white border border-gray-200 rounded-md px-3 py-1 cursor-pointer shadow-sm">
          <Camera size={14} /> <span className="ml-2 text-xs">Change</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      </div>

      <div className="flex gap-2 mt-2 items-center">
        <button
          onClick={() => {
            const choice = prompt("Paste banner image URL (or Cancel):");
            if (choice) onChange(choice, null);
          }}
          className="px-3 py-1 text-sm bg-white border rounded-md"
        >
          Paste URL
        </button>
        <button onClick={() => onChange(null, null)} className="px-3 py-1 text-sm bg-white border rounded-md text-red-600">
          Remove
        </button>
      </div>
    </div>
  );
}

/* ---------------------------- LinksManager --------------------------- */
function LinksManager({ links, onChange }) {
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  function addLink() {
    if (!newUrl || !isValidUrl(newUrl)) {
      alert("Please enter a valid URL (include http(s)://).");
      return;
    }
    onChange([...links, { id: Date.now().toString(), label: newLabel || new URL(newUrl).hostname, url: newUrl }]);
    setNewLabel("");
    setNewUrl("");
  }

  return (
    <div>
      <div className="space-y-2">
        {links.length === 0 && <div className="text-xs text-gray-400">No links added.</div>}
        {links.map((l) => (
          <div key={l.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
            <div>
              <div className="text-sm font-medium">{l.label}</div>
              <div className="text-xs text-gray-500">{l.url}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(l.url);
                  alert("Link copied to clipboard (demo).");
                }}
                className="px-2 py-1 bg-white border rounded-md text-xs"
              >
                Copy
              </button>
              <button
                onClick={() => onChange(links.filter((x) => x.id !== l.id))}
                className="px-2 py-1 bg-white border rounded-md text-xs text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="px-3 py-1 border rounded-md flex-1 text-sm"
          placeholder="Label (e.g., Portfolio)"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <input
          className="px-3 py-1 border rounded-md flex-2 text-sm"
          placeholder="https://your-site.com"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <button onClick={addLink} className="px-3 py-1 bg-purple-600 text-white rounded-md">
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------- Main Component ----------------------------- */
export default function ProfileCustomization() {
  const stored = loadFromStorage();

  const [avatar, setAvatar] = useState(stored?.avatar ?? null);
  const [banner, setBanner] = useState(stored?.banner ?? null);
  const [displayName, setDisplayName] = useState(stored?.displayName ?? "Your Name");
  const [username, setUsername] = useState(stored?.username ?? "yourhandle");
  const [bio, setBio] = useState(stored?.bio ?? "");
  const [pronouns, setPronouns] = useState(stored?.pronouns ?? "");
  const [links, setLinks] = useState(stored?.links ?? []);
  const [themeMode, setThemeMode] = useState(stored?.themeMode ?? "pastel"); // pastel / light / dark
  const [accent, setAccent] = useState(stored?.accent ?? "#7c3aed");
  const [isPublic, setIsPublic] = useState(stored?.isPublic ?? true);
  const [showBadgesPublic, setShowBadgesPublic] = useState(stored?.showBadgesPublic ?? true);
  const [selectedBadges, setSelectedBadges] = useState(stored?.selectedBadges ?? MOCK_BADGES.map((b) => b.id));
  const [usernameAvailable, setUsernameAvailable] = useState(null); // null/true/false
  const [saving, setSaving] = useState(false);

  // simple username availability mock: "taken" if contains "taken" or ends with "x"
  useEffect(() => {
    if (!username) {
      setUsernameAvailable(null);
      return;
    }
    const t = setTimeout(() => {
      const lower = username.toLowerCase();
      const unavailable = lower.includes("taken") || lower.endsWith("x") || lower.length < 3;
      setUsernameAvailable(!unavailable);
    }, 350);
    return () => clearTimeout(t);
  }, [username]);

  // live preview combined style
  const previewStyle = useMemo(() => {
    const base =
      themeMode === "dark"
        ? { background: "#0f172a", color: "#e6eef8" }
        : themeMode === "light"
        ? { background: "#ffffff", color: "#0f172a" }
        : { background: "#faf5ff", color: "#2a254b" }; // pastel
    return { ...base, accent };
  }, [themeMode, accent]);

  // Save / Reset
  function handleSave() {
    setSaving(true);
    const obj = {
      avatar,
      banner,
      displayName,
      username,
      bio,
      pronouns,
      links,
      themeMode,
      accent,
      isPublic,
      showBadgesPublic,
      selectedBadges,
    };
    saveToStorage(obj);
    setTimeout(() => {
      setSaving(false);
      alert("Profile saved locally (demo).");
    }, 600);
  }

  function handleReset() {
    if (!confirm("Reset all profile customizations to defaults?")) return;
    localStorage.removeItem(LOCAL_KEY);
    window.location.reload();
  }

  // Toggle badge selection
  function toggleBadge(id) {
    setSelectedBadges((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  // Add sample link quickly
  function addDemoLink() {
    setLinks((p) => [...p, { id: Date.now().toString(), label: "Portfolio", url: "https://example.com" }]);
  }

  // For accessibility: compute initials if no avatar
  const initials = useMemo(() => {
    if (displayName && displayName.trim()) {
      const parts = displayName.trim().split(" ");
      return (parts[0][0] || "") + (parts[1]?.[0] || "");
    }
    return "U";
  }, [displayName]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-purple-700">Profile Customization</h1>
            <p className="text-sm text-gray-500">Edit your avatar, bio, theme, privacy and public links.</p>
          </div>

          <div className="flex gap-3">
            <button onClick={handleReset} className="px-3 py-1 bg-white border rounded-md text-sm text-red-600">
              Reset
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:opacity-95"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Banner */}
            <div className="bg-white p-4 rounded-2xl border border-purple-50">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <BannerUploader banner={banner} onChange={(v) => setBanner(v)} />
                </div>

                <div className="w-1/3">
                  <div className="text-sm text-gray-500 mb-2">Avatar</div>
                  <AvatarUploader avatar={avatar} onChange={(v) => setAvatar(v)} />
                  <div className="text-xs text-gray-400 mt-2">Tip: Use a clear headshot or avatar image.</div>
                </div>
              </div>
            </div>

            {/* Basic details */}
            <div className="bg-white p-4 rounded-2xl border border-purple-50 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label className="col-span-2">
                  <div className="text-xs text-gray-500">Display name</div>
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="Your display name"
                  />
                </label>

                <label>
                  <div className="text-xs text-gray-500">Pronouns</div>
                  <input
                    value={pronouns}
                    onChange={(e) => setPronouns(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
                    placeholder="e.g. she/her"
                  />
                </label>
              </div>

              <div>
                <div className="text-xs text-gray-500">Username (handle)</div>
                <div className="flex gap-2 mt-1 items-center">
                  <span className="bg-gray-100 px-3 py-2 rounded-l-md text-sm text-gray-600">@</span>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 px-3 py-2 border-y border-r rounded-r-md text-sm"
                    placeholder="choose-a-username"
                  />
                  <div className="ml-2 text-sm">
                    {usernameAvailable === null ? (
                      <span className="text-xs text-gray-400">Checking…</span>
                    ) : usernameAvailable ? (
                      <span className="text-xs text-green-600 flex items-center gap-1"><Check size={14} /> Available</span>
                    ) : (
                      <span className="text-xs text-red-600">Not available</span>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Letters, numbers, hyphens. Avoid special characters.</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Bio</div>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 300))}
                  className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
                  rows={4}
                  placeholder="Short description — what should others know about you?"
                />
                <div className="text-xs text-gray-400 mt-1">{bio.length}/300</div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-white p-4 rounded-2xl border border-purple-50">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium">Social & Links</div>
                <button onClick={addDemoLink} className="px-2 py-1 text-xs bg-white border rounded-md">
                  Add sample
                </button>
              </div>
              <LinksManager links={links} onChange={setLinks} />
            </div>

            {/* Theme & appearance */}
            <div className="bg-white p-4 rounded-2xl border border-purple-50 space-y-3">
              <div className="text-sm font-medium">Appearance</div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setThemeMode("pastel")}
                  className={`px-3 py-2 rounded-md border ${themeMode === "pastel" ? "bg-purple-600 text-white" : "bg-white"}`}
                >
                  Pastel
                </button>
                <button
                  onClick={() => setThemeMode("light")}
                  className={`px-3 py-2 rounded-md border ${themeMode === "light" ? "bg-purple-600 text-white" : "bg-white"}`}
                >
                  Light
                </button>
                <button
                  onClick={() => setThemeMode("dark")}
                  className={`px-3 py-2 rounded-md border ${themeMode === "dark" ? "bg-purple-600 text-white" : "bg-white"}`}
                >
                  Dark
                </button>

                <div className="ml-auto flex items-center gap-2">
                  <div className="text-xs text-gray-500">Accent</div>
                  <input
                    value={accent}
                    onChange={(e) => setAccent(e.target.value)}
                    className="w-20 px-2 py-1 border rounded-md text-sm"
                    placeholder="#7c3aed"
                  />
                </div>
              </div>

              <div className="text-xs text-gray-400">Tip: Paste a hex color (e.g. #ff7b7b) or keep default purple.</div>
            </div>

            {/* Privacy & badges */}
            <div className="bg-white p-4 rounded-2xl border border-purple-50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Profile visibility</div>
                  <div className="text-xs text-gray-400">Control who can see your profile & badges</div>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
                    <span className="text-sm">Public</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Show badges publicly</div>
                  <div className="text-xs text-gray-400">Toggle whether badges appear on your public profile</div>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={showBadgesPublic} onChange={(e) => setShowBadgesPublic(e.target.checked)} />
                    <span className="text-sm">Show badges</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Select badges to show</div>
                <div className="flex gap-2 flex-wrap">
                  {MOCK_BADGES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => toggleBadge(b.id)}
                      className={`px-3 py-1 rounded-full text-sm border ${selectedBadges.includes(b.id) ? "bg-purple-600 text-white" : "bg-white"}`}
                    >
                      {b.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: preview */}
          <div className="space-y-5">
            <div className="bg-white p-4 rounded-2xl border border-purple-50">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium">Preview</div>
                <div className="text-xs text-gray-400">Live</div>
              </div>

              <div
                className="rounded-lg overflow-hidden border"
                style={{
                  background: previewStyle.background,
                  color: previewStyle.color,
                }}
              >
                {/* banner */}
                <div style={{ height: 110, background: "#f3f0ff" }} className="w-full relative">
                  {banner ? (
                    <img src={banner} alt="banner preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">Banner (preview)</div>
                  )}
                  {/* avatar */}
                  <div className="absolute left-4 -bottom-8 w-24 h-24 rounded-full bg-white border shadow-md p-0.5 overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-xl font-semibold"
                        style={{ background: previewStyle.accent, color: "white" }}
                      >
                        {initials.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold" style={{ color: previewStyle.color }}>
                        {displayName}
                        <span className="text-xs text-gray-400 ml-2"> {pronouns ? `· ${pronouns}` : ""}</span>
                      </div>
                      <div className="text-sm text-gray-500">@{username}</div>
                    </div>

                    <div>
                      <div
                        className="px-3 py-1 rounded-md text-xs font-semibold"
                        style={{ background: previewStyle.accent, color: "white" }}
                      >
                        {isPublic ? "Public" : "Private"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-sm" style={{ color: previewStyle.color }}>
                    {bio || <span className="text-gray-400">No bio yet — add something about yourself.</span>}
                  </div>

                  <div className="mt-3 flex gap-2 items-center flex-wrap">
                    {links.map((l) => (
                      <a
                        href={l.url}
                        key={l.id}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs px-2 py-1 border rounded-md bg-white/30"
                        style={{ color: previewStyle.color }}
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="text-xs text-gray-400">Badges</div>
                    <div className="flex gap-2 mt-2">
                      {showBadgesPublic && selectedBadges.length > 0 ? (
                        selectedBadges.map((id) => {
                          const b = MOCK_BADGES.find((x) => x.id === id);
                          if (!b) return null;
                          return (
                            <div key={id} className="px-2 py-1 rounded-full text-xs text-white" style={{ background: accent }}>
                              {b.title}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-xs text-gray-400">No badges shown</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-400">This is a live preview of your public profile card.</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-50">
              <div className="text-sm font-medium mb-2">Quick actions (demo)</div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const shareData = {
                      title: displayName,
                      text: bio || `${displayName}'s profile`,
                      url: `https://app.example.com/${username}`,
                    };
                    navigator.share?.(shareData) ?? alert("Web share not supported in this environment (demo).");
                  }}
                  className="px-3 py-1 bg-white border rounded-md text-sm"
                >
                  Share profile
                </button>

                <button
                  onClick={() => {
                    const json = JSON.stringify({ displayName, username, bio, links }, null, 2);
                    const blob = new Blob([json], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${username || "profile"}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-3 py-1 bg-white border rounded-md text-sm"
                >
                  Export JSON
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-400">Changes are saved locally when you press "Save Changes".</div>
          </div>
        </div>

        {/* sticky save bar on small screens */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
          <div className="bg-white p-2 rounded-full shadow-lg flex gap-2">
            <button onClick={handleReset} className="px-3 py-1 rounded-md text-sm text-red-600 border bg-white">Reset</button>
            <button onClick={handleSave} className="px-4 py-1 rounded-md text-sm text-white bg-purple-600">{saving ? "Saving..." : "Save"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
