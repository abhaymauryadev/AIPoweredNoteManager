"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Plus, FolderOpen } from "lucide-react";
import NoteCard from "@/components/notes/NoteCard";

export default function FolderDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [folder, setFolder] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const [folderRes, notesRes] = await Promise.all([
                    fetch(`/api/folders/${id}`),
                    fetch("/api/notes"),
                ]);

                if (!folderRes.ok) throw new Error("Folder not found");

                const { folder: folderData } = await folderRes.json();
                const { notes: allNotes = [] } = await notesRes.json();

                if (cancelled) return;
                setFolder(folderData);
                setNotes(allNotes.filter((n) => n.folderId?.toString() === id));
            } catch (err) {
                if (!cancelled) setError(err.message || "Something went wrong");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, [id]);

    async function handleDelete(noteId) {
        const res = await fetch(`/api/notes/${noteId}`, { method: "DELETE" });
        if (res.ok) setNotes((prev) => prev.filter((n) => n._id !== noteId));
    }

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-8 text-gray-500">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => router.push("/notebooks")}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg"
                >
                    Back to Notebooks
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <FolderOpen className="w-6 h-6 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900">{folder?.name}</h1>
                    <span className="text-sm text-gray-400">
                        {notes.length} {notes.length === 1 ? "note" : "notes"}
                    </span>
                </div>

                <button
                    onClick={() => router.push(`/notes/new?folderId=${id}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    New Note
                </button>
            </div>

            {/* Notes Grid */}
            {notes.length === 0 ? (
                <div className="text-center py-16">
                    <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No notes in this folder yet.</p>
                    <button
                        onClick={() => router.push(`/notes/new?folderId=${id}`)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Create First Note
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={{ ...note, id: note._id }}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
