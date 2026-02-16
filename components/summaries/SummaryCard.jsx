"use client";

import { Copy, Share2, RefreshCw, MoreVertical, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SummaryCard({ summary }) {
    const [copied, setCopied] = useState(false);

    const categoryColors = {
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        purple: "bg-purple-50 text-purple-700 border-purple-200",
        green: "bg-green-50 text-green-700 border-green-200",
    };

    const borderColors = {
        blue: "border-l-blue-400",
        purple: "border-l-purple-400",
        green: "border-l-green-400",
    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={`bg-white border-l-4 ${borderColors[summary.categoryColor]} border-r border-t border-b border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {summary.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span
                            className={`px-2.5 py-1 rounded-md text-xs font-medium border ${categoryColors[summary.categoryColor]
                                }`}
                        >
                            {summary.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            {summary.date}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="mb-4">
                {summary.insights && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                            <svg
                                className="w-4 h-4 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                                AI Key Insights
                            </span>
                        </div>
                        <ul className="space-y-2">
                            {summary.insights.map((insight, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                                    <span>{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {summary.actionItems && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="flex items-center gap-2 mb-3">
                            <svg
                                className="w-4 h-4 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                                Detected Action Items
                            </span>
                        </div>
                        <ul className="space-y-2">
                            {summary.actionItems.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={item.completed}
                                        onChange={() => { }}
                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-3 text-xs font-medium text-green-700 hover:text-green-800 transition-colors">
                            Add to Tasks
                        </button>
                    </div>
                )}

                {summary.summary && (
                    <div className="text-sm text-gray-700 leading-relaxed">
                        {summary.summary}
                    </div>
                )}

                {summary.tags && (
                    <div className="flex flex-wrap gap-2">
                        {summary.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                        <Copy className="w-4 h-4" />
                        {copied ? "Copied!" : "Copy"}
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5">
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                    View Full Note
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
