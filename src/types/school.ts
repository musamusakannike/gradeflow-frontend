export interface ISchool {
  _id: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  admin: {
    firstName: string;
    lastName: string;
    email: string;
  };
  isActive: boolean;
  createdAt: string;
  city?: string;
  state?: string;
  country?: string;
  website?: string;
  logo?: string;
  // Dashboard specific properties
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
  activeSession: string;
  activeTerm: string;
  studentGrowth: number;
  teacherGrowth: number;
  upcomingEvents: Array<{
    id: number;
    title: string;
    date: string;
    type: 'meeting' | 'exam' | 'event';
  }>;
  recentMessages: Array<{
    id: number;
    sender: string;
    subject: string;
    date: string;
  }>;
  studentsByClass: Array<{
    name: string;
    students: number;
  }>;
  studentsByGender: Array<{
    name: string;
    value: number;
  }>;
  attendanceTrend: Array<{
    month: string;
    attendance: number;
  }>;
  feeCollection: {
    total: number;
    collected: number;
    pending: number;
  };
}
