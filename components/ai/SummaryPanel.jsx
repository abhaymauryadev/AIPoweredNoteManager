"use client";
import { FileText, ChevronRight } from "lucide-react";

export default function SummaryPanel({ onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
        >
            <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 font-medium">Summarize</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
    );
}
