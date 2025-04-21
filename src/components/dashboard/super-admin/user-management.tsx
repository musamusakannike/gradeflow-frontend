"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Upload,
  RefreshCw,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Shield,
  Building2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { IUser, ROLES } from "@/types/users";

// Sample user data
const sampleUsers: IUser[] = [
  {
    _id: "1",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "hashed_password_1",
    role: ROLES.SCHOOL_ADMIN,
    school: "1",
    phoneNumber: "+2341234567890",
    createdAt: new Date("2023-01-15T00:00:00.000Z"),
  },
  {
    _id: "2",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael@example.com",
    password: "hashed_password_2",
    role: ROLES.SCHOOL_ADMIN,
    school: "2",
    phoneNumber: "+2341234567891",
    createdAt: new Date("2023-02-20T00:00:00.000Z"),
  },
  {
    _id: "3",
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily@example.com",
    password: "hashed_password_3",
    role: ROLES.TEACHER,
    school: "3",
    phoneNumber: "+2341234567892",
    createdAt: new Date("2023-03-10T00:00:00.000Z"),
  },
  {
    _id: "4",
    firstName: "James",
    lastName: "Wilson",
    email: "james@example.com",
    password: "hashed_password_4",
    role: ROLES.PARENT,
    school: "4",
    phoneNumber: "+2341234567893",
    createdAt: new Date("2023-04-05T00:00:00.000Z"),
  },
  {
    _id: "5",
    firstName: "Amanda",
    lastName: "Patel",
    email: "amanda@example.com",
    password: "hashed_password_5",
    role: ROLES.SUPER_ADMIN,
    school: undefined,
    phoneNumber: "+2341234567894",
    createdAt: new Date("2023-05-12T00:00:00.000Z"),
  },
];

// Role display mapping
const roleDisplayMap: Record<string, string> = {
  super_super_admin: "Super Admin",
  super_admin: "Super Admin",
  school_admin: "School Admin",
  teacher: "Teacher",
  class_teacher: "Class Teacher",
  bursar: "Bursar",
  student: "Student",
  parent: "Parent",
};

