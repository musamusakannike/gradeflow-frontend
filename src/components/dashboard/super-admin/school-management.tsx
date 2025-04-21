"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Search,
  Plus,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { ISchool } from "@/types/school";

// Sample school data
const sampleSchools = [
  {
    id: "1",
    name: "Westlake Academy",
    address: "123 School Street, Lagos",
    email: "info@westlake.edu",
    phoneNumber: "+2341234567890",
    admin: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@westlake.edu",
    },
    isActive: true,
    createdAt: "2023-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Riverdale School District",
    address: "456 School Avenue, Abuja",
    email: "info@riverdale.edu",
    phoneNumber: "+2341234567891",
    admin: {
      firstName: "Michael",
      lastName: "Chen",
      email: "michael@riverdale.edu",
    },
    isActive: true,
    createdAt: "2023-02-20T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Lincoln High",
    address: "789 Education Road, Port Harcourt",
    email: "info@lincoln.edu",
    phoneNumber: "+2341234567892",
    admin: {
      firstName: "Emily",
      lastName: "Rodriguez",
      email: "emily@lincoln.edu",
    },
    isActive: false,
    createdAt: "2023-03-10T00:00:00.000Z",
  },
  {
    id: "4",
    name: "Oakridge Elementary",
    address: "101 Learning Lane, Kano",
    email: "info@oakridge.edu",
    phoneNumber: "+2341234567893",
    admin: {
      firstName: "James",
      lastName: "Wilson",
      email: "james@oakridge.edu",
    },
    isActive: true,
    createdAt: "2023-04-05T00:00:00.000Z",
  },
  {
    id: "5",
    name: "Greenfield Academy",
    address: "202 Knowledge Street, Ibadan",
    email: "info@greenfield.edu",
    phoneNumber: "+2341234567894",
    admin: {
      firstName: "Amanda",
      lastName: "Patel",
      email: "amanda@greenfield.edu",
    },
    isActive: true,
    createdAt: "2023-05-12T00:00:00.000Z",
  },
];

