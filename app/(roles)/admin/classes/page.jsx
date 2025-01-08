"use client";

import { useEffect, useState } from "react";
import adminService from "@/services/admin.service";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newClassData, setNewClassData] = useState({
    name: "",
    teacherId: "",
  });
  const [currentClass, setCurrentClass] = useState(null);
  const [deleteClassName, setDeleteClassName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classData = await adminService.getClasses();
        const teacherData = await adminService.getTeachers();
        setClasses(classData);
        setTeachers(teacherData);
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddClass = async () => {
    const { name, teacherId } = newClassData;

    if (!name.trim() || !teacherId) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const newClass = await adminService.addClass(newClassData);
      setClasses((prev) => [newClass, ...prev]);
      setShowAddModal(false);
      setNewClassData({ name: "", teacherId: "" });
      toast.success("Class added successfully!");
    } catch (err) {
      console.error("Failed to add class", err);
      toast.error("Failed to add class. Please try again.");
    }
  };

  const handleUpdateClass = async () => {
    const { name, teacherId } = currentClass;

    if (!name.trim() || !teacherId) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const updatedClass = await adminService.updateClass(currentClass._id, {
        name,
        teacherId,
      });
      setClasses((prev) =>
        prev.map((cls) => (cls._id === updatedClass._id ? updatedClass : cls))
      );
      setShowUpdateModal(false);
      setCurrentClass(null);
      toast.success("Class updated successfully!");
    } catch (err) {
      console.error("Failed to update class", err);
      toast.error("Failed to update class. Please try again.");
    }
  };

  const confirmDeleteClass = async () => {
    if (deleteClassName !== currentClass?.name) {
      toast.error("Class name does not match.");
      return;
    }

    try {
      await adminService.deleteClass(currentClass._id);
      setClasses((prev) => prev.filter((cls) => cls._id !== currentClass._id));
      setShowDeleteModal(false);
      setCurrentClass(null);
      setDeleteClassName("");
      toast.success("Class deleted successfully!");
    } catch (err) {
      console.error("Failed to delete class", err);
      toast.error("Failed to delete class. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Classes</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow"
        >
          + Add Class
        </button>
      </div>

      {loading ? (
        <p className="text-orange-500 mt-6">Loading...</p>
      ) : classes.length === 0 ? (
        <p className="text-gray-600">
          No classes available. Add a new class to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classes.map((cls, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-bold text-gray-800">
                  {cls?.name || "Unnamed Class"}
                </h4>
                <p className="text-gray-600">
                  Teacher: {cls?.teacher?.fullName || "Not assigned"}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => {
                    setCurrentClass(cls);
                    setShowUpdateModal(true);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setCurrentClass(cls);
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

      {/* Add Class Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Class"
      >
        <div>
          <label
            htmlFor="className"
            className="block text-gray-700 font-bold mb-2"
          >
            Class Name
          </label>
          <input
            id="className"
            type="text"
            value={newClassData.name}
            onChange={(e) =>
              setNewClassData({ ...newClassData, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., Grade 1, SS1"
          />
          <label
            htmlFor="teacherDropdown"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Assign Teacher
          </label>
          <select
            id="teacherDropdown"
            value={newClassData.teacherId}
            onChange={(e) =>
              setNewClassData({ ...newClassData, teacherId: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.fullName} - {teacher.email}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddClass}
            className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Class
          </button>
        </div>
      </Modal>

      {/* Update Class Modal */}
      <Modal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title="Update Class"
      >
        <div>
          <label
            htmlFor="updateClassName"
            className="block text-gray-700 font-bold mb-2"
          >
            Class Name
          </label>
          <input
            id="updateClassName"
            type="text"
            value={currentClass?.name || ""}
            onChange={(e) =>
              setCurrentClass({ ...currentClass, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., Grade 1, SS1"
          />
          <label
            htmlFor="updateTeacherDropdown"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Assign Teacher
          </label>
          <select
            id="updateTeacherDropdown"
            value={currentClass?.teacherId || ""}
            onChange={(e) =>
              setCurrentClass({ ...currentClass, teacherId: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.fullName} - {teacher.email}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateClass}
            className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Update Class
          </button>
        </div>
      </Modal>
      {/* Delete Class Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteClassName("");
        }}
        title="Delete Class"
      >
        <div>
          <p className="text-gray-700 mb-4">
            Please type the class name <strong>{currentClass?.name}</strong> to confirm deletion.
          </p>
          <input
            type="text"
            value={deleteClassName}
            onChange={(e) => setDeleteClassName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Type class name..."
          />
          <button
            onClick={confirmDeleteClass}
            className="mt-4 w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition"
          >
            Confirm Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ClassesPage;
