"use client";
import { Sparkles } from "lucide-react";
import SummaryPanel from "./SummaryPanel";
import TagsPanel from "./TagsPanel";
import SuggestionsPanel from "./SuggestionsPanel";

export default function AIAssistantPanel() {
    const handleSummarize = () => {
        console.log("Summarize clicked");
        // Future: Implement AI summarization
    };

    const handleGenerateTags = () => {
        console.log("Generate Tags clicked");
        // Future: Implement AI tag generation
    };

    const handleSuggestTopics = () => {
        console.log("Suggest Topics clicked");
        // Future: Implement AI topic suggestions
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 h-fit lg:sticky lg:top-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
            </div>

            {/* AI Actions */}
            <div className="space-y-1 mb-6">
                <SummaryPanel onClick={handleSummarize} />
                <TagsPanel onClick={handleGenerateTags} />
                <SuggestionsPanel onClick={handleSuggestTopics} />
            </div>

            {/* AI Output Preview */}
            <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    AI OUTPUT PREVIEW
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                    <div className="text-center">
                        <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">
                            Type some content and click<br />an AI action to see results<br />here.
                        </p>
                    </div>
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
