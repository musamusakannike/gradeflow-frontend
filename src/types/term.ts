export interface IAcademicSession {
  _id: string
  name: string
  startDate: Date
  endDate: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ITerm {
    _id?: string
    name: "First Term" | "Second Term" | "Third Term"
    academicSession: string // ObjectId as string
    academicSessionName?: string // Optional field for display purposes
    startDate: Date
    endDate: Date
    allowScoring?: boolean
    school: string // ObjectId as string
    isActive?: boolean
    createdAt?: Date
    updatedAt?: Date
}
  