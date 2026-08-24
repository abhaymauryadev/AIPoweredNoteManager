"use client";

import { useState, useEffect } from "react";
import { Plus, Grid3x3, List, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import NotebookHeader from "@/components/notebooks/NotebookHeader";
import NotebookCard from "@/components/notebooks/NotebookCard";
import CreateNotebookCard from "@/components/notebooks/CreateNotebookCard";
import ActivityOverview from "@/components/notebooks/ActivityOverview";

// Utility function to format relative time
function formatRelativeTime(date) {
  if (!date) return "Never";
  
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now - then) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

// Get color based on index
function getColorByIndex(index) {
  const colors = ["blue", "green", "purple", "orange", "pink"];
  return colors[index % colors.length];
}

// Get icon based on folder name
function getIconFromName(name) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("work") || lowerName.includes("project")) return "FileText";
  if (lowerName.includes("personal") || lowerName.includes("journal")) return "User";
  if (lowerName.includes("idea") || lowerName.includes("inspiration")) return "Lightbulb";
  if (lowerName.includes("travel") || lowerName.includes("trip")) return "Plane";
  if (lowerName.includes("learn") || lowerName.includes("study") || lowerName.includes("course")) return "BookOpen";
  return "FileText";
}

export default function NotebooksPage() {
  const router = useRouter();
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetchNotebooks();
  }, []);

  async function fetchNotebooks() {
    try {
      setLoading(true);

      const [foldersRes, notesRes] = await Promise.all([
        fetch("/api/folders"),
        fetch("/api/notes"),
      ]);

      const foldersData = await foldersRes.json();
      const notesData = await notesRes.json();

      if (foldersData.folders) {
        const allNotes = notesData.notes ?? [];

        const notebooksWithStats = foldersData.folders.map((folder, index) => {
          const folderNotes = allNotes.filter(
            (note) => note.folderId?.toString() === folder._id.toString()
          );

          const mostRecentNote =
            folderNotes.length > 0
              ? folderNotes.sort(
                  (a, b) =>
                    new Date(b.updatedAt || b.createdAt) -
                    new Date(a.updatedAt || a.createdAt)
                )[0]
              : null;

          const noteTitles = folderNotes.slice(0, 3).map((n) => n.title).join(", ");
          const description = noteTitles
            ? `${noteTitles}${folderNotes.length > 3 ? "..." : ""}`
            : "No notes yet. Start adding notes to this notebook.";

          return {
            id: folder._id,
            icon: getIconFromName(folder.name),
            title: folder.name,
            description,
            noteCount: folderNotes.length,
            lastUpdated: formatRelativeTime(
              mostRecentNote?.updatedAt || mostRecentNote?.createdAt || folder.updatedAt
            ),
            color: getColorByIndex(index),
            folderId: folder._id,
          };
        });

        setNotebooks(notebooksWithStats);
      }
    } catch (error) {
      console.error("Error fetching notebooks:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateNotebook = async () => {
    const name = prompt("Enter notebook name:");
    if (!name || !name.trim()) return;

    try {
      const res = await fetch("/api/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (res.ok) {
        fetchNotebooks(); // Refresh the list
      } else {
        alert("Failed to create notebook");
      }
    } catch (error) {
      console.error("Error creating notebook:", error);
      alert("Failed to create notebook");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <NotebookHeader />
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading notebooks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
      <NotebookHeader />

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
              <span>Sort by: Name (A-Z)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${viewMode === "grid" 
                ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${viewMode === "list" 
                ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* New Notebook Button */}
        <button 
          onClick={handleCreateNotebook}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>New Notebook</span>
        </button>
      </div>

      {/* Notebook Cards Grid */}
      {/* Notebook Display */}
{notebooks.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-gray-500 mb-4">
      No notebooks yet. Create your first notebook to get started!
    </p>
    <button
      onClick={handleCreateNotebook}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium"
    >
      <Plus className="w-5 h-5" />
      Create Notebook
    </button>
  </div>
) : (
  <>
    {viewMode === "grid" ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {notebooks.map((notebook) => (
          <div
            key={notebook.id}
            onClick={() => router.push(`/folders/${notebook.folderId}`)}
          >
            <NotebookCard
              icon={notebook.icon}
              title={notebook.title}
              description={notebook.description}
              noteCount={notebook.noteCount}
              lastUpdated={notebook.lastUpdated}
              color={notebook.color}
            />
          </div>
        ))}
        <div onClick={handleCreateNotebook}>
          <CreateNotebookCard />
        </div>
      </div>
    ) : (
      <div className="flex flex-col divide-y divide-gray-200 mb-8">
        {notebooks.map((notebook) => (
          <div  

            key={notebook.id}
            onClick={() => router.push(`/folders/${notebook.folderId}`)}
            className="p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {notebook.title}
                </h3>
                <p className="text-sm text-gray-500">{notebook.description}</p>
              </div>
              <div className="text-sm text-gray-400">
                {notebook.noteCount} notes • {notebook.lastUpdated}
              </div>
            </div>
          </div>
        ))}
        <div
          onClick={handleCreateNotebook}
          className="p-4 hover:bg-gray-50 cursor-pointer text-blue-600 font-medium"
        >
          + Create Notebook
        </div>
      </div>
    )}
  </>
)}

      {/* Activity Overview */}
      <ActivityOverview />
    </div>
  );
}
