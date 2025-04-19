import React from "react";
import Hero from "@/components/landing-page/Hero";
import Features from "@/components/landing-page/Features";
import Screenshots from "@/components/landing-page/Screenshots";
import Benefits from "@/components/landing-page/Benefits";
import Testimonials from "@/components/landing-page/Testimonials";
import Pricing from "@/components/landing-page/Pricing";
import Faq from "@/components/landing-page/Faq";
import Footer from "@/components/landing-page/Footer";
const Home = () => {
  return (
    <div className="w-full h-full">
      <Hero />
      <Features />
      <Screenshots />
      <Benefits />
      <Testimonials />
      <Pricing />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
