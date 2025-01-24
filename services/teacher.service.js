import axios from "axios";

const API = axios.create({
  baseURL: "https://gradeflow-server.onrender.com/api/v1/",
});

const teacherService = {
  getDashboardStats: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("teacher/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Returns the `data` object from the response
  },

  getSubjects: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("teacher/subjects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Returns the list of subjects
  },

  getClasses: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("teacher/classes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Returns the list of classes
  },

  addStudentToSubject: async (data) => {
    const token = localStorage.getItem("authToken");
    const response = await API.post("teacher/subject/add-student", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Returns the updated subject
  },

  removeStudentFromSubject: async (data) => {
    const token = localStorage.getItem("authToken");
    const response = await API.post("teacher/subject/remove-student", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Returns the updated subject
  },
  getTeacherClasses: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("teacher/classes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Returns the list of classes
  },
  getTeacherSubjects: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("subject/teacher/subjects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  toggleSubjectJoinPermission: async (subjectId, allowStudentAddition) => {
    const token = localStorage.getItem("authToken");
    const response = await API.patch(
      "subject/toggle-join-permission",
      { subjectId, allowStudentAddition },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },
  getClassStudents: async (classId, page = 1, limit = 20) => {
    const token = localStorage.getItem("authToken");
    const response = await API.get(
      `class/list-students?classId=${classId}&page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },
  getSubjectStudents: async (subjectId) => {
    const token = localStorage.getItem("authToken");
    const response = await API.get(`subject/students?subjectId=${subjectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
  addStudentToSubject: async (subjectId, studentId) => {
    const token = localStorage.getItem("authToken");
    await API.post("subject/add-student", { subjectId, studentId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  removeStudentFromSubject: async (subjectId, studentId) => {
    const token = localStorage.getItem("authToken");
    await API.post("subject/remove-student", { subjectId, studentId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default teacherService;
