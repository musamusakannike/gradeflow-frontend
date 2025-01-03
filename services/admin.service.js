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
};

export default adminService;
