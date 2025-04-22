"use client";

import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { DashboardHeader } from "./dashboard-header";
import { DashboardOverview } from "./dashboard-overview";
import { AcademicManagement } from "./academic-management";
// import { ClassManagement } from "./class-management"
// import { SubjectManagement } from "./subject-management"
// import { StudentManagement } from "./student-management"
// import { ParentManagement } from "./parent-management"
// import { ResultManagement } from "./result-management"
// import { FeeManagement } from "./fee-management"
// import { AttendanceManagement } from "./attendance-management"
// import { EventManagement } from "./event-management"
// import { MessagesPanel } from "./messages-panel"
// import { NotificationsPanel } from "./notifications-panel"
// import { ProfileSettings } from "./profile-settings"
import {
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardList,
  DollarSign,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  School,
  Settings,
  Users,
  UserCircle2,
  Bell,
} from "lucide-react";

export function SchoolAdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "academic":
        return <AcademicManagement />;
      //   case "classes":
      //     return <ClassManagement />
      //   case "subjects":
      //     return <SubjectManagement />
      //   case "students":
      //     return <StudentManagement />
      //   case "parents":
      //     return <ParentManagement />
      //   case "results":
      //     return <ResultManagement />
      //   case "fees":
      //     return <FeeManagement />
      //   case "attendance":
      //     return <AttendanceManagement />
      //   case "events":
      //     return <EventManagement />
      //   case "messages":
      //     return <MessagesPanel />
      //   case "notifications":
      //     return <NotificationsPanel />
      //   case "profile":
      //     return <ProfileSettings />
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-2">
              <School className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">GradeFlow</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("overview")}
                      isActive={activeTab === "overview"}
                      tooltip="Overview"
                    >
                      <Home className="h-5 w-5" />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Academic</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("academic")}
                      isActive={activeTab === "academic"}
                      tooltip="Academic Sessions"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Academic Sessions</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("classes")}
                      isActive={activeTab === "classes"}
                      tooltip="Classes"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Classes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("subjects")}
                      isActive={activeTab === "subjects"}
                      tooltip="Subjects"
                    >
                      <ClipboardList className="h-5 w-5" />
                      <span>Subjects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Users</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("students")}
                      isActive={activeTab === "students"}
                      tooltip="Students"
                    >
                      <GraduationCap className="h-5 w-5" />
                      <span>Students</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("parents")}
                      isActive={activeTab === "parents"}
                      tooltip="Parents"
                    >
                      <Users className="h-5 w-5" />
                      <span>Parents</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("results")}
                      isActive={activeTab === "results"}
                      tooltip="Results"
                    >
                      <FileText className="h-5 w-5" />
                      <span>Results</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("fees")}
                      isActive={activeTab === "fees"}
                      tooltip="Fees"
                    >
                      <DollarSign className="h-5 w-5" />
                      <span>Fees</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("attendance")}
                      isActive={activeTab === "attendance"}
                      tooltip="Attendance"
                    >
                      <BarChart3 className="h-5 w-5" />
                      <span>Attendance</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("events")}
                      isActive={activeTab === "events"}
                      tooltip="Events"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Events</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Communication</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("messages")}
                      isActive={activeTab === "messages"}
                      tooltip="Messages"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Messages</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveTab("notifications")}
                      isActive={activeTab === "notifications"}
                      tooltip="Notifications"
                    >
                      <Bell className="h-5 w-5" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("profile")}
                  isActive={activeTab === "profile"}
                  tooltip="Profile Settings"
                >
                  <UserCircle2 className="h-5 w-5" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("settings")}
                  isActive={activeTab === "settings"}
                  tooltip="Settings"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <DashboardHeader user={user} />
          <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
