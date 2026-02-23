"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Moon, Grid3x3, List, Plus, TrendingUp, Tag as TagIcon } from "lucide-react";
import TagCard from "@/components/tags/TagCard";
import { formatDate } from "@/utils/formatDate";

// Map tag names to icon/color styles
function getTagStyles(name) {
  const n = (name || "").toLowerCase();

  if (n.includes("work") || n.includes("project")) {
    return {
      icon: "Briefcase",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    };
  }

  if (n.includes("personal") || n.includes("life")) {
    return {
      icon: "User",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    };
  }

  if (n.includes("important") || n.includes("urgent") || n.includes("priority")) {
    return {
      icon: "AlertCircle",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    };
  }

  if (n.includes("idea") || n.includes("brainstorm")) {
    return {
      icon: "Lightbulb",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    };
  }

  if (n.includes("alpha") || n.includes("folder")) {
    return {
      icon: "Folder",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    };
  }

  // Default style
  return {
    icon: "Tag",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  };
}

export default function TagsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name (A-Z)");
  const [viewMode, setViewMode] = useState("list"); // 'grid' or 'list'
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTags, setTotalTags] = useState(0);
  const [mostUsedTag, setMostUsedTag] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    try {
      setLoading(true);
      const res = await fetch("/api/notes");
      const data = await res.json();
      const notes = data.notes || [];

      const tagMap = new Map();

      notes.forEach((note) => {
        if (!Array.isArray(note.tags)) return;

        note.tags.forEach((rawTag) => {
          const tagName = String(rawTag || "").trim();
          if (!tagName) return;

          const existing = tagMap.get(tagName) || {
            id: tagName,
            name: tagName,
            noteCount: 0,
            createdAt: note.createdAt,
          };

          existing.noteCount += 1;

          // Keep earliest createdAt for tag
          if (!existing.createdAt || new Date(note.createdAt) < new Date(existing.createdAt)) {
            existing.createdAt = note.createdAt;
          }

          tagMap.set(tagName, existing);
        });
      });

      const aggregated = Array.from(tagMap.values()).map((tag) => {
        const styles = getTagStyles(tag.name);
        return {
          ...tag,
          icon: styles.icon,
          bgColor: styles.bgColor,
          iconColor: styles.iconColor,
          createdDate: formatDate(tag.createdAt),
        };
      });

      setTags(aggregated);

      setTotalTags(aggregated.length);

      if (aggregated.length > 0) {
        const sortedByCount = [...aggregated].sort((a, b) => b.noteCount - a.noteCount);
        setMostUsedTag(sortedByCount[0]);
      } else {
        setMostUsedTag(null);
      }
    } catch (error) {
      console.error("Error fetching tags from notes:", error);
    } finally {
      setLoading(false);
    }
  }

  // Filter by search query
  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort according to sortBy
  const sortedTags = [...filteredTags].sort((a, b) => {
    switch (sortBy) {
      case "Name (A-Z)":
        return a.name.localeCompare(b.name);
      case "Name (Z-A)":
        return b.name.localeCompare(a.name);
      case "Most Notes":
        return b.noteCount - a.noteCount;
      case "Least Notes":
        return a.noteCount - b.noteCount;
      case "Recently Created":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "Oldest First":
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tags Management</h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="flex-1 sm:flex-initial relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>


        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Tags */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Tags</p>
              <h3 className="text-4xl font-bold text-gray-900">
                {loading ? "—" : totalTags}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TagIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Most Used Tag */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Most Used Tag</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {loading
                  ? "—"
                  : mostUsedTag
                  ? `#${mostUsedTag.name}`
                  : "No tags yet"}
              </h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Create New Tag */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-400 transition-all cursor-pointer group sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2 group-hover:bg-blue-200 transition-colors">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-blue-600">Create New Tag</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Sort By */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 sm:flex-initial px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all text-sm min-w-[150px]"
          >
            <option>Name (A-Z)</option>
            <option>Name (Z-A)</option>
            <option>Most Notes</option>
            <option>Least Notes</option>
            <option>Recently Created</option>
            <option>Oldest First</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded transition-colors ${viewMode === "grid"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded transition-colors ${viewMode === "list"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tags List/Grid */}
      {loading ? (
        <div className="text-center py-12 mb-8">
          <p className="text-gray-500">Loading tags...</p>
        </div>
      ) : sortedTags.length === 0 ? (
        <div className="text-center py-12 mb-8">
          <p className="text-gray-500 mb-2">
            {searchQuery ? "No tags match your search." : "No tags found."}
          </p>
          <p className="text-sm text-gray-400">
            Tags are automatically generated from your notes. Add tags to notes
            to see them here.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
              : "space-y-3 mb-8"
          }
        >
          {sortedTags.map((tag) => (
            <TagCard key={tag.id} tag={tag} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => router.push("/tags/new")}
        aria-label="Create new tag"
        className="
    fixed bottom-8 right-8
    bg-gray-900 hover:bg-gray-800 text-white
    rounded-full
    w-14 h-14 sm:w-auto sm:h-auto
    p-0 sm:px-6 sm:py-4
    shadow-lg hover:shadow-xl
    transition-all flex items-center justify-center sm:justify-start gap-2 font-medium z-50
    overflow-hidden
  "
      >
        <Plus className="w-5 h-5" />
        <span className="sr-only sm:not-sr-only hidden sm:inline">New Tag</span>
      </button>
    </div>
  );
}
