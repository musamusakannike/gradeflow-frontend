"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome to your Dashboard
          </h1>

          {user && (
            <div className="mb-8">
              <p className="text-lg text-gray-700">
                Hello, {user.firstName} {user.lastName}!
              </p>
              <p className="text-gray-500">
                You are logged in as:{" "}
                <span className="font-medium">{user.role}</span>
              </p>
            </div>
          )}

          <p className="text-gray-600 mb-4">
            This is a placeholder dashboard. In a real application, you would
            see content specific to your role.
          </p>

          <div className="mt-8">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
