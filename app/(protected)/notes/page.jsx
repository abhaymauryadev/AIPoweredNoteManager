"use client";
import { useMemo, useState } from "react";
import SearchBar from "@/components/notes/SearchBar";
import FilterDropdown from "@/components/notes/FilterDropdown";
import NoteCard from "@/components/notes/NoteCard";
import NewNoteButton from "@/components/notes/NewNoteButton";
import { useNotes } from "@/hooks/useNotes";

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("dateModified");

  const { notes, loading, deleteNote } = useNotes();

  const uiNotes = useMemo(
    () =>
      notes.map((note) => ({
        id: note._id,
        title: note.title || "Untitled note",
        // Derive a simple category from the first tag, or fallback
        category:
          (Array.isArray(note.tags) &&
            note.tags[0] &&
            note.tags[0].charAt(0).toUpperCase() + note.tags[0].slice(1)) ||
          "General",
        content: note.content || "",
        tags: Array.isArray(note.tags) ? note.tags : [],
        createdAt: note.createdAt,
      })),
    [notes]
  );

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "general", label: "General" },
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

  const filteredNotes = uiNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" ||
      note.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesTag =
      selectedTag === "all" ||
      note.tags?.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

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
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-lg">Loading notes...</p>
          </div>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map((note) => <NoteCard key={note.id} note={note} onDelete={deleteNote} />)
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-lg">No notes found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Floating New Note Button */}
      <NewNoteButton />
    </div>
  );
}
