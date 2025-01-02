"use client";

import { useEffect, useState } from "react";
import RolesNavbar from "@/components/rolesPages/RolesNavbar";
import Sidebar from "@/components/rolesPages/Sidebar";
import adminService from "@/services/admin.service";

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await adminService.getStatistics();
        setStatistics(data);
      } catch (err) {
        console.error("Failed to fetch statistics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <main className="flex-1">
        <RolesNavbar role="admin" />
        <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="mt-4 text-gray-600">
            Welcome back! Here’s an overview of your school’s statistics:
          </p>

          {loading ? (
            <p className="text-orange-500 mt-6">Loading statistics...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {/* Total Students */}
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-orange-500">
                  {statistics.totalStudents}
                </h3>
                <p className="text-gray-600">Total Students</p>
              </div>

              {/* Total Teachers */}
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-orange-500">
                  {statistics.totalTeachers}
                </h3>
                <p className="text-gray-600">Total Teachers</p>
              </div>

              {/* Total Classes */}
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-orange-500">
                  {statistics.totalClasses}
                </h3>
                <p className="text-gray-600">Total Classes</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
