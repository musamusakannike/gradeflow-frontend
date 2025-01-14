"use client";

import { useEffect, useState } from "react";
import teacherService from "@/services/teacher.service";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";

const SubjectDetailsClient = ({ subjectId }) => {
  const [subject, setSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [studentIdToAdd, setStudentIdToAdd] = useState("");

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await teacherService.getSubjectStudents(subjectId);
        const data = response;
        setSubject(data);
        console.log(`Data: ${data}`)
        setStudents(data?.students);
      } catch (err) {
        console.error("Failed to fetch subject details:", err);
        toast.error("Failed to load subject details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectDetails();
  }, [subjectId]);

  const handleAddStudent = async () => {
    if (!studentIdToAdd.trim()) {
      toast.error("Student ID cannot be empty.");
      return;
    }

    try {
      await teacherService.addStudentToSubject(subjectId, studentIdToAdd);
      setStudents((prev) => [
        ...prev,
        { studentId: studentIdToAdd, fullName: "New Student" }, // Placeholder
      ]);
      setShowAddStudentModal(false);
      setStudentIdToAdd("");
      toast.success("Student added successfully!");
    } catch (err) {
      console.error("Failed to add student:", err);
      toast.error("Failed to add student. Please try again.");
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      await teacherService.removeStudentFromSubject(subjectId, studentId);
      setStudents((prev) => prev.filter((student) => student.studentId !== studentId));
      toast.success("Student removed successfully!");
    } catch (err) {
      console.error("Failed to remove student:", err);
      toast.error("Failed to remove student. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      {loading ? (
        <p className="text-orange-500">Loading...</p>
      ) : !subject ? (
        <p className="text-gray-600">Subject details not found.</p>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {subject.subjectName} - {subject.className}
          </h2>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Students</h3>
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow"
            >
              + Add Student
            </button>
          </div>

          {students.length === 0 ? (
            <p className="text-gray-600">No students are enrolled in this subject.</p>
          ) : (
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left text-gray-600">Full Name</th>
                  <th className="py-2 px-4 text-left text-gray-600">Student ID</th>
                  <th className="py-2 px-4 text-left text-gray-600">Email</th>
                  <th className="py-2 px-4 text-center text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{student.fullName}</td>
                    <td className="py-2 px-4">{student.studentId}</td>
                    <td className="py-2 px-4">{student.email}</td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleRemoveStudent(student.studentId)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* Add Student Modal */}
      <Modal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        title="Add Student to Subject"
      >
        <div>
          <label
            htmlFor="studentIdInput"
            className="block text-gray-700 font-bold mb-2"
          >
            Student ID
          </label>
          <input
            id="studentIdInput"
            type="text"
            value={studentIdToAdd}
            onChange={(e) => setStudentIdToAdd(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., STD-1735617165745-417"
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

export default SubjectDetailsClient;
