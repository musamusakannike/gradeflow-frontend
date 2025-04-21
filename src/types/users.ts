export const ROLES = {
  SUPER_SUPER_ADMIN: "super_super_admin", // App owner
  SUPER_ADMIN: "super_admin", // School super admin
  SCHOOL_ADMIN: "school_admin", // School admin (principal)
  TEACHER: "teacher", // Regular teacher
  CLASS_TEACHER: "class_teacher", // Teacher with class oversight
  BURSAR: "bursar", // Fee management
  PARENT: "parent",
} as const;

export interface IUser {
  _id?: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: (typeof ROLES)[keyof typeof ROLES]
  school?: string
  phoneNumber?: string
  resetPasswordToken?: string
  resetPasswordExpire?: Date
  createdAt?: Date
  updatedAt?: Date

  getSignedJwtToken?: () => string
  matchPassword?: (enteredPassword: string) => Promise<boolean>
  getResetPasswordToken?: () => string
}
