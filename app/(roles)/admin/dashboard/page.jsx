import RolesNavbar from "@/components/rolesPages/RolesNavbar";
import Sidebar from "@/components/rolesPages/Sidebar";
import DashboardContent from "@/components/rolesPages/DashboardContent";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="admin" />
      <main className="flex-1">
        <RolesNavbar role="admin" />
        <DashboardContent role="admin" />
      </main>
    </div>
  );
};

export default AdminDashboard;
