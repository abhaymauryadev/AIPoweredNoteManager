"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewNoteButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push("/notes/new")}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gray-900 text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-colors duration-200 z-50 flex justify-center items-center gap-2 group"
            aria-label="Create new note"
        >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300">
                New Note
            </span>
        </button>
    );
}
