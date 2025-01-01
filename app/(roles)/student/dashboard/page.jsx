import RolesNavbar from "@/components/rolesPages/RolesNavbar";
import Sidebar from "@/components/rolesPages/Sidebar";
import DashboardContent from "@/components/rolesPages/DashboardContent";

const StudentDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="student" />
      <main className="flex-1">
        <RolesNavbar role="student" />
        <DashboardContent role="student" />
      </main>
    </div>
  );
};

export default StudentDashboard;
