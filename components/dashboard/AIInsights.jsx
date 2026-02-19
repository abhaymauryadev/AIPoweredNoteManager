"use client";

import { Sparkles, ArrowRight } from "lucide-react";

const defaultThemes = [
    { name: "Productivity & Efficiency", percentage: 42, color: "bg-purple-500" },
    { name: "Emerging Technologies", percentage: 28, color: "bg-blue-500" },
    { name: "Wellness & Mindfulness", percentage: 15, color: "bg-green-500" },
];

export default function AIInsights({ themes }) {
    const data = themes && themes.length > 0 ? themes : defaultThemes;

    return (
        <div className="bg-purple-50/50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100 mb-6">
                <h4 className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-4">
                    Common Themes
                </h4>
                <div className="space-y-4">
                    {data.map((theme) => (
                        <div key={theme.name}>
                            <div className="flex justify-between text-sm font-medium mb-1">
                                <span className="text-gray-700">{theme.name}</span>
                                <span className="text-purple-600">{theme.percentage}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${theme.color} rounded-full`}
                                    style={{ width: `${theme.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100 mb-6 italic text-gray-600 text-sm leading-relaxed">
                &quot;Your recent notes show a strong focus on strategic planning and
                operational workflows. You might benefit from consolidating your
                &apos;Alpha&apos; project tags.&quot;
            </div>

            <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-sm shadow-purple-200">
                Detailed AI Report
            </button>
        </div>
    );
}
