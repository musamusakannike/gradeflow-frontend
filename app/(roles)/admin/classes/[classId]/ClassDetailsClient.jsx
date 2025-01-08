"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminService from "@/services/admin.service";

const ClassDetailsClient = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    totalStudents: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchStudents = async (page = 1) => {
    setLoading(true);
    try {
      const data = await adminService.getStudentsInClass(classId, page, pagination.limit);
      setStudents(data.students);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Error fetching students:", err);
      toast.error("An error occurred while fetching students.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchStudents();
  }, [classId]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      fetchStudents(newPage);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Class Students</h2>
      {loading ? (
        <p className="text-orange-500">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-600">No students found in this class.</p>
      ) : (
        <>
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="text-left px-4 py-2">Full Name</th>
                <th className="text-left px-4 py-2">Student ID</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2">{student.fullName}</td>
                  <td className="px-4 py-2">{student.studentId}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              disabled={pagination.page === 1}
            >
              Previous
            </button>
            <p className="text-gray-800">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassDetailsClient;
