import { mockActivities } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Calendar, MapPin, Trophy } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { ApprovalTimeline } from "@/components/ApprovalTimeline";

export function StudentPortfolio() {
  const completedActivities = mockActivities.filter((a) => a.status === "approved");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display">My Portfolio</h2>
        <p className="text-muted-foreground">Your achievement timeline and shareable profile</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">AS</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold font-display">Aarav Sharma</h3>
              <p className="text-sm text-muted-foreground">STU-2024-001 · Computer Science</p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> 2 achievements</span>
                <span className="flex items-center gap-1"><Award className="h-3 w-3" /> 2 certificates</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold font-display">Achievement Timeline</h3>
      <div className="space-y-4">
        {completedActivities.map((activity) => (
          <Card key={activity.id} className="animate-fade-in">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{activity.eventName}</h4>
                  <p className="text-sm text-muted-foreground">{activity.organizer}</p>
                </div>
                <div className="flex items-center gap-2">
                  {activity.resultType && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                      {activity.resultType}
                    </span>
                  )}
                  <StatusBadge status={activity.status} />
                </div>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {activity.eventDate}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {activity.location}</span>
              </div>
              <ApprovalTimeline activity={activity} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
