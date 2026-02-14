"use client";

export default function NoteCard({ note }) {
    const getCategoryColor = (category) => {
        const colors = {
            Work: "bg-blue-100 text-blue-700",
            Personal: "bg-green-100 text-green-700",
            Projects: "bg-purple-100 text-purple-700",
        };
        return colors[category] || "bg-gray-100 text-gray-700";
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow duration-200 cursor-pointer">
            {/* Header with Title and Category */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex-1 line-clamp-1">
                    {note.title}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getCategoryColor(note.category)}`}>
                    {note.category}
                </span>
            </div>

            {/* Content Preview */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {note.content}
            </p>

            {/* Tags */}
            {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {note.tags.map((tag, index) => (
                        <span key={index} className="text-xs text-blue-600">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Date */}
            <div className="text-xs text-gray-400">
                Created: {formatDate(note.createdAt)}
            </div>
        </div>
    );
}
