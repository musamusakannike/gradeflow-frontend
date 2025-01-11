"use client";

import { useEffect, useState } from "react";
import adminService from "@/services/admin.service";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [confirmationInput, setConfirmationInput] = useState("");

  const [newTeacherData, setNewTeacherData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const data = await adminService.getTeachers();
        setTeachers(data);
      } catch (err) {
        console.error("Failed to fetch teachers", err);
        toast.error("Failed to fetch teachers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleAddTeacher = async () => {
    const { fullName, email, password } = newTeacherData;

    if (!fullName || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const newTeacher = await adminService.addTeacher(newTeacherData);
      setTeachers((prev) => [newTeacher, ...prev]);
      setShowAddModal(false);
      setNewTeacherData({ fullName: "", email: "", password: "" });
      toast.success("Teacher added successfully!");
    } catch (err) {
      console.error("Failed to add teacher", err);
      toast.error(err.response?.data?.message || "Failed to add teacher.");
    }
  };

  const handleDeleteTeacher = async () => {
    if (confirmationInput !== selectedTeacher?.fullName) {
      toast.error("The full name does not match.");
      return;
    }

    try {
      await adminService.deleteTeacher(selectedTeacher._id);
      setTeachers((prev) =>
        prev.filter((teacher) => teacher._id !== selectedTeacher._id)
      );
      setShowDeleteModal(false);
      setSelectedTeacher(null);
      setConfirmationInput("");
      toast.success("Teacher deleted successfully!");
    } catch (err) {
      console.error("Failed to delete teacher", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to delete teacher. Please try again."
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Teachers</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow"
        >
          + Add Teacher
        </button>
      </div>

      {loading ? (
        <p className="text-orange-500 mt-6">Loading...</p>
      ) : teachers.length === 0 ? (
        <p className="text-gray-600">No teachers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-bold text-gray-800">
                  {teacher.fullName}
                </h4>
                <div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="text-gray-500"> {teacher.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Teacher ID:</p>
                    <p className="text-gray-500"> {teacher.teacherId}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Teacher Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Teacher"
      >
        <div>
          <label
            htmlFor="teacherFullName"
            className="block text-gray-700 font-bold mb-2"
          >
            Full Name
          </label>
          <input
            id="teacherFullName"
            type="text"
            value={newTeacherData.fullName}
            onChange={(e) =>
              setNewTeacherData({ ...newTeacherData, fullName: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Full Name"
          />
          <label
            htmlFor="teacherEmail"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Email
          </label>
          <input
            id="teacherEmail"
            type="email"
            value={newTeacherData.email}
            onChange={(e) =>
              setNewTeacherData({ ...newTeacherData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Email"
          />
          <label
            htmlFor="teacherPassword"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Password
          </label>
          <input
            id="teacherPassword"
            type="password"
            value={newTeacherData.password}
            onChange={(e) =>
              setNewTeacherData({
                ...newTeacherData,
                password: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Password"
          />
          <button
            onClick={handleAddTeacher}
            className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Teacher
          </button>
        </div>
      </Modal>

      {/* Delete Teacher Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedTeacher(null);
          setConfirmationInput("");
        }}
        title="Delete Teacher"
      >
        <div>
          <p className="text-gray-700">
            Type the full name of the teacher <strong>{selectedTeacher?.fullName}</strong> to confirm
            deletion.
          </p>
          <input
            type="text"
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-4"
            placeholder="Full Name"
          />
          <button
            onClick={handleDeleteTeacher}
            className="mt-4 w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition"
          >
            Confirm Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TeachersPage;
