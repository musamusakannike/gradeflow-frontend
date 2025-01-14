"use client";

import { useEffect, useState } from "react";
import adminService from "@/services/admin.service";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";

const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    fullName: "",
    email: "",
    classId: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await adminService.getStudents();
        const classData = await adminService.getClasses();
        setStudents(studentData);
        setClasses(classData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddStudent = async () => {
    const { fullName, classId, password } = newStudentData;

    if (!fullName || !classId || !password) {
      toast.error("Full name, class, and password are required.");
      return;
    }

    try {
      const newStudent = await adminService.addStudent(newStudentData);
      setStudents((prev) => [newStudent, ...prev]);
      setShowAddModal(false);
      setNewStudentData({ fullName: "", email: "", classId: "", password: "" });
      toast.success("Student added successfully!");
    } catch (err) {
      console.error("Failed to add student:", err);
      toast.error("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Students</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow"
        >
          + Add Student
        </button>
      </div>

      {loading ? (
        <p className="text-orange-500 mt-6">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-600">No students found.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600">Full Name</th>
              <th className="py-2 px-4 text-left text-gray-600">Student ID</th>
              <th className="py-2 px-4 text-left text-gray-600">Email</th>
              <th className="py-2 px-4 text-left text-gray-600">Class</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition-all"
              >
                <td className="py-2 px-4">{student.fullName}</td>
                <td className="py-2 px-4">{student.studentId}</td>
                <td className="py-2 px-4">{student.email || "N/A"}</td>
                <td className="py-2 px-4">{student.classId?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Student Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Student"
      >
        <div>
          <label
            htmlFor="studentFullName"
            className="block text-gray-700 font-bold mb-2"
          >
            Full Name
          </label>
          <input
            id="studentFullName"
            type="text"
            value={newStudentData.fullName}
            onChange={(e) =>
              setNewStudentData({ ...newStudentData, fullName: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Full Name"
          />
          <label
            htmlFor="studentEmail"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Email (Optional)
          </label>
          <input
            id="studentEmail"
            type="email"
            value={newStudentData.email}
            onChange={(e) =>
              setNewStudentData({ ...newStudentData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Email"
          />
          <label
            htmlFor="studentClass"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Assign Class
          </label>
          <select
            id="studentClass"
            value={newStudentData.classId}
            onChange={(e) =>
              setNewStudentData({ ...newStudentData, classId: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="studentPassword"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Password
          </label>
          <input
            id="studentPassword"
            type="password"
            value={newStudentData.password}
            onChange={(e) =>
              setNewStudentData({ ...newStudentData, password: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Password"
          />
          <button
            onClick={handleAddStudent}
            className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Student
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminStudentsPage;