export default function UserManagement() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<
    (typeof ROLES)[keyof typeof ROLES] | "all"
  >("all");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewUserDialog, setShowViewUserDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [newUser, setNewUser] = useState<Partial<IUser>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ROLES.SCHOOL_ADMIN,
    school: "",
    phoneNumber: "",
  });

  useEffect(() => {
    // Simulate API call to fetch users
    const fetchUsers = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setUsers(sampleUsers);
        setIsLoading(false);
      }, 1000);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.school &&
        user.school.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    setIsLoading(true);

    setTimeout(() => {
      const newUserData: IUser = {
        _id: (users.length + 1).toString(),
        firstName: newUser.firstName || "",
        lastName: newUser.lastName || "",
        email: newUser.email || "",
        password: newUser.password || "",
        role: newUser.role || ROLES.SCHOOL_ADMIN,
        school: newUser.school || undefined,
        phoneNumber: newUser.phoneNumber || undefined,
        createdAt: new Date(),
      };

      setUsers([...users, newUserData]);
      setIsLoading(false);
      setShowAddUserDialog(false);

      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ROLES.SCHOOL_ADMIN,
        school: "",
        phoneNumber: "",
      });

      toast("User Added", {
        description: `${newUser.firstName} ${newUser.lastName} has been successfully added.`,
      });
    }, 1000);
  };

  const handleEditUser = () => {
    if (!currentUser) return;

    setIsLoading(true);

    setTimeout(() => {
      const updatedUsers = users.map((user) => {
        if (user._id === currentUser._id) {
          return {
            ...user,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            role: currentUser.role,
            phoneNumber: currentUser.phoneNumber,
            school: currentUser.school,
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      setIsLoading(false);
      setShowEditUserDialog(false);

      toast("User Updated", {
        description: `${currentUser.firstName} ${currentUser.lastName} has been successfully updated.`,
      });
    }, 1000);
  };

  const handleDeleteUser = () => {
    if (!currentUser) return;

    setIsLoading(true);

    setTimeout(() => {
      const updatedUsers = users.filter((user) => user._id !== currentUser._id);

      setUsers(updatedUsers);
      setIsLoading(false);
      setShowDeleteDialog(false);

      toast("User Deleted", {
        description: `${currentUser.firstName} ${currentUser.lastName} has been successfully deleted.`,
      });
    }, 1000);
  };

  const handleToggleStatus = (user: IUser) => {
    setIsLoading(true);

    setTimeout(() => {
      const updatedUsers = users.map((u) => {
        if (u._id === user._id) {
          return u;
        }
        return u;
      });

      setUsers(updatedUsers);
      setIsLoading(false);

      toast("User Updated", {
        description: `${user.firstName} ${user.lastName} has been updated.`,
      });
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">User Management</CardTitle>
              <CardDescription>Manage all users in the system</CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setShowAddUserDialog(true)}
                className="flex items-center gap-1"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add User</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Export Users</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span>Import Users</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>Refresh Data</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select
              value={roleFilter}
              onValueChange={(value) =>
                setRoleFilter(
                  value as (typeof ROLES)[keyof typeof ROLES] | "all"
                )
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value={ROLES.SUPER_ADMIN}>Super Admin</SelectItem>
                <SelectItem value={ROLES.SCHOOL_ADMIN}>School Admin</SelectItem>
                <SelectItem value={ROLES.TEACHER}>Teacher</SelectItem>
                <SelectItem value={ROLES.CLASS_TEACHER}>
                  Class Teacher
                </SelectItem>
                <SelectItem value={ROLES.BURSAR}>Bursar</SelectItem>
                <SelectItem value={ROLES.PARENT}>Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-100 animate-pulse rounded-md"
                ></div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">
                      School
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Contact
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        No users found. Try adjusting your search or filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user._id} className="group">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {user.firstName.charAt(0)}
                                {user.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div>
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-blue-200"
                            >
                              {roleDisplayMap[user.role] || user.role}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.school || "-"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.phoneNumber}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600 hover:bg-green-50 border-green-200"
                            >
                              Active
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentUser(user);
                                  setShowViewUserDialog(true);
                                }}
                                className="flex items-center gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentUser(user);
                                  setShowEditUserDialog(true);
                                }}
                                className="flex items-center gap-2"
                              >
                                <Edit className="h-4 w-4" />
                                <span>Edit User</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(user)}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-green-500">
                                  Update User
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentUser(user);
                                  setShowDeleteDialog(true);
                                }}
                                className="flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete User</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Enter the details of the new user.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                  placeholder="First name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="user@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long and include
                uppercase, lowercase, numbers, and special characters.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newUser.role}
                onValueChange={(value: (typeof ROLES)[keyof typeof ROLES]) =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ROLES.SUPER_ADMIN}>Super Admin</SelectItem>
                  <SelectItem value={ROLES.SCHOOL_ADMIN}>
                    School Admin
                  </SelectItem>
                  <SelectItem value={ROLES.TEACHER}>Teacher</SelectItem>
                  <SelectItem value={ROLES.CLASS_TEACHER}>
                    Class Teacher
                  </SelectItem>
                  <SelectItem value={ROLES.BURSAR}>Bursar</SelectItem>
                  <SelectItem value={ROLES.PARENT}>Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School (Optional)</Label>
              <Select
                value={newUser.school}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, school: value })
                }
              >
                <SelectTrigger id="school">
                  <SelectValue placeholder="Select school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="1">Westlake Academy</SelectItem>
                  <SelectItem value="2">Riverdale School District</SelectItem>
                  <SelectItem value="3">Lincoln High</SelectItem>
                  <SelectItem value="4">Oakridge Elementary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
              <Input
                id="phoneNumber"
                value={newUser.phoneNumber}
                onChange={(e) =>
                  setNewUser({ ...newUser, phoneNumber: e.target.value })
                }
                placeholder="+1234567890"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddUserDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddUser} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update the details of {currentUser?.firstName}{" "}
              {currentUser?.lastName}.
            </DialogDescription>
          </DialogHeader>

          {currentUser && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-firstName">First Name</Label>
                  <Input
                    id="edit-firstName"
                    value={currentUser.firstName}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-lastName">Last Name</Label>
                  <Input
                    id="edit-lastName"
                    value={currentUser.lastName}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value: (typeof ROLES)[keyof typeof ROLES]) =>
                    currentUser && setCurrentUser({ ...currentUser, role: value })
                  }
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ROLES.SUPER_ADMIN}>
                      Super Admin
                    </SelectItem>
                    <SelectItem value={ROLES.SCHOOL_ADMIN}>
                      School Admin
                    </SelectItem>
                    <SelectItem value={ROLES.TEACHER}>Teacher</SelectItem>
                    <SelectItem value={ROLES.CLASS_TEACHER}>
                      Class Teacher
                    </SelectItem>
                    <SelectItem value={ROLES.BURSAR}>Bursar</SelectItem>
                    <SelectItem value={ROLES.PARENT}>Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={currentUser.phoneNumber}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditUserDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditUser} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={showViewUserDialog} onOpenChange={setShowViewUserDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about {currentUser?.firstName}{" "}
              {currentUser?.lastName}.
            </DialogDescription>
          </DialogHeader>

          {currentUser && (
            <div className="space-y-6 mt-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    {currentUser.firstName.charAt(0)}
                    {currentUser.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <h3 className="text-xl font-bold">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <Badge
                  variant="outline"
                  className="mt-1 bg-blue-50 text-blue-600 hover:bg-blue-50 border-blue-200"
                >
                  {roleDisplayMap[currentUser.role] || currentUser.role}
                </Badge>

                <div className="flex items-center mt-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600 hover:bg-green-50 border-green-200"
                  >
                    Active
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{currentUser.email}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">
                      {currentUser.phoneNumber || "Not provided"}
                    </div>
                  </div>
                </div>

                {currentUser.school && (
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">School</div>
                      <div className="font-medium">{currentUser.school}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Joined</div>
                    <div className="font-medium">
                      {currentUser?.createdAt
                        ? new Date(currentUser.createdAt).toLocaleDateString()
                        : "Not available"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Permissions</div>
                    <div className="font-medium">
                      {currentUser.role === "super_admin"
                        ? "Full Access"
                        : "Limited Access"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowViewUserDialog(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowViewUserDialog(false);
                setShowEditUserDialog(true);
              }}
            >
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentUser?.firstName}{" "}
              {currentUser?.lastName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Warning</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    Deleting this user will remove all associated data and
                    access to the system.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
