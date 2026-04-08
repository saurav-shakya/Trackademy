import { mockActivities } from "@/lib/mockData";
import { StatCard } from "@/components/StatsCards";
import { ActivityTable } from "@/components/ActivityTable";
import { ClipboardCheck, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export function FacultyDashboard() {
  const pendingForFaculty = mockActivities.filter((a) => a.facultyStatus === "pending");
  const allAssigned = mockActivities;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display">Faculty Dashboard</h2>
        <p className="text-muted-foreground">Review and approve student activity requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Reviews" value={pendingForFaculty.length} icon={Clock} />
        <StatCard label="Total Assigned" value={allAssigned.length} icon={ClipboardCheck} />
        <StatCard label="Approved" value={3} change="+1 today" trend="up" icon={CheckCircle} />
        <StatCard label="Rejected" value={1} icon={XCircle} />
      </div>

      <div>
        <h3 className="text-lg font-semibold font-display mb-3">Pending Reviews</h3>
        <ActivityTable
          activities={pendingForFaculty}
          showActions={true}
          actionType="review"
          onApprove={(a) => toast.success(`Approved: ${a.eventName}`)}
          onReject={(a) => toast.error(`Rejected: ${a.eventName}`)}
          onRevision={(a) => toast.info(`Revision requested for: ${a.eventName}`)}
        />
        {pendingForFaculty.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <ClipboardCheck className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No pending reviews at the moment</p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold font-display mb-3">All Assigned Requests</h3>
        <ActivityTable activities={allAssigned} showActions={true} actionType="view" />
      </div>
    </div>
  );
}
