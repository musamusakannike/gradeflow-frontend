import Link from "next/link";

const Sidebar = ({ role }) => {
  const links = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Manage Schools", path: "/admin/manage-schools" },
      { name: "Reports", path: "/admin/reports" },
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
    <aside className="w-64 bg-gray-100 h-screen p-6">
      <nav>
        <ul className="space-y-4">
          {links[role].map((link) => (
            <li key={link.name}>
              <Link href={link.path} className="block px-4 py-2 rounded-lg hover:bg-orange-100">
                  {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
