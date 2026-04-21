import React from "react";

// ✅ Import all sections of the home page
import Hero        from "./sections/Hero";
import Features    from "./sections/Features";
import Services    from "./sections/Services";
import CallToAction from "./sections/CallToAction";

// ✅ This is what the shell loads via Module Federation
// Shell imports this as: import("mfeHome/HomeApp")
export default function App() {
  return (
    <main>
      {/* ✅ Section order on the home page */}
      <Hero />           {/* Big hero banner */}
      <Features />       {/* Why choose us cards */}
      <Services />       {/* Service preview cards */}
      <CallToAction />   {/* Bottom booking CTA */}
    </main>
  );
}