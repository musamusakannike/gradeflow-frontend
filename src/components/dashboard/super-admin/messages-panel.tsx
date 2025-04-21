"use client"

import { useState, useEffect } from "react"
import { X, MessageSquare, Search, Send, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { IMessage } from "@/types/message"

// Sample messages data
const sampleMessages = [
  {
    _id: "1",
    sender: "101",
    recipient: "current_user",
    conversationId: "101_current_user",
    content: "I'm having trouble with the attendance module. Can you help?",
    read: false,
    school: "school1",
    createdAt: new Date("2023-05-12T10:30:00.000Z"),
    updatedAt: new Date("2023-05-12T10:30:00.000Z"),
  },
  {
    _id: "2",
    sender: "102",
    recipient: "current_user",
    conversationId: "102_current_user",
    content: "When does our premium subscription expire?",
    read: true,
    school: "school1",
    createdAt: new Date("2023-05-10T08:15:00.000Z"),
    updatedAt: new Date("2023-05-10T08:15:00.000Z"),
  },
  {
    _id: "3",
    sender: "103",
    recipient: "current_user",
    conversationId: "103_current_user",
    content: "Is it possible to add a custom grading scale?",
    read: false,
    school: "school1",
    createdAt: new Date("2023-05-09T14:45:00.000Z"),
    updatedAt: new Date("2023-05-09T14:45:00.000Z"),
  },
]

interface MessagesPanelProps {
  onClose: () => void
}

export default function MessagesPanel({ onClose }: MessagesPanelProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [showMessageList, setShowMessageList] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch messages
    const fetchMessages = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setMessages(sampleMessages)
        setIsLoading(false)
      }, 1000)
    }

    fetchMessages()
  }, [])

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = message.content.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && !message.read

    return matchesSearch
  })

  const unreadCount = messages.filter((message) => !message.read).length

  const handleSelectMessage = (message: IMessage) => {
    setSelectedMessage(message)
    setShowMessageList(false)

    // Simulate API call to mark message as read
    if (!message.read) {
      setMessages(
        messages.map((m) => {
          if (m._id === message._id) {
            return { ...m, read: true }
          }
          return m
        }),
      )
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMessage) return

    // Add new message to the conversation
    const newMessageObj: IMessage = {
      _id: `m${messages.length + 1}`,
      sender: "current_user",
      recipient: selectedMessage.sender || "",
      conversationId: selectedMessage.conversationId,
      content: newMessage,
      read: true,
      school: selectedMessage.school,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setMessages([...messages, newMessageObj])
    setNewMessage("")
  }

  const deleteMessage = (id: string | undefined) => {
    if (!id) return
    setMessages(messages.filter((m) => m._id !== id))
    toast("Message deleted")
  }

  const getTimeAgo = (date: Date | undefined) => {
    if (!date) return ""
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) {
      return `${interval} year${interval === 1 ? "" : "s"} ago`
    }

    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
      return `${interval} month${interval === 1 ? "" : "s"} ago`
    }

    interval = Math.floor(seconds / 86400)
    if (interval >= 1) {
      return `${interval} day${interval === 1 ? "" : "s"} ago`
    }

    interval = Math.floor(seconds / 3600)
    if (interval >= 1) {
      return `${interval} hour${interval === 1 ? "" : "s"} ago`
    }

    interval = Math.floor(seconds / 60)
    if (interval >= 1) {
      return `${interval} minute${interval === 1 ? "" : "s"} ago`
    }

    return `${Math.floor(seconds)} second${seconds === 1 ? "" : "s"} ago`
  }

  const getSenderInitial = (sender: string | undefined) => {
    return sender?.charAt(0) || "?"
  }

  return (
    <div className="w-80 md:w-96 h-full bg-white border-l border-gray-200 shadow-lg animate-in slide-in-from-right duration-300">
      {showMessageList ? (
        <>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Messages</h2>
              {unreadCount > 0 && <Badge className="ml-2 bg-red-500">{unreadCount}</Badge>}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search messages..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="p-4 border-b">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadCount > 0 && <Badge className="ml-2 bg-red-500">{unreadCount}</Badge>}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            {isLoading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 p-4 text-center">
                <MessageSquare className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-gray-500">No messages to display</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {filteredMessages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex items-start space-x-4 p-3 rounded-lg transition-colors ${
                      message.read ? "bg-white" : "bg-blue-50"
                    } hover:bg-gray-50 cursor-pointer`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {getSenderInitial(message.sender)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {message.sender || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-400">{getTimeAgo(message.createdAt)}</p>
                      </div>

                      <p
                        className={`text-sm mt-1 truncate ${
                          message.read ? "text-gray-500" : "text-gray-900 font-medium"
                        }`}
                      >
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </>
      ) : (
        <>
          <div className="flex items-center p-4 border-b">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => {
                setSelectedMessage(null)
                setShowMessageList(true)
              }}
            >
              <X className="h-5 w-5" />
            </Button>

            {selectedMessage && (
              <div className="flex items-center flex-1 min-w-0">
                <Avatar className="mr-3">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getSenderInitial(selectedMessage.sender)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {selectedMessage.sender || "Unknown"}
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (selectedMessage) {
                  deleteMessage(selectedMessage._id)
                  setShowMessageList(true)
                }
              }}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            {isLoading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {messages
                  .filter((m) => m.conversationId === selectedMessage?.conversationId)
                  .map((message) => (
                    <div
                      key={message._id}
                      className={`flex ${message.sender === "current_user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender !== "current_user" && (
                        <Avatar className="mr-2 mt-1">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {getSenderInitial(message.sender)}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`max-w-[75%] ${
                          message.sender === "current_user"
                            ? "bg-blue-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                            : "bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"
                        } p-3`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "current_user" ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {getTimeAgo(message.createdAt)}
                        </p>
                      </div>

                      {message.sender === "current_user" && (
                        <Avatar className="ml-2 mt-1">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-blue-600 text-white">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex items-center">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
