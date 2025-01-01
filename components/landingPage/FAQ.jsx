"use client";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ data
  const faqs = [
    {
      question: "What is GradeFlow?",
      answer:
        "GradeFlow is a comprehensive school management system that simplifies the administration of classes, students, and teachers while providing tools for scoring and reporting.",
    },
    {
      question: "Who can use GradeFlow?",
      answer:
        "GradeFlow is designed for school administrators, teachers, and students to streamline day-to-day school operations.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade your plan at any time to access additional features or support for more students.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for new users to explore all the features GradeFlow has to offer.",
    },
    {
      question: "What support options are available?",
      answer:
        "We provide email support for all users. Pro and Enterprise users have access to dedicated and priority support.",
    },
  ];

  // Toggle accordion
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center">
          Frequently Asked <span className="text-orange-500">Questions</span>
        </h2>
        <p className="mt-4 text-gray-600 text-center">
          Find answers to some of the common questions about GradeFlow.
        </p>

        {/* FAQ Items */}
        <div className="mt-10 space-y-6 md:mx-8 lg:mx-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  {faq.question}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 text-orange-500 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {openIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
