"use client";

import { TrendingUp } from "lucide-react";

export default function ActivityOverview() {
    return (
        <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Activity Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Notes Card */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <p className="text-sm font-medium text-blue-100 mb-2">Total Notes</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-bold">1,248</h3>
                        <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
                            <TrendingUp className="w-4 h-4" />
                            <span>+15%</span>
                        </div>
                    </div>
                </div>

                {/* Most Active Notebook Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-2">Most Active Notebook</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Journal</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <p className="text-xs text-gray-500">75% of recent activity</p>
                </div>

                {/* AI Usage Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <p className="text-sm font-medium text-gray-500 mb-2">AI Usage</p>
                    <h3 className="text-4xl font-bold text-gray-900 mb-1">240 <span className="text-lg font-normal text-gray-500">Summaries</span></h3>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
