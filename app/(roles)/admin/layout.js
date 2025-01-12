"use client";
import { useState } from "react";
import Sidebar from "@/components/rolesPages/Sidebar";
import RolesNavbar from "@/components/rolesPages/RolesNavbar";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <div className="flex">
        {/* Pass the toggle functionality to the Sidebar */}
        <Sidebar
          role="admin"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1">
          <RolesNavbar setIsSidebarOpen={setIsSidebarOpen} />
          {children}
        </main>
      </div>
    </div>
  );
}
