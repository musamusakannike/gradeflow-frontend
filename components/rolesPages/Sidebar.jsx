"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ role, isSidebarOpen, setIsSidebarOpen }) => {
  const pathname = usePathname();
  const links = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Classes", path: "/admin/classes" },
      { name: "Teachers", path: "/admin/teachers" },
      { name: "Subjects", path: "/admin/subjects" },
    ],
    teacher: [
      { name: "Dashboard", path: "/teacher/dashboard" },
      { name: "Classes", path: "/teacher/classes" },
      { name: "Subjects", path: "/teacher/subjects" },
    ],
    student: [
      { name: "Dashboard", path: "/student/dashboard" },
      { name: "Subjects", path: "/student/subjects" },
      { name: "Scores", path: "/student/scores" },
    ],
  };

  return (
    <aside
      className={`fixed z-30 top-0 left-0 h-screen bg-white w-64 p-6 shadow-lg md:shadow-none transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:relative`}
    >
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="lg:hidden absolute top-4 right-4 text-gray-700"
        aria-label="Close Sidebar"
      >
        ✖
      </button>
      <nav>
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Grade<span className="text-orange-500">Flow</span>
        </h2>
        <ul className="space-y-4">
          {links[role].map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-orange-500 text-white shadow"
                      : "hover:bg-orange-100 text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
