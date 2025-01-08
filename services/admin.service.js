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
};

export default adminService;
