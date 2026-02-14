"use client";
import { useState } from "react";
import SearchBar from "@/components/notes/SearchBar";
import FilterDropdown from "@/components/notes/FilterDropdown";
import NoteCard from "@/components/notes/NoteCard";
import NewNoteButton from "@/components/notes/NewNoteButton";

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("dateModified");

  // Sample data matching the design
  const sampleNotes = [
    {
      id: 1,
      title: "Quarterly Review Points",
      category: "Work",
      content: "Key achievements and goals for next quarter. Discuss performance metrics and team feedback regarding the newly implemented agile workflow. Remember to highlight the 20% growth in user retention.",
      tags: ["Important"],
      createdAt: "2023-10-25T00:00:00Z",
    },
    {
      id: 2,
      title: "Grocery List for the Week",
      category: "Personal",
      content: "Milk, eggs, bread, coffee, fruits (bananas, apples), vegetables (spinach, carrots), chicken breasts. Check pantry for spices like cumin and paprika before heading out.",
      tags: [],
      createdAt: "2023-10-24T00:00:00Z",
    },
    {
      id: 3,
      title: "Project Alpha Brainstorming",
      category: "Projects",
      content: "New feature ideas: dark mode toggle, export to PDF, collaborative editing. Potential challenges include server load and real-time syncing latency. Schedule follow-up meeting with the design team.",
      tags: ["Brainstorm", "Priority"],
      createdAt: "2023-10-23T00:00:00Z",
    },
    {
      id: 4,
      title: "Meeting Notes - Client X",
      category: "Work",
      content: "Action items: Finalize the contract by Tuesday, send over the updated proposal draft by Friday. Discuss the timeline shift with the engineering lead.",
      tags: ["Meeting"],
      createdAt: "2023-10-22T00:00:00Z",
    },
    {
      id: 5,
      title: "Reading List 2024",
      category: "Personal",
      content: '"Atomic Habits", "Clean Code", "Thinking, Fast and Slow". Need to check the local library for availability or order online.',
      tags: [],
      createdAt: "2023-10-20T00:00:00Z",
    },
    {
      id: 6,
      title: "UI Design Inspiration",
      category: "Projects",
      content: "Look into Dribbble, Awwwards for modern UI patterns. Good examples: Apple's dashboard, Stripe's layout system, Notion's responsive design",
      tags: [],
      createdAt: "2023-10-18T00:00:00Z",
    },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "projects", label: "Projects" },
  ];

  const tagOptions = [
    { value: "all", label: "All Tags" },
    { value: "important", label: "Important" },
    { value: "meeting", label: "Meeting" },
    { value: "brainstorm", label: "Brainstorm" },
    { value: "priority", label: "Priority" },
  ];

  const sortOptions = [
    { value: "dateModified", label: "Date Modified" },
    { value: "dateCreated", label: "Date Created" },
    { value: "title", label: "Title" },
  ];

  const handleNewNote = () => {
    console.log("Create new note");
    // Add your create note logic here
  };

  // Filter and sort notes
  const filteredNotes = sampleNotes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || note.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesTag = selectedTag === "all" || note.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">All Notes</h1>
      </div>

      {/* Search and Filters Section */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="w-full">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between">
          {/* Left side filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <FilterDropdown
              label="FILTER BY CATEGORY"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
            />
            <FilterDropdown
              label="FILTER BY TAGS"
              value={selectedTag}
              onChange={setSelectedTag}
              options={tagOptions}
            />
          </div>

          {/* Right side sort */}
          <div className="flex items-end">
            <FilterDropdown
              label="Sort by:"
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
            />
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-24">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-lg">No notes found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Floating New Note Button */}
      <NewNoteButton onClick={handleNewNote} />
    </div>
  );
}
