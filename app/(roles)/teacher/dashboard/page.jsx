"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import teacherService from "@/services/teacher.service";

const TeacherDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalClasses: 0,
    totalSubjects: 0,
    classes: [],
  });
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await teacherService.getDashboardStats();
        setStatistics({
          totalClasses: data.totalClasses,
          totalSubjects: data.totalSubjects,
          classes: data.classes,
        });
        setSubjects(data.subjects);
      } catch (err) {
        console.error("Error retrieving teacher statistics:", err);
        toast.error("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <main className="flex-1">
      <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
        <h2 className="text-3xl font-bold">Teacher Dashboard</h2>
        <p className="mt-4 text-gray-600">
          Welcome back! Here&apos;s an overview of your statistics:
        </p>

        {loading ? (
          <p className="text-orange-500 mt-6">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {/* Statistics Cards */}
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-orange-500">
                  {statistics.totalClasses}
                </h3>
                <p className="text-gray-600">Total Classes</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-orange-500">
                  {statistics.totalSubjects}
                </h3>
                <p className="text-gray-600">Total Subjects</p>
              </div>
            </div>

            {/* Subjects Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Subjects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {subjects.map((subject, i) => (
                  <div key={i} className="bg-white shadow-lg rounded-lg p-6">
                    <h4 className="text-lg font-bold text-orange-500">
                      {subject.subjectName}
                    </h4>
                    <p className="text-gray-600 mt-2">
                      Class: {subject.className}
                    </p>
                    <button
                      className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
                      onClick={() => {
                        toast.success(
                          `Viewing details for ${subject.subjectName}`
                        );
                      }}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Classes Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Classes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {statistics.classes.map((classItem, i) => (
                  <div
                    key={i}
                    className="bg-white shadow-lg rounded-lg p-6 text-center"
                  >
                    <h4 className="text-lg font-bold text-orange-500">
                      {classItem.className}
                    </h4>
                    <button
                      className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
                      onClick={() => {
                        toast.success(
                          `Viewing details for ${classItem.className}`
                        );
                      }}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default TeacherDashboard;
