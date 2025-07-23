import { useState } from "react";
import { 
  Shield, 
  UserCheck, 
  Crown, 
  UserX, 
  Trophy, 
  Info, 
  Award, 
  Users, 
  UserCog, 
  UsersRound, 
  Target, 
  Camera, 
  Bell,
  ChevronDown,
  LayoutDashboard
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const adminSections = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    exact: true
  },
  {
    title: "Member Management",
    icon: UserCog,
    items: [
      { title: "Valid Member Approval", url: "/admin/member-approval", icon: UserCheck },
      { title: "Promote to Executive", url: "/admin/promote-executive", icon: Crown },
      { title: "Remove Membership", url: "/admin/remove-membership", icon: UserX },
      { title: "General Member Info", url: "/admin/member-info", icon: Users },
    ]
  },
  {
    title: "Contest & Content",
    icon: Trophy,
    items: [
      { title: "Host a Contest", url: "/admin/host-contest", icon: Trophy },
      { title: "About Section", url: "/admin/about-section", icon: Info },
      { title: "Proud Mentions", url: "/admin/proud-mentions", icon: Award },
    ]
  },
  {
    title: "Team Management",
    icon: UsersRound,
    items: [
      { title: "Senior Executives", url: "/admin/senior-executives", icon: Crown },
      { title: "Executives", url: "/admin/executives", icon: UserCog },
    ]
  },
  {
    title: "Media & Updates",
    icon: Camera,
    items: [
      { title: "Achievements", url: "/admin/achievements", icon: Target },
      { title: "Gallery", url: "/admin/gallery", icon: Camera },
      { title: "Notice Board", url: "/admin/notice-board", icon: Bell },
    ]
  }
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Member Management": true,
    "Contest & Content": true,
    "Team Management": true,
    "Media & Updates": true,
  });

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"}>
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
              <p className="text-sm text-muted-foreground">Executive Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-2 bg-background">
        <SidebarGroup>
          <SidebarMenu>
            {adminSections.map((section) => {
              if (section.url) {
                // Single item
                return (
                  <SidebarMenuItem key={section.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={section.url} 
                        end={section.exact}
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                            isActive 
                              ? "bg-primary text-primary-foreground shadow-sm" 
                              : "hover:bg-accent hover:text-accent-foreground"
                          }`
                        }
                      >
                        <section.icon className="h-5 w-5" />
                        {!collapsed && <span className="font-medium">{section.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              // Group with items
              return (
                <SidebarMenuItem key={section.title}>
                  <Collapsible
                    open={!collapsed && openGroups[section.title]}
                    onOpenChange={() => toggleGroup(section.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all">
                        <div className="flex items-center gap-3">
                          <section.icon className="h-5 w-5" />
                          {!collapsed && <span className="font-medium">{section.title}</span>}
                        </div>
                        {!collapsed && (
                          <ChevronDown className={`h-4 w-4 transition-transform ${openGroups[section.title] ? "rotate-180" : ""}`} />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {!collapsed && (
                      <CollapsibleContent className="mt-1 space-y-1">
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {section.items?.map((item) => (
                              <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                  <NavLink
                                    to={item.url}
                                    className={({ isActive }) => 
                                      `flex items-center gap-3 px-6 py-2 ml-2 rounded-md text-sm transition-all ${
                                        isActive 
                                          ? "bg-primary text-primary-foreground shadow-sm border-l-2 border-primary" 
                                          : "hover:bg-accent/50 hover:text-accent-foreground border-l-2 border-transparent"
                                      }`
                                    }
                                  >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                  </NavLink>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}