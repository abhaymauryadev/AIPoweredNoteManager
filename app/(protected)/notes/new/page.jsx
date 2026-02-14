"use client";
import { useState } from "react";
import { ArrowLeft, Upload, Save, FolderOpen, Tag as TagIcon, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import NoteToolbar from "@/components/notes/NoteToolbar";
import NoteEditor from "@/components/notes/NoteEditor";
import AIAssistantPanel from "@/components/ai/AIAssistantPanel";

export default function NewNotePage() {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [selectedNotebook, setSelectedNotebook] = useState("Choose Notebook...");
  const [tags, setTags] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleExport = () => {
    console.log("Export note");
    // Future: Implement export functionality
  };

  const handleSave = () => {
    console.log("Save note", { noteTitle, noteContent, selectedNotebook, tags });
    // Future: Implement save functionality
  };

  const handleFormat = (action) => {
    console.log("Format action:", action);
    // Future: Implement formatting actions
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Note</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Note</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left/Main Section - Editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Notebook and Tags Selectors */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Notebook Selector */}
              <div className="relative flex-1">
                <button className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedNotebook}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Tags Input */}
              <div className="relative flex-1">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg">
                  <TagIcon className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Add tags..."
                    className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Note Title */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note Title"
                className="w-full text-2xl sm:text-3xl font-light text-gray-300 outline-none placeholder-gray-300"
              />
            </div>

            {/* Editor Section */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Toolbar */}
              <div className="p-3 border-b border-gray-200">
                <NoteToolbar onFormat={handleFormat} />
              </div>

              {/* Editor */}
              <NoteEditor
                value={noteContent}
                onChange={setNoteContent}
                placeholder="Start typing your thoughts..."
              />
            </div>
          </div>

          {/* Right Section - AI Assistant */}
          <div className="lg:col-span-1">
            <AIAssistantPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
