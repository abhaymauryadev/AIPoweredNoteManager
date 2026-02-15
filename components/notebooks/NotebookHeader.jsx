"use client";

import { Search, Bell, Moon } from "lucide-react";

export default function NotebookHeader() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notebooks</h1>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notebooks..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white transition-all text-sm"
                    />
                </div>

                <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                </button>

                <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Moon className="w-5 h-5 text-gray-600" />
                </button>
            </div>
        </div>
    );
}
