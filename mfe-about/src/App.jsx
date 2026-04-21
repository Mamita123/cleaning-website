import React from "react";

// ✅ Import all sections of the About Us page
import AboutHero   from "./sections/AboutHero";
import OurStory    from "./sections/OurStory";
import TeamSection from "./sections/TeamSection";
import OurValues   from "./sections/OurValues";

// ✅ Shell loads this as: import("mfeAbout/AboutApp")
export default function App() {
  return (
    <main>
      <AboutHero />    {/* Top hero banner with stats */}
      <OurStory />     {/* Timeline of company milestones */}
      <TeamSection />  {/* Team member cards */}
      <OurValues />    {/* Company values + join team CTA */}
    </main>
  );
}