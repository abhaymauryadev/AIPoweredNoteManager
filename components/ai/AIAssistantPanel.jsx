"use client";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import SummaryPanel from "./SummaryPanel";
import TagsPanel from "./TagsPanel";
import SuggestionsPanel from "./SuggestionsPanel";

export default function AIAssistantPanel({ content = "" }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [resultType, setResultType] = useState(null);

    async function callAI(endpoint, type) {
        const text = content?.replace(/<[^>]*>/g, "").trim();
        if (!text) {
            setError("Add some content to your note first.");
            setResult(null);
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        setResultType(type);

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: text }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "AI request failed");
            }

            const data = await res.json();
            if (type === "summary") setResult(data.summary);
            if (type === "tags") setResult(data.tags);
            if (type === "suggestions") setResult(data.suggestions);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const handleSummarize = () => callAI("/api/ai/summarize", "summary");
    const handleGenerateTags = () => callAI("/api/ai/tags", "tags");
    const handleSuggestTopics = () => callAI("/api/ai/related", "suggestions");

    function renderResult() {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center gap-3 min-h-[200px]">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    <p className="text-sm text-gray-500">Thinking...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="min-h-[200px] flex items-center justify-center">
                    <p className="text-sm text-red-500 text-center">{error}</p>
                </div>
            );
        }

        if (result && resultType === "summary") {
            return (
                <div className="min-h-[200px]">
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">Summary</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{result}</p>
                </div>
            );
        }

        if (result && resultType === "tags") {
            return (
                <div className="min-h-[200px]">
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-3">Generated Tags</p>
                    <div className="flex flex-wrap gap-2">
                        {(Array.isArray(result) ? result : [result]).map((tag, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            );
        }

        if (result && resultType === "suggestions") {
            return (
                <div className="min-h-[200px]">
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-3">Related Topics</p>
                    <ul className="space-y-2">
                        {(Array.isArray(result) ? result : [result]).map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                                {topic}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center gap-3 min-h-[200px]">
                <Sparkles className="w-12 h-12 text-purple-300" />
                <p className="text-gray-500 text-sm text-center">
                    Type some content and click<br />an AI action to see results<br />here.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 h-fit lg:sticky lg:top-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
            </div>

            {/* AI Actions */}
            <div className="space-y-1 mb-6">
                <SummaryPanel onClick={handleSummarize} disabled={loading} />
                <TagsPanel onClick={handleGenerateTags} disabled={loading} />
                <SuggestionsPanel onClick={handleSuggestTopics} disabled={loading} />
            </div>

            {/* AI Output */}
            <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    AI OUTPUT
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    {renderResult()}
                </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 mb-1">Pro Tip:</p>
                <p className="text-sm text-blue-700">
                    Use "<span className="font-mono font-semibold">/</span>" command in the{" "}
                    <span className="font-semibold">editor</span> to quickly access AI features while writing.
                </p>
            </div>
        </div>
    );
}
