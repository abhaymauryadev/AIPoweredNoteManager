"use client";

import { MoreVertical, FileText, User, Lightbulb, Plane, BookOpen } from "lucide-react";

export default function NotebookCard({
    icon = "FileText",
    title,
    description,
    noteCount,
    lastUpdated,
    color = "blue"
}) {
    const colorStyles = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        pink: "bg-pink-100 text-pink-600",
        orange: "bg-orange-100 text-orange-600",
        purple: "bg-purple-100 text-purple-600",
    };

    const icons = {
        FileText,
        User,
        Lightbulb,
        Plane,
        BookOpen,
    };

    const Icon = icons[icon] || FileText;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>

            <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>{noteCount} Notes</span>
                </div>
                <span>Updated {lastUpdated}</span>
            </div>
        </div>
    );
}
