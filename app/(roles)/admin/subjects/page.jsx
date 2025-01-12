"use client";

import { useEffect, useState } from "react";
import adminService from "@/services/admin.service";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import ReactSwitch from "react-switch";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Confirmation modal state
  const [subjectToDelete, setSubjectToDelete] = useState(null); // Subject to delete

  const [newSubjectData, setNewSubjectData] = useState({
    name: "",
    classId: "",
    teacherId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSubjects = await adminService.getSubjects();
        const fetchedClasses = await adminService.getClasses();
        const fetchedTeachers = await adminService.getTeachers();

        setSubjects(fetchedSubjects);
        setClasses(fetchedClasses);
        setTeachers(fetchedTeachers);
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddSubject = async () => {
    const { name, classId, teacherId } = newSubjectData;

    if (!name || !classId || !teacherId) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const newSubject = await adminService.addSubject(newSubjectData);
      setSubjects((prev) => [newSubject, ...prev]);
      setShowAddModal(false);
      setNewSubjectData({ name: "", classId: "", teacherId: "" });
      toast.success("Subject added successfully!");
    } catch (err) {
      console.error("Failed to add subject", err);
      toast.error("Failed to add subject. Please try again.");
    }
  };

  const handleEditSubject = async () => {
    if (
      !currentSubject.name ||
      !currentSubject.classId ||
      !currentSubject.teacherId
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const updatedSubject = await adminService.editSubject(
        currentSubject._id,
        currentSubject
      );
      setSubjects((prev) =>
        prev.map((subject) =>
          subject._id === updatedSubject._id ? updatedSubject : subject
        )
      );
      setShowEditModal(false);
      setCurrentSubject(null);
      toast.success("Subject updated successfully!");
    } catch (err) {
      console.error("Failed to update subject", err);
      toast.error("Failed to update subject. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!subjectToDelete) return;

    try {
      await adminService.deleteSubject(subjectToDelete._id);
      setSubjects((prev) =>
        prev.filter((subject) => subject._id !== subjectToDelete._id)
      );
      setShowDeleteModal(false);
      setSubjectToDelete(null);
      toast.success("Subject deleted successfully!");
    } catch (err) {
      console.error("Failed to delete subject", err);
      toast.error("Failed to delete subject. Please try again.");
    }
  };

  const handleToggleAllJoinPermissions = async (allowStudentAddition) => {
    try {
      await adminService.toggleJoinPermissionsBulk(
        subjects.map((subject) => subject._id),
        allowStudentAddition
      );
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) => ({
          ...subject,
          allowStudentAddition,
        }))
      );
      toast.success(
        `Join permissions ${
          allowStudentAddition ? "enabled" : "disabled"
        } for all subjects.`
      );
    } catch (err) {
      console.error("Failed to toggle join permissions", err);
      toast.error("Failed to toggle join permissions. Please try again.");
    }
  };

  const handleToggleJoinPermission = async (subjectId, currentState) => {
    try {
      await adminService.toggleSubjectJoinPermission(subjectId, !currentState);
      setSubjects((prev) =>
        prev.map((subject) =>
          subject._id === subjectId
            ? { ...subject, allowStudentAddition: !currentState }
            : subject
        )
      );
      toast.success(
        `Joining ${!currentState ? "enabled" : "disabled"} for this subject.`
      );
    } catch (err) {
      console.error("Failed to toggle join permission", err);
      toast.error("Failed to update join permission.");
    }
  };

  const openDeleteModal = (subject) => {
    setSubjectToDelete(subject);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Subjects</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow"
        >
          + Add Subject
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleToggleAllJoinPermissions(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow"
        >
          Enable Join for All
        </button>
        <button
          onClick={() => handleToggleAllJoinPermissions(false)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow"
        >
          Disable Join for All
        </button>
      </div>
      {loading ? (
        <p className="text-orange-500">Loading...</p>
      ) : subjects.length === 0 ? (
        <p className="text-gray-600">No subjects available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-bold text-gray-800">
                  {subject.name}
                </h4>
                <p className="text-gray-600">
                  Class: {subject.classId?.name || "Unassigned"}
                </p>
                <p className="text-gray-600">
                  Teacher: {subject.teacherId?.fullName || "Unassigned"}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-600">
                  {subject.allowStudentAddition
                    ? "Joining Enabled"
                    : "Joining Disabled"}
                </span>
                <ReactSwitch
                  onChange={() =>
                    handleToggleJoinPermission(
                      subject._id,
                      subject.allowStudentAddition
                    )
                  }
                  checked={subject.allowStudentAddition}
                  onColor="#f97316"
                  offColor="#d1d5db"
                  onHandleColor="#ffffff"
                  offHandleColor="#ffffff"
                  height={20}
                  width={48}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => {
                    setCurrentSubject(subject);
                    setShowEditModal(true);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(subject)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add Subject Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Subject"
      >
        {/* Add Subject Form (same as before) */}
      </Modal>
      {/* Edit Subject Modal */}
      {currentSubject && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Subject"
        >
          <div>
            <label
              htmlFor="editSubjectName"
              className="block text-gray-700 font-bold mb-2"
            >
              Subject Name
            </label>
            <input
              id="editSubjectName"
              type="text"
              value={currentSubject.name}
              onChange={(e) =>
                setCurrentSubject({ ...currentSubject, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Mathematics"
            />
            <label
              htmlFor="editClassDropdown"
              className="block text-gray-700 font-bold mt-4 mb-2"
            >
              Select Class
            </label>
            <select
              id="editClassDropdown"
              value={currentSubject.classId}
              onChange={(e) =>
                setCurrentSubject({
                  ...currentSubject,
                  classId: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {" "}
              <option value="">Select a class</option>{" "}
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {" "}
                  {cls.name}{" "}
                </option>
              ))}{" "}
            </select>{" "}
            <label
              htmlFor="editTeacherDropdown"
              className="block text-gray-700 font-bold mt-4 mb-2"
            >
              {" "}
              Select Teacher{" "}
            </label>{" "}
            <select
              id="editTeacherDropdown"
              value={currentSubject.teacherId}
              onChange={(e) =>
                setCurrentSubject({
                  ...currentSubject,
                  teacherId: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {" "}
              <option value="">Select a teacher</option>{" "}
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {" "}
                  {teacher.fullName} - {teacher.email}{" "}
                </option>
              ))}{" "}
            </select>{" "}
            <button
              onClick={handleEditSubject}
              className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
            >
              {" "}
              Update Subject{" "}
            </button>{" "}
          </div>{" "}
        </Modal>
      )}{" "}
      {/* Add Subject Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Subject"
      >
        <div>
          <label
            htmlFor="subjectName"
            className="block text-gray-700 font-bold mb-2"
          >
            Subject Name
          </label>
          <input
            id="subjectName"
            type="text"
            value={newSubjectData.name}
            onChange={(e) =>
              setNewSubjectData({ ...newSubjectData, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g., Mathematics"
          />
          <label
            htmlFor="classDropdown"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Select Class
          </label>
          <select
            id="classDropdown"
            value={newSubjectData.classId}
            onChange={(e) =>
              setNewSubjectData({ ...newSubjectData, classId: e.target.value })
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
            htmlFor="teacherDropdown"
            className="block text-gray-700 font-bold mt-4 mb-2"
          >
            Select Teacher
          </label>
          <select
            id="teacherDropdown"
            value={newSubjectData.teacherId}
            onChange={(e) =>
              setNewSubjectData({
                ...newSubjectData,
                teacherId: e.target.value,
              })
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
            onClick={handleAddSubject}
            className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Subject
          </button>
        </div>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <div>
          <p>
            Are you sure you want to delete the subject "{subjectToDelete?.name}
            "?
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SubjectsPage;
