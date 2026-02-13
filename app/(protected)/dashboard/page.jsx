import { getServerSession } from "next-auth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentNotes from "@/components/dashboard/RecentNotes";
import AIInsights from "@/components/dashboard/AIInsights";


export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full">
      <DashboardHeader />

      <WelcomeSection user={session?.user} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon="FileText"
          label="Total Notes"
          value="124"
          color="blue"
        />
        <StatsCard
          icon="Sparkles"
          label="AI Summaries"
          value="56"
          color="purple"
        />
        <StatsCard
          icon="Hash"
          label="Recent Tags"
          value="18"
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Notes */}
        <div className="lg:col-span-2">
          <RecentNotes />
        </div>

        {/* Right Column - AI Insights */}
        <div className="lg:col-span-1">
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
