export type NotificationType =
  | "attendance"
  | "result"
  | "fee"
  | "event"
  | "announcement"
  | "message"
  | "assignment"
  | "reminder"

export type RelatedModel =
  | "Student"
  | "Result"
  | "Attendance"
  | "Fee"
  | "Event"
  | "Class"
  | "Subject"

export interface INotification {
  _id?: string
  recipient: string
  sender?: string
  type: NotificationType
  title: string
  message: string
  read?: boolean
  actionLink?: string
  relatedId?: string
  relatedModel?: RelatedModel
  school: string
  createdAt?: Date
  updatedAt?: Date
}
