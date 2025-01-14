"use client";

import { useEffect, useState } from "react";
import teacherService from "@/services/teacher.service";
import toast from "react-hot-toast";
import ReactSwitch from "react-switch";
import Link from "next/link";

const TeacherSubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await teacherService.getTeacherSubjects();
        setSubjects(data);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
        toast.error("Failed to load subjects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleToggleJoinPermission = async (subjectId, currentState) => {
    try {
      await teacherService.toggleSubjectJoinPermission(
        subjectId,
        !currentState
      );
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) =>
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

  return (
    <div className="p-6 bg-gray-100 h-screen overflow-y-scroll">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Subjects You Teach
      </h2>

      {loading ? (
        <p className="text-orange-500">Loading...</p>
      ) : subjects.length === 0 ? (
        <p className="text-gray-600">You are not teaching any subjects.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.subjectId}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div>
                <h4 className="text-lg font-bold text-gray-800">
                  {subject.subjectName}
                </h4>
                <p className="text-gray-600">
                  Class: {subject.className || "Unassigned"}
                </p>
                <p className="text-gray-600">
                  Students: {subject.totalStudents || 0}
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
                      subject.subjectId,
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
              <Link href={`/teacher/subjects/${subject.subjectId}`} className="text-orange-500 mt-4">View Details →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherSubjectsPage;
