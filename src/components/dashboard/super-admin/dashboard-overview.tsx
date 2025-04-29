"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Users,
  UserCheck,
  ArrowUpRight,
  ArrowDownRight,
  School,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DashboardOverview({
  totalSchools,
  totalUsers,
  activeSchools = 0,
  newRegistrations,
  schoolsGrowth,
  usersGrowth,
  activeSchoolsGrowth,
  newRegistrationsGrowth,
  userRolesDistribution = {},
  monthlySchoolGrowth = [],
}: {
  totalSchools: number;
  totalUsers: number;
  activeSchools: number;
  newRegistrations: number;
  schoolsGrowth: number;
  usersGrowth: number;
  activeSchoolsGrowth: number;
  newRegistrationsGrowth: number;
  userRolesDistribution?: Record<string, number>;
  monthlySchoolGrowth?: { year: number; month: number; count: number }[];
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalUsers: 0,
    activeSchools: 0,
    newRegistrations: 0,
    schoolsGrowth: 0,
    usersGrowth: 0,
    activeSchoolsGrowth: 0,
    newRegistrationsGrowth: 0,
  });

  useEffect(() => {
    // Simulate API call to fetch dashboard stats
    const fetchStats = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setStats({
          totalSchools: totalSchools,
          totalUsers: totalUsers,
          activeSchools: activeSchools,
          newRegistrations: newRegistrations,
          schoolsGrowth: schoolsGrowth,
          usersGrowth: usersGrowth,
          activeSchoolsGrowth: activeSchoolsGrowth,
          newRegistrationsGrowth: newRegistrationsGrowth,
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchStats();
  }, [
    totalSchools,
    totalUsers,
    activeSchools,
    newRegistrations,
    schoolsGrowth,
    usersGrowth,
    activeSchoolsGrowth,
    newRegistrationsGrowth,
  ]);

  const computedUserRoleData = Object.entries(userRolesDistribution).map(
    ([role, value]) => ({
      name: role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      value,
    })
  );

  const computedSchoolGrowthData =
    monthlySchoolGrowth.length > 0
      ? monthlySchoolGrowth.map((item) => ({
          month: `${item.year}-${String(item.month).padStart(2, "0")}`,
          schools: item.count,
        }))
      : [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Schools Card */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Schools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    stats.totalSchools
                  )}
                </div>
                <div className="flex items-center mt-1">
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <span
                        className={`text-xs font-medium flex items-center ${
                          stats.schoolsGrowth >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stats.schoolsGrowth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.schoolsGrowth)}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        vs last month
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Users Card */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    stats.totalUsers.toLocaleString()
                  )}
                </div>
                <div className="flex items-center mt-1">
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <span
                        className={`text-xs font-medium flex items-center ${
                          stats.usersGrowth >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stats.usersGrowth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.usersGrowth)}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        vs last month
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Schools Card */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Schools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    stats.activeSchools
                  )}
                </div>
                <div className="flex items-center mt-1">
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <span
                        className={`text-xs font-medium flex items-center ${
                          stats.activeSchoolsGrowth >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stats.activeSchoolsGrowth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.activeSchoolsGrowth)}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        vs last month
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <School className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Registrations Card */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              New Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    stats.newRegistrations
                  )}
                </div>
                <div className="flex items-center mt-1">
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <span
                        className={`text-xs font-medium flex items-center ${
                          stats.newRegistrationsGrowth >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stats.newRegistrationsGrowth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.newRegistrationsGrowth)}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        vs last month
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* School Growth Chart */}
        <Card className="lg:col-span-2 overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>School Growth</CardTitle>
            <CardDescription>
              Monthly school registrations over the past year
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-80 w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
                <Activity className="h-12 w-12 text-gray-300" />
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={computedSchoolGrowthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="schools"
                      fill="#4f46e5"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Distribution Chart */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown by user roles</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-80 w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
                <Activity className="h-12 w-12 text-gray-300" />
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={computedUserRoleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {computedUserRoleData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
