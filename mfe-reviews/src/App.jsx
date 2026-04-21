import React from "react";

// ✅ Import all sections of the Reviews page
import ReviewsHero    from "./sections/ReviewsHero";
import ReviewsGrid    from "./sections/ReviewsGrid";
import ReviewsSummary from "./sections/ReviewsSummary";

// ✅ Shell loads this as: import("mfeReviews/ReviewsApp")
export default function App() {
  return (
    <main>
      <ReviewsHero />     {/* Top banner with overall rating */}
      <ReviewsGrid />     {/* Filterable review cards + load more */}
      <ReviewsSummary />  {/* Star breakdown + CTA banner */}
    </main>
  );
}