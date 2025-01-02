"use client";

import { useState } from "react";

const RolesNavbar = ({ role }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-100 text-gray-800 py-4 px-2">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h1>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              <span>Profile</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-orange-100"
                >
                  View Profile
                </a>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RolesNavbar;
