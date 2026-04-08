import { mockActivities } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";

export function StudentCertificates() {
  const certified = mockActivities.filter((a) => a.certificateId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display">My Certificates</h2>
        <p className="text-muted-foreground">Download and share your verified certificates</p>
      </div>

      {certified.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Award className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg">No certificates yet</p>
          <p className="text-sm">Complete activities to earn certificates</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certified.map((activity) => (
            <Card key={activity.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base font-display">{activity.eventName}</CardTitle>
                  <StatusBadge status="approved" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-1">
                  <p className="text-muted-foreground">{activity.organizer}</p>
                  <p className="text-muted-foreground">{activity.eventDate} · {activity.location}</p>
                  {activity.resultType && (
                    <p className="font-medium capitalize">{activity.resultType}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-md px-3 py-2">
                  <Award className="h-3.5 w-3.5" />
                  <span className="font-mono">{activity.certificateId}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
