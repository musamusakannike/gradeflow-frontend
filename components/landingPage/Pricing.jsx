
const Pricing = () => {
  return (
    <section id="pricing" className="bg-white py-12">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
          Affordable <span className="text-orange-500">Pricing</span> Plans
        </h2>
        <p className="mt-4 text-gray-600">
          Choose a plan that works for your school, whether you're just starting
          or scaling up.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {/* Basic Plan */}
          <div className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800">Basic</h3>
            <p className="mt-2 text-gray-600">
              For small schools just getting started.
            </p>
            <p className="mt-4 text-3xl font-bold text-orange-500">$19</p>
            <p className="text-sm text-gray-600">per month</p>
            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✔ Manage up to 50 students</li>
              <li>✔ Assign teachers and subjects</li>
              <li>✔ Basic reporting tools</li>
            </ul>
            <a
              href="/signup"
              className="block mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              Get Started
            </a>
          </div>

          {/* Pro Plan */}
          <div className="bg-white shadow-md border-2 border-orange-500 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800">Pro</h3>
            <p className="mt-2 text-gray-600">
              For growing schools with more advanced needs.
            </p>
            <p className="mt-4 text-3xl font-bold text-orange-500">$49</p>
            <p className="text-sm text-gray-600">per month</p>
            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✔ Manage up to 500 students</li>
              <li>✔ Advanced analytics</li>
              <li>✔ Dedicated support</li>
            </ul>
            <a
              href="/signup"
              className="block mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              Get Started
            </a>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800">Enterprise</h3>
            <p className="mt-2 text-gray-600">
              For large schools and institutions.
            </p>
            <p className="mt-4 text-3xl font-bold text-orange-500">Custom</p>
            <p className="text-sm text-gray-600">Contact us for pricing</p>
            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✔ Unlimited students</li>
              <li>✔ Tailored features</li>
              <li>✔ Priority support</li>
            </ul>
            <a
              href="/contact"
              className="block mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
