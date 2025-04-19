"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

export default function Screenshots() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const screenshots = [
    {
      title: "Interactive Dashboard",
      description: "Get a complete overview of your school with real-time analytics and insights.",
      image: "/placeholder.svg?height=600&width=1000",
    },
    {
      title: "Student Profiles",
      description: "Comprehensive student information with academic history and performance tracking.",
      image: "/placeholder.svg?height=600&width=1000",
    },
    {
      title: "Result Management",
      description: "Easily upload, manage, and analyze student results with automated grading.",
      image: "/placeholder.svg?height=600&width=1000",
    },
    {
      title: "Attendance Tracking",
      description: "Track student and staff attendance with automated notifications for absences.",
      image: "/placeholder.svg?height=600&width=1000",
    },
    {
      title: "Fee Management",
      description: "Streamline payment collection with detailed financial reports and reminders.",
      image: "/placeholder.svg?height=600&width=1000",
    },
  ]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See GradeFlow in Action</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600">
            Explore the intuitive interface and powerful features that make school management effortless.
          </p>
        </div>

        <div
          className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Laptop frame */}
          <div className="relative mx-auto">
            <div className="relative z-10 bg-gray-800 rounded-t-xl pt-4 pb-2 px-4 shadow-xl">
              <div className="flex items-center justify-start space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="h-1 w-1/3 bg-gray-600 rounded-full mx-auto"></div>
            </div>

            {/* Screenshot container */}
            <div className="relative bg-white aspect-[16/10] overflow-hidden rounded-b-xl shadow-2xl border-t-0 border-4 border-gray-800">
              {screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === currentIndex
                      ? "opacity-100 translate-x-0"
                      : index < currentIndex
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                  }`}
                >
                  <Image
                    src={screenshot.image || "/placeholder.svg"}
                    alt={screenshot.title}
                    fill
                    className="object-cover"
                    priority={index === currentIndex}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{screenshot.title}</h3>
                    <p className="text-sm text-gray-200">{screenshot.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Video preview button */}
          <div className="mt-10 text-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg group">
              <Play className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">Watch Video Preview</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
