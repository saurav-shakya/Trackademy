import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { UserRole } from "@/lib/mockData";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  title?: string;
}

const roleLabels: Record<UserRole, string> = {
  student: "Student",
  faculty: "Faculty",
  hod: "HOD",
  admin: "Admin",
};

export function DashboardLayout({ children, currentRole, onRoleChange, title }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar currentRole={currentRole} onRoleChange={onRoleChange} />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              {title && <h1 className="text-lg font-semibold font-display">{title}</h1>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {roleLabels[currentRole]} View
              </span>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
