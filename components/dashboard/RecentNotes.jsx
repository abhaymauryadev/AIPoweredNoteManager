"use client";

import { FileText, ChevronRight } from "lucide-react";

export default function RecentNotes() {
    const notes = [
        {
            id: 1,
            title: "Project Alpha Strategy Meeting",
            updatedAt: "2 hours ago",
            tag: "Work",
        },
        {
            id: 2,
            title: "Weekly Grocery List",
            updatedAt: "5 hours ago",
            tag: "Personal",
        },
        {
            id: 3,
            title: "Blog Post: AI Trends 2024",
            updatedAt: "Yesterday",
            tag: "Creative",
        },
        {
            id: 4,
            title: "Research Notes: Sustainable Energy",
            updatedAt: "2 days ago",
            tag: "Study",
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recently Edited Notes</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View All
                </button>
            </div>
            <div className="space-y-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-50 hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">{note.title}</h4>
                                <p className="text-sm text-gray-500">
                                    Edited {note.updatedAt} • {note.tag}
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
