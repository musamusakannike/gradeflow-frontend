"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { SchoolAdminDashboard } from "@/components/dashboard/school-admin/dashboard"
import LoadingScreen from "@/components/dashboard/loading-screen"

export default function SchoolAdminPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    // Wait for auth to be checked
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsPageLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (isPageLoading || isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated || user?.role !== "school_admin") {
    // In a real app, you might want to redirect to login
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 text-gray-600">You must be logged in as a school admin to view this page.</p>
        </div>
      </div>
    )
  }

  return <SchoolAdminDashboard />
}
