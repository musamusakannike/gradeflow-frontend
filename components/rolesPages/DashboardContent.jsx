import React from "react";

const DashboardContent = ({ role }) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}!</h2>
      <p className="mt-4 text-gray-600">This is your dashboard. Customize it to fit your needs.</p>
    </div>
  );
};

export default DashboardContent;
