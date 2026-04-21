import React from "react";

// ✅ Import all sections of the pricing page
import PricingHero  from "./sections/PricingHero";
import PricingCards from "./sections/PricingCards";
import PricingFAQ   from "./sections/PricingFAQ";

// ✅ Shell loads this as: import("mfePricing/PricingApp")
export default function App() {
  return (
    <main>
      <PricingHero />   {/* Top banner */}
      <PricingCards />  {/* Plan cards with toggle */}
      <PricingFAQ />    {/* Accordion FAQ */}
    </main>
  );
}