export default function SchoolManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddSchoolDialog, setShowAddSchoolDialog] = useState(false);
  const [showEditSchoolDialog, setShowEditSchoolDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewSchoolDialog, setShowViewSchoolDialog] = useState(false);
  const [currentSchool, setCurrentSchool] = useState<ISchool | null>(null);
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    phoneNumber: "",
    email: "",
    website: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPassword: "",
  });

  useEffect(() => {
    // Simulate API call to fetch schools
    const fetchSchools = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setSchools(sampleSchools);
        setIsLoading(false);
      }, 1000);
    };

    fetchSchools();
  }, []);

  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.admin.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "active") return matchesSearch && school.isActive;
    if (statusFilter === "inactive") return matchesSearch && !school.isActive;

    return matchesSearch;
  });

  const handleAddSchool = () => {
    // In a real app, this would be an API call
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newSchoolData: ISchool = {
        id: (schools.length + 1).toString(),
        name: newSchool.name,
        address: newSchool.address,
        email: newSchool.email,
        phoneNumber: newSchool.phoneNumber,
        admin: {
          firstName: newSchool.adminFirstName,
          lastName: newSchool.adminLastName,
          email: newSchool.adminEmail,
        },
        isActive: true,
        createdAt: new Date().toISOString(),
        city: newSchool.city,
        state: newSchool.state,
        country: newSchool.country,
        website: newSchool.website,
      };

      setSchools((prevSchools) => [...prevSchools, newSchoolData]);
      setIsLoading(false);
      setShowAddSchoolDialog(false);

      // Reset form
      setNewSchool({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "Nigeria",
        phoneNumber: "",
        email: "",
        website: "",
        adminFirstName: "",
        adminLastName: "",
        adminEmail: "",
        adminPassword: "",
      });

      toast("School Added", {
        description: `${newSchool.name} has been successfully added.`,
      });
    }, 1000);
  };

  const handleEditSchool = () => {
    if (!currentSchool) return;

    // In a real app, this would be an API call
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const updatedSchools = schools.map((school) => {
        if (school.id === currentSchool.id) {
          return {
            ...school,
            name: currentSchool.name,
            address: currentSchool.address,
            email: currentSchool.email,
            phoneNumber: currentSchool.phoneNumber,
            admin: {
              ...school.admin,
              firstName: currentSchool.admin.firstName,
              lastName: currentSchool.admin.lastName,
              email: currentSchool.admin.email,
            },
          };
        }
        return school;
      });

      setSchools(updatedSchools);
      setIsLoading(false);
      setShowEditSchoolDialog(false);

      toast("School Updated", {
        description: `${currentSchool.name} has been successfully updated.`,
      });
    }, 1000);
  };

  const handleDeleteSchool = () => {
    if (!currentSchool) return;

    // In a real app, this would be an API call
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const updatedSchools = schools.filter(
        (school) => school.id !== currentSchool.id
      );

      setSchools(updatedSchools);
      setIsLoading(false);
      setShowDeleteDialog(false);

      toast("School Deleted", {
        description: `${currentSchool.name} has been successfully deleted.`,
      });
    }, 1000);
  };

  const handleToggleStatus = (school: ISchool) => {
    // In a real app, this would be an API call
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const updatedSchools = schools.map((s) => {
        if (s.id === school.id) {
          return {
            ...s,
            isActive: !s.isActive,
          };
        }
        return s;
      });

      setSchools(updatedSchools);
      setIsLoading(false);

      toast(`School ${school.isActive ? "Deactivated" : "Activated"}`, {
        description: `${school.name} has been ${
          school.isActive ? "deactivated" : "activated"
        }.`,
      });
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">School Management</CardTitle>
              <CardDescription>
                Manage all schools in the system
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setShowAddSchoolDialog(true)}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add School</span>
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
                    <span>Export Schools</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span>Import Schools</span>
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
                placeholder="Search schools..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schools</SelectItem>
                <SelectItem value="active">Active Schools</SelectItem>
                <SelectItem value="inactive">Inactive Schools</SelectItem>
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
                    <TableHead>School Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Admin
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Contact
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSchools.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        No schools found. Try adjusting your search or filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSchools.map((school) => (
                      <TableRow key={school.id} className="group">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <Building2 className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div>{school.name}</div>
                              <div className="text-xs text-gray-500 md:hidden">
                                {school.admin.firstName} {school.admin.lastName}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {school.admin.firstName} {school.admin.lastName}
                          <div className="text-xs text-gray-500">
                            {school.admin.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {school.email}
                          <div className="text-xs text-gray-500">
                            {school.phoneNumber}
                          </div>
                        </TableCell>
                        <TableCell>
                          {school.isActive ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-600 hover:bg-green-50 border-green-200"
                            >
                              Active
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-600 hover:bg-red-50 border-red-200"
                            >
                              Inactive
                            </Badge>
                          )}
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
                                  setCurrentSchool(school);
                                  setShowViewSchoolDialog(true);
                                }}
                                className="flex items-center gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentSchool(school);
                                  setShowEditSchoolDialog(true);
                                }}
                                className="flex items-center gap-2"
                              >
                                <Edit className="h-4 w-4" />
                                <span>Edit School</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(school)}
                                className="flex items-center gap-2"
                              >
                                {school.isActive ? (
                                  <>
                                    <XCircle className="h-4 w-4 text-red-500" />
                                    <span className="text-red-500">
                                      Deactivate
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-green-500">
                                      Activate
                                    </span>
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentSchool(school);
                                  setShowDeleteDialog(true);
                                }}
                                className="flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete School</span>
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
            Showing {filteredSchools.length} of {schools.length} schools
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

      {/* Add School Dialog */}
      <Dialog open={showAddSchoolDialog} onOpenChange={setShowAddSchoolDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New School</DialogTitle>
            <DialogDescription>
              Enter the details of the new school and its administrator.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="school" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="school">School Information</TabsTrigger>
              <TabsTrigger value="admin">Admin Information</TabsTrigger>
            </TabsList>

            <TabsContent value="school" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">School Name</Label>
                  <Input
                    id="name"
                    value={newSchool.name}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, name: e.target.value })
                    }
                    placeholder="Enter school name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">School Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newSchool.email}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, email: e.target.value })
                    }
                    placeholder="school@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newSchool.address}
                  onChange={(e) =>
                    setNewSchool({ ...newSchool, address: e.target.value })
                  }
                  placeholder="Enter school address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newSchool.city}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, city: e.target.value })
                    }
                    placeholder="City"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newSchool.state}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, state: e.target.value })
                    }
                    placeholder="State"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={newSchool.country}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, country: e.target.value })
                    }
                    placeholder="Country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={newSchool.phoneNumber}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        phoneNumber: e.target.value,
                      })
                    }
                    placeholder="+1234567890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    value={newSchool.website}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, website: e.target.value })
                    }
                    placeholder="https://school.example.com"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adminFirstName">First Name</Label>
                  <Input
                    id="adminFirstName"
                    value={newSchool.adminFirstName}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        adminFirstName: e.target.value,
                      })
                    }
                    placeholder="First name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminLastName">Last Name</Label>
                  <Input
                    id="adminLastName"
                    value={newSchool.adminLastName}
                    onChange={(e) =>
                      setNewSchool({
                        ...newSchool,
                        adminLastName: e.target.value,
                      })
                    }
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={newSchool.adminEmail}
                  onChange={(e) =>
                    setNewSchool({ ...newSchool, adminEmail: e.target.value })
                  }
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  value={newSchool.adminPassword}
                  onChange={(e) =>
                    setNewSchool({
                      ...newSchool,
                      adminPassword: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long and include
                  uppercase, lowercase, numbers, and special characters.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddSchoolDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddSchool} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add School"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit School Dialog */}
      <Dialog
        open={showEditSchoolDialog}
        onOpenChange={setShowEditSchoolDialog}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit School</DialogTitle>
            <DialogDescription>
              Update the details of {currentSchool?.name}.
            </DialogDescription>
          </DialogHeader>

          {currentSchool && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">School Name</Label>
                  <Input
                    id="edit-name"
                    value={currentSchool.name}
                    onChange={(e) =>
                      setCurrentSchool({
                        ...currentSchool,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-email">School Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentSchool.email}
                    onChange={(e) =>
                      setCurrentSchool({
                        ...currentSchool,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={currentSchool.address}
                  onChange={(e) =>
                    setCurrentSchool({
                      ...currentSchool,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={currentSchool.phoneNumber}
                  onChange={(e) =>
                    setCurrentSchool({
                      ...currentSchool,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-admin-name">Admin Name</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="edit-admin-first-name"
                    value={currentSchool.admin.firstName}
                    onChange={(e) =>
                      setCurrentSchool({
                        ...currentSchool,
                        admin: {
                          ...currentSchool.admin,
                          firstName: e.target.value,
                        },
                      })
                    }
                    placeholder="First name"
                  />
                  <Input
                    id="edit-admin-last-name"
                    value={currentSchool.admin.lastName}
                    onChange={(e) =>
                      setCurrentSchool({
                        ...currentSchool,
                        admin: {
                          ...currentSchool.admin,
                          lastName: e.target.value,
                        },
                      })
                    }
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-admin-email">Admin Email</Label>
                <Input
                  id="edit-admin-email"
                  type="email"
                  value={currentSchool.admin.email}
                  onChange={(e) =>
                    setCurrentSchool({
                      ...currentSchool,
                      admin: { ...currentSchool.admin, email: e.target.value },
                    })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-active"
                  checked={currentSchool.isActive}
                  onCheckedChange={(checked) =>
                    setCurrentSchool({
                      ...currentSchool,
                      isActive: checked as boolean,
                    })
                  }
                />
                <label
                  htmlFor="edit-active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  School is active
                </label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditSchoolDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditSchool} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update School"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View School Dialog */}
      <Dialog
        open={showViewSchoolDialog}
        onOpenChange={setShowViewSchoolDialog}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>School Details</DialogTitle>
            <DialogDescription>
              Detailed information about {currentSchool?.name}.
            </DialogDescription>
          </DialogHeader>

          {currentSchool && (
            <div className="space-y-6 mt-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold">{currentSchool.name}</h3>
                  <div className="flex items-center mt-1">
                    {currentSchool.isActive ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600 hover:bg-green-50 border-green-200"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-600 hover:bg-red-50 border-red-200"
                      >
                        Inactive
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500 ml-2">
                      Created on{" "}
                      {new Date(currentSchool.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Contact Information
                    </h4>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Email:</span>
                        <span className="font-medium">
                          {currentSchool.email}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Phone:</span>
                        <span className="font-medium">
                          {currentSchool.phoneNumber}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Address:</span>
                        <span className="font-medium">
                          {currentSchool.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      School Statistics
                    </h4>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Students:</span>
                        <span className="font-medium">250</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Teachers:</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Classes:</span>
                        <span className="font-medium">12</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Administrator
                    </h4>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Name:</span>
                        <span className="font-medium">
                          {currentSchool.admin.firstName}{" "}
                          {currentSchool.admin.lastName}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Email:</span>
                        <span className="font-medium">
                          {currentSchool.admin.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Subscription
                    </h4>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Plan:</span>
                        <span className="font-medium">Premium</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Status:</span>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-600 hover:bg-green-50 border-green-200"
                        >
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-20">Expires:</span>
                        <span className="font-medium">Dec 31, 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowViewSchoolDialog(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowViewSchoolDialog(false);
                setShowEditSchoolDialog(true);
              }}
            >
              Edit School
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete School</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentSchool?.name}? This action
              cannot be undone.
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
                    Deleting this school will remove all associated data,
                    including:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Student records</li>
                    <li>Teacher accounts</li>
                    <li>Class information</li>
                    <li>Academic data</li>
                    <li>Financial records</li>
                  </ul>
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
              onClick={handleDeleteSchool}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete School"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
