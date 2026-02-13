"use client";

import { FileText, Sparkles, Hash } from "lucide-react";

export default function StatsCard({ icon, label, value, color = "blue" }) {
    const colorStyles = {
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        green: "bg-green-50 text-green-600",
    };

    const icons = {
        FileText,
        Sparkles,
        Hash,
    };

    const Icon = icons[icon];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
                {Icon && <Icon className="w-6 h-6" />}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );
}
