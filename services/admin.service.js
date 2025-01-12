import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

const adminService = {
  getStatistics: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("admin/statistics", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
  getSessionsWithTerms: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("term/sessions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
  toggleScoring: async (termId, isScoringEnabled) => {
    const token = localStorage.getItem("authToken");
    const response = await API.patch(
      "term/toggle-scoring",
      { termId, isScoringEnabled },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  },
  addSession: async (data) => {
    const token = localStorage.getItem("authToken");
    const response = await API.post("term/session", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
  addTerm: async (data) => {
    const token = localStorage.getItem("authToken");
    const response = await API.post("term/term", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
  getClasses: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("class/list-classes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  getTeachers: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("admin/list-teachers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
  deleteTeacher: async (teacherId) => {
    const token = localStorage.getItem("authToken");
    await API.delete(`admin/delete-teacher/${teacherId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  addClass: async (data) => {
    const token = localStorage.getItem("authToken");
    const response = await API.post("class/create", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  updateClass: async (classId, data) => {
    const token = localStorage.getItem("authToken");
    const response = await API.patch(`class/${classId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  deleteClass: async (classId) => {
    const token = localStorage.getItem("authToken");
    await API.delete(`class/${classId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getStudentsInClass: async (classId, page = 1, limit = 10) => {
    const token = localStorage.getItem("authToken");
    const response = await API.get(`class/list-students`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { classId, page, limit },
    });
    return response.data.data;
  },
  addTeacher: async (data) => {
    const token = localStorage.getItem("authToken");
    const response = await API.post("auth/admin/create/teacher", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
  getSubjects: async () => {
    const token = localStorage.getItem("authToken");
    const response = await API.get("subject/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Returns list of subjects
  },
  addSubject: async (data) => {
    const token = localStorage.getItem("authToken");
    const response = await API.post("subject/create", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
  toggleSubjectJoinPermission: async (subjectId, allowStudentAddition) => {
    const token = localStorage.getItem("authToken");
    const response = await API.patch(
      "subject/toggle-join-permission",
      { subjectId, allowStudentAddition },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  },
  toggleJoinPermissionsBulk: async (subjectIds, allowStudentAddition) => {
    const token = localStorage.getItem("authToken");
    const response = await API.patch(
      "subject/toggle-join-permissions-bulk",
      { subjectIds, allowStudentAddition },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  },
  deleteSubject: async (subjectId) => {
    const token = localStorage.getItem("authToken");
    await API.delete(`subject/delete/${subjectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  
  editSubject: async (subjectId, data) => {
    const token = localStorage.getItem("authToken");
    const response = await API.patch(`subject/edit/${subjectId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },
  
};

export default adminService;
