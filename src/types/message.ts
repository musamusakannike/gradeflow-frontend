export interface IMessageAttachment {
    fileName?: string
    fileType?: string
    fileUrl?: string
  }
  
  export interface IMessage {
    _id?: string
    sender: string // ObjectId as string
    recipient: string
    conversationId: string
    content: string
    read?: boolean
    attachments?: IMessageAttachment[]
    school: string
    createdAt?: Date
    updatedAt?: Date
  }
  