"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NoteDetailPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/notes/${params.noteId}`);
        if (!res.ok) {
          throw new Error("Failed to load note");
        }
        const data = await res.json();

        if (!cancelled) {
          setNote(data.note);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [params.noteId]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6 text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => router.push("/notes")}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg"
        >
          Back to notes
        </button>
      </div>
    );
  }

  if (!note) {
    return <div className="max-w-4xl mx-auto p-6 text-gray-600">Note not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{note.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        {Array.isArray(note.tags) && note.tags.length > 0
          ? note.tags.map((t) => `#${t}`).join(" ")
          : "No tags"}
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4 whitespace-pre-wrap text-gray-800">
        {note.content}
      </div>
    </div>
  );
}
