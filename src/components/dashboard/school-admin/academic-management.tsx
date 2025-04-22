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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Check, Pencil, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ITerm, IAcademicSession } from "@/types/term";

// Form schemas
const academicSessionSchema = z.object({
  name: z.string().min(1, "Session name is required"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z
    .date({
      required_error: "End date is required",
    })
    .refine((date) => date > new Date(), {
      message: "End date must be in the future",
    }),
});

const termSchema = z.object({
  name: z.enum(["First Term", "Second Term", "Third Term"], {
    required_error: "Term name is required",
  }),
  academicSession: z.string().min(1, "Academic session is required"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
});

export function AcademicManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [academicSessions, setAcademicSessions] = useState<IAcademicSession[]>(
    []
  );
  const [terms, setTerms] = useState<ITerm[]>([]);
  const [activeTab, setActiveTab] = useState("sessions");
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [isAddTermOpen, setIsAddTermOpen] = useState(false);

  const sessionForm = useForm<z.infer<typeof academicSessionSchema>>({
    resolver: zodResolver(academicSessionSchema),
    defaultValues: {
      name: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const termForm = useForm<z.infer<typeof termSchema>>({
    resolver: zodResolver(termSchema),
    defaultValues: {
      name: "First Term",
      academicSession: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        // In a real app, these would be API calls
        // const sessionsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/academic/sessions/${schoolId}`)
        // const termsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/academic/terms/${activeSessionId}`)

        // Simulate response
        setTimeout(() => {
          setAcademicSessions([
            {
              _id: "60d0fe4f5311236168a109d0",
              name: "2022/2023",
              startDate: new Date("2022-09-01T00:00:00.000Z"),
              endDate: new Date("2023-07-31T00:00:00.000Z"),
              isActive: false,
              createdAt: new Date("2023-01-01T00:00:00.000Z"),
              updatedAt: new Date("2023-01-01T00:00:00.000Z"),
            },
            {
              _id: "60d0fe4f5311236168a109d1",
              name: "2023/2024",
              startDate: new Date("2023-09-01T00:00:00.000Z"),
              endDate: new Date("2024-07-31T00:00:00.000Z"),
              isActive: true,
              createdAt: new Date("2023-01-01T00:00:00.000Z"),
              updatedAt: new Date("2023-01-01T00:00:00.000Z"),
            },
          ]);

          setTerms([
            {
              _id: "60d0fe4f5311236168a109d2",
              name: "First Term",
              academicSession: "60d0fe4f5311236168a109d1",
              academicSessionName: "2023/2024",
              startDate: new Date("2023-09-01T00:00:00.000Z"),
              endDate: new Date("2023-12-15T00:00:00.000Z"),
              allowScoring: true,
              isActive: true,
              school: "school-id-1",
              createdAt: new Date("2023-01-01T00:00:00.000Z"),
              updatedAt: new Date("2023-01-01T00:00:00.000Z"),
            },
            {
              _id: "60d0fe4f5311236168a109d3",
              name: "Second Term",
              academicSession: "60d0fe4f5311236168a109d1",
              academicSessionName: "2023/2024",
              startDate: new Date("2024-01-10T00:00:00.000Z"),
              endDate: new Date("2024-04-15T00:00:00.000Z"),
              allowScoring: false,
              isActive: false,
              school: "school-id-1",
              createdAt: new Date("2023-01-01T00:00:00.000Z"),
              updatedAt: new Date("2023-01-01T00:00:00.000Z"),
            },
            {
              _id: "60d0fe4f5311236168a109d4",
              name: "Third Term",
              academicSession: "60d0fe4f5311236168a109d1",
              academicSessionName: "2023/2024",
              startDate: new Date("2024-05-01T00:00:00.000Z"),
              endDate: new Date("2024-07-31T00:00:00.000Z"),
              allowScoring: false,
              isActive: false,
              school: "school-id-1",
              createdAt: new Date("2023-01-01T00:00:00.000Z"),
              updatedAt: new Date("2023-01-01T00:00:00.000Z"),
            },
          ]);

          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching academic data:", error);
        setIsLoading(false);
      }
    };

    fetchAcademicData();
  }, []);

  const onSubmitSession = (data: z.infer<typeof academicSessionSchema>) => {
    console.log("Creating academic session:", data);
    
    // Create new session with Date objects instead of strings
    const newSession: IAcademicSession = {
      _id: `new-session-${Date.now()}`,
      name: data.name,
      startDate: data.startDate, // already a Date object
      endDate: data.endDate,    // already a Date object
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    setAcademicSessions([...academicSessions, newSession]);
    setIsAddSessionOpen(false);
    sessionForm.reset();
  };

  const onSubmitTerm = (data: z.infer<typeof termSchema>) => {
    console.log("Creating term:", data);
    // In a real app, this would be an API call
    // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/academic/terms`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data)
    // })

    // Simulate successful creation
    const session = academicSessions.find(
      (s) => s._id === data.academicSession
    );
    const newTerm: ITerm = {
      _id: `new-term-${Date.now()}`,
      name: data.name as "First Term" | "Second Term" | "Third Term",
      academicSession: data.academicSession,
      academicSessionName: session?.name,
      startDate: data.startDate,
      endDate: data.endDate,
      allowScoring: false,
      isActive: false,
      school: "school-id-1", // This should come from the current school context
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTerms([...terms, newTerm]);
    setIsAddTermOpen(false);
    termForm.reset();
  };

  const activateSession = (sessionId: string) => {
    // In a real app, this would be an API call
    // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/academic/sessions/${sessionId}/activate`, {
    //   method: "PUT"
    // })

    // Simulate successful activation
    setAcademicSessions(
      academicSessions.map((session) => ({
        ...session,
        isActive: session._id === sessionId,
      }))
    );
  };

  const activateTerm = (termId: string | undefined) => {
    if (!termId) return;

    // In a real app, this would be an API call
    // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/academic/terms/${termId}/activate`, {
    //   method: "PUT"
    // })

    // Simulate successful activation
    setTerms(
      terms.map((term) => ({
        ...term,
        isActive: term._id === termId,
      }))
    );
  };

  const toggleScoring = (
    termId: string | undefined,
    currentValue: boolean | undefined
  ) => {
    if (!termId || !currentValue) return;

    // In a real app, this would be an API call
    // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/results/toggle-scoring/${termId}`, {
    //   method: "PUT"
    // })

    // Simulate successful toggle
    setTerms(
      terms.map((term) => {
        if (term._id === termId) {
          return {
            ...term,
            allowScoring: !currentValue,
          };
        }
        return term;
      })
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Academic Management
          </h2>
          <p className="text-muted-foreground">
            Manage academic sessions and terms for your school
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="sessions"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="sessions">Academic Sessions</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Academic Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Academic Session</DialogTitle>
                  <DialogDescription>
                    Create a new academic session for your school
                  </DialogDescription>
                </DialogHeader>

                <Form {...sessionForm}>
                  <form
                    onSubmit={sessionForm.handleSubmit(onSubmitSession)}
                    className="space-y-4"
                  >
                    <FormField
                      control={sessionForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Session Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 2023/2024" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the academic session name
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={sessionForm.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={sessionForm.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="submit">Create Session</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Academic Sessions</CardTitle>
              <CardDescription>
                Manage all academic sessions for your school
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {academicSessions.map((session) => (
                    <TableRow key={session._id}>
                      <TableCell className="font-medium">
                        {session.name}
                      </TableCell>
                      <TableCell>
                        {new Date(session.startDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(session.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {session.isActive ? (
                          <Badge variant="default">Active</Badge>
                        ) : (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!session.isActive && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => activateSession(session._id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Set Active
                            </Button>
                          )}
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
        </TabsContent>

        <TabsContent value="terms" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddTermOpen} onOpenChange={setIsAddTermOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Term
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Term</DialogTitle>
                  <DialogDescription>
                    Create a new term for an academic session
                  </DialogDescription>
                </DialogHeader>

                <Form {...termForm}>
                  <form
                    onSubmit={termForm.handleSubmit(onSubmitTerm)}
                    className="space-y-4"
                  >
                    <FormField
                      control={termForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Term Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. First Term" {...field} />
                          </FormControl>
                          <FormDescription>Enter the term name</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={termForm.control}
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
                            Select the academic session for this term
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={termForm.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={termForm.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="submit">Create Term</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Terms</CardTitle>
              <CardDescription>
                Manage all terms for your academic sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Term Name</TableHead>
                    <TableHead>Academic Session</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scoring</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {terms.map((term) => (
                    <TableRow key={term._id}>
                      <TableCell className="font-medium">{term.name}</TableCell>
                      <TableCell>{term.academicSessionName}</TableCell>
                      <TableCell>
                        {new Date(term.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {new Date(term.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {term.isActive ? (
                          <Badge variant="default">Active</Badge>
                        ) : (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {term.allowScoring ? (
                          <Badge
                            variant="default"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Enabled
                          </Badge>
                        ) : (
                          <Badge variant="outline">Disabled</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!term.isActive && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => activateTerm(term._id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Set Active
                            </Button>
                          )}
                          <Button
                            variant={term.allowScoring ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              toggleScoring(term._id, term.allowScoring)
                            }
                          >
                            {term.allowScoring
                              ? "Disable Scoring"
                              : "Enable Scoring"}
                          </Button>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
