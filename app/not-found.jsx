"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <section className="bg-gray-50 py-12 h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-orange-500">404</h1>
        <p className="mt-4 text-lg text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-8 flex justify-center gap-2">
          <span
            onClick={() => router.back()}
            className="mt-6 inline-block px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition cursor-pointer"
          >
            Go Back
          </span>
          <Link
            href="/"
            className="mt-6 inline-block px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
