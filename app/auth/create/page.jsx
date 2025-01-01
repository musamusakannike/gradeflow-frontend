"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    schoolName: "",
    adminEmail: "",
    schoolEmail: "",
    schoolAddress: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");
    try {
      const response = await authService.adminSignUp(formData);
      setSuccess("Sign-up successful! Redirecting...");
      setTimeout(() => router.replace("/auth/login"), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Sign Up as a <span className="text-orange-500">School Owner</span>
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Create your school account to start managing your institution seamlessly.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="School Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              placeholder="Admin Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              name="schoolEmail"
              value={formData.schoolEmail}
              onChange={handleChange}
              placeholder="School Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              name="schoolAddress"
              value={formData.schoolAddress}
              onChange={handleChange}
              placeholder="School Address"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
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
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-orange-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
