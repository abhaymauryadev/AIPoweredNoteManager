"use client";
import { useRef, useEffect } from "react";

export default function NoteEditor({ value, onChange, placeholder = "Start typing your thoughts..." }) {
    const textareaRef = useRef(null);

    // Auto-resize textarea as content grows
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-[400px] p-4 border-none outline-none resize-none text-gray-700 placeholder-gray-400 text-base leading-relaxed"
            style={{ overflow: "hidden" }}
        />
    );
}
