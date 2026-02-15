"use client";
import { Bold, Italic, Underline, List, ListOrdered, Quote, Link, Image, Code } from "lucide-react";

export default function NoteToolbar({ onFormat }) {
    const toolbarButtons = [
        { icon: Bold, label: "Bold", action: "bold" },
        { icon: Italic, label: "Italic", action: "italic" },
        { icon: Underline, label: "Underline", action: "underline" },
        { icon: List, label: "Bullet List", action: "bulletList" },
        { icon: ListOrdered, label: "Numbered List", action: "numberedList" },
        { icon: Quote, label: "Quote", action: "quote" },
        { icon: Link, label: "Link", action: "link" },
        { icon: Image, label: "Image", action: "image" },
        { icon: Code, label: "Code", action: "code" },
    ];

    const handleButtonClick = (action) => {
        if (onFormat) {
            onFormat(action);
        }
        console.log(`Format action: ${action}`);
    };

    return (
        <div className="flex items-center gap-1 p-2 border border-gray-200 rounded-lg bg-white overflow-x-auto">
            {toolbarButtons.map(({ icon: Icon, label, action }) => (
                <button
                    key={action}
                    onClick={() => handleButtonClick(action)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors shrink-0 group relative"
                    aria-label={label}
                    type="button"
                >
                    <Icon className="w-5 h-5 text-gray-700" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {label}
                    </span>
                </button>
            ))}
        </div>
    );
}
