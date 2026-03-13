"use client";
import { Bold, Italic, Underline, List, ListOrdered, Quote, Link, Image, Code } from "lucide-react";

export default function NoteToolbar({ editor }) {
    if (!editor) {
        return null;
    }

    const toolbarButtons = [
        {
            icon: Bold,
            label: "Bold",
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold')
        },
        {
            icon: Italic,
            label: "Italic",
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic')
        },
        {
            icon: Underline,
            label: "Underline",
            action: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive('underline')
        },
        {
            icon: List,
            label: "Bullet List",
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList')
        },
        {
            icon: ListOrdered,
            label: "Numbered List",
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList')
        },
        {
            icon: Quote,
            label: "Quote",
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive('blockquote')
        },
        {
            icon: Link,
            label: "Link",
            action: () => {
                const previousUrl = editor.getAttributes('link').href;
                const url = window.prompt('URL', previousUrl);
                if (url === null) return;
                if (url === '') {
                    editor.chain().focus().extendMarkRange('link').unsetLink().run();
                    return;
                }
                editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            },
            isActive: editor.isActive('link')
        },
        {
            icon: Image,
            label: "Image",
            action: () => {
                const url = window.prompt('Image URL');
                if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            },
            isActive: editor.isActive('image')
        },
        {
            icon: Code,
            label: "Code",
            action: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: editor.isActive('codeBlock')
        },
    ];

    return (
        <div className="flex items-center gap-1 p-2 border border-gray-200 rounded-lg bg-white overflow-x-auto">
            {toolbarButtons.map(({ icon: Icon, label, action, isActive }) => (
                <button
                    key={label}
                    onClick={action}
                    className={`p-2 rounded transition-colors shrink-0 group relative ${
                        isActive ? 'bg-gray-200 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    aria-label={label}
                    type="button"
                >
                    <Icon className="w-5 h-5 current-color" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {label}
                    </span>
                </button>
            ))}
            
            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 mx-1" />
             <div className="text-xs text-gray-400 italic px-2">Type / for AI commands</div>
        </div>
    );
}
