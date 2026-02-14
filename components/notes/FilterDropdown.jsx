"use client";
import { ChevronDown } from "lucide-react";

export default function FilterDropdown({ label, value, onChange, options }) {
    return (
        <div className="relative">
            <label className="block text-xs text-gray-500 mb-1.5">
                {label}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="appearance-none w-full sm:w-auto min-w-[140px] px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
}
