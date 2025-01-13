import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
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
};

export default teacherService;
