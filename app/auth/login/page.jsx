"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners"; // Import spinner
import authService from "@/services/auth.service";

const Login = () => {
  const [role, setRole] = useState("admin"); // Default role: admin
  const [formData, setFormData] = useState({
    adminEmail: "",
    teacherId: "",
    studentId: "",
    schoolId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true when login starts
    try {
      let response;
      if (role === "admin") {
        response = await authService.adminLogin({
          adminEmail: formData.adminEmail,
          password: formData.password,
        });
      } else if (role === "teacher") {
        response = await authService.teacherLogin({
          teacherId: formData.teacherId,
          schoolId: formData.schoolId,
          password: formData.password,
        });
      } else if (role === "student") {
        response = await authService.studentLogin({
          studentId: formData.studentId,
          schoolId: formData.schoolId,
          password: formData.password,
        });
      }

      // Save token to localStorage
      if (response?.token) {
        localStorage.setItem("authToken", response.token);
      }

      // Role-based redirect
      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else if (role === "teacher") {
        router.replace("/teacher/dashboard");
      } else if (role === "student") {
        router.replace("/student/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <section className="bg-gray-50 py-12 min-h-[100vh] flex items-center">
      <div className="container mx-auto px-2 sm:px-6">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Log In as <span className="text-orange-500 capitalize">{role}</span>
          </h2>

          {/* Role Switcher */}
          <div className="flex justify-center mb-8">
            {["admin", "teacher", "student"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 font-semibold rounded-t-lg ${
                  role === r
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Conditional Fields */}
            {role === "admin" && (
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                placeholder="Admin Email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            )}
            {role !== "admin" && (
              <>
                <input
                  type="text"
                  name={`${role}Id`}
                  value={
                    role === "teacher" ? formData.teacherId : formData.studentId
                  }
                  onChange={handleChange}
                  placeholder={`${
                    role.charAt(0).toUpperCase() + role.slice(1)
                  } ID`}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="schoolId"
                  value={formData.schoolId}
                  onChange={handleChange}
                  placeholder="School ID"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </>
            )}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition flex justify-center items-center"
            >
              {loading ? (
                <ClipLoader size={20} color="#fff" /> // Display spinner
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
