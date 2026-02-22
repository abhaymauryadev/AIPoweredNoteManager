import { getServerSession } from "next-auth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentNotes from "@/components/dashboard/RecentNotes";
import AIInsights from "@/components/dashboard/AIInsights";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  let totalNotes = 0;
  let aiSummaries = 0;
  let recentTags = 0;
  let recentNotes = [];
  let themes = [];

  if (userId) {
    await connectDB();

    // Get total count of all notes
    totalNotes = await Note.countDocuments({ userId });

    // Get all notes for summaries and tags calculation (not limited)
    const allNotes = await Note.find({ userId })
      .select("summary tags");

    // Count notes with summaries
    aiSummaries = allNotes.filter(
      (note) => Array.isArray(note.summary) && note.summary.length > 0
    ).length;

    // Calculate tags from all notes
    const tagsSet = new Set();
    const tagCounts = new Map();
    let totalTagUses = 0;

    allNotes.forEach((note) => {
      if (Array.isArray(note.tags)) {
        note.tags.forEach((tag) => {
          tagsSet.add(tag);
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
          totalTagUses += 1;
        });
      }
    });

    recentTags = tagsSet.size;

    // Get recent notes for display (limited to 5)
    recentNotes = await Note.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("_id title summary tags createdAt updatedAt");

    // Calculate themes from all notes
    if (tagCounts.size > 0 && totalTagUses > 0) {
      const colors = ["bg-purple-500", "bg-blue-500", "bg-green-500", "bg-pink-500"];

      themes = Array.from(tagCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([tag, count], index) => ({
          name: tag,
          percentage: Math.round((count / totalTagUses) * 100),
          color: colors[index % colors.length],
        }));
    }
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full">
      <DashboardHeader />

      <WelcomeSection user={session?.user} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon="FileText"
          label="Total Notes"
          value={String(totalNotes)}
          color="blue"
        />
        <StatsCard
          icon="Sparkles"
          label="AI Summaries"
          value={String(aiSummaries)}
          color="purple"
        />
        <StatsCard
          icon="Hash"
          label="Recent Tags"
          value={String(recentTags)}
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Notes */}
        <div className="lg:col-span-2">
          <RecentNotes notes={recentNotes} />
        </div>

        {/* Right Column - AI Insights */}
        <div className="lg:col-span-1">
          <AIInsights themes={themes} />
        </div>
      </div>
    </div>
  );
}
