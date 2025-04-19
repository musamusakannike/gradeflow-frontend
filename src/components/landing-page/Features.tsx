"use client";

import { useEffect, useState } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:border-blue-200 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>

        <div className="w-12 h-1 bg-blue-500 rounded-full mt-4 mb-2 transform origin-left transition-all duration-300 group-hover:w-full"></div>

        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default function Features() {
  const features = [
    {
      icon: "🎓",
      title: "Student Management",
      description:
        "Comprehensive student profiles with academic history, contact info, and performance tracking.",
      delay: 100,
    },
    {
      icon: "🧑‍🏫",
      title: "Teacher & Admin Controls",
      description:
        "Powerful tools for educators to manage classes, assignments, and administrative tasks.",
      delay: 200,
    },
    {
      icon: "📊",
      title: "Result & Grade Automation",
      description:
        "Automated grading system with customizable assessment criteria and report generation.",
      delay: 300,
    },
    {
      icon: "💰",
      title: "Fees & Payment Tracking",
      description:
        "Streamlined payment processing with automated reminders and detailed financial reports.",
      delay: 400,
    },
    {
      icon: "📆",
      title: "Attendance System",
      description:
        "Digital attendance tracking with real-time notifications for parents and administrators.",
      delay: 500,
    },
    {
      icon: "🔐",
      title: "Secure Login for All Users",
      description:
        "Role-based access control with multi-factor authentication for enhanced security.",
      delay: 600,
    },
    {
      icon: "🧾",
      title: "Report Generation & Analytics",
      description:
        "Comprehensive analytics dashboard with customizable reports and data visualization.",
      delay: 700,
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-white to-blue-50">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Education
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600">
            GradeFlow provides everything you need to streamline school
            operations and enhance the learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
              />

              {/* Decorative dots */}
              <div className="absolute -right-2 -top-2 w-6 h-6 grid grid-cols-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="white"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
