"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  User,
  Download,
  FileText,
  LogOut,
  Check,
  ChevronDown
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Settings Sidebar */}
          {/* <aside className="w-full lg:w-64 shrink-0">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside> */}

          {/* Main Content */}
          <main className="flex-1">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Profile Info */}
              <div className="xl:col-span-2 space-y-8">
                <ProfileInformation />
              </div>

              {/* Right Column - Preferences & Export */}
              <div className="xl:col-span-1 space-y-8">
                <ApplicationPreferences />
                <ExportOptions />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
function ProfileInformation() {
  const { data: session, update } = useSession();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      const res = await fetch("/api/user");
      if (!res.ok) {
        throw new Error("Failed to load profile");
      }
      const data = await res.json();
      if (data.user) {
        setFullName(data.user.name || "");
        setEmail(data.user.email || "");
        setProfileImage(data.user.profileImage || "");
      }
    } catch (err) {
      console.error("Error loading profile:", err);
      setError("Failed to load profile information.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProfile() {
    try {
      setSavingProfile(true);
      setMessage(null);
      setError(null);

      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, profileImage }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to save profile");
      }

      setMessage("Profile updated successfully.");

      // Update client session name and picture so UI reflects changes
      if (update && session?.user) {
        await update({
          ...session,
          user: {
            ...session.user,
            name: fullName,
            image: profileImage || session.user.image,
          },
        });
      }

      // Refresh profile from backend to keep in sync
      await fetchProfile();
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.message || "Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleUpdatePassword() {
    try {
      setUpdatingPassword(true);
      setMessage(null);
      setError(null);

      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update password");
      }

      setMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      setError(err.message || "Failed to update password.");
    } finally {
      setUpdatingPassword(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>

      <div className="space-y-6">
        {loading && (
          <p className="text-sm text-gray-500">Loading profile...</p>
        )}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {message && !error && (
          <p className="text-sm text-green-600">{message}</p>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800 bg-gray-50"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-400">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile picture"
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    setSelectedPhoto(file);
                    setMessage(null);
                    setError(null);
                  }
                }}
                className="text-sm text-gray-600"
              />
              <button
                type="button"
                onClick={async () => {
                  if (!selectedPhoto) return;
                  setUploadingPhoto(true);
                  setMessage(null);
                  setError(null);

                  try {
                    const formData = new FormData();
                    formData.append("file", selectedPhoto);

                    const uploadRes = await fetch("/api/cloudinary/upload", {
                      method: "POST",
                      body: formData,
                    });
                    const uploadData = await uploadRes.json();
                    if (!uploadRes.ok) {
                      throw new Error(uploadData.message || "Failed to upload photo.");
                    }

                    const imageUrl = uploadData.url;
                    setProfileImage(imageUrl);

                    const saveRes = await fetch("/api/user", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ profileImage: imageUrl }),
                    });
                    const saveData = await saveRes.json();
                    if (!saveRes.ok) {
                      throw new Error(saveData.message || "Failed to save profile photo.");
                    }

                    if (update && session?.user) {
                      await update({
                        ...session,
                        user: {
                          ...session.user,
                          image: imageUrl,
                        },
                      });
                    }

                    setMessage("Profile photo uploaded successfully.");
                    setSelectedPhoto(null);
                  } catch (err) {
                    console.error(err);
                    setError(err.message || "Failed to upload profile picture.");
                  } finally {
                    setUploadingPhoto(false);
                  }
                }}
                disabled={!selectedPhoto || uploadingPhoto}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                {uploadingPhoto ? "Uploading..." : "Upload New Photo"}
              </button>
              {selectedPhoto && (
                <p className="text-xs text-gray-500">Selected file: {selectedPhoto.name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-900 mb-4">Change Password</label>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={handleUpdatePassword}
            disabled={updatingPassword}
            className="w-full py-2.5 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-60"
          >
            {updatingPassword ? "Updating Password..." : "Update Password"}
          </button>
          <button
            onClick={handleSaveProfile}
            disabled={savingProfile}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 disabled:opacity-60"
          >
            {savingProfile ? "Saving..." : "Save Profile Changes"}
          </button>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="w-full py-2.5 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors border border-red-100"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ApplicationPreferences() {
  const [theme, setTheme] = useState("light");
  const [defaultView, setDefaultView] = useState("grid");
  const [aiAutoTagging, setAiAutoTagging] = useState(true);
  const [showAISuggestions, setShowAISuggestions] = useState(true);
  const [spellCheck, setSpellCheck] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPreferences();
  }, []);

  async function fetchPreferences() {
    try {
      setLoading(true);
      const res = await fetch("/api/user");
      if (!res.ok) return;
      const data = await res.json();
      const prefs = data.user?.preferences || {};

      setTheme(prefs.theme || "light");
      setDefaultView(prefs.defaultView || "grid");
      setAiAutoTagging(prefs.aiAutoTagging ?? true);
      setShowAISuggestions(prefs.showAISuggestions ?? true);
      setSpellCheck(prefs.spellCheck ?? true);
    } catch (err) {
      console.error("Error loading preferences:", err);
      setError("Failed to load preferences.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePreferences() {
    try {
      setSaving(true);
      setMessage(null);
      setError(null);

      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferences: {
            theme,
            defaultView,
            aiAutoTagging,
            showAISuggestions,
            spellCheck,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to save preferences");
      }

      setMessage("Preferences saved successfully.");
    } catch (err) {
      console.error("Error saving preferences:", err);
      setError(err.message || "Failed to save preferences.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Preferences</h2>

      <div className="space-y-5">
        {loading && (
          <p className="text-sm text-gray-500">Loading preferences...</p>
        )}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {message && !error && (
          <p className="text-sm text-green-600">{message}</p>
        )}

        {/* Theme */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Theme</label>
          <div className="relative w-40">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="light">Light (Default)</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Default View */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Default View</label>
          <div className="relative w-40">
            <select
              value={defaultView}
              onChange={(e) => setDefaultView(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <ToggleRow label="AI Auto-tagging" checked={aiAutoTagging} onChange={setAiAutoTagging} />
        <ToggleRow label="Show AI Suggestions" checked={showAISuggestions} onChange={setShowAISuggestions} />
        <ToggleRow label="Spell Check" checked={spellCheck} onChange={setSpellCheck} />

        <div className="pt-4">
          <button
            onClick={handleSavePreferences}
            disabled={saving}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>

      </div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

function ExportOptions() {
  const [includeSummaries, setIncludeSummaries] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    // Load preference
    (async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) return;
        const data = await res.json();
        const prefs = data.user?.preferences || {};
        setIncludeSummaries(prefs.includeSummariesInExport ?? true);
      } catch (err) {
        console.error("Error loading export preference:", err);
      }
    })();
  }, []);

  async function exportNotesAsMarkdown() {
    try {
      setExporting(true);
      const res = await fetch("/api/notes");
      const data = await res.json();
      const notes = data.notes || [];

      const lines = notes.map((note) => {
        const title = note.title || "Untitled note";
        const date = note.createdAt ? new Date(note.createdAt).toISOString().split("T")[0] : "";
        const tags = Array.isArray(note.tags) && note.tags.length > 0 ? `Tags: ${note.tags.join(", ")}` : "";

        let body = `# ${title}\n\n`;
        if (date) body += `Created: ${date}\n\n`;
        if (tags) body += `${tags}\n\n`;

        if (includeSummaries && Array.isArray(note.summary) && note.summary.length > 0) {
          body += `## AI Summary\n\n${note.summary.join("\n\n")}\n\n`;
        }

        const plainContent = (note.content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
        body += `## Content\n\n${plainContent}\n\n---\n\n`;
        return body;
      });

      const blob = new Blob([lines.join("\n")], {
        type: "text/markdown;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "notes-export.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting markdown:", err);
    } finally {
      setExporting(false);
    }
  }

  async function exportNotesAsPDF() {
    try {
      setExporting(true);
      const res = await fetch("/api/notes");
      const data = await res.json();
      const notes = data.notes || [];

      const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Notes Export</title>
  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding: 24px; }
    h1 { font-size: 28px; margin-bottom: 16px; }
    h2 { font-size: 20px; margin-top: 24px; margin-bottom: 8px; }
    .note { margin-bottom: 24px; border-bottom: 1px solid #ddd; padding-bottom: 16px; }
    .meta { color: #555; font-size: 12px; margin-bottom: 8px; }
    .tags { font-size: 12px; color: #555; margin-bottom: 8px; }
  </style>
</head>
<body>
  <h1>Notes Export</h1>
  ${notes.map((note) => {
    const title = note.title || "Untitled note";
    const date = note.createdAt ? new Date(note.createdAt).toLocaleString() : "";
    const tags = Array.isArray(note.tags) && note.tags.length > 0 ? `Tags: ${note.tags.join(", ")}` : "";
    const summary = includeSummaries && Array.isArray(note.summary) && note.summary.length > 0
      ? `<h3>AI Summary</h3><p>${note.summary.join("<br/><br/>")}</p>`
      : "";
    const content = note.content || "";
    return `<div class="note">
      <h2>${title}</h2>
      <div class="meta">${date}</div>
      ${tags ? `<div class="tags">${tags}</div>` : ""}
      ${summary}
      <h3>Content</h3>
      <div class="content">${content}</div>
    </div>`;
  }).join("")}
</body>
</html>`;

      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const win = window.open(url, "_blank");
      if (!win) return;
      win.addEventListener("load", () => {
        win.print();
        URL.revokeObjectURL(url);
      });
    } catch (err) {
      console.error("Error exporting PDF:", err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Export Options</h2>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={exportNotesAsPDF}
          disabled={exporting}
          className="bg-blue-50 border border-blue-100 rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition-colors text-left disabled:opacity-60"
        >
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">PDF Export</span>
          </div>
          <p className="text-xs text-blue-700/80 leading-tight">
            Open a printable view of all notes (use browser &quot;Save as PDF&quot;)
          </p>
        </button>

        <button
          type="button"
          onClick={exportNotesAsMarkdown}
          disabled={exporting}
          className="bg-gray-50 border border-gray-100 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors text-left disabled:opacity-60"
        >
          <div className="flex items-center gap-2 mb-1">
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-900">Markdown</span>
          </div>
          <p className="text-xs text-gray-500 leading-tight">
            Download all notes as a single Markdown file
          </p>
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setIncludeSummaries((v) => !v)}
          className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-colors ${includeSummaries ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-transparent"}`}
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <span className="text-sm font-medium text-gray-700">Include AI Summaries in Export</span>
      </div>

      <button
        type="button"
        onClick={exportNotesAsMarkdown}
        disabled={exporting}
        className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 disabled:opacity-60"
      >
        {exporting ? "Exporting..." : "Export All Notes"}
      </button>
      <p className="text-xs text-center text-gray-500 mt-3">
        Export your entire note library in your chosen format.
      </p>

    </div>
  );
}
