import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-100 py-8">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          {/* Logo and Description */}
          <div className="mb-8 lg:mb-0">
            <a href="/" className="text-2xl font-bold text-orange-500">
              GradeFlow
            </a>
            <p className="mt-4 text-gray-400">
              Simplifying school management with powerful tools for admins, teachers, and students.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 text-center lg:text-left lg:grid-cols-4">
            {/* Links Group */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#features" className="hover:text-orange-500 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-orange-500 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-orange-500 transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-orange-500 transition">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/blog" className="hover:text-orange-500 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/docs" className="hover:text-orange-500 transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-orange-500 transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-orange-500 transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Contact</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>Email: support@gradeflow.com</li>
                <li>Phone: +1 (123) 456-7890</li>
                <li>Address: 123 School St, Education City</li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Follow Us</h3>
              <div className="mt-4 flex space-x-4 justify-center lg:justify-start">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                  <FaFacebookF size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                  <FaTwitter size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                  <FaLinkedinIn size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} GradeFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
