import React from "react";

// ✅ Import all sections of the services page
import ServicesHero    from "./sections/ServicesHero";
import ServicesList    from "./sections/ServicesList";
import ServiceProcess  from "./sections/ServiceProcess";

// ✅ This is what the shell loads via Module Federation
// Shell imports: import("mfeServices/ServicesApp")
export default function App() {
  return (
    <main>
      <ServicesHero />    {/* Top banner */}
      <ServicesList />    {/* Filterable service cards */}
      <ServiceProcess />  {/* How it works steps */}
    </main>
  );
}