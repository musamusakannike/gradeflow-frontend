import { useState, useEffect } from "react";
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
  ChevronRight,
} from "lucide-react";
import DashboardHeader from "./dashboard-header";
import DashboardOverview from "./dashboard-overview";
import SchoolManagement from "./school-management";
import UserManagement from "./user-management";
import ProfileSettings from "./profile-settings";
import NotificationsPanel from "./notifications-panel";
import MessagesPanel from "./messages-panel";

interface IDashboardData {
  success: boolean;
  data: {
    totalSchools: number;
    totalUsers: number;
    totalActiveSchools: number;
    newSchoolRegistrations: number;
    schoolsGrowth: number;
    usersGrowth: number;
    activeSchoolsGrowth: number;
    newRegistrationsGrowth: number;
    userRolesDistribution: Record<string, number>;
    monthlySchoolGrowth: { year: number; month: number; count: number }[];
  } | null;
}

export default function SuperAdminDashboard() {
  const { logout, token } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState<IDashboardData>({
    success: false,
    data: null,
  });

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/dashboard/super-admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData().then(data => setDashboardData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Helper functions to extract and transform backend data for DashboardOverview
  const getOverviewProps = () => {
    if (!dashboardData || !dashboardData.success || !dashboardData.data) {
      return {
        totalSchools: 0,
        totalUsers: 0,
        activeSchools: 0,
        newRegistrations: 0,
        schoolsGrowth: 0,
        usersGrowth: 0,
        activeSchoolsGrowth: 0,
        newRegistrationsGrowth: 0,
        userRolesDistribution: {},
        monthlySchoolGrowth: [],
      };
    }
    // Map backend fields to frontend expected names
    return {
      totalSchools: dashboardData.data.totalSchools,
      totalUsers: dashboardData.data.totalUsers,
      activeSchools: dashboardData.data.totalActiveSchools ?? 0,
      newRegistrations: dashboardData.data.newSchoolRegistrations ?? 0,
      schoolsGrowth: dashboardData.data.schoolsGrowth ?? 0,
      usersGrowth: dashboardData.data.usersGrowth ?? 0,
      activeSchoolsGrowth: dashboardData.data.activeSchoolsGrowth ?? 0,
      newRegistrationsGrowth: dashboardData.data.newRegistrationsGrowth ?? 0,
      userRolesDistribution: dashboardData.data.userRolesDistribution ?? {},
      monthlySchoolGrowth: dashboardData.data.monthlySchoolGrowth ?? [],
    };
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 w-full">
        <div className="flex h-full">
          <Sidebar
            className={`transition-all duration-300 ease-in-out ${
              collapsed ? "w-20" : "w-64"
            } bg-white shadow-xl border-r border-gray-100`}
          >
            <SidebarHeader className="flex items-center justify-between px-4 py-6 border-b border-gray-100">
              <div
                className={`flex items-center transition-opacity duration-300 ${
                  collapsed ? "opacity-0 w-0" : "opacity-100"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-white">G</span>
                </div>
                <span className="text-2xl font-bold ml-3 text-gray-800">
                  GradeFlow
                </span>
                <div
                  className={`flex items-center justify-center ${
                    collapsed ? "w-full" : ""
                  }`}
                >
                  <button
                    onClick={toggleSidebar}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronRight
                      className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                        collapsed ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div
                className={`flex items-center justify-center ${
                  collapsed ? "w-full" : "hidden"
                }`}
              >
                <button
                  onClick={toggleSidebar}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      collapsed ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </SidebarHeader>

            <SidebarContent className="mt-6">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => handleTabChange("overview")}
                    className={`px-4 py-6 rounded-lg flex items-center ${
                      activeTab === "overview"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    } transition-all duration-200`}
                  >
                    <div
                      className={`${
                        activeTab === "overview" ? "bg-blue-100" : "bg-gray-100"
                      } w-10 h-10 rounded-lg flex items-center justify-center transition-colors`}
                    >
                      <LayoutDashboard
                        className={`w-5 h-5 ${
                          activeTab === "overview"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <span
                      className={`ml-3 transition-opacity duration-300 ${
                        collapsed
                          ? "opacity-0 w-0 overflow-hidden"
                          : "opacity-100"
                      }`}
                    >
                      Dashboard
                    </span>
                    {activeTab === "overview" && !collapsed && (
                      <div className="ml-auto w-1.5 h-8 bg-blue-600 rounded-full"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton
                    onClick={() => handleTabChange("schools")}
                    className={`px-4 py-6 rounded-lg flex items-center ${
                      activeTab === "schools"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    } transition-all duration-200`}
                  >
                    <div
                      className={`${
                        activeTab === "schools" ? "bg-blue-100" : "bg-gray-100"
                      } w-10 h-10 rounded-lg flex items-center justify-center transition-colors`}
                    >
                      <Building2
                        className={`w-5 h-5 ${
                          activeTab === "schools"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <span
                      className={`ml-3 transition-opacity duration-300 ${
                        collapsed
                          ? "opacity-0 w-0 overflow-hidden"
                          : "opacity-100"
                      }`}
                    >
                      Schools
                    </span>
                    {activeTab === "schools" && !collapsed && (
                      <div className="ml-auto w-1.5 h-8 bg-blue-600 rounded-full"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton
                    onClick={() => handleTabChange("users")}
                    className={`px-4 py-6 rounded-lg flex items-center ${
                      activeTab === "users"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    } transition-all duration-200`}
                  >
                    <div
                      className={`${
                        activeTab === "users" ? "bg-blue-100" : "bg-gray-100"
                      } w-10 h-10 rounded-lg flex items-center justify-center transition-colors`}
                    >
                      <Users
                        className={`w-5 h-5 ${
                          activeTab === "users"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <span
                      className={`ml-3 transition-opacity duration-300 ${
                        collapsed
                          ? "opacity-0 w-0 overflow-hidden"
                          : "opacity-100"
                      }`}
                    >
                      Users
                    </span>
                    {activeTab === "users" && !collapsed && (
                      <div className="ml-auto w-1.5 h-8 bg-blue-600 rounded-full"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton
                    onClick={() => handleTabChange("profile")}
                    className={`px-4 py-6 rounded-lg flex items-center ${
                      activeTab === "profile"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    } transition-all duration-200`}
                  >
                    <div
                      className={`${
                        activeTab === "profile" ? "bg-blue-100" : "bg-gray-100"
                      } w-10 h-10 rounded-lg flex items-center justify-center transition-colors`}
                    >
                      <User
                        className={`w-5 h-5 ${
                          activeTab === "profile"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <span
                      className={`ml-3 transition-opacity duration-300 ${
                        collapsed
                          ? "opacity-0 w-0 overflow-hidden"
                          : "opacity-100"
                      }`}
                    >
                      Profile
                    </span>
                    {activeTab === "profile" && !collapsed && (
                      <div className="ml-auto w-1.5 h-8 bg-blue-600 rounded-full"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem className="mt-2">
                  <SidebarMenuButton
                    onClick={() => handleTabChange("settings")}
                    className={`px-4 py-6 rounded-lg flex items-center ${
                      activeTab === "settings"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    } transition-all duration-200`}
                  >
                    <div
                      className={`${
                        activeTab === "settings" ? "bg-blue-100" : "bg-gray-100"
                      } w-10 h-10 rounded-lg flex items-center justify-center transition-colors`}
                    >
                      <Settings
                        className={`w-5 h-5 ${
                          activeTab === "settings"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <span
                      className={`ml-3 transition-opacity duration-300 ${
                        collapsed
                          ? "opacity-0 w-0 overflow-hidden"
                          : "opacity-100"
                      }`}
                    >
                      Settings
                    </span>
                    {activeTab === "settings" && !collapsed && (
                      <div className="ml-auto w-1.5 h-8 bg-blue-600 rounded-full"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="mt-auto p-4">
              <SidebarSeparator className="bg-gray-200" />
              <div className="mt-4">
                <button
                  onClick={logout}
                  className={`w-full px-4 py-3 rounded-lg flex items-center text-red-600 hover:bg-red-50 transition-colors ${
                    collapsed ? "justify-center" : ""
                  }`}
                >
                  <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <span
                    className={`ml-3 transition-opacity duration-300 ${
                      collapsed
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100"
                    }`}
                  >
                    Logout
                  </span>
                </button>
              </div>

              {!collapsed && (
                <div className="mt-8 px-3">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-blue-200">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Super Admin
                        </p>
                        <p className="text-xs text-gray-500">
                          admin@gradeflow.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="flex-1">
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
                <div
                  className={`transition-all duration-300 ${
                    showNotifications || showMessages
                      ? "opacity-50"
                      : "opacity-100"
                  }`}
                >
                  {activeTab === "overview" && (
                    <DashboardOverview
                      totalSchools={getOverviewProps().totalSchools}
                      totalUsers={getOverviewProps().totalUsers}
                      activeSchools={getOverviewProps().activeSchools}
                      newRegistrations={getOverviewProps().newRegistrations}
                      schoolsGrowth={getOverviewProps().schoolsGrowth}
                      usersGrowth={getOverviewProps().usersGrowth}
                      activeSchoolsGrowth={getOverviewProps().activeSchoolsGrowth}
                      newRegistrationsGrowth={getOverviewProps().newRegistrationsGrowth}
                      userRolesDistribution={getOverviewProps().userRolesDistribution}
                      monthlySchoolGrowth={getOverviewProps().monthlySchoolGrowth}
                    />
                  )}
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
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
