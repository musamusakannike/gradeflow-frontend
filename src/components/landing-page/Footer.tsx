"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setIsEmailValid(false)
      return
    }

    // In a real implementation, you would send this to your API
    console.log("Subscribing email:", email)
    setIsSubscribed(true)
    setEmail("")
    setIsEmailValid(true)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Wave decoration at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden transform -translate-y-full">
        <svg className="w-full h-auto" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0z"></path>
        </svg>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Company info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                <span className="text-xl font-bold">G</span>
              </div>
              <span className="text-2xl font-bold">GradeFlow</span>
            </div>
            <p className="text-gray-400">
              Simplifying school operations and empowering learning through innovative management solutions.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Education Ave, Suite 400
                  <br />
                  San Francisco, CA 94107
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@gradeflow.com"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  info@gradeflow.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-blue-500 -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Resources
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-blue-500 -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Webinars
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Stay Updated
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-blue-500 -mb-2"></span>
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest features, updates, and educational insights.
            </p>
            {isSubscribed ? (
              <div className="bg-blue-900/50 p-4 rounded-lg border border-blue-700">
                <p className="text-blue-300">Thank you for subscribing! You&apos;ll receive our next newsletter soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="email-input" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setIsEmailValid(true)
                    }}
                    placeholder="Your email address"
                    className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                      isEmailValid ? "border-gray-700 focus:border-blue-500" : "border-red-500"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {!isEmailValid && <p className="mt-1 text-sm text-red-400">Please enter a valid email address</p>}
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Subscribe
                </button>
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy. We respect your privacy and will never share your
                  information.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Social and copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">© {currentYear} GradeFlow. All rights reserved.</div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
