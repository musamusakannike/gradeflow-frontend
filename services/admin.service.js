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
};

export default adminService;
