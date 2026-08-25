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
  let insightMessage = "";

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
    const rawRecentNotes = await Note.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("_id title summary tags createdAt updatedAt")
      .lean();

    recentNotes = rawRecentNotes.map((note) => ({
      ...note,
      _id: note._id.toString(),
      createdAt: note.createdAt?.toISOString() ?? null,
      updatedAt: note.updatedAt?.toISOString() ?? null,
    }));

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

      // Generate AI insight message based on data
      const topTags = Array.from(tagCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([tag]) => tag);

      if (topTags.length > 0) {
        const tagList = topTags.length === 1 
          ? `"${topTags[0]}"` 
          : topTags.length === 2
          ? `"${topTags[0]}" and "${topTags[1]}"`
          : `"${topTags[0]}", "${topTags[1]}", and "${topTags[2]}"`;

        insightMessage = `Your notes show a strong focus on ${tagList} topics. `;
        
        if (totalNotes > 10) {
          insightMessage += `With ${totalNotes} notes, you might benefit from organizing related content into folders or consolidating similar tags.`;
        } else if (recentTags > 5) {
          insightMessage += `You're using ${recentTags} different tags - consider consolidating similar tags to improve organization.`;
        } else {
          insightMessage += `Keep up the great organization! Your notes are well-tagged and easy to find.`;
        }
      }
    } else if (totalNotes > 0) {
      insightMessage = `You have ${totalNotes} notes. Consider adding tags to your notes to improve organization and make them easier to find later.`;
    } else {
      insightMessage = `Start creating notes to see AI-powered insights about your content patterns and organization suggestions.`;
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
          <AIInsights themes={themes} insightMessage={insightMessage} />
        </div>
      </div>
    </div>
  );
}
