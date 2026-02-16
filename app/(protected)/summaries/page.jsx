"use client";

import { useState } from "react";
import { Search, Moon, Zap, Plus } from "lucide-react";
import SummaryCard from "@/components/summaries/SummaryCard";

const SAMPLE_SUMMARIES = [
  {
    id: 1,
    title: "Quarterly Review Points",
    category: "Work",
    date: "Oct 26, 2025",
    categoryColor: "blue",
    insights: [
      "Successfully launched Project Alpha ahead of schedule.",
      "Team velocity increased by 15% compared to Q2.",
      "Client satisfaction score (CSAT) improved from 4.2 to 4.8.",
      "Need to address hiring bottlenecks in the engineering department.",
    ],
    actionItems: null,
  },
  {
    id: 2,
    title: "Meeting Notes - Client X",
    category: "Work",
    date: "Oct 22, 2025",
    categoryColor: "blue",
    insights: null,
    actionItems: [
      { text: "Send proposal draft by Friday EOD.", completed: false },
      { text: "Schedule follow-up with Design Lead.", completed: false },
      { text: "Update budget spreadsheet.", completed: false },
    ],
  },
  {
    id: 3,
    title: "Project Alpha Brainstorming",
    category: "Projects",
    date: "Oct 23, 2025",
    categoryColor: "purple",
    summary:
      'Summary: Explored 5 core features for the MVP. Agreed on "Simplicity First" approach. Major potential challenge identified: API rate limits from third-party vendors. Team roles assigned for initial sprint.',
  },
  {
    id: 4,
    title: "Grocery List for the Week",
    category: "Personal",
    date: "Oct 24, 2025",
    categoryColor: "green",
    tags: ["Dairy", "Proteins", "Produce", "+2 more"],
  },
];

export default function SummariesPage() {
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [category, setCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

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
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Moon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1 relative">
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
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Time Range
            </label>
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
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Category
            </label>
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
            <p className="text-2xl font-bold text-gray-900">1,240</p>
            <p className="text-sm text-gray-600">tokens used this month</p>
          </div>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {SAMPLE_SUMMARIES.map((summary) => (
          <SummaryCard key={summary.id} summary={summary} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mb-8">
        <button className="px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 font-medium text-gray-700">
          <span>📄</span>
          Load More Summaries
        </button>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium">
        <Plus className="w-5 h-5" />
        New Note
      </button>
    </div>
  );
}
