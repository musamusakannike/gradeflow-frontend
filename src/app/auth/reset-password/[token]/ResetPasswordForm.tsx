"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
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

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(PasswordStrength.NONE);
  const [resetSuccess, setResetSuccess] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  console.log(token);

  useEffect(() => {
    // Animation on mount
    setIsVisible(true);
  }, []);

  // Calculate password strength
  useEffect(() => {
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
  }, [password]);

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

  const validatePassword = () => {
    let isValid = true;

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError(null);
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/resetpassword/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setResetSuccess(true);

        // Auto login with the returned token and user data
        if (data.token && data.user) {
          // Wait a moment before redirecting to show success message
          setTimeout(async () => {
            // Use the login function from auth context to set the user session
            await login(data.user.email, password);
            router.push("/dashboard");
          }, 2000);
        }
      } else {
        setError(
          data.message ||
            "Failed to reset password. The link may be invalid or expired."
        );
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <div
        className={`w-full max-w-md transition-all duration-1000 transform ${
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
            Reset Password
          </h1>
          <p className="mt-2 text-gray-600">
            Create a new password for your account
          </p>
        </div>

        {/* Form container */}
        <div
          className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {resetSuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Password Reset Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Your password has been reset successfully. You will be
                redirected to your dashboard shortly.
              </p>
              <div className="animate-pulse">
                <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) validatePassword();
                      }}
                      className={`block w-full pl-10 pr-10 py-3 border ${
                        passwordError
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
                  {passwordError && (
                    <p className="mt-1 text-sm text-red-600">{passwordError}</p>
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

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (confirmPasswordError) validatePassword();
                      }}
                      className={`block w-full pl-10 pr-10 py-3 border ${
                        confirmPasswordError
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg transition duration-150`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <p className="mt-1 text-sm text-red-600">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ${
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
                        Resetting Password...
                      </div>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 flex items-center justify-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 