"use client";

const RolesNavbar = ({ role }) => {
  return (
    <nav className="bg-gray-100 text-gray-800 py-4 px-2">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location.href = "/";
          }}
          className="px-4 py-2 bg-white text-orange-500 rounded-lg hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default RolesNavbar;
