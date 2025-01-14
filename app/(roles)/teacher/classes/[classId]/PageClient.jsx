"use client";

import { useEffect, useState } from "react";
import teacherService from "@/services/teacher.service";
import toast from "react-hot-toast";

const PageClient = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    totalStudents: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents(pagination.page);
  }, [pagination.page]);

  const fetchStudents = async (page) => {
    setLoading(true);
    try {
      const data = await teacherService.getClassStudents(classId, page, pagination.limit);
      setStudents(data.students);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      toast.error("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Class Details</h2>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Total Students: {pagination.totalStudents || 0}
        </p>
      </div>

      {loading ? (
        <p className="text-orange-500">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-600">No students found in this class.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="px-6 py-3 text-sm text-gray-800">
                    {student.fullName}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {student.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className={`px-4 py-2 rounded-lg ${
            pagination.page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-100 text-gray-800 hover:bg-orange-100"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages}
          className={`px-4 py-2 rounded-lg ${
            pagination.page === pagination.totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-100 text-gray-800 hover:bg-orange-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PageClient;
