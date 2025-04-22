export interface IClass {
  _id?: string;
  name: string;
  classTeacher: string; // ObjectId as string
  academicSession: string; // ObjectId as string
  school: string; // ObjectId as string
  createdAt?: Date;
  updatedAt?: Date;
}

// Extended interface for populated class data
export interface IPopulatedClass extends Omit<IClass, 'classTeacher' | 'academicSession'> {
  classTeacher: {
    _id: string | undefined;
    firstName: string;
    lastName: string;
    email: string;
  };
  academicSession: {
    _id: string;
    name: string;
  };
  studentCount?: number;
}
