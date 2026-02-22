"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Moon, Zap, Plus } from "lucide-react";
import SummaryCard from "@/components/summaries/SummaryCard";
import { formatDate } from "@/utils/formatDate";

// Get category color based on tags or default
function getCategoryColor(tags) {
  if (!tags || tags.length === 0) return "blue";
  const tagStr = tags.join(" ").toLowerCase();
  if (tagStr.includes("work") || tagStr.includes("meeting") || tagStr.includes("project")) return "blue";
  if (tagStr.includes("personal") || tagStr.includes("grocery") || tagStr.includes("home")) return "green";
  if (tagStr.includes("idea") || tagStr.includes("brainstorm") || tagStr.includes("creative")) return "purple";
  return "blue";
}

// Get category name from tags
function getCategory(tags) {
  if (!tags || tags.length === 0) return "General";
  const tagStr = tags.join(" ").toLowerCase();
  if (tagStr.includes("work") || tagStr.includes("meeting")) return "Work";
  if (tagStr.includes("personal") || tagStr.includes("grocery")) return "Personal";
  if (tagStr.includes("project") || tagStr.includes("idea") || tagStr.includes("brainstorm")) return "Projects";
  return "General";
}

// Extract action items from content (simple pattern matching)
function extractActionItems(content) {
  if (!content) return null;
  const actionPatterns = [
    /(?:action items?:|todo:|tasks?:|to do:)\s*(.+?)(?:\n\n|\n$|$)/gi,
    /(?:^\s*[-*]\s*)(.+)/gm,
  ];
  
  const items = [];
  for (const pattern of actionPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const text = match[1]?.trim();
      if (text && text.length > 5 && text.length < 200) {
        items.push({ text, completed: false });
      }
    }
  }
  
  return items.length > 0 ? items.slice(0, 5) : null;
}

export default function SummariesPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [category, setCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tokenUsage, setTokenUsage] = useState(0);

  useEffect(() => {
    fetchSummaries();
  }, [timeRange, category]);

  async function fetchSummaries() {
    try {
      setLoading(true);
      const res = await fetch("/api/notes");
      const data = await res.json();
      
      if (data.notes) {
        // Filter notes that have summaries
        let notesWithSummaries = data.notes.filter(
          (note) => Array.isArray(note.summary) && note.summary.length > 0
        );

        // Filter by time range
        const now = new Date();
        let startDate = new Date();
        
        switch (timeRange) {
          case "Last 7 Days":
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "Last 30 Days":
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          case "Last 3 Months":
            startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            break;
          case "All Time":
            startDate = new Date(0);
            break;
        }

        notesWithSummaries = notesWithSummaries.filter(
          (note) => new Date(note.createdAt) >= startDate
        );

        // Filter by category
        if (category !== "All Categories") {
          notesWithSummaries = notesWithSummaries.filter((note) => {
            const noteCategory = getCategory(note.tags);
            return noteCategory === category;
          });
        }

        // Transform notes to summary format
        const transformedSummaries = notesWithSummaries.map((note) => {
          const noteCategory = getCategory(note.tags);
          const categoryColor = getCategoryColor(note.tags);
          const actionItems = extractActionItems(note.content);
          
          // Use summary array as insights, or join as single summary text
          const insights = note.summary && note.summary.length > 0 
            ? (note.summary.length > 1 ? note.summary : null)
            : null;
          
          const summaryText = note.summary && note.summary.length === 1
            ? note.summary[0]
            : (note.summary && note.summary.length > 1 ? note.summary.join(" ") : null);

          // Format tags for display
          const displayTags = note.tags && note.tags.length > 0
            ? note.tags.slice(0, 3).concat(note.tags.length > 3 ? [`+${note.tags.length - 3} more`] : [])
            : null;

          return {
            id: note._id,
            title: note.title,
            category: noteCategory,
            date: formatDate(note.createdAt),
            categoryColor,
            insights,
            actionItems,
            summary: summaryText,
            tags: displayTags,
            noteId: note._id,
            createdAt: note.createdAt, // Keep for sorting
          };
        });

        // Sort by date (newest first)
        transformedSummaries.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });

        setSummaries(transformedSummaries);

        // Estimate token usage (rough estimate: ~4 tokens per word in summaries)
        const totalWords = transformedSummaries.reduce((acc, s) => {
          const summaryText = s.summary || (s.insights ? s.insights.join(" ") : "");
          return acc + (summaryText.split(" ").length || 0);
        }, 0);
        setTokenUsage(Math.round(totalWords * 1.3)); // Rough estimate
      }
    } catch (error) {
      console.error("Error fetching summaries:", error);
    } finally {
      setLoading(false);
    }
  }

  // Filter summaries by search query
  const filteredSummaries = summaries.filter((summary) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      summary.title.toLowerCase().includes(query) ||
      (summary.summary && summary.summary.toLowerCase().includes(query)) ||
      (summary.insights && summary.insights.some(i => i.toLowerCase().includes(query))) ||
      (summary.tags && summary.tags.some(t => t.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">AI Summary View</h1>
            <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              Beta
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Review insights generated from your notes
          </p>
        </div>
        {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Moon className="w-5 h-5 text-gray-600" />
        </button> */}
      </div>

      {/* Search and Filters */}
      
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        {/* Search */}
        <div className="flex-1 relative justify-center flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search summaries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4">
          {/* Time Range */}
          <div className="flex-1 min-w-[180px] flex items-center">
            {/* <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Time Range
            </label> */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>All Time</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex-1 min-w-[180px] flex items-center">
            {/* <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Category
            </label> */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
            >
              <option>All Categories</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Projects</option>
            </select>
          </div>
        </div>

      </div>

      {/* Token Usage Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{tokenUsage.toLocaleString()}</p>
            <p className="text-sm text-gray-600">estimated tokens used ({summaries.length} summaries)</p>
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading summaries...</p>
        </div>
      ) : filteredSummaries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">
            {searchQuery ? "No summaries match your search." : "No summaries found."}
          </p>
          <p className="text-sm text-gray-400">
            {searchQuery 
              ? "Try adjusting your search query or filters."
              : "Create notes with AI summaries to see them here."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredSummaries.map((summary) => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      )}

      {/* Load More - Only show if there are many summaries */}
      {filteredSummaries.length > 0 && filteredSummaries.length >= 10 && (
        <div className="flex justify-center mb-8">
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 font-medium text-gray-700">
            <span>📄</span>
            Load More Summaries
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button onClick={() => router.push("/notes/new")} aria-label="Create new note" className="fixed bottom-8 right-8 bg-gray-900 hover:bg-gray-800 text-white rounded-full w-14 h-14 sm:w-auto sm:h-auto p-0 sm:px-6 sm:py-4 shadow-lg hover:shadow-xl transition-all flex items-center justify-center sm:justify-start gap-2 font-medium z-50 overflow-hidden">
        <Plus className="w-5 h-5" />
        <span className="sr-only sm:not-sr-only hidden sm:inline">New Note</span>
      </button>
    </div>
  );
}
