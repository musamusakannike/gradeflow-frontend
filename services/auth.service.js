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
  // Admin Login Function
  adminLogin: async (formData) => {
    const response = await API.post("auth/admin/login", formData);
    return response.data;
  },
  // Teacher Log-In Function
  teacherLogin: async (formData) => {
    const response = await API.post("auth/teacher/login", formData);
    return response.data;
  },
    // Student Log-In Function
  studentLogin: async (formData) => {
    const response = await API.post("auth/student/login", formData);
    return response.data;
  },
};

export default authService;
