"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

// Password strength levels
enum PasswordStrength {
  NONE = 0,
  WEAK = 1,
  MEDIUM = 2,
  STRONG = 3,
  VERY_STRONG = 4,
}

interface FormData {
  schoolName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  email: string;
  website: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
}

interface FormErrors {
  schoolName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  adminFirstName?: string;
  adminLastName?: string;
  adminEmail?: string;
  adminPassword?: string;
  general?: string;
}

export default function GetStartedPage() {
  const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    email: "",
    website: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(
    PasswordStrength.NONE
  );
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      router.push("/dashboard");
    }

    // Animation on mount
    setIsVisible(true);
  }, [isAuthenticated, router]);

  // Calculate password strength
  useEffect(() => {
    const password = formData.adminPassword;
    if (!password) {
      setPasswordStrength(PasswordStrength.NONE);
      return;
    }

    let strength = 0;

    // Length check
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;

    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Cap at VERY_STRONG
    setPasswordStrength(Math.min(strength, PasswordStrength.VERY_STRONG));
  }, [formData.adminPassword]);

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case PasswordStrength.NONE:
        return { text: "Enter a password", color: "text-gray-400" };
      case PasswordStrength.WEAK:
        return { text: "Weak", color: "text-red-500" };
      case PasswordStrength.MEDIUM:
        return { text: "Medium", color: "text-orange-500" };
      case PasswordStrength.STRONG:
        return { text: "Strong", color: "text-green-500" };
      case PasswordStrength.VERY_STRONG:
        return { text: "Very Strong", color: "text-green-600" };
    }
  };

  const getPasswordStrengthBarColor = (level: number) => {
    if (passwordStrength >= level) {
      switch (passwordStrength) {
        case PasswordStrength.WEAK:
          return "bg-red-500";
        case PasswordStrength.MEDIUM:
          return "bg-orange-500";
        case PasswordStrength.STRONG:
        case PasswordStrength.VERY_STRONG:
          return "bg-green-500";
        default:
          return "bg-gray-200";
      }
    }
    return "bg-gray-200";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof FormData]);
  };

  const validateField = (name: string, value: string) => {
    let error: string | undefined;

    switch (name) {
      case "schoolName":
        if (!value.trim()) {
          error = "School name is required";
        } else if (value.length < 2 || value.length > 100) {
          error = "School name must be between 2 and 100 characters";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required";
        }
        break;

      case "city":
        if (!value.trim()) {
          error = "City is required";
        }
        break;

      case "state":
        if (!value.trim()) {
          error = "State is required";
        }
        break;

      case "country":
        if (!value.trim()) {
          error = "Country is required";
        }
        break;

      case "phoneNumber":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\+?[0-9\s\-()]+$/.test(value)) {
          error = "Please enter a valid phone number";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "website":
        if (
          value.trim() &&
          !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?#].*)?$/.test(
            value
          )
        ) {
          error = "Please enter a valid website URL";
        }
        break;

      case "adminFirstName":
        if (!value.trim()) {
          error = "First name is required";
        } else if (value.length < 2 || value.length > 50) {
          error = "First name must be between 2 and 50 characters";
        }
        break;

      case "adminLastName":
        if (!value.trim()) {
          error = "Last name is required";
        } else if (value.length < 2 || value.length > 50) {
          error = "Last name must be between 2 and 50 characters";
        }
        break;

      case "adminEmail":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "adminPassword":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters long";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors = {};
    const fields = Object.keys(formData) as Array<keyof FormData>;

    // Only validate fields relevant to the current step
    const fieldsToValidate =
      currentStep === 1
        ? [
            "schoolName",
            "address",
            "city",
            "state",
            "country",
            "phoneNumber",
            "email",
            "website",
          ]
        : ["adminFirstName", "adminLastName", "adminEmail", "adminPassword"];
    for (const field of fieldsToValidate as Array<keyof FormData>) {
      const value = formData[field];
      if (!validateField(field, value)) {
        isValid = false;
        // Set touched for all invalid fields to show errors
        setTouched((prev) => ({ ...prev, [field]: true }));
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    const isValid = validateForm();
    if (isValid) {
      setCurrentStep(2);
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register-school`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setRegistrationSuccess(true);

        // Log the user in with the returned token
        await login(formData.adminEmail, formData.adminPassword);

        // Redirect will happen automatically through the auth context
      } else {
        setErrors({
          general: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        general: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your school has been registered successfully. You are now logged in
            as a school administrator.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <div
        className={`max-w-3xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Logo and heading */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                <span className="text-2xl font-bold text-white">G</span>
              </div>
              <span className="text-3xl font-bold text-gray-900">
                GradeFlow
              </span>
            </div>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Register Your School
          </h1>
          <p className="mt-2 text-gray-600">
            Get started with GradeFlow and transform your school management
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                School Info
              </span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className={`h-full ${
                  currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                }`}
                style={{ width: currentStep >= 2 ? "100%" : "0%" }}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                Admin Info
              </span>
            </div>
          </div>
        </div>

        {/* Registration form */}
        <div
          className={`bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 transition-all duration-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: School Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  School Information
                </h2>

                {/* School Name */}
                <div>
                  <label
                    htmlFor="schoolName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    School Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      value={formData.schoolName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        touched.schoolName && errors.schoolName
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="Enter school name"
                    />
                  </div>
                  {touched.schoolName && errors.schoolName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.schoolName}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        touched.address && errors.address
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="Enter school address"
                    />
                  </div>
                  {touched.address && errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City, State, Country in a grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-3 py-3 border ${
                        touched.city && errors.city
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="City"
                    />
                    {touched.city && errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-3 py-3 border ${
                        touched.state && errors.state
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="State"
                    />
                    {touched.state && errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full px-3 py-3 border ${
                        touched.country && errors.country
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="Country"
                    />
                    {touched.country && errors.country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        touched.phoneNumber && errors.phoneNumber
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="+1234567890"
                    />
                  </div>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    School Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        touched.email && errors.email
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="school@example.com"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Website (Optional) */}
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Website <span className="text-gray-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        touched.website && errors.website
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="https://school.example.com"
                    />
                  </div>
                  {touched.website && errors.website && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.website}
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Admin Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Administrator Information
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  This person will be the primary administrator for your
                  school&apos;s GradeFlow account.
                </p>

                {/* Admin First Name and Last Name in a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Admin First Name */}
                  <div>
                    <label
                      htmlFor="adminFirstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="adminFirstName"
                        name="adminFirstName"
                        type="text"
                        value={formData.adminFirstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`block w-full pl-10 pr-3 py-3 border ${
                          touched.adminFirstName && errors.adminFirstName
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } rounded-lg transition duration-150`}
                        placeholder="Enter first name"
                      />
                    </div>
                    {touched.adminFirstName && errors.adminFirstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.adminFirstName}
                      </p>
                    )}
                  </div>

                  {/* Admin Last Name */}
                  <div>
                    <label
                      htmlFor="adminLastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="adminLastName"
                        name="adminLastName"
                        type="text"
                        value={formData.adminLastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`block w-full pl-10 pr-3 py-3 border ${
                          touched.adminLastName && errors.adminLastName
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } rounded-lg transition duration-150`}
                        placeholder="Enter last name"
                      />
                    </div>
                    {touched.adminLastName && errors.adminLastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.adminLastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Admin Email */}
                <div>
                  <label
                    htmlFor="adminEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="adminEmail"
                      name="adminEmail"
                      type="email"
                      value={formData.adminEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        touched.adminEmail && errors.adminEmail
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="admin@example.com"
                    />
                  </div>
                  {touched.adminEmail && errors.adminEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.adminEmail}
                    </p>
                  )}
                </div>

                {/* Admin Password */}
                <div>
                  <label
                    htmlFor="adminPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="adminPassword"
                      name="adminPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.adminPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full pl-10 pr-10 py-3 border ${
                        touched.adminPassword && errors.adminPassword
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  {touched.adminPassword && errors.adminPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.adminPassword}
                    </p>
                  )}

                  {/* Password strength indicator */}
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">
                        Password strength:
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          getPasswordStrengthLabel().color
                        }`}
                      >
                        {getPasswordStrengthLabel().text}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full w-1/4 ${getPasswordStrengthBarColor(
                          1
                        )}`}
                      ></div>
                      <div
                        className={`h-full w-1/4 ${getPasswordStrengthBarColor(
                          2
                        )}`}
                      ></div>
                      <div
                        className={`h-full w-1/4 ${getPasswordStrengthBarColor(
                          3
                        )}`}
                      ></div>
                      <div
                        className={`h-full w-1/4 ${getPasswordStrengthBarColor(
                          4
                        )}`}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 flex items-start">
                      <Info className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                      <span>
                        For a strong password, use at least 8 characters with a
                        mix of uppercase, lowercase, numbers, and special
                        characters.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="py-3 px-6 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Registering...
                      </div>
                    ) : (
                      "Register School"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Already have an account */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
