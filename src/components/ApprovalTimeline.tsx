import { ActivityRequest, ApprovalStatus } from "@/lib/mockData";
import { Check, Clock, X, MessageSquare } from "lucide-react";

const stepIcon = (status: ApprovalStatus) => {
  switch (status) {
    case "approved": return <Check className="h-3.5 w-3.5" />;
    case "pending": return <Clock className="h-3.5 w-3.5" />;
    case "rejected": return <X className="h-3.5 w-3.5" />;
    case "revision": return <MessageSquare className="h-3.5 w-3.5" />;
  }
};

const stepColor = (status: ApprovalStatus) => {
  switch (status) {
    case "approved": return "bg-success text-success-foreground";
    case "pending": return "bg-warning text-warning-foreground";
    case "rejected": return "bg-destructive text-destructive-foreground";
    case "revision": return "bg-info text-info-foreground";
  }
};

const lineColor = (status: ApprovalStatus) => {
  switch (status) {
    case "approved": return "bg-success";
    default: return "bg-border";
  }
};

export function ApprovalTimeline({ activity }: { activity: ActivityRequest }) {
  const steps = [
    { label: "Submitted", status: "approved" as ApprovalStatus },
    { label: "Faculty", status: activity.facultyStatus },
    { label: "HOD", status: activity.hodStatus },
    { label: "Admin", status: activity.adminStatus },
  ];

  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full ${stepColor(step.status)}`}>
              {stepIcon(step.status)}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-0.5 flex-1 mx-1 ${lineColor(step.status)} rounded-full mt-[-16px]`} />
          )}
        </div>
      ))}
    </div>
  );
}
