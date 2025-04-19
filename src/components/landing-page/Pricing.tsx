"use client"

import { useEffect, useState } from "react"
import { Check, HelpCircle, X } from "lucide-react"

interface PricingFeature {
  title: string
  basic: boolean | string
  standard: boolean | string
  premium: boolean | string
  enterprise: boolean | string
}

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features: PricingFeature[] = [
    {
      title: "Students",
      basic: "Up to 250",
      standard: "Up to 1,000",
      premium: "Up to 5,000",
      enterprise: "Unlimited",
    },
    {
      title: "Admin accounts",
      basic: "2",
      standard: "10",
      premium: "25",
      enterprise: "Unlimited",
    },
    {
      title: "Teacher accounts",
      basic: "Up to 20",
      standard: "Up to 100",
      premium: "Up to 500",
      enterprise: "Unlimited",
    },
    {
      title: "Student Management",
      basic: true,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      title: "Grade Management",
      basic: true,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      title: "Attendance Tracking",
      basic: true,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      title: "Mobile App Access",
      basic: true,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      title: "Fee Management",
      basic: false,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      title: "Advanced Reports",
      basic: false,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      title: "Parent Portal",
      basic: false,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      title: "API Access",
      basic: false,
      standard: false,
      premium: true,
      enterprise: true,
    },
    {
      title: "Data Analytics",
      basic: false,
      standard: false,
      premium: true,
      enterprise: true,
    },
    {
      title: "Custom Integrations",
      basic: false,
      standard: false,
      premium: false,
      enterprise: true,
    },
    {
      title: "Dedicated Account Manager",
      basic: false,
      standard: false,
      premium: false,
      enterprise: true,
    },
    {
      title: "Priority Support",
      basic: false,
      standard: false,
      premium: true,
      enterprise: true,
    },
    {
      title: "SLA Guarantee",
      basic: false,
      standard: false,
      premium: false,
      enterprise: true,
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
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600">
            Choose the perfect plan for your school. All plans include our core features, with yearly billing for
            maximum savings.
          </p>
        </div>

        {/* Pricing toggle - could be implemented for monthly/yearly */}
        <div
          className={`flex justify-center items-center mb-8 transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full">
            Yearly plans • Save up to 25%
          </div>
        </div>

        {/* Desktop pricing table */}
        <div
          className={`hidden lg:block transition-all duration-1000 delay-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="grid grid-cols-5 gap-4 mb-8">
            {/* Features column */}
            <div className="pt-24">
              <div className="bg-transparent h-full">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-500 mb-6">Features</h3>
                  <ul className="space-y-6">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span>{feature.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Basic plan */}
            <div
              className={`transform transition-all duration-300 ${
                hoveredPlan === "basic" ? "scale-[1.02] shadow-xl z-10" : "scale-100 shadow-lg"
              }`}
              onMouseEnter={() => setHoveredPlan("basic")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className="bg-white rounded-xl overflow-hidden h-full border border-gray-200">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
                  <p className="text-gray-500 mb-6">For small schools just getting started</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$999</span>
                    <span className="text-gray-500">/year</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Approximately $83/month</p>
                  <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors duration-300">
                    Get Started
                  </button>
                </div>
                <div className="border-t border-gray-100 p-6">
                  <ul className="space-y-6">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        {typeof feature.basic === "string" ? (
                          <span className="text-sm">{feature.basic}</span>
                        ) : feature.basic ? (
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mr-2 flex-shrink-0" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Standard plan */}
            <div
              className={`transform transition-all duration-300 ${
                hoveredPlan === "standard" ? "scale-[1.02] shadow-xl z-10" : "scale-100 shadow-lg"
              }`}
              onMouseEnter={() => setHoveredPlan("standard")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className="bg-white rounded-xl overflow-hidden h-full border border-gray-200">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Standard</h3>
                  <p className="text-gray-500 mb-6">Perfect for medium-sized schools</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$2,499</span>
                    <span className="text-gray-500">/year</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Approximately $208/month</p>
                  <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
                    Get Started
                  </button>
                </div>
                <div className="border-t border-gray-100 p-6">
                  <ul className="space-y-6">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        {typeof feature.standard === "string" ? (
                          <span className="text-sm">{feature.standard}</span>
                        ) : feature.standard ? (
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mr-2 flex-shrink-0" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Premium plan */}
            <div
              className={`transform transition-all duration-300 ${
                hoveredPlan === "premium" || hoveredPlan === null
                  ? "scale-[1.02] shadow-xl z-10 ring-2 ring-blue-500"
                  : "scale-100 shadow-lg"
              }`}
              onMouseEnter={() => setHoveredPlan("premium")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className="bg-white rounded-xl overflow-hidden h-full border border-transparent relative">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                  <p className="text-gray-500 mb-6">For large schools with advanced needs</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$4,999</span>
                    <span className="text-gray-500">/year</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Approximately $417/month</p>
                  <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
                    Get Started
                  </button>
                </div>
                <div className="border-t border-gray-100 p-6">
                  <ul className="space-y-6">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        {typeof feature.premium === "string" ? (
                          <span className="text-sm">{feature.premium}</span>
                        ) : feature.premium ? (
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mr-2 flex-shrink-0" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise plan */}
            <div
              className={`transform transition-all duration-300 ${
                hoveredPlan === "enterprise" ? "scale-[1.02] shadow-xl z-10" : "scale-100 shadow-lg"
              }`}
              onMouseEnter={() => setHoveredPlan("enterprise")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className="bg-white rounded-xl overflow-hidden h-full border border-gray-200">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                  <p className="text-gray-500 mb-6">For districts and large institutions</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">Custom</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Contact us for custom pricing</p>
                  <button className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-300">
                    Contact Sales
                  </button>
                </div>
                <div className="border-t border-gray-100 p-6">
                  <ul className="space-y-6">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        {typeof feature.enterprise === "string" ? (
                          <span className="text-sm">{feature.enterprise}</span>
                        ) : feature.enterprise ? (
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mr-2 flex-shrink-0" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile pricing cards */}
        <div
          className={`lg:hidden transition-all duration-1000 delay-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="space-y-8">
            {/* Premium plan (most popular) first on mobile */}
            <div className="bg-white rounded-xl overflow-hidden border-2 border-blue-500 shadow-xl relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                <p className="text-gray-500 mb-4">For large schools with advanced needs</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">$4,999</span>
                  <span className="text-gray-500">/year</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Approximately $417/month</p>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 mb-4">
                  Get Started
                </button>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Up to 5,000 students</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>25 admin accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Up to 500 teacher accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All core features included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Advanced reports and analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Standard plan */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Standard</h3>
                <p className="text-gray-500 mb-4">Perfect for medium-sized schools</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">$2,499</span>
                  <span className="text-gray-500">/year</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Approximately $208/month</p>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 mb-4">
                  Get Started
                </button>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Up to 1,000 students</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>10 admin accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Up to 100 teacher accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All core features included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Fee management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Parent portal</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">API access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Basic plan */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
                <p className="text-gray-500 mb-4">For small schools just getting started</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">$999</span>
                  <span className="text-gray-500">/year</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Approximately $83/month</p>
                <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors duration-300 mb-4">
                  Get Started
                </button>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Up to 250 students</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>2 admin accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Up to 20 teacher accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Student management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Grade management</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">Fee management</span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">Parent portal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise plan */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-500 mb-4">For districts and large institutions</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">Custom</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Contact us for custom pricing</p>
                <button className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-300 mb-4">
                  Contact Sales
                </button>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Unlimited students</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Unlimited admin accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Unlimited teacher accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All features included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>SLA guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div
          className={`mt-16 text-center max-w-3xl mx-auto transition-all duration-1000 delay-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Need help choosing?</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Our team can help you find the perfect plan for your school&apos;s specific needs. We also offer a 30-day
              money-back guarantee on all plans.
            </p>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
