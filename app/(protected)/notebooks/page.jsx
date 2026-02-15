"use client";

import { Plus, Grid3x3, List, ChevronDown } from "lucide-react";
import NotebookHeader from "@/components/notebooks/NotebookHeader";
import NotebookCard from "@/components/notebooks/NotebookCard";
import CreateNotebookCard from "@/components/notebooks/CreateNotebookCard";
import ActivityOverview from "@/components/notebooks/ActivityOverview";

export default function NotebooksPage() {
  // Mock data for notebooks
  const notebooks = [
    {
      id: 1,
      icon: "FileText",
      title: "Work Projects",
      description: "Quarterly reviews, team syncs, and roadmap...",
      noteCount: 24,
      lastUpdated: "2h ago",
      color: "blue",
    },
    {
      id: 2,
      icon: "User",
      title: "Personal Journal",
      description: "Daily reflections, thoughts, book tracking, and grocery lists.",
      noteCount: 168,
      lastUpdated: "1d ago",
      color: "green",
    },
    {
      id: 3,
      icon: "Lightbulb",
      title: "Ideas & Inspiration",
      description: "Random thoughts, book summaries, and podcast...",
      noteCount: 8,
      lastUpdated: "5d ago",
      color: "purple",
    },
    {
      id: 4,
      icon: "Plane",
      title: "Travel Plans",
      description: "Itinerary for Japan trip, packing lists, and flight...",
      noteCount: 12,
      lastUpdated: "2w ago",
      color: "orange",
    },
    {
      id: 5,
      icon: "BookOpen",
      title: "Learning React",
      description: "Course notes, code snippets, and helpful...",
      noteCount: 45,
      lastUpdated: "1mo ago",
      color: "pink",
    },
  ];

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
            <button className="p-2 bg-gray-100 rounded transition-colors">
              <Grid3x3 className="w-4 h-4 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <List className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* New Notebook Button */}
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md">
          <Plus className="w-5 h-5" />
          <span>New Notebook</span>
        </button>
      </div>

      {/* Notebook Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {notebooks.map((notebook) => (
          <NotebookCard
            key={notebook.id}
            icon={notebook.icon}
            title={notebook.title}
            description={notebook.description}
            noteCount={notebook.noteCount}
            lastUpdated={notebook.lastUpdated}
            color={notebook.color}
          />
        ))}

        {/* Create New Notebook Card */}
        <CreateNotebookCard />
      </div>

      {/* Activity Overview */}
      <ActivityOverview />
    </div>
  );
}
