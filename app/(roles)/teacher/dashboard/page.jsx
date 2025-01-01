import RolesNavbar from "@/components/rolesPages/RolesNavbar";
import Sidebar from "@/components/rolesPages/Sidebar";
import DashboardContent from "@/components/rolesPages/DashboardContent";

const TeacherDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="teacher" />
      <main className="flex-1">
        <RolesNavbar role="teacher" />
        <DashboardContent role="teacher" />
      </main>
    </div>
  );
};

export default TeacherDashboard;
