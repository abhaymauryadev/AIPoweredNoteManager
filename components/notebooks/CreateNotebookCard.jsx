"use client";

import { Plus } from "lucide-react";

export default function CreateNotebookCard() {
    return (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center min-h-[240px]">
            <div className="p-4 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors mb-3">
                <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
                Create New Notebook
            </p>
        </div>
    );
}
