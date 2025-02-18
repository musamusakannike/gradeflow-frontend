import { Poppins } from "next/font/google";
import "../../styles/globals.css";
import Sidebar from "@/components/rolesPages/Sidebar";
import RolesNavbar from "@/components/rolesPages/RolesNavbar";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Teacher Dashboard",
  description: "A School Management System",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <div className="flex">
        <Sidebar role="teacher" />
        <main className="flex-1">
          <RolesNavbar role="Teacher" />
          {children}
        </main>
      </div>
    </div>
  );
}
