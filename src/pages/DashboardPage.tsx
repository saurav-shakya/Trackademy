import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { UserRole } from "@/lib/mockData";

import { StudentDashboard } from "./StudentDashboard";
import { FacultyDashboard } from "./FacultyDashboard";
import { HodDashboard } from "./HodDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { SubmitActivity } from "./SubmitActivity";
import { StudentCertificates } from "./StudentCertificates";
import { StudentPortfolio } from "./StudentPortfolio";
import { ActivityTable } from "@/components/ActivityTable";
import { mockActivities } from "@/lib/mockData";

const roleDashboardPaths: Record<UserRole, string> = {
  student: "/student",
  faculty: "/faculty",
  hod: "/hod",
  admin: "/admin",
};

export function DashboardPage() {
  const [currentRole, setCurrentRole] = useState<UserRole>("student");
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    navigate(roleDashboardPaths[role]);
  };

  // Sync role from URL on mount
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/faculty")) setCurrentRole("faculty");
    else if (path.startsWith("/hod")) setCurrentRole("hod");
    else if (path.startsWith("/admin")) setCurrentRole("admin");
    else setCurrentRole("student");
  }, [location.pathname]);

  const renderContent = () => {
    const path = location.pathname;

    // Student routes
    if (path === "/student" || path === "/") return <StudentDashboard />;
    if (path === "/student/submit") return <SubmitActivity />;
    if (path === "/student/activities") return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-display">My Activities</h2>
        <ActivityTable activities={mockActivities} showActions actionType="view" />
      </div>
    );
    if (path === "/student/certificates") return <StudentCertificates />;
    if (path === "/student/portfolio") return <StudentPortfolio />;

    // Faculty routes
    if (path.startsWith("/faculty")) return <FacultyDashboard />;

    // HOD routes
    if (path.startsWith("/hod")) return <HodDashboard />;

    // Admin routes
    if (path === "/admin" || path === "/admin/requests") return <AdminDashboard />;
    if (path === "/admin/reimbursements") return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-display">Reimbursements</h2>
        <ActivityTable activities={mockActivities.filter(a => a.hasReimbursement)} showActions actionType="view" />
      </div>
    );
    if (path === "/admin/certificates") return <StudentCertificates />;
    if (path === "/admin/users") return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg">User management coming soon</p>
      </div>
    );

    return <StudentDashboard />;
  };

  return (
    <DashboardLayout currentRole={currentRole} onRoleChange={handleRoleChange}>
      {renderContent()}
    </DashboardLayout>
  );
}
