import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Award,
  User,
  DollarSign,
  Users,
  Building2,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserRole } from "@/lib/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roleNavItems: Record<UserRole, { title: string; url: string; icon: React.ElementType }[]> = {
  student: [
    { title: "Dashboard", url: "/student", icon: LayoutDashboard },
    { title: "Submit Activity", url: "/student/submit", icon: FileText },
    { title: "My Activities", url: "/student/activities", icon: ClipboardCheck },
    { title: "Certificates", url: "/student/certificates", icon: Award },
    { title: "Portfolio", url: "/student/portfolio", icon: User },
  ],
  faculty: [
    { title: "Dashboard", url: "/faculty", icon: LayoutDashboard },
    { title: "Pending Reviews", url: "/faculty/reviews", icon: ClipboardCheck },
  ],
  hod: [
    { title: "Dashboard", url: "/hod", icon: LayoutDashboard },
    { title: "Department Approvals", url: "/hod/approvals", icon: Building2 },
  ],
  admin: [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "All Requests", url: "/admin/requests", icon: ClipboardCheck },
    { title: "Reimbursements", url: "/admin/reimbursements", icon: DollarSign },
    { title: "Certificates", url: "/admin/certificates", icon: Award },
    { title: "Users", url: "/admin/users", icon: Users },
  ],
};

const roleLabels: Record<UserRole, string> = {
  student: "Student",
  faculty: "Faculty",
  hod: "HOD",
  admin: "Admin",
};

const roleIcons: Record<UserRole, React.ElementType> = {
  student: User,
  faculty: ClipboardCheck,
  hod: Building2,
  admin: ShieldCheck,
};

interface AppSidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function AppSidebar({ currentRole, onRoleChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const items = roleNavItems[currentRole];
  const RoleIcon = roleIcons[currentRole];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Award className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">SAARS</h2>
              <p className="text-xs text-sidebar-foreground/60">Activity Portal</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Award className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sidebar-primary/20">
                <RoleIcon className="h-3.5 w-3.5 text-sidebar-primary" />
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium">{roleLabels[currentRole]}</p>
                    <p className="text-xs text-sidebar-foreground/50">Switch role</p>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-sidebar-foreground/50" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-48">
            {(Object.keys(roleLabels) as UserRole[]).map((role) => {
              const Icon = roleIcons[role];
              return (
                <DropdownMenuItem
                  key={role}
                  onClick={() => onRoleChange(role)}
                  className={currentRole === role ? "bg-accent" : ""}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {roleLabels[role]}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
