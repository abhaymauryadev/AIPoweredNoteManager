"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Upload, Save, FolderOpen, Tag as TagIcon, ChevronDown, Loader2 } from "lucide-react";
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

  // Keep refs so slash-command event handlers always see latest values
  const editorRef = useRef(null);
  const noteContentRef = useRef("");
  useEffect(() => { editorRef.current = editor; }, [editor]);
  useEffect(() => { noteContentRef.current = noteContent; }, [noteContent]);

  // Ask AI modal state
  const [askAiOpen, setAskAiOpen] = useState(false);
  const [askAiQuery, setAskAiQuery] = useState("");
  const [askAiLoading, setAskAiLoading] = useState(false);

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

  const handleAskAiSubmit = async () => {
    if (!askAiQuery.trim()) return;
    setAskAiLoading(true);
    try {
      const plain = noteContentRef.current?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: askAiQuery, context: plain || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "AI request failed");
      editorRef.current?.chain().focus().insertContent(`<p>${data.answer}</p>`).run();
      setAskAiOpen(false);
      setAskAiQuery("");
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setAskAiLoading(false);
    }
  };

  useEffect(() => {
    const onAskAi = () => setAskAiOpen(true);

    const onSummarize = async () => {
      const plain = noteContentRef.current?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      if (!plain) return;
      try {
        const res = await fetch("/api/ai/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: plain }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "AI request failed");
        editorRef.current
          ?.chain()
          .focus()
          .insertContent(`<hr><p><strong>Summary:</strong> ${data.summary}</p>`)
          .run();
      } catch (err) {
        alert(err.message || "Summarize failed");
      }
    };

    const onFixGrammar = async () => {
      const plain = noteContentRef.current?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      if (!plain) return;
      try {
        const res = await fetch("/api/ai/fix-grammar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: plain }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "AI request failed");
        editorRef.current?.commands.setContent(`<p>${data.fixed}</p>`);
      } catch (err) {
        alert(err.message || "Fix grammar failed");
      }
    };

    document.addEventListener('ai-ask', onAskAi);
    document.addEventListener('ai-summarize', onSummarize);
    document.addEventListener('ai-fix-grammar', onFixGrammar);

    return () => {
      document.removeEventListener('ai-ask', onAskAi);
      document.removeEventListener('ai-summarize', onSummarize);
      document.removeEventListener('ai-fix-grammar', onFixGrammar);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ask AI Modal */}
      {askAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Ask AI</h2>
            <textarea
              autoFocus
              value={askAiQuery}
              onChange={(e) => setAskAiQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAskAiSubmit(); } }}
              placeholder="What would you like AI to write or answer?"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 outline-none resize-none h-28 focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => { setAskAiOpen(false); setAskAiQuery(""); }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAskAiSubmit}
                disabled={askAiLoading || !askAiQuery.trim()}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {askAiLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {askAiLoading ? "Thinking..." : "Ask"}
              </button>
            </div>
          </div>
        </div>
      )}
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
            <AIAssistantPanel content={noteContent} />
          </div>
        </div>
      </div>
    </div>
  );
}
