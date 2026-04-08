import { mockActivities } from "@/lib/mockData";
import { StatCard } from "@/components/StatsCards";
import { ActivityTable } from "@/components/ActivityTable";
import { ShieldCheck, Clock, DollarSign, Award, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function AdminDashboard() {
  const pendingFinal = mockActivities.filter((a) => a.hodStatus === "approved" && a.adminStatus === "pending");
  const reimbursementsPending = mockActivities.filter((a) => a.hasReimbursement && a.status === "approved");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display">Admin Dashboard</h2>
        <p className="text-muted-foreground">System-wide management and final approvals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Final Approvals" value={pendingFinal.length} icon={Clock} />
        <StatCard label="Total Requests" value={mockActivities.length} icon={ShieldCheck} />
        <StatCard label="Reimbursements" value={reimbursementsPending.length} icon={DollarSign} />
        <StatCard label="Certificates" value={2} change="+1 today" trend="up" icon={Award} />
        <StatCard label="Active Students" value={42} change="+8 this month" trend="up" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-display">Pending Final Approvals</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {pendingFinal.length > 0 ? (
              <ActivityTable
                activities={pendingFinal}
                showActions={true}
                actionType="review"
                onApprove={(a) => toast.success(`Final approval granted: ${a.eventName}`)}
                onReject={(a) => toast.error(`Rejected: ${a.eventName}`)}
                onRevision={(a) => toast.info(`Revision requested: ${a.eventName}`)}
              />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ShieldCheck className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>All caught up! No pending approvals.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg. Approval Time</span>
              <span className="text-sm font-semibold">3.2 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Approval Rate</span>
              <span className="text-sm font-semibold text-success">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="text-sm font-semibold">12 submissions</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Departments Active</span>
              <span className="text-sm font-semibold">4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Budget Disbursed</span>
              <span className="text-sm font-semibold">₹1,23,000</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold font-display mb-3">All Requests</h3>
        <ActivityTable activities={mockActivities} showActions={true} actionType="view" />
      </div>
    </div>
  );
}
