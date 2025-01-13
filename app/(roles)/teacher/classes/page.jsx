"use client";

import { useEffect, useState } from "react";
import teacherService from "@/services/teacher.service";
import Link from "next/link";
import toast from "react-hot-toast";

const TeacherClassesPage = () => {
  const [classes, setClasses] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await teacherService.getTeacherClasses();
        if (Array.isArray(data)) {
          setClasses(data);
        } else {
          console.error("Unexpected response format", data);
          toast.error("Failed to load classes. Please try again.");
        }
      } catch (err) {
        console.error("Failed to fetch classes", err);
        toast.error("Failed to load classes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Classes You Manage
      </h2>

      {loading ? (
        <p className="text-orange-500">Loading...</p>
      ) : Array.isArray(classes) && classes.length === 0 ? (
        <p className="text-gray-600">You are not managing any classes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(classes) &&
            classes.map((cls) => (
              <Link
                key={cls._id}
                href={`/teacher/classes/${cls._id}`}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{cls.name}</h4>
                  <p className="text-gray-600">
                    Students: {cls.totalStudents || 0}
                  </p>
                  <p className="text-gray-600">
                    Subjects: {cls.subjects?.length || 0}
                  </p>
                </div>
                <p className="text-orange-500 mt-4">View Details →</p>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default TeacherClassesPage;
