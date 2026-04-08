import { mockActivities } from "@/lib/mockData";
import { StatCard } from "@/components/StatsCards";
import { ActivityTable } from "@/components/ActivityTable";
import { ApprovalTimeline } from "@/components/ApprovalTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, Award } from "lucide-react";

export function StudentDashboard() {
  const myActivities = mockActivities.filter((a) => a.studentId === "STU-2024-001");
  const allActivities = mockActivities.slice(0, 3); // demo: show first few
  const latestActivity = mockActivities[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display">Welcome back, Aarav</h2>
        <p className="text-muted-foreground">Track your activities and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Submissions" value={6} change="+2 this month" trend="up" icon={FileText} />
        <StatCard label="Approved" value={2} icon={CheckCircle} />
        <StatCard label="Pending" value={2} icon={Clock} />
        <StatCard label="Certificates" value={2} change="+1 new" trend="up" icon={Award} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Latest Activity Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <p className="font-medium">{latestActivity.eventName}</p>
            <p className="text-sm text-muted-foreground">{latestActivity.organizer} · {latestActivity.eventDate}</p>
          </div>
          <ApprovalTimeline activity={latestActivity} />
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold font-display mb-3">Recent Activities</h3>
        <ActivityTable activities={allActivities} showActions={true} actionType="view" />
      </div>
    </div>
  );
}
