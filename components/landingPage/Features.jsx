import { FaChalkboardTeacher, FaUserGraduate, FaClipboardList } from 'react-icons/fa';

const Features = () => {
  return (
    <section id="features" className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
          Why Choose <span className="text-orange-500">GradeFlow</span>?
        </h2>
        <p className="mt-4 text-gray-600">
          Simplify school management with powerful features tailored for administrators, teachers, and students.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {/* Feature 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-full mx-auto">
              <FaChalkboardTeacher size={30} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Teacher Management</h3>
            <p className="mt-2 text-gray-600">
              Assign teachers to classes and subjects effortlessly, and manage their schedules efficiently.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-full mx-auto">
              <FaUserGraduate size={30} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Student Management</h3>
            <p className="mt-2 text-gray-600">
              Keep track of student performance, attendance, and subject enrollments in one place.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-full mx-auto">
              <FaClipboardList size={30} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Streamlined Scoring</h3>
            <p className="mt-2 text-gray-600">
              Assign tests and exam scores with ease, and generate comprehensive performance reports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
