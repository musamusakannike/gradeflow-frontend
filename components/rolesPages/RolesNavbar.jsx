"use client";

const RolesNavbar = ({ setIsSidebarOpen }) => {
  return (
    <nav className="bg-white shadow p-4 flex items-center justify-between">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden text-gray-700"
        aria-label="Open Sidebar"
      >
        ☰
      </button>
      <h1 className="text-lg font-bold text-gray-700">Admin Dashboard</h1>
    </nav>
  );
};

export default RolesNavbar;
