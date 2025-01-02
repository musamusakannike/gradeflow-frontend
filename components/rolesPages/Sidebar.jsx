"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ role }) => {
  const pathname = usePathname();
  const links = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Classes", path: "/admin/manage-classes" },
      { name: "Teachers", path: "/admin/manage-teachers" },
      { name: "Students", path: "/admin/manage-students" },
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
    <aside className="w-64 bg-white h-screen p-6 shadow-lg sticky top-0">
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
