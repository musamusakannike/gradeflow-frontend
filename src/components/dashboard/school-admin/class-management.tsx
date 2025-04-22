"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Pencil, Plus, Trash2, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IClass, IPopulatedClass } from "@/types/class";
import { IUser } from "@/types/users";
import { IAcademicSession } from "@/types/term";

// Form schema
const classSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  classTeacher: z.string().min(1, "Class teacher is required"),
  academicSession: z.string().min(1, "Academic session is required"),
});

export function ClassManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState<IPopulatedClass[]>([]);
  const [teachers, setTeachers] = useState<IUser[]>([]);
  const [academicSessions, setAcademicSessions] = useState<IAcademicSession[]>([]);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  const classForm = useForm<z.infer<typeof classSchema>>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      classTeacher: "",
      academicSession: "",
    },
  });

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        // In a real app, these would be API calls
        // const classesResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/classes/${schoolId}`)
        // const teachersResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users?role=teacher`)
        // const sessionsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/academic/sessions/${schoolId}`)

        // Simulate response with correct types
        setTimeout(() => {
          setClasses([
            {
              _id: "60d0fe4f5311236168a109d5",
              name: "JSS 1A",
              classTeacher: {
                _id: "60d0fe4f5311236168a109cd",
                firstName: "User",
                lastName: "Name",
                email: "user@example.com",
              },
              academicSession: {
                _id: "60d0fe4f5311236168a109d1",
                name: "2023/2024",
              },
              school: "60d0fe4f5311236168a109d0",
              studentCount: 35,
              createdAt: new Date("2023-01-01T00:00:00.000Z"),
              updatedAt: new Date("2023-01-01T00:00:00.000Z"),
            },
            {
              _id: "60d0fe4f5311236168a109d6",
              name: "JSS 1B",
              classTeacher: {
                _id: "60d0fe4f5311236168a109cf",
                firstName: "New",
                lastName: "Teacher",
                email: "teacher@example.com",
              },
              academicSession: {
                _id: "60d0fe4f5311236168a109d1",
                name: "2023/2024",
              },
              school: "60d0fe4f5311236168a109d0",
              studentCount: 32,
              createdAt: new Date("2023-01-01T00:00:00.000Z"),
              updatedAt: new Date("2023-01-01T00:00:00.000Z"),
            },
            {
              _id: "60d0fe4f5311236168a109d7",
              name: "JSS 2A",
              classTeacher: {
                _id: "60d0fe4f5311236168a109cd",
                firstName: "User",
                lastName: "Name",
                email: "user@example.com",
              },
              academicSession: {
                _id: "60d0fe4f5311236168a109d1",
                name: "2023/2024",
              },
              school: "60d0fe4f5311236168a109d0",
              studentCount: 30,
              createdAt: new Date("2023-01-01T00:00:00.000Z"),
              updatedAt: new Date("2023-01-01T00:00:00.000Z"),
            },
          ]);

          setTeachers([
            {
              _id: "60d0fe4f5311236168a109cd",
              firstName: "User",
              lastName: "Name",
              email: "user@example.com",
              password: "hashedpassword",
              role: "teacher",
              school: "60d0fe4f5311236168a109d0",
            },
            {
              _id: "60d0fe4f5311236168a109cf",
              firstName: "New",
              lastName: "Teacher",
              email: "teacher@example.com",
              password: "hashedpassword",
              role: "teacher",
              school: "60d0fe4f5311236168a109d0",
            },
            {
              _id: "60d0fe4f5311236168a109cg",
              firstName: "Another",
              lastName: "Teacher",
              email: "another@example.com",
              password: "hashedpassword",
              role: "teacher",
              school: "60d0fe4f5311236168a109d0",
            },
          ]);

          setAcademicSessions([
            {
              _id: "60d0fe4f5311236168a109d0",
              name: "2022/2023",
              startDate: new Date("2022-09-01"),
              endDate: new Date("2023-07-31"),
              isActive: false,
              createdAt: new Date("2022-01-01"),
              updatedAt: new Date("2022-01-01"),
            },
            {
              _id: "60d0fe4f5311236168a109d1",
              name: "2023/2024",
              startDate: new Date("2023-09-01"),
              endDate: new Date("2024-07-31"),
              isActive: true,
              createdAt: new Date("2023-01-01"),
              updatedAt: new Date("2023-01-01"),
            },
          ]);

          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching class data:", error);
        setIsLoading(false);
      }
    };

    fetchClassData();
  }, []);

  const onSubmitClass = (data: z.infer<typeof classSchema>) => {
    console.log("Creating class:", data);
    // In a real app, this would be an API call
    // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/classes`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data)
    // })

    // Simulate successful creation
    const newClass: IClass = {
      _id: `new-class-${Date.now()}`,
      name: data.name,
      classTeacher: data.classTeacher,
      academicSession: data.academicSession,
      school: "60d0fe4f5311236168a109d0", // This would come from the user's context
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Find the populated data for the new class
    const teacher = teachers.find((t) => t._id === data.classTeacher);
    const session = academicSessions.find((s) => s._id === data.academicSession);

    if (teacher && session) {
      const populatedClass: IPopulatedClass = {
        ...newClass,
        classTeacher: {
          _id: teacher._id,
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
        },
        academicSession: {
          _id: session._id,
          name: session.name,
        },
        studentCount: 0,
      };

      setClasses([...classes, populatedClass]);
    }

    setIsAddClassOpen(false);
    classForm.reset();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Class Management
          </h2>
          <p className="text-muted-foreground">
            Manage classes, assign teachers, and view students
          </p>
        </div>
        <Dialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>
                Create a new class and assign a teacher
              </DialogDescription>
            </DialogHeader>

            <Form {...classForm}>
              <form
                onSubmit={classForm.handleSubmit(onSubmitClass)}
                className="space-y-4"
              >
                <FormField
                  control={classForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. JSS 1A" {...field} />
                      </FormControl>
                      <FormDescription>Enter the class name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={classForm.control}
                  name="classTeacher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Teacher</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Select Class Teacher</option>
                          {teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                              {teacher.firstName} {teacher.lastName}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormDescription>
                        Assign a teacher to this class
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={classForm.control}
                  name="academicSession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Session</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Select Academic Session</option>
                          {academicSessions.map((session) => (
                            <option key={session._id} value={session._id}>
                              {session.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormDescription>
                        Select the academic session for this class
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Create Class</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classes</CardTitle>
          <CardDescription>Manage all classes for your school</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Academic Session</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classItem) => (
                <TableRow key={classItem._id}>
                  <TableCell className="font-medium">
                    {classItem.name}
                  </TableCell>
                  <TableCell>
                    {classItem.classTeacher.firstName}{" "}
                    {classItem.classTeacher.lastName}
                  </TableCell>
                  <TableCell>{classItem.academicSession.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{classItem.studentCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
