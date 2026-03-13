"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { SlashCommands, slashCommandPlugin } from "./editor/slashExtension";

export default function NoteEditor({ value, onChange, placeholder = "Start typing your thoughts...", onEditorReady }) {
    const [isMounted, setIsMounted] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            Image.configure({
                inline: true,
            }),
            SlashCommands.configure({
                suggestion: slashCommandPlugin
            })
        ],
        immediatelyRender: false,
        content: value,
        editorProps: {
            attributes: {
                class: 'w-full min-h-[400px] p-4 border-none outline-none resize-none text-gray-700 placeholder-gray-400 text-base leading-relaxed prose max-w-none focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (editor && onEditorReady) {
            onEditorReady(editor);
        }
    }, [editor, onEditorReady]);

    // Handle initial value update (e.g. loading an existing note)
    useEffect(() => {
        if (editor && value && editor.getHTML() !== value) {
            // Check if value is potentially HTML or plain text
            editor.commands.setContent(value);
        }
    }, [value, editor]);


    if (!isMounted) {
        return null;
    }

    return (
        <EditorContent editor={editor} />
    );
}
