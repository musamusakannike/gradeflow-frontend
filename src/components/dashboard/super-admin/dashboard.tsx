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
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import {
  Building2,
  Users,
  LayoutDashboard,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import DashboardHeader from "./dashboard-header";
import DashboardOverview from "./dashboard-overview";
import SchoolManagement from "./school-management";
import UserManagement from "./user-management";
import ProfileSettings from "./profile-settings";
import NotificationsPanel from "./notifications-panel";
import MessagesPanel from "./messages-panel";

export default function SuperAdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowNotifications(false);
    setShowMessages(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setShowMessages(false);
    }
  };

  const toggleMessages = () => {
    setShowMessages(!showMessages);
    if (!showMessages) {
      setShowNotifications(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 w-full">
        <div className="flex h-full">
          <Sidebar>
            <SidebarHeader className="flex items-center justify-center py-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-white">G</span>
                </div>
                <span className="text-2xl font-bold">GradeFlow</span>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleTabChange("overview")}
                    isActive={activeTab === "overview"}
                  >
                    <LayoutDashboard className="w-5 h-5 mr-3" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleTabChange("schools")}
                    isActive={activeTab === "schools"}
                  >
                    <Building2 className="w-5 h-5 mr-3" />
                    <span>Schools</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleTabChange("users")}
                    isActive={activeTab === "users"}
                  >
                    <Users className="w-5 h-5 mr-3" />
                    <span>Users</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleTabChange("profile")}
                    isActive={activeTab === "profile"}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleTabChange("settings")}
                    isActive={activeTab === "settings"}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4">
              <SidebarSeparator />
              <div className="mt-4">
                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <div className="flex flex-col h-screen">
              <DashboardHeader
                onNotificationsClick={toggleNotifications}
                onMessagesClick={toggleMessages}
                showNotifications={showNotifications}
                showMessages={showMessages}
              />

              <div className="flex-1 overflow-auto p-6 relative">
                {showNotifications && (
                  <div className="absolute top-0 right-0 z-10 h-full">
                    <NotificationsPanel
                      onClose={() => setShowNotifications(false)}
                    />
                  </div>
                )}

                {showMessages && (
                  <div className="absolute top-0 right-0 z-10 h-full">
                    <MessagesPanel onClose={() => setShowMessages(false)} />
                  </div>
                )}
                {/*
              <div
                className={`transition-all duration-300 ${showNotifications || showMessages ? "opacity-50" : "opacity-100"}`}
              >
                */}
                {activeTab === "overview" && <DashboardOverview />}
                {activeTab === "schools" && <SchoolManagement />}
                {activeTab === "users" && <UserManagement />}
                {activeTab === "profile" && <ProfileSettings />}
                {activeTab === "settings" && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Settings</h2>
                    <p className="text-gray-600">
                      System settings will be implemented here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
