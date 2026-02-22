"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

export default function ActivityOverview() {
    const [stats, setStats] = useState({
        totalNotes: 0,
        previousTotal: 0,
        mostActiveNotebook: null,
        mostActivePercentage: 0,
        aiSummaries: 0,
        aiUsagePercentage: 0,
        loading: true,
    });

    useEffect(() => {
        fetchActivityStats();
    }, []);

    async function fetchActivityStats() {
        try {
            // Fetch notes and folders
            const [notesRes, foldersRes] = await Promise.all([
                fetch("/api/notes"),
                fetch("/api/folders"),
            ]);

            const notesData = await notesRes.json();
            const foldersData = await foldersRes.json();

            const notes = notesData.notes || [];
            const folders = foldersData.folders || [];

            // Calculate total notes
            const totalNotes = notes.length;

            // Calculate notes with summaries (AI usage)
            const notesWithSummaries = notes.filter(
                (note) => Array.isArray(note.summary) && note.summary.length > 0
            );
            const aiSummaries = notesWithSummaries.length;
            const aiUsagePercentage = totalNotes > 0 
                ? Math.round((aiSummaries / totalNotes) * 100) 
                : 0;

            // Find most active notebook (folder with most notes)
            const folderNoteCounts = folders.map((folder) => {
                const folderNotes = notes.filter(
                    (note) => note.folderId?.toString() === folder._id.toString()
                );
                return {
                    folder,
                    count: folderNotes.length,
                };
            });

            const sortedFolders = folderNoteCounts.sort((a, b) => b.count - a.count);
            const mostActive = sortedFolders[0];
            const mostActivePercentage = totalNotes > 0 && mostActive
                ? Math.round((mostActive.count / totalNotes) * 100)
                : 0;

            // Calculate growth (compare with notes created in last 30 days vs previous 30 days)
            const now = new Date();
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

            const recentNotes = notes.filter(
                (note) => new Date(note.createdAt) >= thirtyDaysAgo
            ).length;

            const previousNotes = notes.filter(
                (note) => {
                    const createdAt = new Date(note.createdAt);
                    return createdAt >= sixtyDaysAgo && createdAt < thirtyDaysAgo;
                }
            ).length;

            const growthPercentage = previousNotes > 0
                ? Math.round(((recentNotes - previousNotes) / previousNotes) * 100)
                : recentNotes > 0 ? 100 : 0;

            setStats({
                totalNotes,
                growthPercentage,
                mostActiveNotebook: mostActive?.folder?.name || "None",
                mostActivePercentage,
                aiSummaries,
                aiUsagePercentage,
                loading: false,
            });
        } catch (error) {
            console.error("Error fetching activity stats:", error);
            setStats((prev) => ({ ...prev, loading: false }));
        }
    }

    if (stats.loading) {
        return (
            <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Activity Overview</h2>
                <div className="text-center py-8 text-gray-500">Loading activity stats...</div>
            </div>
        );
    }

    return (
        <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Activity Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Notes Card */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <p className="text-sm font-medium text-blue-100 mb-2">Total Notes</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-bold">{stats.totalNotes.toLocaleString()}</h3>
                        {stats.growthPercentage !== 0 && (
                            <div className={`flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full ${
                                stats.growthPercentage < 0 ? "bg-red-500/30" : ""
                            }`}>
                                <TrendingUp className="w-4 h-4" />
                                <span>{stats.growthPercentage > 0 ? "+" : ""}{stats.growthPercentage}%</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Most Active Notebook Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-2">Most Active Notebook</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
                        {stats.mostActiveNotebook}
                    </h3>
                    {stats.mostActivePercentage > 0 ? (
                        <>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div 
                                    className="bg-green-500 h-2 rounded-full transition-all" 
                                    style={{ width: `${stats.mostActivePercentage}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500">{stats.mostActivePercentage}% of total notes</p>
                        </>
                    ) : (
                        <p className="text-xs text-gray-400">No activity yet</p>
                    )}
                </div>

                {/* AI Usage Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-2">AI Usage</p>
                    <h3 className="text-4xl font-bold text-gray-900 mb-1">
                        {stats.aiSummaries} <span className="text-lg font-normal text-gray-500">Summaries</span>
                    </h3>
                    {stats.totalNotes > 0 ? (
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                    className="bg-purple-500 h-1.5 rounded-full transition-all" 
                                    style={{ width: `${stats.aiUsagePercentage}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">{stats.aiUsagePercentage}%</span>
                        </div>
                    ) : (
                        <p className="text-xs text-gray-400 mt-2">No notes yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}
