"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[90vh] flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div
            className={`space-y-8 transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4 transition-all duration-500 hover:bg-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                <span>GradeFlow</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                <span className="block">Simplify School Operations,</span>
                <span className="block text-blue-600">Empower Learning</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                Manage results, students, staff, attendance, fees, and more —
                all in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#"
                className="px-8 py-4 rounded-lg bg-blue-600 text-white font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Get Started
              </Link>
              <Link
                href="#"
                className="px-8 py-4 rounded-lg bg-white text-blue-600 font-medium text-lg border-2 border-blue-600 transition-all duration-300 transform hover:scale-105 hover:bg-blue-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Request a Demo
              </Link>
            </div>

            <div className="flex items-center space-x-4 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={`User ${i}`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">500+</span>{" "}
                schools trust GradeFlow
              </div>
            </div>
          </div>

          {/* Right column - Dashboard mockup */}
          <div
            className={`relative transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Dashboard mockup */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform hover:rotate-1 transition-transform duration-500 hover:shadow-blue-200">
                <div className="h-8 bg-gray-100 flex items-center px-4 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-4">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="GradeFlow Dashboard"
                    width={600}
                    height={500}
                    className="rounded-lg shadow-sm"
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-100 rounded-lg shadow-md p-3 transform rotate-6 animate-float animation-delay-1000">
                <div className="h-full bg-yellow-50 rounded-md border border-yellow-200 flex flex-col justify-between p-2">
                  <div className="w-full h-2 bg-yellow-200 rounded-full"></div>
                  <div className="w-3/4 h-2 bg-yellow-200 rounded-full"></div>
                  <div className="w-1/2 h-2 bg-yellow-200 rounded-full"></div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-100 rounded-lg shadow-md p-3 transform -rotate-12 animate-float animation-delay-2000">
                <div className="h-full bg-blue-50 rounded-md border border-blue-200 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-blue-300"></div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-28 h-28 bg-green-100 rounded-lg shadow-md p-3 rotate-12 animate-float animation-delay-3000">
                <div className="h-full bg-green-50 rounded-md border border-green-200 flex flex-col justify-center space-y-2 p-2">
                  <div className="w-full h-2 bg-green-200 rounded-full"></div>
                  <div className="w-full h-2 bg-green-200 rounded-full"></div>
                  <div className="w-3/4 h-2 bg-green-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
