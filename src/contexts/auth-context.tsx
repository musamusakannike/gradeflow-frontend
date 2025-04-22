"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Define user roles
export const USER_ROLES = {
  SUPER_SUPER_ADMIN: "super_super_admin", // App owner
  SUPER_ADMIN: "super_admin", // School super admin
  SCHOOL_ADMIN: "school_admin", // School admin (principal)
  TEACHER: "teacher", // Regular teacher
  CLASS_TEACHER: "class_teacher", // Teacher with class oversight
  BURSAR: "bursar", // Fee management
  STUDENT: "student", // Student
  PARENT: "parent", // Parent
};

// Define user type
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getToken: () => string | null;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Token cookie name
const TOKEN_COOKIE_NAME = "gradeflow_auth_token";
// User cookie name
const USER_COOKIE_NAME = "gradeflow_user";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing token and user on mount
  useEffect(() => {
    const storedToken = Cookies.get(TOKEN_COOKIE_NAME);
    const storedUser = Cookies.get(USER_COOKIE_NAME);

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from cookie:", error);
        // Clear invalid cookies
        Cookies.remove(TOKEN_COOKIE_NAME);
        Cookies.remove(USER_COOKIE_NAME);
      }
    }

    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.success && data.token && data.user) {
        // Store token and user in cookies (30 days expiry)
        Cookies.set(TOKEN_COOKIE_NAME, data.token, { expires: 30 });
        Cookies.set(USER_COOKIE_NAME, JSON.stringify(data.user), {
          expires: 30,
        });

        // Update state
        setToken(data.token);
        setUser(data.user);

        // Redirect based on role
        redirectBasedOnRole(data.user.role);

        return { success: true };
      } else {
        return { success: false, error: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An error occurred during login" };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear cookies
    Cookies.remove(TOKEN_COOKIE_NAME);
    Cookies.remove(USER_COOKIE_NAME);

    // Clear state
    setToken(null);
    setUser(null);

    // Redirect to login
    router.push("/auth/login");
  };

  // Get token function
  const getToken = () => {
    return token;
  };

  // Redirect based on user role
  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case USER_ROLES.SUPER_SUPER_ADMIN:
        router.push("/dashboard/super-admin");
        break;
      case USER_ROLES.SUPER_ADMIN:
        router.push("/dashboard/super-admin");
        break;
      case USER_ROLES.SCHOOL_ADMIN:
        router.push("/dashboard/school-admin");
        break;
      case USER_ROLES.TEACHER:
      case USER_ROLES.CLASS_TEACHER:
        router.push("/dashboard/teacher");
        break;
      case USER_ROLES.BURSAR:
        router.push("/dashboard/bursar");
        break;
      case USER_ROLES.STUDENT:
        router.push("/dashboard/student");
        break;
      case USER_ROLES.PARENT:
        router.push("/dashboard/parent");
        break;
      default:
        router.push("/dashboard");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
