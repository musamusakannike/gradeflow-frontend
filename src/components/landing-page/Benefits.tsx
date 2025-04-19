"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CheckCircle, Clock, Cloud, Lock, MessageCircle, Smartphone } from "lucide-react"

interface BenefitProps {
  icon: React.ReactNode
  emoji: string
  title: string
  description: string
  delay: number
}

const Benefit = ({ icon, emoji, title, description, delay }: BenefitProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`flex items-start gap-4 group transition-all duration-700 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
          {icon}
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
          <span className="text-lg">{emoji}</span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
        <div className="w-0 h-0.5 bg-blue-500 mt-2 transition-all duration-500 group-hover:w-full"></div>
      </div>
    </div>
  )
}

export default function Benefits() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      emoji: "🚀",
      title: "Saves Time for Administrators",
      description:
        "Automate routine tasks like attendance, grading, and reporting. Our system reduces administrative workload by up to 70%, letting staff focus on what matters most.",
      delay: 100,
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      emoji: "📱",
      title: "Mobile-Friendly Interface",
      description:
        "Access GradeFlow from any device with our responsive design. Our mobile app provides the same powerful features as the desktop version, ensuring productivity on the go.",
      delay: 200,
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      emoji: "☁️",
      title: "Cloud-Based Accessibility",
      description:
        "Work from anywhere with our cloud-based platform. All your data is synchronized in real-time across devices, enabling seamless collaboration between staff members.",
      delay: 300,
    },
    {
      icon: <Lock className="w-6 h-6" />,
      emoji: "🔐",
      title: "Enterprise-Grade Security",
      description:
        "Rest easy knowing your data is protected with AES-256 encryption, JWT authentication, and role-based access controls. We're compliant with FERPA and other educational data privacy standards.",
      delay: 400,
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      emoji: "💬",
      title: "24/7 Dedicated Support",
      description:
        "Our support team is always available to help. Get assistance via live chat, email, or phone at any time, with an average response time of under 2 hours.",
      delay: 500,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Illustration */}
          <div
            className={`relative transition-all duration-1000 transform ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0"
            }`}
          >
            <div className="relative mx-auto max-w-md lg:max-w-full">
              <div className="relative z-10 bg-white rounded-2xl shadow-xl p-1 border border-gray-100 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg transform rotate-3">
                  Premium
                </div>
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="GradeFlow Benefits"
                  width={500}
                  height={500}
                  className="rounded-xl"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600 rounded-lg shadow-lg transform -rotate-6 z-0 opacity-20"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-600 rounded-full shadow-lg transform rotate-12 z-0 opacity-10"></div>

              {/* Checkmarks */}
              <div className="absolute top-1/4 -left-12 bg-white rounded-full p-2 shadow-lg transform -translate-y-1/2 animate-float animation-delay-1000">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="absolute top-2/3 -right-10 bg-white rounded-full p-2 shadow-lg transform -translate-y-1/2 animate-float animation-delay-2000">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="absolute bottom-10 left-1/4 bg-white rounded-full p-2 shadow-lg transform -translate-x-1/2 animate-float animation-delay-3000">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Right column - Benefits */}
          <div>
            <div
              className={`mb-12 transition-all duration-1000 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose GradeFlow?</h2>
              <div className="w-24 h-1 bg-blue-500 rounded-full mb-6"></div>
              <p className="text-lg text-gray-600">
                GradeFlow isn&apos;t just another school management system. We&apos;ve built a platform that addresses the real
                challenges faced by educational institutions today.
              </p>
            </div>

            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <Benefit
                  key={index}
                  icon={benefit.icon}
                  emoji={benefit.emoji}
                  title={benefit.title}
                  description={benefit.description}
                  delay={benefit.delay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
