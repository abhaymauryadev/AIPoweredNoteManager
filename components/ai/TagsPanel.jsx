"use client";
import { Tag, ChevronRight } from "lucide-react";

export default function TagsPanel({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
            type="button"
        >
            <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">Generate Tags</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
    );
}
