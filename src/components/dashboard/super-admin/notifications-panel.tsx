"use client"

import { useState, useEffect } from "react"
import { X, Bell, CheckCheck, Trash2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { INotification, NotificationType } from "@/types/notification"
// Sample notification data
const sampleNotifications: INotification[] = [
  {
    _id: "1",
    recipient: "user1",
    sender: "system",
    type: "announcement",
    title: "New School Registration",
    message: "Greenfield Academy has registered on the platform.",
    read: false,
    school: "school1",
    createdAt: new Date("2023-05-12T10:30:00.000Z"),
  },
  {
    _id: "2",
    recipient: "user1",
    sender: "system",
    type: "announcement",
    title: "System Update",
    message: "The system will undergo maintenance on June 15, 2023.",
    read: true,
    school: "school1",
    createdAt: new Date("2023-05-10T08:15:00.000Z"),
  },
  {
    _id: "3",
    recipient: "user1",
    sender: "system",
    type: "message",
    title: "User Reported Issue",
    message: "A user has reported an issue with the attendance module.",
    read: false,
    school: "school1",
    createdAt: new Date("2023-05-09T14:45:00.000Z"),
  },
  {
    _id: "4",
    recipient: "user1",
    sender: "system",
    type: "announcement",
    title: "New Admin User",
    message: "Amanda Patel has been added as a Super Admin.",
    read: false,
    school: "school1",
    createdAt: new Date("2023-05-08T11:20:00.000Z"),
  },
  {
    _id: "5",
    recipient: "user1",
    sender: "system",
    type: "fee",
    title: "Payment Received",
    message: "Westlake Academy has renewed their Premium subscription.",
    read: true,
    school: "school1",
    createdAt: new Date("2023-05-07T09:10:00.000Z"),
  },
]

interface NotificationsPanelProps {
  onClose: () => void
}

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate API call to fetch notifications
    const fetchNotifications = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setNotifications(sampleNotifications)
        setIsLoading(false)
      }, 1000)
    }

    fetchNotifications()
  }, [])

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return true
  })

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAsRead = (id: string | undefined) => {
    if (!id) return
    setNotifications(
      notifications.map((notification) => (notification._id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    toast.success("All notifications have been marked as read")
  }

  const deleteNotification = (id: string | undefined) => {
    if (!id) return
    setNotifications(notifications.filter((notification) => notification._id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
    toast.success("All notifications have been cleared")
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
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

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "attendance":
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Bell className="h-4 w-4 text-green-600" />
          </div>
        )
      case "result":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Bell className="h-4 w-4 text-blue-600" />
          </div>
        )
      case "fee":
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <Bell className="h-4 w-4 text-yellow-600" />
          </div>
        )
      case "event":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Bell className="h-4 w-4 text-purple-600" />
          </div>
        )
      case "announcement":
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
            <Bell className="h-4 w-4 text-red-600" />
          </div>
        )
      case "message":
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <Bell className="h-4 w-4 text-indigo-600" />
          </div>
        )
      case "assignment":
        return (
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <Bell className="h-4 w-4 text-orange-600" />
          </div>
        )
      case "reminder":
        return (
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
            <Bell className="h-4 w-4 text-pink-600" />
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <Bell className="h-4 w-4 text-gray-600" />
          </div>
        )
    }
  }

  return (
    <div className="w-80 md:w-96 h-full bg-white border-l border-gray-200 shadow-lg animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Notifications</h2>
          {unreadCount > 0 && <Badge className="ml-2 bg-red-500">{unreadCount}</Badge>}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
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

      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" className="text-xs" onClick={markAllAsRead} disabled={unreadCount === 0}>
          <CheckCheck className="h-4 w-4 mr-1" />
          Mark all as read
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={clearAllNotifications}
          disabled={notifications.length === 0}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear all
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={() => {
            setIsLoading(true)
            setTimeout(() => {
              setNotifications(sampleNotifications)
              setIsLoading(false)
            }, 1000)
          }}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 p-4 text-center">
            <Bell className="h-10 w-10 text-gray-300 mb-2" />
            <p className="text-gray-500">No notifications to display</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`flex items-start space-x-4 p-3 rounded-lg transition-colors ${
                  notification.read ? "bg-white" : "bg-blue-50"
                } hover:bg-gray-50`}
                onClick={() => !notification.read && markAsRead(notification._id)}
              >
                {getNotificationIcon(notification.type)}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{getTimeAgo(notification.createdAt?.toISOString() || "")}</p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNotification(notification._id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
