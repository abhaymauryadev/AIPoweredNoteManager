"use client";
import { useState } from "react";
import { Search, Trash2, Sun, Moon, AlertCircle, Calendar } from "lucide-react";

export default function TrashPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("dateDeleted");
  const [theme, setTheme] = useState("light");

  // Sample deleted notes data
  const deletedNotes = [
    {
      id: 1,
      title: "Q3 Marketing Strategy Draft",
      category: "Work",
      content: "Initial thoughts on Q3 campaign focusing on social media growth and user retention strategies...",
      deletedAt: "2023-10-26T00:00:00Z",
      daysAgo: 2,
      permanentDeleteIn: 28,
    },
    {
      id: 2,
      title: "Untitled Note 14",
      category: "Uncategorized",
      content: "Call mom about the weekend plans, don't forget the flowers.",
      deletedAt: "2023-10-23T00:00:00Z",
      daysAgo: 5,
      permanentDeleteIn: 25,
    },
    {
      id: 3,
      title: "Old Password List (Deprecated)",
      category: "Personal",
      content: "Moved all passwords to the new password manager. This note is no longer needed for security reasons.",
      deletedAt: "2023-10-20T00:00:00Z",
      daysAgo: 8,
      permanentDeleteIn: 22,
    },
    {
      id: 4,
      title: "Scrapped Blog Ideas",
      category: "Projects",
      content: "1. Why AI is cool. 2. Top 10 productivity hacks. 3. My morning routine.",
      deletedAt: "2023-10-14T00:00:00Z",
      daysAgo: 14,
      permanentDeleteIn: 16,
    },
    {
      id: 5,
      title: "Duplicate Meeting Notes",
      category: "Work",
      content: "Sync error caused 18x duplicate. Content is same as the original.",
      deletedAt: "2023-10-12T00:00:00Z",
      daysAgo: 16,
      permanentDeleteIn: 14,
    },
  ];

  const filterOptions = [
    { value: "all", label: "All Deleted Items" },
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "projects", label: "Projects" },
    { value: "uncategorized", label: "Uncategorized" },
  ];

  const sortOptions = [
    { value: "dateDeleted", label: "Date Deleted" },
    { value: "title", label: "Title" },
    { value: "category", label: "Category" },
  ];

  const handleEmptyTrash = () => {
    console.log("Empty trash clicked");
    // Add empty trash logic here
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      Work: "bg-blue-100 text-blue-700",
      Personal: "bg-purple-100 text-purple-700",
      Projects: "bg-green-100 text-green-700",
      Uncategorized: "bg-gray-100 text-gray-600",
    };
    return colors[category] || "bg-gray-100 text-gray-600";
  };

  // Filter and sort notes
  const filteredNotes = deletedNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterBy === "all" ||
      note.category.toLowerCase() === filterBy.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Trash Bin
            </h1>
            <span className="bg-red-100 text-red-600 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
              {filteredNotes.length} Items
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search deleted notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Empty Trash Button */}
            <button
              onClick={handleEmptyTrash}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Empty Trash</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Info Notice */}
        <div className="flex items-start gap-2 sm:gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            Items in the trash are permanently deleted after 30 days.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between mb-6">
        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white w-full sm:w-auto"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white w-full sm:w-auto"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Deleted Notes List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow"
            >
              {/* Title and Category */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                    {note.title}
                  </h3>
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${getCategoryColor(
                      note.category
                    )}`}
                  >
                    {note.category}
                  </span>
                </div>
              </div>

              {/* Content Preview */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {note.content}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    Deleted: Oct {note.deletedAt.split("-")[2].split("T")[0]},{" "}
                    2023
                  </span>
                </div>
                <span>•</span>
                <span>{note.daysAgo} days ago</span>
                <span>•</span>
                <span className="text-red-600 font-medium">
                  Will be permanently deleted in {note.permanentDeleteIn} days
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 sm:py-16">
            <Trash2 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-base sm:text-lg text-gray-500 font-medium">
              No deleted items found
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
