"use client";

export default function WelcomeSection({ user }) {
    const name = user?.name?.split(" ")[0] || "User";

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                Welcome back, {name}! <span className="text-2xl">👋</span>
            </h2>
            <p className="text-gray-500 mt-1">
                Here&apos;s what&apos;s happening with your notes and AI insights today.
            </p>
        </div>
    );
}
