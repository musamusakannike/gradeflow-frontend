"use client"

import { useState, useEffect } from "react"
import { Building2, Users, UserCheck, ArrowUpRight, ArrowDownRight, School, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
  LineChart,
  Line,
  Legend,
} from "recharts"

// Sample data for charts
const schoolGrowthData = [
  { month: "Jan", schools: 12 },
  { month: "Feb", schools: 15 },
  { month: "Mar", schools: 18 },
  { month: "Apr", schools: 22 },
  { month: "May", schools: 25 },
  { month: "Jun", schools: 30 },
  { month: "Jul", schools: 35 },
  { month: "Aug", schools: 40 },
  { month: "Sep", schools: 45 },
  { month: "Oct", schools: 48 },
  { month: "Nov", schools: 52 },
  { month: "Dec", schools: 55 },
]

const userRoleData = [
  { name: "School Admins", value: 120 },
  { name: "Teachers", value: 450 },
  { name: "Students", value: 2500 },
  { name: "Parents", value: 1800 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const activityData = [
  { day: "Mon", logins: 120, registrations: 15 },
  { day: "Tue", logins: 150, registrations: 20 },
  { day: "Wed", logins: 180, registrations: 25 },
  { day: "Thu", logins: 200, registrations: 30 },
  { day: "Fri", logins: 220, registrations: 35 },
  { day: "Sat", logins: 100, registrations: 10 },
  { day: "Sun", logins: 80, registrations: 5 },
]

export default function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalUsers: 0,
    activeSchools: 0,
    newRegistrations: 0,
    schoolsGrowth: 0,
    usersGrowth: 0,
    activeSchoolsGrowth: 0,
    newRegistrationsGrowth: 0,
  })

  useEffect(() => {
    // Simulate API call to fetch dashboard stats
    const fetchStats = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setStats({
          totalSchools: 55,
          totalUsers: 4870,
          activeSchools: 48,
          newRegistrations: 120,
          schoolsGrowth: 12.5,
          usersGrowth: 8.3,
          activeSchoolsGrowth: 5.2,
          newRegistrationsGrowth: -3.1,
        })
        setIsLoading(false)
      }, 1000)
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Schools Card */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">
                  {isLoading ? <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div> : stats.totalSchools}
                </div>
                <div className="flex items-center mt-1">
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <span
                        className={`text-xs font-medium flex items-center ${stats.schoolsGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {stats.schoolsGrowth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.schoolsGrowth)}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">vs last month</span>
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
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
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
                        className={`text-xs font-medium flex items-center ${stats.usersGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {stats.usersGrowth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.usersGrowth)}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">vs last month</span>
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
            <CardTitle className="text-sm font-medium text-gray-500">Active Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">
                  {isLoading ? <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div> : stats.activeSchools}
                </div>
                <div className="flex items-center mt-1">
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <span
                        className={`text-xs font-medium flex items-center ${stats.activeSchoolsGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {stats.activeSchoolsGrowth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.activeSchoolsGrowth)}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">vs last month</span>
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
            <CardTitle className="text-sm font-medium text-gray-500">New Registrations</CardTitle>
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
                        className={`text-xs font-medium flex items-center ${stats.newRegistrationsGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {stats.newRegistrationsGrowth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.newRegistrationsGrowth)}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">vs last month</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* School Growth Chart */}
        <Card className="lg:col-span-2 overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>School Growth</CardTitle>
            <CardDescription>Monthly school registrations over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-80 w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
                <Activity className="h-12 w-12 text-gray-300" />
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={schoolGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="schools" fill="#4f46e5" radius={[4, 4, 0, 0]} />
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
                      data={userRoleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userRoleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Chart */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Logins and registrations in the past week</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-80 w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
                <Activity className="h-12 w-12 text-gray-300" />
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="logins" stroke="#4f46e5" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="registrations" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Status Card */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-80 w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
                <Activity className="h-12 w-12 text-gray-300" />
              </div>
            ) : (
              <div className="space-y-6 h-80 overflow-auto py-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Server Uptime</span>
                    <span className="text-sm font-medium text-green-600">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">API Response Time</span>
                    <span className="text-sm font-medium text-green-600">120ms</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Database Load</span>
                    <span className="text-sm font-medium text-yellow-600">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm font-medium text-yellow-600">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <span className="text-sm font-medium text-green-600">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Network Bandwidth</span>
                    <span className="text-sm font-medium text-green-600">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
