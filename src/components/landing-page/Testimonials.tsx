"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  school: string;
  image: string;
  rating: number;
  category: "admin" | "teacher" | "it" | "parent";
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const testimonials: Testimonial[] = [
    {
      quote:
        "GradeFlow has revolutionized how we manage our school. The automated grading system alone has saved our teachers countless hours, and the intuitive dashboard gives me a complete overview of school performance at a glance.",
      name: "Dr. Sarah Johnson",
      role: "Principal",
      school: "Westlake Academy",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      category: "admin",
    },
    {
      quote:
        "As someone who manages IT for a district with 15 schools, GradeFlow's cloud-based system has been a game-changer. The security features are robust, and the platform's reliability means I spend less time troubleshooting and more time improving our tech infrastructure.",
      name: "Michael Chen",
      role: "IT Director",
      school: "Riverdale School District",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      category: "it",
    },
    {
      quote:
        "I was skeptical about switching to a new system, but GradeFlow's onboarding process was seamless. The attendance tracking and grade management features have simplified my daily workflow, and the mobile app lets me update grades from anywhere.",
      name: "Emily Rodriguez",
      role: "High School Teacher",
      school: "Lincoln High",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4,
      category: "teacher",
    },
    {
      quote:
        "The parent portal is intuitive and gives me real-time updates on my children's progress. I appreciate being able to communicate directly with teachers and receive instant notifications about assignments and grades.",
      name: "James Wilson",
      role: "Parent",
      school: "Oakridge Elementary",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      category: "parent",
    },
    {
      quote:
        "Implementing GradeFlow was the best decision we made last year. The fee management system has increased our collection rate by 35%, and the reporting tools provide insights that help us make data-driven decisions for our school's future.",
      name: "Amanda Patel",
      role: "School Administrator",
      school: "Greenfield Academy",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      category: "admin",
    },
    {
      quote:
        "The customer support team at GradeFlow deserves special recognition. Whenever we've had questions or needed assistance, they've responded quickly and effectively. It's rare to find this level of service in educational software.",
      name: "Robert Kim",
      role: "Assistant Principal",
      school: "Maplewood High",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      category: "admin",
    },
  ];

  const filteredTestimonials = activeFilter
    ? testimonials.filter((t) => t.category === activeFilter)
    : testimonials;

  const nextSlide = () => {
    if (isAnimating || filteredTestimonials.length <= 1) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) =>
      prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating || filteredTestimonials.length <= 1) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (
      isAnimating ||
      index === activeIndex ||
      filteredTestimonials.length <= 1
    )
      return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
    setActiveIndex(0);
  };

  useEffect(() => {
    if (activeIndex >= filteredTestimonials.length) {
      setActiveIndex(0);
    }
  }, [activeFilter, filteredTestimonials.length, activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (filteredTestimonials.length > 1) {
        nextSlide();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating, filteredTestimonials.length]);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-50 to-transparent"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

      {/* Quote marks */}
      <div className="absolute top-20 left-10 text-9xl text-blue-100 font-serif">
        &quot;
      </div>
      <div className="absolute bottom-20 right-10 text-9xl text-blue-100 font-serif">
        &quot;
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600">
            Don&apos;t just take our word for it. Here&apos;s what educators,
            administrators, and parents think about GradeFlow.
          </p>
        </div>

        {/* Filter buttons */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <button
            onClick={() => handleFilterChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === null
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("admin")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === "admin"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Administrators
          </button>
          <button
            onClick={() => handleFilterChange("teacher")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === "teacher"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Teachers
          </button>
          <button
            onClick={() => handleFilterChange("it")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === "it"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            IT Staff
          </button>
          <button
            onClick={() => handleFilterChange("parent")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === "parent"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Parents
          </button>
        </div>

        {/* Testimonials carousel */}
        <div
          ref={containerRef}
          className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden min-h-[400px]">
            {filteredTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : index < activeIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg text-gray-700 italic mb-6 flex-grow">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>

                  <div className="flex items-center mt-auto">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100 mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-blue-600">{testimonial.role}</div>
                      <div className="text-sm text-gray-500">
                        {testimonial.school}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows - only show if there are multiple testimonials */}
          {filteredTestimonials.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 bg-white hover:bg-gray-50 text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-20 bg-white hover:bg-gray-50 text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Navigation dots - only show if there are multiple testimonials */}
          {filteredTestimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
