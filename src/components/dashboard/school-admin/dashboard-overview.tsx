"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { BookOpen, GraduationCap, Users, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ISchool } from "@/types/school"

export function DashboardOverview() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [schoolData, setSchoolData] = useState<ISchool | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/school-admin`)

        // Simulate API response
        setTimeout(() => {
          setSchoolData({
            id: "1",
            name: "Sample School",
            address: "123 School Street",
            email: "school@example.com",
            phoneNumber: "1234567890",
            admin: {
              firstName: "John",
              lastName: "Doe",
              email: "admin@example.com"
            },
            isActive: true,
            createdAt: new Date().toISOString(),
            city: "Sample City",
            state: "Sample State",
            country: "Sample Country",
            website: "https://example.com",
            logo: "https://example.com/logo.png",
            totalStudents: 450,
            totalTeachers: 32,
            totalClasses: 15,
            totalSubjects: 28,
            activeSession: "2023/2024",
            activeTerm: "First Term",
            studentGrowth: 8.5,
            teacherGrowth: 3.2,
            upcomingEvents: [
              { id: 1, title: "Parent-Teacher Meeting", date: "2023-10-15", type: "meeting" },
              { id: 2, title: "Mid-Term Examination", date: "2023-10-25", type: "exam" },
              { id: 3, title: "Sports Day", date: "2023-11-05", type: "event" },
            ],
            recentMessages: [
              { id: 1, sender: "John Doe", subject: "Regarding Student Performance", date: "2023-10-10" },
              { id: 2, sender: "Jane Smith", subject: "Fee Payment Query", date: "2023-10-09" },
            ],
            studentsByClass: [
              { name: "JSS 1", students: 120 },
              { name: "JSS 2", students: 105 },
              { name: "JSS 3", students: 95 },
              { name: "SSS 1", students: 60 },
              { name: "SSS 2", students: 40 },
              { name: "SSS 3", students: 30 },
            ],
            studentsByGender: [
              { name: "Male", value: 240 },
              { name: "Female", value: 210 },
            ],
            attendanceTrend: [
              { month: "Jan", attendance: 92 },
              { month: "Feb", attendance: 94 },
              { month: "Mar", attendance: 91 },
              { month: "Apr", attendance: 95 },
              { month: "May", attendance: 93 },
              { month: "Jun", attendance: 90 },
              { month: "Jul", attendance: 88 },
              { month: "Aug", attendance: 92 },
              { month: "Sep", attendance: 94 },
            ],
            feeCollection: {
              total: 15000000,
              collected: 12500000,
              pending: 2500000,
            },
          })
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        console.error("Error fetching school data:", error)
        setIsLoading(false)
      }
    }

    fetchSchoolData()
  }, [])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  const renderGrowthIcon = (growth: number) => {
    if (growth > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (growth < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value)
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="mt-2 h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        <Card className="col-span-full">
          <CardHeader>
            <Skeleton className="h-5 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!schoolData) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No Data Available</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {user?.firstName}! Here&apos;s an overview of your school.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>Create Event</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.totalStudents}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {renderGrowthIcon(schoolData.studentGrowth)}
              <span
                className={
                  schoolData.studentGrowth > 0 ? "text-green-500" : schoolData.studentGrowth < 0 ? "text-red-500" : ""
                }
              >
                {schoolData.studentGrowth > 0 ? "+" : ""}
                {schoolData.studentGrowth}%
              </span>
              <span className="ml-1">from last term</span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.totalTeachers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {renderGrowthIcon(schoolData.teacherGrowth)}
              <span
                className={
                  schoolData.teacherGrowth > 0 ? "text-green-500" : schoolData.teacherGrowth < 0 ? "text-red-500" : ""
                }
              >
                {schoolData.teacherGrowth > 0 ? "+" : ""}
                {schoolData.teacherGrowth}%
              </span>
              <span className="ml-1">from last term</span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.totalClasses}</div>
            <p className="text-xs text-muted-foreground">Across all grades</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Term</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.activeTerm}</div>
            <p className="text-xs text-muted-foreground">{schoolData.activeSession} Session</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Students by Class</CardTitle>
                <CardDescription>Distribution of students across different classes</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={schoolData.studentsByClass}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Distribution of students by gender</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={schoolData.studentsByGender}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {schoolData.studentsByGender.map((entry: { name: string; value: number }, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events scheduled for the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schoolData.upcomingEvents.map((event: { id: number; title: string; date: string; type: 'meeting' | 'exam' | 'event' }) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge
                        variant={
                          event.type === "exam" ? "destructive" : event.type === "meeting" ? "outline" : "default"
                        }
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest messages received</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schoolData.recentMessages.map((message: { id: number; sender: string; subject: string; date: string }) => (
                    <div key={message.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{message.subject}</p>
                        <p className="text-sm text-muted-foreground">From: {message.sender}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Distribution</CardTitle>
              <CardDescription>Detailed breakdown of student demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={schoolData.studentsByClass}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#8884d8" name="Number of Students" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
              <CardDescription>Monthly attendance percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={schoolData.attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#8884d8"
                    name="Attendance %"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(schoolData.feeCollection.total)}</div>
                <p className="text-xs text-muted-foreground">For current term</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Collected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(schoolData.feeCollection.collected)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((schoolData.feeCollection.collected / schoolData.feeCollection.total) * 100)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">
                  {formatCurrency(schoolData.feeCollection.pending)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((schoolData.feeCollection.pending / schoolData.feeCollection.total) * 100)}% of total
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fee Collection Progress</CardTitle>
              <CardDescription>Current term fee collection status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-4 w-full rounded-full bg-gray-200">
                <div
                  className="h-4 rounded-full bg-green-500"
                  style={{
                    width: `${Math.round((schoolData.feeCollection.collected / schoolData.feeCollection.total) * 100)}%`,
                  }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
