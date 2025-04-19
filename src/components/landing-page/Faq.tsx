"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown, HelpCircle, Lock, LifeBuoy, School, Settings } from "lucide-react"

interface FaqItem {
  id: string
  question: string
  answer: React.ReactNode
  icon: React.ReactNode
}

export default function Faq() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Open the first item by default
    setOpenItems(["faq-1"])
  }, [])

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      question: "Is GradeFlow secure?",
      icon: <Lock className="w-5 h-5 text-blue-600" />,
      answer: (
        <div className="space-y-4">
          <p>Absolutely. Security is our top priority at GradeFlow. We implement multiple layers of protection:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>AES-256 encryption for all data at rest and in transit</li>
            <li>Regular security audits and penetration testing</li>
            <li>FERPA compliance for educational data privacy</li>
            <li>Role-based access controls to ensure appropriate data access</li>
            <li>Two-factor authentication for all admin accounts</li>
            <li>Automated backups with point-in-time recovery</li>
          </ul>
          <p>
            Our security practices are regularly audited and we maintain compliance with major educational data privacy
            regulations.
          </p>
        </div>
      ),
    },
    {
      id: "faq-2",
      question: "How do I set up GradeFlow for my school?",
      icon: <Settings className="w-5 h-5 text-blue-600" />,
      answer: (
        <div className="space-y-4">
          <p>Setting up GradeFlow is straightforward and our team will guide you through every step:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Initial Consultation:</strong> We&apos;ll discuss your specific needs and help you choose the right
              plan.
            </li>
            <li>
              <strong>Data Import:</strong> We&apos;ll help you import existing student, teacher, and course data.
            </li>
            <li>
              <strong>Configuration:</strong> We&apos;ll configure the system to match your school&apos;s grading policies, terms,
              and schedules.
            </li>
            <li>
              <strong>Training:</strong> We provide comprehensive training sessions for administrators, teachers, and
              staff.
            </li>
            <li>
              <strong>Go Live:</strong> We&apos;ll support you during the launch phase to ensure a smooth transition.
            </li>
          </ol>
          <p>
            The typical setup process takes 2-4 weeks, depending on the size of your school and complexity of your data.
            Our dedicated implementation team will be with you every step of the way.
          </p>
        </div>
      ),
    },
    {
      id: "faq-3",
      question: "Can I use GradeFlow for multiple schools or a district?",
      icon: <School className="w-5 h-5 text-blue-600" />,
      answer: (
        <div className="space-y-4">
          <p>Yes! GradeFlow is designed to scale from single schools to entire districts:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Multi-school management:</strong> Easily manage multiple schools from a single dashboard.
            </li>
            <li>
              <strong>District-level reporting:</strong> Generate consolidated reports across all your schools.
            </li>
            <li>
              <strong>Centralized administration:</strong> Manage users, permissions, and settings from one place.
            </li>
            <li>
              <strong>Custom hierarchy:</strong> Set up your organizational structure to match your district&apos;s needs.
            </li>
          </ul>
          <p>
            Our Enterprise plan is specifically designed for districts and multi-school organizations. We offer special
            pricing for districts based on the number of schools and students. Contact our sales team for a customized
            quote.
          </p>
        </div>
      ),
    },
    {
      id: "faq-4",
      question: "What kind of support does GradeFlow provide?",
      icon: <LifeBuoy className="w-5 h-5 text-blue-600" />,
      answer: (
        <div className="space-y-4">
          <p>We pride ourselves on providing exceptional support to all our customers:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>24/7 Technical Support:</strong> Our support team is available around the clock via chat, email,
              and phone.
            </li>
            <li>
              <strong>Dedicated Account Manager:</strong> Premium and Enterprise customers receive a dedicated account
              manager.
            </li>
            <li>
              <strong>Comprehensive Knowledge Base:</strong> Access to detailed documentation, video tutorials, and best
              practices.
            </li>
            <li>
              <strong>Regular Webinars:</strong> Free training sessions on new features and advanced usage.
            </li>
            <li>
              <strong>User Community:</strong> Connect with other GradeFlow users to share tips and strategies.
            </li>
          </ul>
          <p>
            Our average response time is under 2 hours, and we maintain a 98% customer satisfaction rating for our
            support services.
          </p>
        </div>
      ),
    },
    {
      id: "faq-5",
      question: "Can GradeFlow integrate with other systems we use?",
      icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
      answer: (
        <div className="space-y-4">
          <p>Yes, GradeFlow is designed to work seamlessly with your existing technology stack:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>LMS Integration:</strong> Connect with popular learning management systems like Canvas, Moodle,
              and Google Classroom.
            </li>
            <li>
              <strong>SIS Integration:</strong> Sync with student information systems like PowerSchool, Skyward, and
              Infinite Campus.
            </li>
            <li>
              <strong>Authentication:</strong> Support for SSO via Google, Microsoft, SAML, and LDAP.
            </li>
            <li>
              <strong>Payment Processors:</strong> Integrate with popular payment systems for fee collection.
            </li>
            <li>
              <strong>API Access:</strong> Comprehensive API for custom integrations (available on Premium and
              Enterprise plans).
            </li>
          </ul>
          <p>If you need a specific integration, our team can work with you to develop a custom solution.</p>
        </div>
      ),
    },
    {
      id: "faq-6",
      question: "What if I need to cancel my subscription?",
      icon: <HelpCircle className="w-5 h-5 text-blue-600" />,
      answer: (
        <div className="space-y-4">
          <p>We understand that circumstances change. Our cancellation policy is straightforward:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>30-Day Money-Back Guarantee:</strong> If you&apos;re not satisfied within the first 30 days, we&apos;ll
              refund your payment in full.
            </li>
            <li>
              <strong>Annual Plans:</strong> You can cancel at any time. For annual plans, we offer prorated refunds for
              the unused portion of your subscription.
            </li>
            <li>
              <strong>Data Export:</strong> If you cancel, we provide tools to export all your data in standard formats.
            </li>
            <li>
              <strong>Data Retention:</strong> After cancellation, we retain your data for 30 days before permanent
              deletion, giving you time to export everything you need.
            </li>
          </ul>
          <p>To cancel, simply contact our support team, and they&apos;ll guide you through the process.</p>
        </div>
      ),
    },
  ]

  const toggleItem = (id: string) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(id) ? prevOpenItems.filter((item) => item !== id) : [...prevOpenItems, id],
    )
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600">
            Find answers to common questions about GradeFlow. If you don&apos;t see what you&apos;re looking for, please contact
            our support team.
          </p>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                  openItems.includes(faq.id)
                    ? "shadow-lg border-blue-200 border"
                    : "shadow border border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
                  aria-expanded={openItems.includes(faq.id)}
                  aria-controls={`${faq.id}-content`}
                >
                  <div className="flex items-center">
                    <div className="mr-4">{faq.icon}</div>
                    <span className="text-lg font-medium text-gray-900 text-left">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openItems.includes(faq.id) ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`${faq.id}-content`}
                  className={`transition-all duration-300 overflow-hidden ${
                    openItems.includes(faq.id) ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={!openItems.includes(faq.id)}
                >
                  <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-16 text-center max-w-3xl mx-auto transition-all duration-1000 delay-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              Our team is ready to help you with any other questions you might have about GradeFlow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
                Contact Support
              </button>
              <button className="px-6 py-2 bg-white hover:bg-gray-50 text-blue-600 font-medium rounded-lg border border-blue-200 transition-colors duration-300">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
