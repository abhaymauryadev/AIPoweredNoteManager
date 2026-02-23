"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  User,
  Settings,
  CreditCard,
  Download,
  Upload,
  HelpCircle,
  FileText,
  LogOut,
  Moon,
  Sun,
  LayoutGrid,
  List,
  Check,
  ChevronDown
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
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
        body: JSON.stringify({ name: fullName }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to save profile");
      }

      setMessage("Profile updated successfully.");
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
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
              <User className="w-8 h-8" />
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Upload New Photo
            </button>
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
        </div>
      </div>
    </div>
  );
}

function ApplicationPreferences() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Preferences</h2>

      <div className="space-y-5">
        {/* Theme */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Theme</label>
          <div className="relative w-40">
            <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>Light (Default)</option>
              <option>Dark</option>
              <option>System</option>
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
            <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <option>Grid View</option>
              <option>List View</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <ToggleRow label="AI Auto-tagging" defaultChecked={true} />
        <ToggleRow label="Show AI Suggestions" defaultChecked={true} />
        <ToggleRow label="Spell Check" defaultChecked={true} />

        <div className="pt-4">
          <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
            Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
}

function ToggleRow({ label, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

function ExportOptions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Export Options</h2>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">PDF Export</span>
          </div>
          <p className="text-xs text-blue-700/80 leading-tight">
            Download notes as a high-quality PDF document
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-900">Markdown</span>
          </div>
          <p className="text-xs text-gray-500 leading-tight">
            Download notes in raw Markdown format
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center justify-center w-5 h-5 bg-blue-600 rounded text-white">
          <Check className="w-3.5 h-3.5" />
        </div>
        <span className="text-sm font-medium text-gray-700">Include AI Summaries in Export</span>
      </div>

      <button className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
        Export All Notes
      </button>
      <p className="text-xs text-center text-gray-500 mt-3">
        Export your entire note library in your chosen format.
      </p>

    </div>
  );
}
