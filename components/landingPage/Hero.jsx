import Image from "next/image";
import HeroImage from "@/assets/images/Teaching-cuate.png";

const Hero = () => {
  return (
    <section className="bg-white text-gray-800">
      <div className="container mx-auto px-6 py-12 lg:py-18">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-orange-500 font-semibold">
              Welcome to GradeFlow
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Manage Your <span className="text-orange-500">School</span> with
              Ease
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Simplify the management of students, teachers, classes, and scores
              in one place. GradeFlow helps you streamline your operations and
              save time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="/signup"
                className="px-6 py-3 text-lg font-medium text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="px-6 py-3 text-lg font-medium text-orange-500 border-2 border-orange-500 rounded-lg hover:bg-orange-100 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full h-full lg:w-1/2 mt-12 lg:mt-0 bg-orange-300 relative">
            <Image
              src={HeroImage}
              alt="Hero Illustration"
              width={500}
              height={500}
              className="w-full h-auto"
            />
            <a
              href="https://storyset.com/education"
              className="absolute bg-slate-300 text-white bottom-0 right-0 text-xs rounded-sm"
            >
              Image source: Education illustrations by Storyset
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
