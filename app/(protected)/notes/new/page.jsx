"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Upload, Save, FolderOpen, Tag as TagIcon, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import NoteToolbar from "@/components/notes/NoteToolbar";
import NoteEditor from "@/components/notes/NoteEditor";
import AIAssistantPanel from "@/components/ai/AIAssistantPanel";
import { useNotes } from "@/hooks/useNotes";

export default function NewNotePage() {
  const router = useRouter();
  const { createNote } = useNotes();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [folders, setFolders] = useState([]);
  const [foldersLoading, setFoldersLoading] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedNotebook, setSelectedNotebook] = useState("Choose Notebook...");
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);
  const notebookRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFolders() {
      try {
        setFoldersLoading(true);
        const res = await fetch("/api/folders");
        if (!res.ok) return;
        const data = await res.json();

        const list = Array.isArray(data.folders) ? data.folders : [];
        if (cancelled) return;

        setFolders(list);

        const general = list.find((f) => f.name?.toLowerCase() === "general");
        const initial = general || list[0];
        if (initial?._id) {
          setSelectedFolderId(initial._id);
          setSelectedNotebook(initial.name);
        }
      } finally {
        if (!cancelled) setFoldersLoading(false);
      }
    }

    loadFolders();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!notebookRef.current) return;
      if (!notebookRef.current.contains(e.target)) {
        setNotebookOpen(false);
      }
    }

    if (notebookOpen) {
      document.addEventListener("mousedown", onDocMouseDown);
      return () => document.removeEventListener("mousedown", onDocMouseDown);
    }
  }, [notebookOpen]);

  const handleBack = () => {
    router.back();
  };

  const handleExport = () => {
    console.log("Export note");
    // Future: Implement export functionality
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const tagList = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await createNote({
        title: noteTitle?.trim() || "Untitled note",
        content: noteContent || "",
        tags: tagList,
        folderId: selectedFolderId || undefined,
      });

      router.push("/notes");
    } finally {
      setSaving(false);
    }
  };

  const handleFormat = (action) => {
    console.log("Format action:", action);
    // Formatting actions now handled by TipTap internally
  };

  useEffect(() => {
    // Listen for custom events dispatched by the slash command menu
    const onAskAi = () => console.log('Slash Command: Ask AI triggered');
    const onSummarize = () => console.log('Slash Command: Summarize triggered');
    const onFixGrammar = () => console.log('Slash Command: Fix Grammar triggered');

    document.addEventListener('ai-ask', onAskAi);
    document.addEventListener('ai-summarize', onSummarize);
    document.addEventListener('ai-fix-grammar', onFixGrammar);

    return () => {
        document.removeEventListener('ai-ask', onAskAi);
        document.removeEventListener('ai-summarize', onSummarize);
        document.removeEventListener('ai-fix-grammar', onFixGrammar);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
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
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Note"}</span>
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
              <div ref={notebookRef} className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setNotebookOpen((v) => !v)}
                  className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      {foldersLoading ? "Loading notebooks..." : selectedNotebook}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {notebookOpen && (
                  <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {folders.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No notebooks yet. Notes will be saved to “General”.
                      </div>
                    ) : (
                      <div className="max-h-56 overflow-auto">
                        {folders.map((f) => (
                          <button
                            key={f._id}
                            type="button"
                            onClick={() => {
                              setSelectedFolderId(f._id);
                              setSelectedNotebook(f.name);
                              setNotebookOpen(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700"
                          >
                            {f.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
              <div className="border-b border-gray-200">
                <NoteToolbar editor={editor} />
              </div>

              {/* Editor */}
              <NoteEditor
                value={noteContent}
                onChange={setNoteContent}
                placeholder="Start typing your thoughts..."
                onEditorReady={setEditor}
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
