"use client";

import { WelcomeHeader } from "@/features/dashboard/components/welcome-header";
import { StatsGrid } from "@/features/dashboard/components/stats-grid";
import { RecentTasks } from "@/features/dashboard/components/recent-tasks";
import { TodaysActivity } from "@/features/dashboard/components/todays-activity";
import { QuickActions } from "@/features/dashboard/components/quick-actions";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <WelcomeHeader />
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTasks />
        <div className="space-y-6">
          <TodaysActivity />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
