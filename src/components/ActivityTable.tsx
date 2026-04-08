import { ActivityRequest } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Check, X, MessageSquare } from "lucide-react";

interface ActivityTableProps {
  activities: ActivityRequest[];
  showActions?: boolean;
  actionType?: "review" | "view";
  onView?: (activity: ActivityRequest) => void;
  onApprove?: (activity: ActivityRequest) => void;
  onReject?: (activity: ActivityRequest) => void;
  onRevision?: (activity: ActivityRequest) => void;
}

export function ActivityTable({
  activities,
  showActions = true,
  actionType = "view",
  onApprove,
  onReject,
  onRevision,
}: ActivityTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">ID</TableHead>
            <TableHead className="font-semibold">Student</TableHead>
            <TableHead className="font-semibold">Event</TableHead>
            <TableHead className="font-semibold">Department</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Budget</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            {showActions && <TableHead className="font-semibold text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id} className="hover:bg-muted/50">
              <TableCell className="font-mono text-xs">{activity.id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-sm">{activity.studentName}</p>
                  <p className="text-xs text-muted-foreground">{activity.studentId}</p>
                </div>
              </TableCell>
              <TableCell className="max-w-[200px]">
                <p className="font-medium text-sm truncate">{activity.eventName}</p>
                <p className="text-xs text-muted-foreground">{activity.organizer}</p>
              </TableCell>
              <TableCell className="text-sm">{activity.department}</TableCell>
              <TableCell className="text-sm">{activity.eventDate}</TableCell>
              <TableCell className="text-sm">₹{activity.budgetRequested.toLocaleString()}</TableCell>
              <TableCell>
                <StatusBadge status={activity.status} />
              </TableCell>
              {showActions && (
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {actionType === "review" && activity.status === "pending" ? (
                      <>
                        <Button size="sm" variant="ghost" className="h-7 text-success hover:text-success" onClick={() => onApprove?.(activity)}>
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-destructive hover:text-destructive" onClick={() => onReject?.(activity)}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-info hover:text-info" onClick={() => onRevision?.(activity)}>
                          <MessageSquare className="h-3.5 w-3.5" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="ghost" className="h-7">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
