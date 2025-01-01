"use client";
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-orange-500">
          GradeFlow
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-orange-500 transition"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-orange-500 transition"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-orange-500 transition"
          >
            Contact
          </a>
          <a
            href="/login"
            className="px-4 py-2 text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            Login
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-600 hover:text-orange-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <a
              href="#features"
              className="block py-2 text-gray-600 hover:text-orange-500 transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block py-2 text-gray-600 hover:text-orange-500 transition"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="block py-2 text-gray-600 hover:text-orange-500 transition"
            >
              Contact
            </a>
            <a
              href="/login"
              className="block py-2 text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition text-center"
            >
              Login
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;