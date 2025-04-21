"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import SuperAdminDashboard from "@/components/dashboard/super-admin/dashboard";
import LoadingScreen from "@/components/dashboard/loading-screen";

export default function SuperAdminDashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // If authenticated but not super_admin, redirect to appropriate dashboard
    if (!isLoading && isAuthenticated && user?.role !== "super_admin") {
      router.push("/dashboard");
      return;
    }

    // If we get here, the user is authenticated and is a super_admin
    if (!isLoading && isAuthenticated && user?.role === "super_admin") {
      setIsPageLoading(false);
    }
  }, [isAuthenticated, isLoading, router, user]);

  if (isLoading || isPageLoading) {
    return <LoadingScreen />;
  }

  return <SuperAdminDashboard />;
}
