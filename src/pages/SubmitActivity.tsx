import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Calendar, MapPin, Users, DollarSign } from "lucide-react";

export function SubmitActivity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    organizer: "",
    eventDate: "",
    location: "",
    participationType: "",
    budgetRequested: "",
    description: "",
    department: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Activity submitted successfully! It will be reviewed by your faculty advisor.");
    navigate("/student");
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display">Submit New Activity</h2>
        <p className="text-muted-foreground">Fill in the details for your activity request</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name *</Label>
              <Input
                id="eventName"
                placeholder="e.g. National Hackathon 2024"
                value={formData.eventName}
                onChange={(e) => updateField("eventName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer *</Label>
              <Input
                id="organizer"
                placeholder="e.g. TechFest India"
                value={formData.organizer}
                onChange={(e) => updateField("organizer", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate">
                  <Calendar className="inline h-3.5 w-3.5 mr-1" />
                  Event Date *
                </Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => updateField("eventDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="inline h-3.5 w-3.5 mr-1" />
                  Location *
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Mumbai, Maharashtra"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  <Users className="inline h-3.5 w-3.5 mr-1" />
                  Participation Type *
                </Label>
                <Select onValueChange={(v) => updateField("participationType", v)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Department *</Label>
                <Select onValueChange={(v) => updateField("department", v)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ec">Electronics</SelectItem>
                    <SelectItem value="me">Mechanical</SelectItem>
                    <SelectItem value="ce">Civil</SelectItem>
                    <SelectItem value="ee">Electrical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Budget & Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">
                <DollarSign className="inline h-3.5 w-3.5 mr-1" />
                Budget Requested (₹)
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="0"
                min="0"
                value={formData.budgetRequested}
                onChange={(e) => updateField("budgetRequested", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the activity, its objectives, and expected outcomes..."
                rows={4}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Supporting Documents</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop files here, or <span className="text-primary font-medium">browse</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate("/student")}>
            Cancel
          </Button>
          <Button type="submit">Submit for Review</Button>
        </div>
      </form>
    </div>
  );
}
