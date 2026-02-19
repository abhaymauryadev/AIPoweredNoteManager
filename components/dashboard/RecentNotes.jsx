"use client";

import { FileText, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

export default function RecentNotes({ notes = [] }) {
    const router = useRouter();

    const handleViewAll = () => {
        router.push("/notes");
    };

    const handleOpenNote = (id) => {
        if (!id) return;
        router.push(`/notes/${id}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recently Edited Notes</h3>
                <button
                    onClick={handleViewAll}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    View All
                </button>
            </div>
            <div className="space-y-4">
                {notes.length === 0 && (
                    <p className="text-sm text-gray-500">No recent notes yet. Create your first note to see it here.</p>
                )}
                {notes.map((note) => (
                    <div
                        key={note._id}
                        onClick={() => handleOpenNote(note._id)}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-50 hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 line-clamp-1">
                                    {note.title || "Untitled note"}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    Edited {formatDate(note.updatedAt || note.createdAt)}{" "}
                                    {Array.isArray(note.tags) && note.tags.length > 0 && (
                                        <>• {note.tags[0]}</>
                                    )}
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    </div>
                ))}
            </div>
        </div>
    );
}
