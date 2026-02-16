"use client";

import { ChevronRight, Briefcase, User, AlertCircle, Folder, Lightbulb } from "lucide-react";

const iconMap = {
    Briefcase,
    User,
    AlertCircle,
    Folder,
    Lightbulb,
};

export default function TagCard({ tag, viewMode }) {
    const Icon = iconMap[tag.icon] || Briefcase;

    if (viewMode === "grid") {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                    <div className={`p-4 ${tag.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-8 h-8 ${tag.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{tag.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">Created on {tag.createdDate}</p>
                    <div className="mt-2">
                        <p className="text-3xl font-bold text-gray-900">{tag.noteCount}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Notes</p>
                    </div>
                </div>
            </div>
        );
    }

    // List view
    return (
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`p-3 sm:p-4 ${tag.bgColor} rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${tag.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                        {tag.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                        Created on {tag.createdDate}
                    </p>
                </div>

                {/* Note Count */}
                <div className="text-right flex-shrink-0">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{tag.noteCount}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Notes</p>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
        </div>
    );
}
