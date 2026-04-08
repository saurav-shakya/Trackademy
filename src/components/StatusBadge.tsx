import { ApprovalStatus, getStatusColor, getStatusLabel } from "@/lib/mockData";

export function StatusBadge({ status }: { status: ApprovalStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
}
