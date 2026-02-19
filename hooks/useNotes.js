"use client";

import { useState, useEffect } from "react";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchNotes() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/notes");
      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await res.json();
      // API returns { notes: [...] }
      setNotes(Array.isArray(data.notes) ? data.notes : []);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function createNote(note) {
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (!res.ok) {
        throw new Error("Failed to create note");
      }

      const data = await res.json();
      const newNote = data.note || data;

      setNotes((prev) => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      console.error("Error creating note:", err);
      throw err;
    }
  }

  async function deleteNote(id) {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
      throw err;
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    createNote,
    deleteNote,
    refetch: fetchNotes,
  };
}