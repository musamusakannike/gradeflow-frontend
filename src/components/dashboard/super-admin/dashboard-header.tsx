"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, MessageSquare, Search, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth, USER_ROLES } from "@/contexts/auth-context";

interface DashboardHeaderProps {
  onNotificationsClick: () => void;
  onMessagesClick: () => void;
  showNotifications: boolean;
  showMessages: boolean;
}

export default function DashboardHeader({
  onNotificationsClick,
  onMessagesClick,
  showNotifications,
  showMessages,
}: DashboardHeaderProps) {
  const { user } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate fetching unread counts
    setUnreadNotifications(5);
    setUnreadMessages(3);

    // Close search when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-gray-500 hover:text-gray-700" />

          <h1 className="text-xl font-bold text-gray-800 hidden md:block">
            Super Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div ref={searchRef} className="relative">
            {showSearch ? (
              <div className="absolute right-0 top-0 w-64 md:w-80 flex items-center animate-in fade-in slide-in-from-top-5 duration-300">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pr-8"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0"
                  onClick={() => setShowSearch(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="relative">
            <Button
              variant={showNotifications ? "secondary" : "ghost"}
              size="icon"
              onClick={onNotificationsClick}
              className="text-gray-500 hover:text-gray-700"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {unreadNotifications > 9 ? "9+" : unreadNotifications}
                </Badge>
              )}
            </Button>
          </div>

          <div className="relative">
            <Button
              variant={showMessages ? "secondary" : "ghost"}
              size="icon"
              onClick={onMessagesClick}
              className="text-gray-500 hover:text-gray-700"
            >
              <MessageSquare className="h-5 w-5" />
              {unreadMessages > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {unreadMessages > 9 ? "9+" : unreadMessages}
                </Badge>
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-blue-600 text-white">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="hidden md:block">
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role === USER_ROLES.SUPER_SUPER_ADMIN
                  ? "Super Admin"
                  : user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
