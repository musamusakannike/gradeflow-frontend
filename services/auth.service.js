import axios from "axios";

// Set base URL
const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

const authService = {
  // Admin Sign-Up Function
  adminSignUp: async (formData) => {
    const response = await API.post("auth/admin/signup", formData);
    return response.data;
  },
};

export default authService;
