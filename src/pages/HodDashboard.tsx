import { mockActivities } from "@/lib/mockData";
import { StatCard } from "@/components/StatsCards";
import { ActivityTable } from "@/components/ActivityTable";
import { Building2, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export function HodDashboard() {
  const pendingForHod = mockActivities.filter((a) => a.facultyStatus === "approved" && a.hodStatus === "pending");
  const allDeptRequests = mockActivities;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display">HOD Dashboard</h2>
        <p className="text-muted-foreground">Department-level approvals and oversight</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Awaiting Approval" value={pendingForHod.length} icon={Clock} />
        <StatCard label="Department Requests" value={allDeptRequests.length} icon={Building2} />
        <StatCard label="Approved" value={2} change="+1 this week" trend="up" icon={CheckCircle} />
        <StatCard label="Rejected / Revised" value={2} icon={XCircle} />
      </div>

      <div>
        <h3 className="text-lg font-semibold font-display mb-3">Pending Department Approvals</h3>
        <ActivityTable
          activities={pendingForHod}
          showActions={true}
          actionType="review"
          onApprove={(a) => toast.success(`Approved: ${a.eventName}`)}
          onReject={(a) => toast.error(`Rejected: ${a.eventName}`)}
          onRevision={(a) => toast.info(`Revision requested for: ${a.eventName}`)}
        />
        {pendingForHod.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No pending department approvals</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold font-display mb-3">All Department Requests</h3>
        <ActivityTable activities={allDeptRequests} showActions={true} actionType="view" />
      </div>
    </div>
  );
}
