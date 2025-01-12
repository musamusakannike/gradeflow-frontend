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
  const [newSubjectData, setNewSubjectData] = useState({
    name: "",
    classId: "",
    teacherId: "",
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const subjectsData = await adminService.getSubjects();
        const classesData = await adminService.getClasses();
        const teachersData = await adminService.getTeachers();
        setSubjects(subjectsData);
        setClasses(classesData);
        setTeachers(teachersData);
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("Failed to fetch data. Please try again.");
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
      toast.error(err.response?.data?.message || "Failed to add subject.");
    }
  };

  const handleBulkToggleJoinPermission = async (allowStudentAddition) => {
    if (selectedSubjects.length === 0) {
      toast.error("No subjects selected for bulk action.");
      return;
    }

    try {
      setBulkActionLoading(true);
      await adminService.toggleJoinPermissionsBulk(
        selectedSubjects,
        allowStudentAddition
      );
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
          selectedSubjects.includes(subject._id)
            ? { ...subject, allowStudentAddition }
            : subject
        )
      );
      setSelectedSubjects([]);
      toast.success(
        `Subject join permission ${
          allowStudentAddition ? "enabled" : "disabled"
        } for selected subjects.`
      );
    } catch (err) {
      console.error("Failed to toggle join permission", err);
      toast.error("Failed to toggle join permission. Please try again.");
    } finally {
      setBulkActionLoading(false);
    }
  };

  const toggleSubjectSelection = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
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

      {loading ? (
        <p className="text-orange-500 mt-6">Loading...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => handleBulkToggleJoinPermission(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow"
              disabled={bulkActionLoading}
            >
              Enable Join for Selected
            </button>
            <button
              onClick={() => handleBulkToggleJoinPermission(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow"
              disabled={bulkActionLoading}
            >
              Disable Join for Selected
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className={`bg-white shadow-lg rounded-lg p-6 ${
                  selectedSubjects.includes(subject._id)
                    ? "border-2 border-orange-500"
                    : ""
                }`}
              >
                <h4 className="text-lg font-bold text-gray-800">
                  {subject.name}
                </h4>
                <p className="text-gray-600">
                  Class: {subject.classId?.name || "N/A"}
                </p>
                <p className="text-gray-600">
                  Teacher: {subject.teacherId?.fullName || "N/A"}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-600">
                    {subject.allowStudentAddition
                      ? "Joining Enabled"
                      : "Joining Disabled"}
                  </span>
                  <ReactSwitch
                    onChange={() =>
                      handleBulkToggleJoinPermission(
                        !subject.allowStudentAddition
                      )
                    }
                    checked={subject.allowStudentAddition}
                    onColor="#f97316"
                    offColor="#d1d5db"
                    onHandleColor="#ffffff"
                    offHandleColor="#ffffff"
                    handleDiameter={22}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 2px 3px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="cursor-pointer"
                  />
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => toggleSubjectSelection(subject._id)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedSubjects.includes(subject._id)
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-orange-100"
                    }`}
                  >
                    {selectedSubjects.includes(subject._id)
                      ? "Deselect"
                      : "Select"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
            Assign Class
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
            Assign Teacher
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
                {teacher.fullName}
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
    </div>
  );
};

export default SubjectsPage;
